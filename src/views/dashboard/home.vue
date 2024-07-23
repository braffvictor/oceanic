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
      <div class="mx-auto">
        <!-- the balance card -->
        <main
          class="h-48 md:h-60 mx-auto rounded-3xl w-full md:w-full !bg-green-400 dark:!bg-green-500 p-5 md:p-6 relative"
          :style="`background: url(${waving[rando]}); background-position: center; background-size : 100%; background-repeat: no-repeat`"
        >
          <section class="flex justify-between items-center">
            <div>
              <p class="font-semibold md:text-lg text-sm opacity-50">
                Current Balance
              </p>
              <p class="font-bold md:text-4xl text-3xl">3.56ETH</p>
            </div>

            <div>
              <SvgComp
                icon="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.814-7.581a1 1 0 0 0-1.628 0l-5 7a1 1 0 0 0 0 1.162l5 7a1 1 0 0 0 1.628 0l5-7a1 1 0 0 0 0-1.162l-5-7zM12 12.923 9.693 12 12 11.077l2.307.923-2.307.923zm.371 2.005 1.832-.732L12 17.279l-2.203-3.083 1.832.732a1 1 0 0 0 .742 0zM12 6.72 9.797 9.804l1.832-.732a1 1 0 0 1 .742 0l1.832.732L12 6.72z"
                Sclass="min-w-[41px]"
                class="min-w-12"
              />
            </div>
          </section>

          <section class="bottom-0 absolute mb-4 text-center mx-auto">
            <!-- <p>Last Transaction: 12 April 2023</p> -->
            <p class="font-thin text-sm text-center mx-auto">
              ETH Address:
              <span class="font-semibold">0xq3r42.....fds4fef</span>
            </p>
          </section>
        </main>
      </div>
    </section>

    <!-- Shortcuts -->
    <section class="my-8">
      <!-- <p class="font-semibold text-center text-lg md:text-xl">Shortcuts</p> -->
      <div class="flex flex-wrap justify-center items-center mt-2 gap-2">
        <div
          class="rounded-xl h-20 w-24 md:w-40 md:rounded-2xl flex transit items-center justify-center bg-slate-100 dark:bg-slate-800"
          v-for="n in 3"
          :key="n"
        >
          <div class="flex flex-col justify-center items-center !p-2 gap-2">
            <svg-comp
              icon="M20,14 C20.8284,14 21.5,14.6716 21.5,15.5 C21.5,16.2796706 20.9050879,16.9204457 20.1444558,16.9931332 L20,17 L7.62132,17 L9.06066,18.4393 C9.64645,19.0251 9.64645,19.9749 9.06066,20.5607 C8.51148188,21.1097938 7.64242582,21.1441121 7.05326295,20.6636551 L6.93934,20.5607 L3.11005,16.7314 C2.13569833,15.757 2.77030114,14.1140984 4.10128528,14.0056543 L4.24142,14 L20,14 Z M14.9393,3.4393425 C15.4884875,2.89016438 16.3575969,2.85584074 16.9467746,3.3363716 L17.0607,3.4393425 L20.8899,7.2686325 C21.8643,8.24298417 21.2296801,9.88590046 19.8987309,9.9943456 L19.7586,10 L4,10 C3.17157,10 2.5,9.3284325 2.5,8.5 C2.5,7.72030353 3.09488554,7.07955128 3.85553954,7.00686657 L4,7 L16.3787,7 L14.9393,5.5606625 C14.3536,4.9748725 14.3536,4.0251325 14.9393,3.4393425 Z"
              class="min-w-6"
              Sclass="min-w-6"
            />
            <p class="text-xs">Mint</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-5">
      <p class="text-semibold">Hot Collection🔥</p>

      <section class="mt-3" v-if="collections.length > 5">
        <main
          class="flex items-center cursor-pointer justify-between gap-y-5 md:justify-start gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-xl transit group overflow-auto min-h-24"
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
                class="max-w-5 inline pl-1"
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
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

import wave1 from "@/assets/wave1.png";
import wave2 from "@/assets/wave2.png";
import wave4 from "@/assets/wave4.png";
import wave5 from "@/assets/wave5.png";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, ref } from "vue";

const waving = ref([wave1, wave2, wave4, wave5]);
const rando = Math.round(Math.random() * 3);

const userflowing = userflow();
const theme = inject("theme");

const collections = computed(() => {
  return userflowing.getNfts;
});
</script>

<style></style>
