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
        component: () => import("@/views/dashboard/deposit/index.vue"),
      },
      {
        path: "/dashboard/deposit/:id",
        name: "dynamic deposit",
        component: () => import("@/views/dashboard/deposit/wallet.vue"),
      },
      {
        path: "/dashboard/withdraw",
        name: "withdraw",
        component: () => import("@/views/dashboard/withdraw/index.vue"),
      },
      {
        path: "/dashboard/withdraw/:id",
        name: "dynamic withdraw",
        component: () => import("@/views/dashboard/withdraw/request.vue"),
      },
      {
        path: "/dashboard/cartlist",
        name: "cart",
        component: () => import("@/views/dashboard/cartList.vue"),
      },
      {
        path: "/dashboard/profile",
        name: "profile",
        component: () => import("@/views/dashboard/profile/index.vue"),
      },
      {
        path: "/dashboard/upload",
        name: "home upload",
        component: () => import("@/views/dashboard/upload/index.vue"),
      },
      {
        path: "/dashboard/viewAll",
        name: "home viewall",
        component: () => import("@/views/dashboard/viewAll.vue"),
      },
      {
        path: "/dashboard/collection/:id",
        name: "home dashboard Dynamic Collection",
        component: () =>
          import("../views/dashboard/collection/DBcollectionview.vue"),
      },
      {
        path: "/dashboard/collection/item/:id",
        name: "home dashboard Dynamic item",
        component: () => import("../views/dashboard/collection/DBitemview.vue"),
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
