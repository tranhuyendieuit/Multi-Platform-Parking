<template>
  <div class="card card-profile">
    <div class="row justify-content-center">
      <img :style="{ width: '95%' }" :src="`data:image/png;base64, ${qrCode}`" />

    </div>
    <div class="text-center mb-3">
      <parking-button color="success" size="sm" class="ms-auto" @click="(event) => showQRCode(event)">Views
      </parking-button>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from '@/repository/RepositoryFactory';
import ParkingButton from "@/components/ParkingButton.vue";
const QRCodeRepository = RepositoryFactory.get('qr_code')
export default {
  name: "qr-code-card",
  data() {
    return {
      qrCode: '',
    }
  },

  components: {
    ParkingButton
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      const { data } = await QRCodeRepository.get('generate?isViewAll=false');
      if (data.status == 200) {
        this.qrCode = data.data.qr_code
      }
    },

    showQRCode() {
      let a = document.createElement('a');
      a.target = '_blank';
      a.href = '/qr-code';
      a.click();
    }
  },
};
</script>