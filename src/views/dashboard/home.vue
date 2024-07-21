<template>
  <div class="md:w-10/12 mx-auto">
    <main class="">
      <div class="flex items-center justify-between">
        <p class="text-gray-400 text-sm md:text-lg">Welcome,</p>
        <p class="text-lg">🔔</p>
      </div>
      <p
        class="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-100"
      >
        Swae David👋
      </p>
    </main>

    <section class="mt-5">
      <main class="mx-auto">
        <div
          class="h-48 md:h-60 mx-auto rounded-3xl w-full md:w-full !bg-green-400 dark:!bg-green-500 p-3 md:p-6"
          :style="`background: url(${waving[rando]}); background-position: center; background-size : 100%; background-repeat: no-repeat`"
        >
          <p class="font-bold">Current Balance</p>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import wave1 from "@/assets/wave1.png";
import wave2 from "@/assets/wave2.png";
import wave4 from "@/assets/wave4.png";
import wave5 from "@/assets/wave5.png";
import { ref } from "vue";

const waving = ref([wave1, wave2, wave4, wave5]);
const rando = Math.round(Math.random() * 3);

console.log(rando);
</script>

<style></style>
