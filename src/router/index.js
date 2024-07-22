import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    //for default layout and subpages
    component: () => import("@/layout/default"),
    name: "default",
    path: "/",
    children: [
      {
        path: "/",
        name: "home view",
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
        path: "/collections",
        name: "All Collection",
        component: () => import("../views/allCollection.vue"),
      },
      {
        path: "/Activities",
        name: "All Activities",
        component: () => import("../views/allActivities.vue"),
      },
      {
        path: "/learn/what-are-nfts",
        name: "What Are NFTs",
        component: () => import("../views/learn/what-are-nfts.vue"),
      },
      {
        path: "/learn/how-to-create-nfts",
        name: "How To Create NFTs",
        component: () => import("../views/learn/how-to-create-nfts.vue"),
      },
      {
        path: "/learn/what-is-a-blockchain",
        name: "What Is A Blockchain",
        component: () => import("../views/learn/what-is-a-blockchain.vue"),
      },
      {
        path: "/learn/what-is-web3",
        name: "What Is A Web3",
        component: () => import("../views/learn/what-is-web3.vue"),
      },
    ],
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/layout/dashboard"),
    children: [
      {
        path: "/dashboard/home",
        name: "home",
        component: () => import("@/views/dashboard/home.vue"),
      },
      {
        path: "/dashboard/deposit",
        name: "deposit",
        component: () => import("@/views/dashboard/deposit.vue"),
      },
    ],
  },

  //for error page
  {
    path: "/:pathMatch(.*)*",
    name: "error-page",
    component: () => import("../views/error/errorPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
