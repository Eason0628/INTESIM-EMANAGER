import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import MainWindow from "@/views/layout/index.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "index",
    component: MainWindow,
  },
  {
    path: "/login",
    component: Login,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});


export default router
