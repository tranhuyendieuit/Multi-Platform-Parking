<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="d-flex align-items-center">
        <p class="mb-0">My Profile</p>
        <parking-button color="success" size="sm" class="ms-auto">Change password</parking-button>
      </div>
    </div>
    <div class="card-body" v-if="data">
      <p class="text-uppercase text-sm">User Information</p>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="example-text-input" class="form-control-label">Username</label>
          <input class="form-control" type="text" :value="data.user_name" disabled />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="example-text-input" class="form-control-label">First name</label>
          <input class="form-control" type="text" :value="data.first_name" disabled />
        </div>
        <div class="col-md-6 mb-3">
          <label for="example-text-input" class="form-control-label">Last name</label>
          <input class="form-control" type="text" :value="data.last_name" disabled />
        </div>
        <div class="col-md-6 mb-3">
          <label for="example-text-input" class="form-control-label">Email address</label>
          <input class="form-control" type="email" :value="data.email" disabled />
        </div>
        <div class="col-md-6 mb-3">
          <label for="example-text-input" class="form-control-label">Phone number</label>
          <input class="form-control" type="text" :value="data.phone_number" disabled />
        </div>
      </div>
      <hr class="horizontal dark" />
      <p class="text-uppercase text-sm">Parking Area Information</p>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="example-text-input" class="form-control-label">Capacity</label>
          <input class="form-control" type="text" :value="data.parking_area.capacity" disabled />
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="example-text-input" class="form-control-label">City/ Province</label>
          <input class="form-control" type="text" :value="data.parking_area.province" disabled />
        </div>
        <div class="col-md-4 mb-3">
          <label for="example-text-input" class="form-control-label">District</label>
          <input class="form-control" type="text" :value="data.parking_area.district" disabled />
        </div>
        <div class="col-md-4 mb-3">
          <label for="example-text-input" class="form-control-label">Ward/ Commune</label>
          <input class="form-control" type="text" :value="data.parking_area.commune" disabled />
        </div>
        <div class="col-md-12 mb-3">
          <label for="example-text-input" class="form-control-label">Address</label>
          <input class="form-control" type="text" :value="data.parking_area.address" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingButton from "@/components/ParkingButton.vue";


export default {
  name: "my-profile-card",
  
  props: {
    data: {
      type: Object,
      default: null,
    },
  },

  components: {
    ParkingButton
  },
};
</script>
