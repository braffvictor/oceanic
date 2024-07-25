// firebase services
import { db, str, auth } from "@/services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

//router
import router from "@/router";

import { defineStore } from "pinia";

// composables
import { getDate } from "@/composables/getDate";

const { getCurrentTimeAndDate } = getDate();

//stores
import { userflow } from "./userflow";
import { collection, doc, setDoc } from "firebase/firestore";

export const authentication = defineStore("authentication", {
  state: () => ({
    user: null,
    loading: {
      register: false,
      login: false,
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async registerUser(payload) {
      this.loading.register = true;
      const userflowing = userflow();
      const colref = collection(db, "users");

      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
        .then(async (cred) => {
          const currentUser = doc(colref, cred.user.uid);

          await setDoc(currentUser, {
            userID: cred.user.uid,

            // personal info
            fullName: payload.fullName,
            email: payload.email,
            password: payload.password,
            block: false,

            // wallet
            walletAddress: generateRandomEthereumAddress(),
            wallet: {
              balance: 0,
            },

            //extras
            role: "user",
            paidGas: false,
            active: false,

            joinDate: getCurrentTimeAndDate(),
          }).catch((error) => {
            this.loading.register = false;
            userflowing.initAlert({
              message: error.code,
              is: true,
              type: "error",
              close: false,
              timer: 5000,
            });
          });

          userflowing.initAlert({
            message: "Successfully Registered",
            is: true,
            type: "success",
            close: false,
            timer: 5000,
          });
          router
            .push("/dashboard/home")
            .then(() => {
              console.log("router has changed");
            })
            .catch((error) => {
              console.log(error.message);
            });

          this.loading.register = false;
        })
        .catch((error) => {
          this.loading.register = false;
          userflowing.initAlert({
            message: error.code,
            is: true,
            type: "error",
            close: false,
            timer: 5000,
          });
        });
    },
  },
});

function generateRandomEthereumAddress() {
  const hexChars = "0123456789abcdef";
  let address = "0x";

  for (let i = 0; i < 40; i++) {
    address += hexChars[Math.floor(Math.random() * hexChars.length)];
  }

  return address;
}
