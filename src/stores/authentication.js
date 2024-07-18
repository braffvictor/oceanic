import router from "@/router";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthentication = defineStore("authentication", {
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
    changeUser() {
      console.log("User Changing");
    },
  },
});

export const userAuth = defineStore("auth", () => {
  const user = ref("registration expression");

  return { user };
});
