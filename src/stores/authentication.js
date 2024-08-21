// firebase services
import { db, str, auth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//router
import router from "@/router";

import { defineStore } from "pinia";

// composables
import { getDate } from "@/composables/getDate";

const { getCurrentTimeAndDate } = getDate();

//stores
import { userflow } from "./userflow";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const authentication = defineStore("authentication", {
  state: () => ({
    user: null,
    loading: {
      auth: false,
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async registerUser(payload) {
      this.loading.auth = true;
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
            category: "users",

            // personal info
            fullName: payload.fullName,
            email: payload.email,
            password: payload.password,
            blocked: false,

            // wallet
            walletAddress: generateRandomEthereumAddress(),
            wallet: {
              balance: 0,
            },

            //extras
            role: "user",
            paidGas: false,
            active: false,
            verified: false,

            joinDate: getCurrentTimeAndDate(),
            formatDate: getCurrentTimeAndDate("format"),
          })
            .then(() => {
              userflowing.initAlert({
                message: `You've Been Successfully Registered`,
                is: true,
                type: "success",
                close: false,
                timer: 5000,
              });
            })
            .catch((error) => {
              this.loading.auth = false;
              userflowing.initAlert({
                message: error.code,
                is: true,
                type: "error",
                close: false,
                timer: 5000,
              });
            });

          //after setdoc

          //push route to dashboard
          router.push("/dashboard/home");

          this.loading.auth = false;
        })
        .catch((error) => {
          this.loading.auth = false;
          userflowing.initAlert({
            message: error.code,
            is: true,
            type: "error",
            close: false,
            timer: 5000,
          });
        });
    },

    //login user function
    async loginUser(payload) {
      const userflowing = userflow();
      this.loading.auth = true;

      await signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((cred) => {
          this.validateUser(cred.user.uid);
        })
        .catch((error) => {
          userflowing.initAlert({
            message: error.code,
            is: true,
            type: "error",
            timer: 5000,
          });
          this.loading.auth = false;
        });
    },

    async validateUser(uid) {
      const userflowing = userflow();
      const colref = collection(db, "users");

      const currentUser = doc(colref, uid);

      await getDoc(currentUser).then((docRef) => {
        const user = docRef.data();
        if (docRef.exists()) {
          if (!user.blocked) {
            if (user.role == "user") {
              router.push("/dashboard/home");
              setTimeout(() => {
                userflowing.initAlert({
                  message: `Login Successful`,
                  is: true,
                  type: "success",
                });
              }, 300);
              this.loading.auth = false;
            } else if (user.role == "admin") {
              router.push("/dashboard/home");
              userflowing.initAlert({
                message: `Welcome, Dear Super Admin`,
                is: true,
                type: "success",
              });
              this.loading.auth = false;
            }
          } else {
            userflowing.initAlert({
              message: `This Account Has Been Blocked.`,
              is: true,
              type: "error",
            });
            this.loading.auth = false;
          }
        } else {
          userflowing.initAlert({
            message: `This Account Doesn't Exist With Us, Please Register An Account With Us.`,
            is: true,
            type: "error",
          });
          this.loading.auth = false;
        }
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
