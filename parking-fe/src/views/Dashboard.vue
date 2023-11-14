<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-12">
            <card v-if="stats" :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail" directionReverse></card>
          </div>
          <!-- <div class="col-lg-4 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value="stats.users.value"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-4 col-md-6 col-12">
            <card
              :title="stats.clients.title"
              :value="stats.clients.value"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div> -->

        </div>
        <div class="row">
          <div class="col-lg-12 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart 
              :chartLabels="labels" 
              :datas="datas" 
              :label="'Parking'" 
              :title="'Parking Overview'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import RepositoryFactory from '@/repository/RepositoryFactory';
const ParkingRepository = RepositoryFactory.get('parking')

export default {
  name: "dashboard",
  data() {
    return {
      labels: [],
      datas: [],
      total: 0,
      stats: null,
    };
  },
  components: {
    Card,
    GradientLineChart,
  },

  created() {
    this.getData()
  },

  methods: {
    async getData() {
      const { data } = await ParkingRepository.post({
        'type': 1,
      }, 'checking-statistics');
      if (data.status == 200) {
        this.labels = data.data.label;
        this.datas = data.data.data;
        this.total = data.data.total;
        this.setCard()
      }
    },

    setCard() {
      this.stats = {
        money: {
          title: "Total parking",
          value: this.total,
          percentage: "+55%",
          iconClass: "ni ni-delivery-fast",
          detail: "since last month",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Today's Vehicle",
          value: "2,300",
          percentage: "+3%",
          iconClass: "ni ni-align-left-2",
          iconBackground: "bg-gradient-danger",
          detail: "since last week",
        },
        clients: {
          title: "Total Income",
          value: "$53,000",
          percentage: "-2%",
          iconClass: "ni ni-money-coins",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "since last quarter",
        },
      }
    }
  },
};
</script>
