import { db, auth } from "@/services/firebase";
import { userflow } from "./userflow";

import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";

export const adminflow = defineStore("adminflow", {
  state: () => ({
    users: [],
  }),

  getters: {
    getUsers: (state) => state.users,
  },

  actions: {
    async initUsers() {
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
  },
});
