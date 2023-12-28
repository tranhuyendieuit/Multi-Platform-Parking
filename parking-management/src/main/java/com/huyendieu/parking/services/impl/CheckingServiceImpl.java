package com.huyendieu.parking.services.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.huyendieu.parking.config.DetectionModuleConfig;
import com.huyendieu.parking.constants.Constant;
import com.huyendieu.parking.constants.NotificationConstant;
import com.huyendieu.parking.entities.ParkingAreaEntity;
import com.huyendieu.parking.entities.ParkingHistoryEntity;
import com.huyendieu.parking.entities.summary.ParkingAreaSummaryEntity;
import com.huyendieu.parking.entities.summary.VehicleSummaryEntity;
import com.huyendieu.parking.exception.ParkingException;
import com.huyendieu.parking.model.notification.NotificationModel;
import com.huyendieu.parking.model.response.CapacityResponseModel;
import com.huyendieu.parking.model.response.CheckParkingResponseModel;
import com.huyendieu.parking.repositories.ParkingAreaRepository;
import com.huyendieu.parking.repositories.ParkingHistoryRepository;
import com.huyendieu.parking.repositories.VehicleRepository;
import com.huyendieu.parking.services.CheckingService;
import com.huyendieu.parking.services.ParkingAreaService;
import com.huyendieu.parking.services.base.BaseService;
import com.huyendieu.parking.services.common.ParkingAreaSummaryService;
import com.huyendieu.parking.services.common.VehicleSummaryService;
import com.huyendieu.parking.utils.NotificationUtils;
import com.huyendieu.parking.utils.UserUtils;

@Service
public class CheckingServiceImpl extends BaseService implements CheckingService {

  @Autowired
  private ParkingAreaRepository parkingAreaRepository;

  @Autowired
  private ParkingHistoryRepository parkingHistoryRepository;

  @Autowired
  private MessageSource messageSource;

  @Autowired
  private ParkingAreaService parkingAreaService;

  @Autowired
  private ParkingAreaSummaryService parkingAreaSummaryService;

  @Autowired
  private VehicleSummaryService vehicleSummaryService;

  @Override
  public CheckParkingResponseModel checkParking(Authentication authentication, String parkingAreaId)
      throws ParkingException {
    if (!UserUtils.isVehicleRole(authentication)) {
      throw new ParkingException("authentication don't exist!");
    }
    String username = UserUtils.getUserName(authentication);
    List<ParkingHistoryEntity> parkingHistoryEntities = parkingHistoryRepository.findUserByNotCheckOut(username,
        new ObjectId(parkingAreaId));
    String LicensePlate = getLicensePlate();
    if (LicensePlate.isEmpty()
        || LicensePlate.contains("list index out of range")) {
      String message = messageSource.getMessage("license-plate-no-detection",
          new Object[] {}, LocaleContextHolder.getLocale());
      NotificationUtils.sendNotification(String.format(NotificationConstant.NotificationPath.CHECKING,
          parkingAreaId),
          new NotificationModel(NotificationConstant.NotificationType.CHECK_OUT.getCode(), message));
      return CheckParkingResponseModel.builder()
          .parkingId(parkingAreaId)
          .checkType(Constant.CheckParkingCode.CHECK_OUT.getCode())
          .message(Constant.CheckParkingCode.CHECK_OUT.getValue())
          .plate(LicensePlate)
          .userPlate(getPlateNumber(parkingHistoryEntities.get(0)))
          .build();
    }

    if (!CollectionUtils.isEmpty(parkingHistoryEntities)) {
      ParkingHistoryEntity parkingHistoryEntity = checkOut(parkingHistoryEntities.get(0));
      checkingNotification(parkingAreaId, getPlateNumber(parkingHistoryEntity),
          Constant.CheckParkingCode.CHECK_OUT.getCode(), LicensePlate);
      return CheckParkingResponseModel.builder()
          .parkingId(parkingAreaId)
          .checkType(Constant.CheckParkingCode.CHECK_OUT.getCode())
          .message(Constant.CheckParkingCode.CHECK_OUT.getValue())
          .plate(LicensePlate)
          .userPlate(getPlateNumber(parkingHistoryEntity))
          .build();
    } else {
      if (!isAvailableCapacity(parkingAreaId)) {
        String messageError = messageSource.getMessage("parking-area-no-longer-available",
            new Object[] {}, LocaleContextHolder.getLocale());
        throw new ParkingException(messageError);
      }
      ParkingHistoryEntity parkingHistoryEntity = checkIn(parkingAreaId, username);
      checkingNotification(parkingAreaId, getPlateNumber(parkingHistoryEntity),
          Constant.CheckParkingCode.CHECK_IN.getCode(), LicensePlate);
      return CheckParkingResponseModel.builder()
          .parkingId(parkingAreaId)
          .checkType(Constant.CheckParkingCode.CHECK_IN.getCode())
          .message(Constant.CheckParkingCode.CHECK_IN.getValue())
          .plate(LicensePlate)
          .userPlate(getPlateNumber(parkingHistoryEntity))
          .build();
    }
  }

  private boolean isAvailableCapacity(String parkingAreaId) {
    Optional<ParkingAreaEntity> optionalParkingAreaEntity = parkingAreaRepository
        .findFistById(new ObjectId(parkingAreaId));
    if (optionalParkingAreaEntity.isEmpty()) {
      return false;
    }
    ParkingAreaEntity parkingAreaEntity = optionalParkingAreaEntity.get();
    CapacityResponseModel capacityInformation = parkingAreaService.getCapacityByParkingArea(parkingAreaEntity);
    return capacityInformation.getOccupation() <= capacityInformation.getCapacity();
  }

  private ParkingHistoryEntity checkIn(String parkingAreaId, String username) throws ParkingException {
    ParkingAreaSummaryEntity parkingArea = parkingAreaSummaryService.mappingSummaryById(parkingAreaId);
    VehicleSummaryEntity vehicle = vehicleSummaryService.mappingSummaryByUsername(username);
    ParkingHistoryEntity parkingHistoryEntity = ParkingHistoryEntity.builder()
        .checkInDate(currentDate())
        .vehicle(vehicle)
        .parkingArea(parkingArea)
        .createdDate(currentDate())
        .createdBy(getClass().getSimpleName())
        .build();
    parkingHistoryRepository.save(parkingHistoryEntity);

    return parkingHistoryEntity;
  }

  private ParkingHistoryEntity checkOut(ParkingHistoryEntity parkingHistoryEntity) throws ParkingException {
    parkingHistoryEntity.setCheckOutDate(currentDate());
    parkingHistoryEntity.setUpdatedDate(currentDate());
    parkingHistoryEntity.setUpdatedBy(getClass().getSimpleName());
    parkingHistoryRepository.save(parkingHistoryEntity);

    return parkingHistoryEntity;
  }

  private void checkingNotification(String parkingAreaId, String plateNumber, String type, String plateDetectionNumber)
      throws ParkingException {
    NotificationModel notificationModel = null;

    if (plateDetectionNumber.equals(plateNumber.replaceAll("[-_.,]+", "").toUpperCase())) {
      if (Constant.CheckParkingCode.CHECK_IN.getCode().equals(type)) {
        String message = messageSource.getMessage("check-in-notification-success",
            new Object[] { plateNumber }, LocaleContextHolder.getLocale());
        notificationModel = new NotificationModel(NotificationConstant.NotificationType.CHECK_IN.getCode(), message);
      }
      if (Constant.CheckParkingCode.CHECK_OUT.getCode().equals(type)) {
        String message = messageSource.getMessage("check-out-notification-success",
            new Object[] { plateNumber }, LocaleContextHolder.getLocale());
        notificationModel = new NotificationModel(NotificationConstant.NotificationType.CHECK_OUT.getCode(), message);
      }
    } else {
      if (Constant.CheckParkingCode.CHECK_IN.getCode().equals(type)) {
        String message = messageSource.getMessage("check-in-notification-invalid",
            new Object[] { plateNumber, plateDetectionNumber }, LocaleContextHolder.getLocale());
        notificationModel = new NotificationModel(NotificationConstant.NotificationType.CHECK_IN.getCode(), message);
      }
      if (Constant.CheckParkingCode.CHECK_OUT.getCode().equals(type)) {
        String message = messageSource.getMessage("check-out-notification-invalid",
            new Object[] { plateNumber, plateDetectionNumber }, LocaleContextHolder.getLocale());
        notificationModel = new NotificationModel(NotificationConstant.NotificationType.CHECK_OUT.getCode(), message);
      }
    }

    NotificationUtils.sendNotification(String.format(NotificationConstant.NotificationPath.CHECKING,
        parkingAreaId), notificationModel);
  }

  private String getPlateNumber(ParkingHistoryEntity parkingHistoryEntity) {
    if (parkingHistoryEntity == null) {
      return Constant.Character.BLANK;
    }

    VehicleSummaryEntity vehicle = parkingHistoryEntity.getVehicle();
    if (vehicle == null) {
      return Constant.Character.BLANK;
    }

    return vehicle.getPlateNumber();
  }

  private String getLicensePlate() {
    try {
      HttpClient client = HttpClient.newHttpClient();
      HttpRequest request = HttpRequest.newBuilder()
          .uri(URI.create(DetectionModuleConfig.host))
          .build();

      HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
      return response.body();
    } catch (Exception e) {
      System.out.println(e.getMessage());
      return "";
    }
  }
}
