<template>
  <div class="select-none animate-pulse opacity-90">
    <div
      :class="cardSize"
      class="rounded-2xl group shadow-lg relative transit bg-slate-200 active:bg-slate-200 dark:active:bg-slate-700 dark:bg-slate-800 overflow-hidden transit cursor-pointer"
    >
      <div
        class="min-h-36 max-h-36 w-full overflow-hidden transit bg-slate-100 dark:bg-slate-700"
      >
        <!-- <img
          :src="nft && nft.image_url"
          alt=""
          class="object-fit group-hover:scale-110 transit pointer-events-none"
        /> -->
      </div>
      <div class="px-3 mt-3"></div>
    </div>
  </div>
</template>

<script setup>
import { userflow } from "@/stores/userflow";

const props = defineProps({
  cardSize: {
    type: String,
    default: "min-w-56 min-h-72 max-w-56 max-h-72",
  },
});

// let userflowCartList = userflow().cartList;
const userflowing = userflow();
</script>

<style>
.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
