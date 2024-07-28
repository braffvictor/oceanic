<template>
  <div class="h-screen">
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
  </div>
</template>

<script setup>
// components
import BalanceCard from "@/components/cards/balanceCard.vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";

import { inject, onMounted } from "vue";

onMounted(() => {
  window.scrollTo(0, 0);
});

const theme = inject("theme");
</script>

<style></style>
