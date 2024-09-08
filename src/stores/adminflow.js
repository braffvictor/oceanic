import { db, auth } from "@/services/firebase";
import { userflow } from "./userflow";

import { defineStore } from "pinia";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import router from "@/router";

export const adminflow = defineStore("adminflow", {
  state: () => ({
    adminRoutes: "Admin Dashboard",

    loading: {
      wallet: false,
      balance: false,
    },

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

    getUserByUserID: (state) => (id) =>
      state.users.find((user) => user.userID == id),

    getWalletByID: (state) => (id) =>
      state.wallets.find((wallet) => wallet.id == id),
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

    async walletFN(payload) {
      this.loading.wallet = true;

      const userflowing = userflow();
      const colref = collection(db, "wallets");

      const qrCode = await userflowing.photoFN({
        path: "wallets",
        uid: payload.userID,
        photo: payload.qrCode,
      });

      payload.qrCode = await qrCode;

      await addDoc(colref, payload)
        .then((docRef) => {
          const currentUserDoc = doc(colref, docRef.id);
          updateDoc(currentUserDoc, {
            id: docRef.id,
          });

          userflowing.initAlert({
            is: true,
            message: `${payload.walletName} Wallet Successfully Added`,
            type: "info",
            close: true,
          });

          this.initAllWallets();
          this.loading.wallet = false;
          router.push("/admin/dashboard");
        })
        .catch((err) => {
          this.loading.wallet = false;
          userflowing.initAlert({
            is: true,
            message: err.message,
            type: "error",
            timer: 5000,
          });
        });
    },

    async deleteWallet(payload) {
      this.loading.wallet = true;
      const userflowing = userflow();
      const colref = collection(db, "wallets");

      const currentUserDoc = doc(colref, payload.id);

      await deleteDoc(currentUserDoc)
        .then(() => {
          userflowing.initAlert({
            is: true,
            message: `${payload.walletName} Wallet Has Been Deleted Successfully`,
            type: "info",
            close: true,
          });

          this.initAllWallets();
          this.loading.wallet = false;
        })
        .catch((err) => {
          this.loading.wallet = false;
          userflowing.initAlert({
            is: true,
            message: err.message,
            type: "error",
            timer: 5000,
          });
        });
    },

    async initAllWallets() {
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

    async dynamicUpdate(payload) {
      const userflowing = userflow();

      const colref = collection(db, payload.category);

      const currentUserDoc = doc(colref, payload.id);

      await updateDoc(currentUserDoc, payload.data)
        .then(() => {
          userflowing.initAlert({
            is: true,
            type: "success",
            message: payload.message,
            close: true,
          });

          if (payload.category == "users") {
            this.initAllUsers();
          } else if (payload.category == "deposits") {
            this.initAllDeposits();
          } else if (payload.category == "withdraws") {
            this.initAllWithdraws();
          } else if (payload.category == "nfts") {
            this.initAllNfts();
          }
        })
        .catch((error) => {
          userflowing.initAlert({
            is: true,
            type: "error",
            message: error.message,
            timer: 5000,
          });
        });
    },

    async adminControl(payload) {
      this.loading.balance = true;
      const userflowing = userflow();

      const colref = collection(db, payload.category);

      await addDoc(colref, payload)
        .then(async (docRef) => {
          const currentUserDoc = doc(colref, docRef.id);

          updateDoc(currentUserDoc, {
            id: docRef.id,
          });

          if (payload.category == "deposits") {
            //add amount
            userflowing.addition({
              amount: payload.amount,
              uid: payload.userID,
            });

            userflowing.initAlert({
              is: true,
              message: `You Have Just Deposited ${payload.amount} ETH Into ${payload.fullName} Wallet Balance`,
              type: "info",
              timer: 5000,
            });

            await userflowing.notificationFN({
              email: payload.email,
              type: "info",
              uid: payload.userID,
              open: false,
              fullName: payload.fullName,
              message: `${payload.amount} ETH Has Just Been Deposited Into Your Account, Please Contact Support For More Enquires.`,
            });

            this.initAllDeposits();
          } else if (payload.category == "withdraws") {
            //deduct amount
            await userflowing.deduction({
              amount: payload.amount,
              uid: payload.userID,
            });

            userflowing.initAlert({
              is: true,
              message: `You Have Withdrawn ${payload.amount} ETH From ${payload.fullName} Wallet Balance`,
              type: "info",
              timer: 5000,
            });

            await userflowing.notificationFN({
              email: payload.email,
              type: "info",
              uid: payload.userID,
              open: false,
              fullName: payload.fullName,
              message: `${payload.amount} ETH Has Just Been Deposited Into Your Account, Please Contact Support For More Enquires.`,
            });
            this.initAllWithdraws();
          }
          this.initAllUsers();
          router.push("/admin/users/allusers");
          this.loading.balance = false;
        })
        .catch((err) => {
          this.loading.balance = false;
          userflowing.initAlert({
            is: true,
            type: "error",
            message: err.message,
            timer: 5000,
          });
        });
    },
  },
});
