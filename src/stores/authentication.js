// firebase services
import { db, str, auth } from "@/services/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

//router
import router from "@/router";

import { defineStore } from "pinia";

// composables
import { getDate } from "@/composables/getDate";

const { getCurrentTimeAndDate } = getDate();

//stores
import { userflow } from "./userflow";
import { adminflow } from "./adminflow";

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
            userName: payload.userName,
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
        .then(async (cred) => {
          await this.validateUser(cred.user.uid);
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

      await getDoc(currentUser)
        .then(async (docRef) => {
          const user = docRef.data();
          if (docRef.exists()) {
            if (!user.blocked) {
              if (user.role == "user") {
                setTimeout(() => {
                  userflowing.initAlert({
                    message: `Login Successful`,
                    is: true,
                    type: "success",
                  });
                }, 300);
                this.loading.auth = false;

                router.push("/dashboard/home");
              } else if (user.role == "admin") {
                router.push("/admin/dashboard");
                userflowing.initAlert({
                  message: `Welcome, Super Admin`,
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
        })
        .catch((err) => {
          this.loading.auth = false;
          userflowing.initAlert({
            message: err.code,
            is: true,
            type: "error",
          });
        });
    },

    async userWatch(role) {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await this.getUserData({ uid: user.uid, role: role });
        } else {
          router.push("/");
        }
      });
    },

    async getUserData({ uid, role }) {
      const userflowing = userflow();
      const adminflowing = adminflow();

      const colref = collection(db, "users");
      const currentUser = doc(colref, uid);

      onSnapshot(currentUser, (docRef) => {
        if (docRef.exists() && !docRef.data().blocked) {
          this.user = docRef.data();
          // console.log(this.user);
        } else {
          router.push("/");
          this.user = null;
        }
      });

      if (role == "admin") {
        adminflowing.initAdminApp();
      } else if (role == "user") {
        userflowing.initApp();
      }
    },

    async signOutUser() {
      const userflowing = userflow();

      signOut(auth).then(() => {
        userflowing.initAlert({
          is: true,
          message: "You Are Always Welcome Back.",
          type: "info",
          timer: 3500,
        });
        router.push("/");
        this.user = null;
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
