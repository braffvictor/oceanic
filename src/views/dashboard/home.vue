<template>
  <div class="min-h-screen">
    <section class="md:w-10/12 mx-auto">
      <!-- for the top bar in dashboard -->
      <DDashbar />

      <section class="mt-5">
        <div class="mx-auto">
          <!-- the balance card -->
          <BalanceCard />
        </div>
      </section>

      <!-- Shortcuts -->
      <section class="my-8 select-none">
        <!-- <p class="font-semibold text-center text-lg md:text-xl">Shortcuts</p> -->
        <div
          class="flex justify-evenly md:justify-center items-center mt-2 gap-2"
        >
          <div
            class="rounded-xl h-20 w-20 active:scale-75 select-none transit md:w-60 cursor-pointer md:rounded-2xl flex transit items-center justify-center bg-slate-100 dark:bg-slate-800"
            v-for="quick in quickLinks"
            :key="quick.text"
          >
            <div class="flex flex-col justify-center items-center !p-2 gap-2">
              <img :src="quick.img" width="40" alt="" />
              <p class="text-xs bg-green-">{{ quick.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-5 select-none">
        <p class="text-semibold">Hot Collection🔥</p>

        <section class="mt-3" v-if="collections.length > 5">
          <main
            class="flex items-center border-2 border-slate-200 dark:border-slate-700 my-3 cursor-pointer justify-between gap-y-5 md:justify-start gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-xl transit group overflow-auto min-h-24"
            v-for="collection in collections.slice(0, 5)"
            :key="collection.name"
          >
            <div class="rounded-xl overflow-hidden">
              <img
                :src="collection.image_url"
                class="transit"
                alt=""
                width="200"
              />
            </div>
            <div class="w-full">
              <p
                class="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-lg"
              >
                {{
                  collection.name.length >= 25
                    ? collection.name.slice(0, 25) + "..."
                    : collection.name
                }}
              </p>
              <p
                class="font-thin text-xs opacity-50 text-slate-900 dark:text-slate-100 md:text-sm"
              >
                {{
                  collection.key.length >= 20
                    ? collection.key.slice(0, 20) + "..."
                    : collection.key
                }}
                <img
                  src="@/assets/verified.svg"
                  alt="tick"
                  class="max-w-5 inline"
                />
              </p>
            </div>

            <div class="float-end w-full text-right">
              <button>
                <svg-comp
                  Sclass="active:stroke-red-500 -rotate-90"
                  icon="M7 10L12 15L17 10"
                />
              </button>
            </div>
          </main>
        </section>

        <div v-else class="min-h-screen mt-10 text-center mx-auto">
          <div class="mx-auto text-center flex justify-center">
            <img src="@/assets/not-found.png" width="200" class="mt-5 block" />
          </div>
          <p class="text-slate-900 font-semibold dark:text-slate-100 mt-4">
            Loading Collections...
          </p>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";
//components
import BalanceCard from "@/components/cards/balanceCard.vue";
import DDashbar from "@/components/utils/DDashbar.vue";

import SvgComp from "@/components/svgComp.vue";
import upload from "@/assets/png/mint.png";
import explore from "@/assets/png/explore.png";
import minted from "@/assets/png/minted.png";
import transact from "@/assets/png/transfer.png";
import random from "@/assets/png/rando.png";

import wave1 from "@/assets/wave1.png";
import wave2 from "@/assets/wave2.png";
import wave4 from "@/assets/wave4.png";
import wave5 from "@/assets/wave5.png";
import { computed, inject, onMounted, ref, watch } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});

const waving = ref([wave1, wave2, wave4, wave5]);
const rando = Math.round(Math.random() * 3);

const userflowing = userflow();
const theme = inject("theme");

const collections = computed(() => {
  return userflowing.getNfts;
});

const quickLinks = computed(() => {
  return [
    {
      img: upload,
      text: "Upload...",
    },
    {
      img: explore,
      text: "Explore",
    },
    {
      img: random,
      text: "Random",
    },
    {
      img: transact,
      text: "Transac...",
    },
  ];
});
</script>

<style>
.fe {
  color: #22c55e;
}
</style>
