<template>
  <main class="min-h-screen">
    <DDashbar class="md:w-11/12 mx-auto">
      <div class="flex w-full justify-between items-center">
        <button
          @click="$router.go(-1)"
          class="rounded-full bg-slate-50 dark:bg-slate-900 active:scale-75 border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
          :class="[
            theme == 'light' || theme == null
              ? ' border-gray-200'
              : ' border-gray-600',
          ]"
        >
          <SvgComp
            Sclass="rotate-180"
            class="pb-1 pr-1"
            icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          />
        </button>
        <p class="text-center w-full font-semibold">Notifications</p>
      </div>
    </DDashbar>

    <section class="md:w-11/12 mx-auto">
      <main v-for="n in 3" :key="n">
        <div
          class="flex rounded-xl p-3 justify-start items-start md:items-center gap-x-2"
        >
          <div
            class="rounded-xl min-w-8 md:min-w-10 md:max-w-10 select-none transit cursor-pointer md:rounded-2xl transit bg-transparent"
          >
            <img
              :src="images(n)"
              alt=""
              class="min-w-8 md:min-w-10 md:max-w-10 max-w-8"
            />
          </div>
          <div
            class="font-light text-sm md:text-[16px] select-none md:font-extralight"
          >
            Your Top up Was A Success of 2.3ETH Has Been Approved. You can now
            contact support for further enquires.
            <p class="text-xs opacity-65">02/09/2024</p>
          </div>
        </div>
        <!-- divider -->
        <div
          class="border-b w-full opacity-20"
          v-if="n != 3"
          :class="
            theme == 'light' || theme == null
              ? 'whiteT border-b-slate-500'
              : 'darkT border-b-slate-100'
          "
        ></div>
      </main>
    </section>
  </main>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import vLazyImage from "v-lazy-image";
import SvgComp from "@/components/svgComp.vue";
import random from "@/assets/png/rando.png";
import { inject, onMounted } from "vue";

import info2 from "@/assets/svg/info2.svg";
import success from "@/assets/svg/success.svg";
import error from "@/assets/svg/error2.svg";

import info from "@/assets/svg/info.svg";
import warning from "@/assets/svg/warning.svg";
import check from "@/assets/svg/check.svg";

import icon2 from "@/assets/png/icon2.png";

onMounted(() => {
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});

function images(number) {
  if (number == 1) {
    return check;
  } else if (number == 2) {
    return info;
  } else if (number == 3) {
    return warning;
  }
}

const theme = inject("theme");
</script>

<style></style>
