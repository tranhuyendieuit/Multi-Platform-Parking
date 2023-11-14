<template>
  <div class="mx-3 mt-4 border-radius-xl position-relative" :style="{
    backgroundColor: '#2dce89',
    backgroundSize: 'cover'
  }">
    <main class="mt-1 main-content border-radius-lg">
      <div class="section min-vh-85 position-relative transform-scale-0 transform-scale-md-7 text-center">
        <div class="d-flex justify-content-center infor-lable">
          <h1>There are <span class="text-danger">{{occupation}}/{{capacity}}</span> cars parked</h1>
        </div>
        <img :style="{ width: '800px' }" :src="`data:image/png;base64, ${qrCode}`" />
      </div>
    </main>
  </div>
  <app-footer class="py-3 bg-white border-radius-lg" />
</template>

<script>
import AppFooter from "@/examples/Footer.vue";
import RepositoryFactory from '@/repository/RepositoryFactory';
import { database, ref, onValue } from '@/firebase/firebase';
// import SockJS from "sockjs-client";
// import Stomp from "webstomp-client";
const QRCodeRepository = RepositoryFactory.get('qr_code');
const ParkingRepository = RepositoryFactory.get('parking');

const body = document.getElementsByTagName("body")[0];

export default {
  name: "qr-code",
  components: {
    AppFooter,
  },
  data() {
    return {
      qrCode: '',
      userId: '',
      capacity: 0,
      occupation: 0,
      messages: [],
    }
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      await this.getQRCode();
      await this.getInfo();
    },

    async getInfo() {
      const { data } = await ParkingRepository.get('capacity-information');
      if (data.status == 200) {
        const dataResponse = data.data;
        this.occupation = dataResponse.occupation;
        this.capacity = dataResponse.capacity;
      }
    },

    async getQRCode() {
      const { data } = await QRCodeRepository.get('generate?isViewAll=true');
      if (data.status == 200) {
        const dataResponse = data.data;
        this.qrCode = dataResponse.qr_code;
        this.userId = dataResponse.user_id;
        this.getMessage();
      }
    },

    subOccupation() {
      if (this.occupation > 0) {
        this.occupation--;
      } 
    },

    addOccupation() {
      this.occupation++;
    },

    getMessage() {
      onValue(ref(database, `checking-${this.userId}`),
        datas => {
          this.messages = []
          datas.forEach(data => {
              this.messages.push(data.val())
          });
          if (this.messages.length > 0) {
            const message = this.messages[this.messages.length - 1];
            if (message.type == 'CHECK_IN') {
                    this.addOccupation()
                    this.$toast.show(message.data, {
                        type: 'success',
                        position: 'bottom',
                        dismissible: true
                    });
                } else if (message.type == 'CHECK_OUT') {
                    this.subOccupation()
                    this.$toast.show(message.data, {
                        type: 'error',
                        position: 'bottom',
                        dismissible: true
                    });
                }
          }
        }
      )
    }
  },

  beforeMount() {
    this.$store.state.layout = "vr";
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.add("virtual-reality");
    this.$store.state.isTransparent = "bg-white";
  },

  beforeUnmount() {
    this.$store.state.layout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.remove("virtual-reality");

    if (this.$store.state.isPinned === false) {
      const sidenav_show = document.querySelector(".g-sidenav-show");
      sidenav_show.classList.remove("g-sidenav-hidden");
      sidenav_show.classList.add("g-sidenav-pinned");
      this.$store.state.isPinned = true;
    }
    this.$store.state.isTransparent = "bg-transparent";
  },

  computed: {
    isTransparent() {
      return this.$store.state.isTransparent;
    },
  },
};
</script>
<style lang="scss" scoped>
.infor-lable {
  h1 {
    width: 800px;
    border-radius: 12px;
    background-color: white;
  }
}
</style>
