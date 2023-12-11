package com.huyendieu.parking.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DetectionModuleConfig {
  @Value("${licenseplate.detecion}")
  public static String host = "http://192.168.1.8:5000/capture";

  @Value("${licenseplate.detecion}")
  public static String hostTest = "http://192.168.1.8:5000/extract";
}
