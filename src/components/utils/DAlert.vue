<template>
  <main
    class="pb-6 fixed top-7 left-0 md:top-10 z-40 md:right-0 md:left-2/3"
    @click="numIncrease"
  >
    <div
      class="mx-5 transit border-2 dark:text-slate-100 border-white rounded-2xl bg-gradient-to-b dark:from-0% from-10% dark:border-slate-800 p-5 flex items-center justify-between gap-x-3 to-slate-50 dark:to-slate-900"
      :class="alertColors[num].gradient"
    >
      <button
        class="rounded-full border-2 transit border-white dark:border-slate-800 bg-slate-100 min-w-11 dark:bg-slate-900 shadow-md overflow-hidden"
        :class="alertColors[num].shadow"
      >
        <img :src="alertColors[num].img" alt="" class="min-w-10 p-1" />
      </button>
      <p class="text-sm md:text-md w-full text-left">
        You Have Added tune#425 To Your Cart List
      </p>
      <button>
        <svg-comp
          Sclass="active:stroke-red-500"
          icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
        />
      </button>
    </div>
  </main>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import { reactive, ref } from "vue";

import info from "@/assets/svg/info.svg";
import warning from "@/assets/svg/warning.svg";
import check from "@/assets/svg/check.svg";

let num = ref(0);

// const alertColors = reactive({
//   error: {
//     gradient: "from-red-200 dark:from-red-500 ",
//     shadow: "dark:shadow-red-500 shadow-red-200",
//     img: "warning.svg",
//   },
//   success: {
//     gradient: "from-green-200 dark:from-green-500",
//     shadow: "dark:shadow-green-500 shadow-green-200",
//     img: "check.svg",
//   },
//   info: {
//     gradient: "from-blue-200 dark:from-blue-500",
//     shadow: "dark:shadow-blue-500 shadow-blue-200",
//     img: "info.svg",
//   },
// });

const alertColors = ref([
  {
    gradient: "from-red-200 dark:from-slate-800 ",
    shadow: "dark:shadow-red-500 shadow-red-200",
    img: warning,
  },
  {
    gradient: "from-green-200 dark:from-slate-800",
    shadow: "dark:shadow-green-500 shadow-green-200",
    img: check,
  },
  {
    gradient: "from-blue-200 dark:from-slate-800",
    shadow: "dark:shadow-blue-500 shadow-blue-200",
    img: info,
  },
]);

function numIncrease() {
  num.value++;
  console.log(num.value);
  if (num.value == 3) {
    num.value = 0;
  }
}
</script>

<style></style>
