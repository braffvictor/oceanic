<template>
  <main
    class="pb-6 fixed top-7 left-0 md:top-10 z-40 md:right-0 md:left-2/3 mx-0 text-center md:text-left"
    :class="
      userflowing.alert.is
        ? 'scale-100 ease-in-out duration-700 opacity-100 '
        : '-translate-y-full md:translate-x-full md:-translate-y-0 opacity-0 scale-0 ease-in-out duration-700'
    "
  >
    <div
      class="mx-5 transit border-2 dark:text-slate-100 border-white rounded-2xl bg-gradient-to-b dark:from-0% from-10% dark:border-slate-800 p-5 flex items-center justify-between gap-x-3 to-slate-50 dark:to-slate-900"
      :class="alertColors[userflowing.alert.type].gradient"
    >
      <button
        class="rounded-full border-2 transit border-white dark:border-slate-800 bg-slate-100 min-w-11 dark:bg-slate-900 shadow-md overflow-hidden"
        :class="alertColors[userflowing.alert.type].shadow"
      >
        <img
          :src="alertColors[userflowing.alert.type].img"
          alt=""
          class="min-w-10 p-1"
        />
      </button>
      <p class="text-sm md:text-md w-full text-left">
        {{ userflowing.alert.message }}
      </p>
      <button v-if="userflowing.alert.close" @click="closeAlert">
        <svg-comp
          Sclass="active:stroke-red-500"
          icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
        />
      </button>
    </div>
  </main>
</template>

<script setup>
import { userflow } from "@/stores/userflow";

import SvgComp from "@/components/svgComp.vue";
import { reactive, ref } from "vue";

import info from "@/assets/svg/info.svg";
import warning from "@/assets/svg/warning.svg";
import check from "@/assets/svg/check.svg";

const userflowing = userflow();

const alertColors = reactive({
  error: {
    gradient: "from-red-200 dark:from-slate-800 ",
    shadow: "dark:shadow-red-500 shadow-red-200",
    img: warning,
  },
  success: {
    gradient: "from-green-200 dark:from-slate-800",
    shadow: "dark:shadow-green-500 shadow-green-200",
    img: check,
  },
  info: {
    gradient: "from-blue-200 dark:from-slate-800",
    shadow: "dark:shadow-blue-500 shadow-blue-200",
    img: info,
  },
});

function closeAlert() {
  userflowing.alert.is = false;
  userflowing.initAlert(userflowing.alert);
}
</script>

<style></style>
