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
          class="flex rounded-xl p-3 justify-start items-start md:items-center"
        >
          <div
            class="rounded-xl min-w-12 select-none transit cursor-pointer md:rounded-2xl transit bg-transparent"
          >
            <img :src="random" width="60" alt="" />
          </div>
          <div class="font-light text-sm md:text-[16px] select-none">
            Lorem ipsum dolor sit, Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Sit, expedita.
          </div>
        </div>
        <!-- divider -->
        <div
          class="border-b w-full opacity-20"
          v-if="n != 3"
          :class="
            theme == 'light' || theme == null
              ? 'whiteT border-b-slate-900'
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
import { inject } from "vue";

const theme = inject("theme");
</script>

<style></style>
