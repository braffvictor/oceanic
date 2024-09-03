import { db, auth } from "@/services/firebase";
import { userflow } from "./userflow";

import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";

export const adminflow = defineStore("adminflow", {
  state: () => ({
    adminRoutes: "Admin Dashboard",

    users: [],
    nfts: [],
    deposits: [],
    withdraws: [],
    wallets: [],
    notifications: [],
  }),

  getters: {
    getUsers: (state) => state.users,
    getNfts: (state) => state.nfts,
    getDeposits: (state) => state.deposits,
    getWithdraws: (state) => state.withdraws,
    getWallets: (state) => state.wallets,
    getNotifications: (state) => state.notifications,
  },

  actions: {
    async initAllUsers() {
      const userflowing = userflow();
      const colref = collection(db, "users");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.users = sorting;
            console.log(this.users);
          } else {
            this.users = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },

    async initAllNfts() {
      const userflowing = userflow();
      const colref = collection(db, "nfts");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.nfts = sorting;
            console.log(this.nfts);
          } else {
            this.nfts = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },

    async initAllDeposits() {
      const userflowing = userflow();
      const colref = collection(db, "deposits");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.deposits = sorting;
            console.log(this.deposits);
          } else {
            this.deposits = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },

    async initAllWithdraws() {
      const userflowing = userflow();
      const colref = collection(db, "withdraws");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.withdraws = sorting;
            console.log(this.withdraws);
          } else {
            this.withdraws = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },

    async initAllWallet() {
      const userflowing = userflow();
      const colref = collection(db, "wallets");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.wallets = sorting;
            console.log(this.wallets);
          } else {
            this.wallets = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },

    async initAllNotifications() {
      const userflowing = userflow();
      const colref = collection(db, "notifications");

      let arr = [];
      let sorting;
      await getDocs(colref)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());
              sorting = arr.sort((a, b) => {
                const dateA = new Date(a.formattedDate);
                const dateB = new Date(b.formattedDate);

                return dateB - dateA;
              });
            });
            this.notifications = sorting;
            console.log(this.notifications);
          } else {
            this.notifications = [];
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
          });
        });
    },
  },
});
