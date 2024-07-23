import router from "@/router";
import { defineStore } from "pinia";
import { userflow } from "./userflow";

export const authentication = defineStore("authentication", {
  state: () => ({
    user: "regex expression",
    loading: {
      register: false,
      login: false,
    },
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    registerUser(payload) {
      const userflowing = userflow();
      userflowing.initAlert({
        message: "Successfully Registered",
        timer: 4000,
        is: true,
        type: "success",
        close: false,
      });
      console.log(payload);
    },
  },
});
