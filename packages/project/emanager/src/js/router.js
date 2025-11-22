import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login/index.vue'
import TestA from '@/views/test/TestA.vue'
import TestB from '@/views/test/TestB.vue'
import MainWindow from "@/views/layout/index.vue";
import store from "../store/index";
import DashBoard from "@/views/layout/Dashboard.vue";
import { DASHBOARD_URL } from "./constant";

const routes = [
  {
    path: "/",
    name: "index",
    component: MainWindow,
    redirect: DASHBOARD_URL, // /layout/dashboard
    children: [{
      path: DASHBOARD_URL,
      component: DashBoard,
      name: "menu.staging",
      meta: { closable: false },
    }, {
      path: "/testA",
      component: TestA
    }, {
      path: "/testB",
      component: TestB
    }
    ]
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

router.beforeEach((to, from, next) => {
  let token = store.getters["user/token"];
  if (token) {
    if (Object.keys(store.getters["user/userInfo"]).length === 0) {
      store.dispatch("user/SetMenus").then((asyncRoutes) => {
        asyncRoutes.forEach((route) => {
          if (route.component && route.path) router.addRoute("index", route);
        });
        router.addRoute("index", {
          path: "/:pathMatch(.*)*",
          name: "未找到",
          component: () => import("@/views/layout/NotFound.vue"),
          meta: { closable: true },
        });
        next({ ...to, replace: true });
      });
    } else {
      if (to.path === "/login") next("/");
      else if (to.path.endsWith(".exe")) {
        localCall("runCommand", to.path.substring(1), "", "");
        next(false);
      } else {
        next();
        store.commit("user/setRoute", to);
      }
    }
  } else {
    if (to.path === "/login") {
      next();
      store.commit("user/setRoute", to);
    }
    else next({ path: "/login", query: { redirect: to.fullPath } });
  }
});


export default router
