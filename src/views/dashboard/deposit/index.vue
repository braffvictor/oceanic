<template>
  <div class="min-h-screen transit">
    <main class="md:w-10/12 mx-auto">
      <DDashbar>
        <!-- button to go back as slot in dashbar...use in different pages -->
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
      </DDashbar>

      <!-- the balance card -->
      <!-- this text and data should be for transaction and normal address should be kept here -->
      <BalanceCard text="Last Transaction:" data="31 April 2023" />

      <section class="mt-3 text-slate-900 dark:text-slate-100">
        <p class="pl-1" @click="show = !show">Choose Crypto To Deposit In</p>

        <main>
          <section
            class="rounded-2xl border flex justify-between p-4 mt-2 hover:bg-slate-200 dark:hover:bg-slate-700 transit cursor-pointer dark:border-slate-500"
            @click="$router.push('/dashboard/deposit/ethereum')"
          >
            <div>
              <p>Ethereum</p>
              <p class="text-xs opacity-55">ERC20</p>
            </div>
            <button>
              <svg-comp
                Sclass="active:stroke-red-500 -rotate-90"
                icon="M7 10L12 15L17 10"
              />
            </button>
          </section>
        </main>

        <section class="mt-3" v-if="show">
          <div class="mx-auto text-center">
            <img
              src="@/assets/png/empty.png"
              width="170"
              alt=""
              class="mx-auto text-center"
            />
            <p class="font-light">No Wallet Address Found</p>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
// components
import BalanceCard from "@/components/cards/balanceCard.vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";

import { inject, onMounted, ref } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});

const theme = inject("theme");

const show = ref(false);
</script>

<style></style>
