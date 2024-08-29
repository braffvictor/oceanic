<template>
  <main class="min-h-screen">
    <div class="md:w-10/12 mx-auto">
      <DDashbar>
        <div class="w-full flex justify-between items-center">
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
          <p class="text-center w-full font-semibold">Transactions</p>
        </div>
      </DDashbar>

      <section class="px-3">
        <!-- you'll do something about the text and data prop in the balanceCard comp -->
        <div
          class="pb-4 bg-slate-50 dark:bg-slate-900 sticky top-16 z-20 transit"
        >
          <BalanceCard text="Last Transaction:" data="31 April 2023" />
        </div>

        <p class="mt-5">Transactions</p>
        <section v-if="loading">
          <main v-for="n in 5" :key="n" class="mt-1 transit">
            <div
              class="flex rounded-2xl p-4 md:p-5 justify-start items-center md:items-center gap-x-3 mb-1 bg-slate-100 dark:bg-slate-800 transit"
            >
              <div
                class="rounded-xl min-w-9 md:min-w-10 md:max-w-10 select-none transit cursor-pointer md:rounded-2xl transit bg-transparent"
              >
                <img
                  :src="n % 2 == 0 ? debit : credit"
                  alt=""
                  class="min-w-9 md:min-w-10 md:max-w-10 max-w-8"
                />
              </div>
              <div class="font-light text-sm md:text-[16px] select-none w-full">
                Your Deposit of 2.3ETH Has Been Approved
                <p class="text-xs opacity-65">02/09/2024</p>
              </div>
              <div
                class="text-sm md:text-[16px] select-none font-semibold md:font-light text-yellow-500"
              >
                Pending
                <p
                  class="text-sm opacity-100"
                  :class="
                    n % 2 == 0
                      ? 'text-red-400 dark:text-red-500'
                      : 'text-green-500'
                  "
                >
                  2.45ETH
                </p>
              </div>
            </div>
            <!-- divider -->
            <div class="mx-auto text-center flex justify-center">
              <div
                class="border-b w-full opacity-20 mx-4"
                v-if="n != 5"
                :class="
                  theme == 'light' || theme == null
                    ? 'whiteT border-b-slate-500'
                    : 'darkT border-b-slate-100'
                "
              ></div>
            </div>
          </main>
        </section>

        <section v-if="!loading">
          <main v-for="n in 5" :key="n" class="mt-1 transit">
            <div
              class="animate-pulse flex rounded-2xl p-4 md:p-5 justify-start items-center md:items-center gap-x-3 mb-1 bg-slate-100 dark:bg-slate-800 transit"
            >
              <div
                class="rounded-full bg-gray-300 dark:bg-gray-500 min-w-10 md:min-w-12 md:max-w-16 md:h-12 h-10 select-none transit"
              ></div>
              <div class="w-full">
                <p
                  class="w-32 md:w-8/12 h-5 rounded-xl bg-gray-300 dark:bg-gray-500"
                ></p>
                <p
                  class="opacity-65 h-3 w-24 rounded-xl bg-gray-300 dark:bg-gray-500 mt-3"
                ></p>
              </div>
              <div
                class="text-sm md:text-[16px] select-none font-semibold md:font-light text-yellow-500"
              >
                <p class="w-20 h-5 rounded-xl bg-gray-300 dark:bg-gray-500"></p>
                <p
                  class="opacity-65 h-3 w-20 rounded-xl bg-gray-300 dark:bg-gray-500 mt-3"
                ></p>
              </div>
            </div>
            <!-- divider -->
            <div class="mx-auto text-center flex justify-center">
              <div
                class="border-b w-full opacity-20 mx-4"
                v-if="n != 5"
                :class="
                  theme == 'light' || theme == null
                    ? 'whiteT border-b-slate-500'
                    : 'darkT border-b-slate-100'
                "
              ></div>
            </div>
          </main>
        </section>
      </section>
    </div>
  </main>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { inject, onMounted, ref } from "vue";
import BalanceCard from "@/components/cards/balanceCard.vue";

const loading = ref(false);

onMounted(() => {
  setTimeout(() => {
    loading.value = true;
  }, 5000);

  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});

import credit from "@/assets/svg/credit.svg";
import debit from "@/assets/svg/debit.svg";

const theme = inject("theme");
</script>

<style></style>
