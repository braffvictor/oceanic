<template>
  <div class="min-h-screen w-full">
    <main class="md:w-11/12 mx-auto">
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
          <p class="text-center w-full font-semibold">View Collections</p>
        </div>
      </DDashbar>

      <section class="h-auto min-h-72 w-full">
        <main class="ml-4 md:mx-8">
          <!-- nft cards -->
          <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
            <template #cards>
              <swiper-slide
                v-for="nft in userflowing.nfts.slice(51, 60)"
                :key="nft.name"
              >
                <!-- for home nft cards -->
                <CollectionCard :nft="nft" :to="true" :action="false" />
              </swiper-slide>
            </template>
          </swiping-cards>
        </main>

        <CollectionCard />
      </section>
    </main>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

//components
import DDashbar from "@/components/utils/DDashbar.vue";
import SwipingCards from "@/components/swipingCards.vue";
import NftCard from "@/components/cards/nftCard.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject } from "vue";

const userflowing = userflow();

const theme = inject("theme");

const getNft = computed(() => {
  return userflowing.nfts[0];
});

console.log(getNft.value);
</script>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import CollectionCard from "@/components/cards/collectionCard.vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style></style>
