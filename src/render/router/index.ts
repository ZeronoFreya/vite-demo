import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("/views/Home/Index.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
