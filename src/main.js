import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import { createHead } from "@vueuse/head";

const head = createHead();

createApp(App).use(head).use(router).mount("#app");
