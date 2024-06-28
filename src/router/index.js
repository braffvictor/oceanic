import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    component: () => import("../layout/default.vue"),
    name: "default",
    path: "/",
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/AboutView.vue"),
      },
      {
        path: "/collection/:id",
        name: "Dynamic Collection",
        component: () => import("../views/collection/collectionView.vue"),
      },
      {
        path: "/collection/item/:id",
        name: "Dynamic Collection Item",
        component: () => import("../views/collection/itemView.vue"),
      },
      {
        path: "/allCollection",
        name: "All Collection",
        component: () => import("../views/allCollection.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
