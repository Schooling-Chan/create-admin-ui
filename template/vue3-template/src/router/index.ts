import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/Home/index.vue"),
  },
  {
    path: "/setting",
    name: "Setting",
    component: () => import("../pages/Setting/index.vue"),
  },
  {
    path: "/wihabing",
    name: "Wihabing",
    component: () => import("../pages/Wihabing/index.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
