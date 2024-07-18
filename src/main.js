import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import { createHead } from "@vueuse/head";
import { createPinia } from "pinia";

const head = createHead();
const pinia = createPinia();

createApp(App).use(pinia).use(head).use(router).mount("#app");
