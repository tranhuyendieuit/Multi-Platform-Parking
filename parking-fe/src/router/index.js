import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import ParkingManagement from "../views/ParkingManagement.vue";
import VehicleManagement from "../views/VehicleManagement.vue";
import Billing from "../views/Billing.vue";
import VirtualReality from "../views/VirtualReality.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import QRCode from "../views/QRCode.vue";
import Demo from "../views/Demo.vue";

const routes = [
  {
    path: "/demo",
    name: "Demo",
    component: Demo,
  },
  {
    path: "/",
    name: "/",
    redirect: localStorage.getItem("token") ? "/manage" : "/signin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/manage",
    name: "Management",
    component: ParkingManagement,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: VehicleManagement,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/qr-code",
    name: "QR Code",
    component: QRCode,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
