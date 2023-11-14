<template>
  <Popup 
    v-if="popupTriggers.timedTrigger"
    :TogglePopup="() => TogglePopup('timedTrigger')">
    <img id="succes-img" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3e%3cpath fill='%2366d432' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e"/>
    <h2 id="succes-lable">Succesfully sign up!</h2>
  </Popup>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-6 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign Up</h4>
                  <p class="mb-0">Create an account of the parking management system</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <parking-input 
                        type="input"
                        placeholder="User name"
                        v-model="username"
                        name="username"
                        size="lg"
                        :message="userNameMessage"
                        :valid="isValidUsername" 
                        label="User name" />
                    </div>
                    <div class="mb-3">
                      <parking-input 
                        type="password" 
                        placeholder="Password" 
                        v-model="password" 
                        name="password"
                        label="Password"
                        size="lg" />
                    </div>
                    <div class="mb-3">
                      <parking-input 
                        type="password" 
                        placeholder="Retype password" 
                        v-model="retypePassword"
                        name="retypePassword" 
                        message="Passwords do not match"
                        @blur="validate()"
                        :valid="isRetypePassword"
                        label="Retype password"
                        size="lg" />
                    </div>
                    <div class="row">
                      <parking-input 
                        type="input" 
                        placeholder="email@gmail.com" 
                        v-model="email"
                        name="email" 
                        label="Email"
                        col="8"
                        size="lg" />
                      <parking-input 
                        type="input" 
                        placeholder="0934 333 444" 
                        v-model="phoneNumber"
                        name="phoneNumber" 
                        label="Phone number"
                        col="4"
                        size="lg" />
                    </div>
                    <div class="row mb-3">
                      <parking-input 
                        type="input" 
                        placeholder="First name" 
                        v-model="firstName"
                        name="firstName" 
                        label="First name"
                        col="6"
                        size="lg" />
                        <parking-input 
                        type="input" 
                        placeholder="Last name" 
                        v-model="lastName"
                        name="lastName" 
                        label="Last name"
                        col="6"
                        size="lg" />
                    </div>
                    <div class="mb-3 user-type-checkbox row">
                      <parking-radio
                        name="user-type"
                        v-model="userType"
                        :datas="userTypeDatas"
                        :isHorizontal="true"
                        @change="switchMode()" />
                    </div>
                    <template v-if="show">
                      <div class="row">
                        <parking-input 
                          type="input" 
                          placeholder="43D1-88888" 
                          v-model="plateNumber"
                          name="plate-number" 
                          label="Plate number"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="input" 
                          placeholder="Hoda" 
                          v-model="vehicleBrand"
                          name="vehicleBrand" 
                          label="Vehicle brand"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="input" 
                          placeholder="Air Blade" 
                          v-model="vehicleModel"
                          name="vehicleModel" 
                          label="Vehicle brand"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="date" 
                          placeholder="dd-mm-yyyy" 
                          v-model="registerDatePicker"
                          name="registerDate" 
                          label="Register date"
                          @change="changeRegisterDate()"
                          :message="registerDateMessage"
                          :valid="isValidRegisterDate" 
                          col="6"
                          size="lg" />
                      </div>
                    </template>
                    <template v-if="!show">
                      <div class="row">
                        <parking-input 
                          type="input" 
                          placeholder="Danang" 
                          v-model="province"
                          name="province" 
                          label="City/ Province"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="input" 
                          placeholder="Ngu Hanh Son" 
                          v-model="district"
                          name="district" 
                          label="District"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="input" 
                          placeholder="Hoa Quy" 
                          v-model="commune"
                          name="commune" 
                          label="Ward/ Commune"
                          col="6"
                          size="lg" />
                        <parking-input 
                          type="input" 
                          placeholder="470 Đường Trần Đại Nghĩa, Khu đô thị, Ngũ Hành Sơn, Đà Nẵng" 
                          v-model="address"
                          name="address" 
                          label="Address"
                          col="12"
                          size="lg" />
                        <parking-input 
                          type="number" 
                          placeholder="100" 
                          v-model="capacity"
                          name="capacity" 
                          label="capacity"
                          col="6"
                          size="lg" />
                      </div>
                    </template>
                    <!-- <b-button v-b-modal.modaltwo>Modaltwo</b-button>
                    <b-modal id="modaltwo">Hello Modal Two</b-modal> -->
                    <div class="text-center">
                      <parking-button class="mt-4" variant="gradient" color="success" fullWidth size="lg"
                        @click="(event) => signUp(event)">Sign up</parking-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Already have an ?
                    <a href="/signin" class="text-success text-gradient font-weight-bold">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">Danang university</h4>
                <p class="text-white position-relative">Vietnam - Korea university of information and communication technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import ParkingInput from "@/components/ParkingInput.vue";
import ParkingRadio from "@/components/ParkingRadio.vue";
import ParkingButton from "@/components/ParkingButton.vue";
import RepositoryFactory from '@/repository/RepositoryFactory';
import Popup from '@/components/Popup.vue';
import moment from 'moment';
import { ref } from 'vue';
const SignUpRepository = RepositoryFactory.get('user')
const body = document.getElementsByTagName("body")[0];

export default {
  setup () {
		const popupTriggers = ref({
			timedTrigger: false
		});
		const TogglePopup = (trigger) => {
      setTimeout(() => {
        popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        setTimeout(() => {
          popupTriggers.value[trigger] = !popupTriggers.value[trigger]
        }, 3000);
		  }, 1000);
		}
		
		return {
			popupTriggers,
			TogglePopup
		}
	},
  name: "signin",
  components: {
    ParkingInput,
    ParkingButton,
    ParkingRadio,
    Popup
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  mounted() {
    this.changeRegisterDate();
  },
  data() {
    return {
      modalVisible: false,
      username: '',
      password: '',
      retypePassword: '',
      userType: true,
      show: true,
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName:'',

      // vehicle owner
      plateNumber: '',
      vehicleBrand: '',
      vehicleModel: '',
      registerDatePicker: moment().format("YYYY-MM-DD"),
      registerDate: '',

      // parking area
      province: '',
      district: '',
      commune: '',
      address: '',
      capacity: '',

      userTypeDatas: [
        {
          id: "vehicle-owner-radio",
          lable: "Vehicle owner",
          value: true,
          checked: true
        },
        {
          id: "parking-area-radio",
          lable: "Parking area",
          value: false,
          checked: false
        }
      ],

      // validate
      isValidUsername: null,
      isRetypePassword: null,
      isValidRegisterDate: null,

      userNameMessage: '',
      registerDateMessage: '',
    }
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },
  
    changeRegisterDate() {
      let dArr
      if (this.registerDatePicker) {
        dArr = this.registerDatePicker.split("-");  // ex input: "2010-01-18"
      } else {
        dArr = moment().format("YYYY-MM-DD").split("-");  // ex input: "2010-01-18"
      }
      this.registerDate = dArr[2]+ "/" +dArr[1]+ "/" +dArr[0];
    },

    switchMode() {
      this.show = !this.show;
      console.log(this.userType)
    },

    async signUp(event) {
      if (event) {
        event.preventDefault()
      }
      const { data } = await SignUpRepository.post({
        "user_name": this.username,
        "password": this.password,
        "email": this.email,
        "first_name": this.firstName,
        "last_name": this.lastName,
        "phone_number": this.phoneNumber,
        "is_vehicle_owner": this.userType,
        // vehicle owner
        "plate_number": this.plateNumber,
        "vehicle_brand": this.vehicleBrand,
        "vehicle_model": this.vehicleModel,
        "register_date": this.registerDate,
        // parking area
        "province": this.province,
        "commune": this.commune,
        "district": this.district,
        "address": this.address,
        "capacity": this.capacity,
      }, 'sign-up')
      .catch(error => {
        return error.response;
      });
      if (data.status == 200) {
        this.TogglePopup('timedTrigger');
        setTimeout(() => {
          window.location.href = '/signin';
        }, 4000);
      } else if(data.status == 400) {
        const message = data.data.message
        const registerDate = data.data.register_date
        const userName = data.data.userName
        if (message && message.toLowerCase().includes('username')) {
          this.isValidUsername = false;
          this.userNameMessage = message;
        }
        if (registerDate) {
          this.isValidRegisterDate = false;
          this.registerDateMessage = registerDate;
        }
        if (userName) {
          this.isValidUsername = false;
          this.userNameMessage = userName;
        }
      }
    },

    validate() {
      this.isRetypePassword = this.password == this.retypePassword;
    }
  }
};
</script>
<style lang="scss" scoped>
.user-type-checkbox {
  margin-left: 6px;
}

#succes-img {
  width: 40px;
  margin-top: -8px;
}

#succes-lable {
  display: inline;
}
</style>
