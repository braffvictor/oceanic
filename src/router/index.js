import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import NProgress from "nprogress";

import { authentication } from "@/stores/authentication";
import { userflow } from "@/stores/userflow";
import { adminflow } from "@/stores/adminflow";

import authWare from "@/middleware/auth";
import adminAuthWare from "@/middleware/adminAuth";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { computed, watch } from "vue";

const routes = [
  {
    //todo for default layout and subpages routes
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

  //todo for all dashboard routes
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/layout/dashboard"),
    meta: {
      middleware: authWare,
    },
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
        beforeEnter(to) {
          setTimeout(() => {
            const adminflowing = adminflow();
            const wallets = computed(() => adminflowing.wallets);

            let arr = [];
            wallets.value.forEach((wallet) => {
              arr.push(wallet.id);
            });

            const exists = arr.some((exist) => exist == to.params.id);

            if (!exists) {
              return {
                name: "error-page",
                params: { pathMatch: to.path.substring(1).split("/") },
                query: to.query,
                hash: to.hash,
              };
            }
          }, 1000);
        },
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
        path: "/dashboard/view-all",
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
      {
        path: "/dashboard/explore",
        name: "home explore",
        component: () => import("../views/dashboard/explore.vue"),
      },
      {
        path: "/dashboard/notification",
        name: "home notification",
        component: () => import("../views/dashboard/notification.vue"),
      },
      {
        path: "/dashboard/transactions",
        name: "home transactions",
        component: () => import("../views/dashboard/transactions.vue"),
      },
      {
        path: "/dashboard/profile/collections",
        name: "profile collections",
        component: () => import("../views/dashboard/profile/collections.vue"),
      },
      {
        path: "/dashboard/profile/items/:id",
        name: "profile items",
        component: () => import("../views/dashboard/profile/items.vue"),
        beforeEnter(to) {
          const id = to.params.id;
          const params = ["all", "bought", "uploaded"];
          const exists = params.some((exist) => exist == id);

          if (!exists) {
            return {
              name: "error-page",
              params: { pathMatch: to.path.substring(1).split("/") },
              query: to.query,
              hash: to.hash,
            };
          }
        },
      },
      {
        path: "/dashboard/profile/item/:id",
        name: "profile items view",
        component: () => import("../views/dashboard/profile/itemDetails.vue"),

        beforeEnter(to) {
          setTimeout(() => {
            const userflowing = userflow();
            const arr = [];
            const nfts = computed(() => {
              return userflowing.userNfts;
            });

            nfts.value.forEach((nft) => {
              arr.push(nft.id);
            });

            const id = to.params.id;
            const params = arr;
            const exists = params.some((exist) => exist == id);

            if (!exists) {
              return {
                name: "error-page",
                params: { pathMatch: to.path.substring(1).split("/") },
                query: to.query,
                hash: to.hash,
              };
            }
          }, 500);
        },
      },
      {
        path: "/dashboard/profile/collections/:id",
        name: "profile collections view",
        component: () =>
          import("../views/dashboard/profile/allCollectionItems.vue"),
        beforeEnter(to) {
          setTimeout(() => {
            const userflowing = userflow();
            const arr = [];
            const nfts = computed(() => {
              return userflowing.userNfts;
            });

            nfts.value.forEach((nft) => {
              arr.push(nft.collection);
            });

            const id = to.params.id;
            const params = arr;
            const exists = params.some((exist) => exist == id);

            if (!exists) {
              return {
                name: "error-page",
                params: { pathMatch: to.path.substring(1).split("/") },
                query: to.query,
                hash: to.hash,
              };
            }
          }, 500);
        },
      },
    ],
  },

  //todo for all admin routes
  {
    path: "/admin",
    name: "admin layout",
    component: () => import("@/layout/admin"),
    meta: {
      middleware: adminAuthWare,
    },
    children: [
      {
        path: "/admin/dashboard",
        name: "admin dashboard page",
        component: () => import("@/views/admin/dashboard.vue"),
      },
      {
        path: "/admin/account",
        name: "admin dashboard account page",
        component: () => import("@/views/admin/account.vue"),
      },
      {
        path: "/admin/users",
        name: "admin users page",
        component: () => import("@/views/admin/users/allusers.vue"),
      },
      {
        path: "/admin/users/:id",
        name: "admin users type",
        component: () => import("@/views/admin/users/userType.vue"),
      },
      {
        path: "/admin/edituser/:id",
        name: "admin edit users type",
        component: () => import("@/views/admin/users/edituser.vue"),
      },
      {
        path: "/admin/nfts",
        name: "admin nfts page",
        component: () => import("@/views/admin/nfts/allnfts.vue"),
      },
      {
        path: "/admin/nfts/:id",
        name: "admin nfts type",
        component: () => import("@/views/admin/nfts/nftType.vue"),
      },
      {
        path: "/admin/deposits",
        name: "admin deposits page",
        component: () => import("@/views/admin/deposits/alldeposits.vue"),
      },
      {
        path: "/admin/deposits/:id",
        name: "admin deposits type",
        component: () => import("@/views/admin/deposits/depositType.vue"),
      },
      {
        path: "/admin/user/activities/:id",
        name: "admin users deposit type",
        component: () => import("@/views/admin/users/useractivities.vue"),
        beforeEnter(to) {
          const arr = ["alldeposits", "allwithdraws", "allnfts"];

          const queryParams = arr.some((q) => q == to.query.type);

          if (!queryParams) {
            return {
              name: "error-page",
              params: { pathMatch: to.path.substring(1).split("/") },
              query: to.query,
              hash: to.hash,
            };
          }
        },
      },
      {
        path: "/admin/withdraws",
        name: "admin withdraws page",
        component: () => import("@/views/admin/withdraws/allwithdraws.vue"),
      },
      {
        path: "/admin/withdraws/:id",
        name: "admin withdraws type",
        component: () => import("@/views/admin/withdraws/withdrawType.vue"),
      },
      {
        path: "/admin/notifications",
        name: "admin notifications type",
        component: () => import("@/views/admin/notifications.vue"),
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

router.beforeEach((to, from, next) => {
  const useAuthentication = authentication();
  NProgress.settings.showSpinner = false;
  NProgress.start();
  // next();

  if (!to.meta.middleware) {
    next();
    return;
  }
  const middleware = to.meta.middleware;

  // const context = {
  //   to,
  //   from,
  //   next,
  //   store: useAuthentication,
  // };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const context = {
        to,
        from,
        next,
        user: user,
        store: useAuthentication,
      };
      middleware({
        ...context,
      });
    } else {
      router.push("/");
    }
  });
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
