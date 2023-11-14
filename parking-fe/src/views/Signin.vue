<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your user and password to sign in</p>
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
                    <argon-switch id="rememberMe">Remember me</argon-switch>
                    <div class="text-center">
                      <parking-button class="mt-4" variant="gradient" color="success" fullWidth size="lg"
                        @click="(event) => signIn(event)">Sign in</parking-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a href="/signup" class="text-success text-gradient font-weight-bold">Sign up</a>
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
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ParkingButton from "@/components/ParkingButton.vue";
import RepositoryFactory from '@/repository/RepositoryFactory';
import StorageService from '@/storage/StorageService';
const SignInRepository = RepositoryFactory.get('user')
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ParkingInput,
    ArgonSwitch,
    ParkingButton,
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
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async signIn(event) {
      if (event) {
        event.preventDefault()
      }

      const { data } = await SignInRepository.post({
        "user_name": this.username,
        "password": this.password
      }, 'sign-in');
      if (data.status == 200) {
        StorageService.storageToken(data.data);
        window.location.href = '/manage';
      }
    }
  }
};
</script>
