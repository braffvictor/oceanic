<template>
  <div class="min-h-screen w-full transit">
    <main class="md:w-full mx-auto">
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

      <section class="h-auto min-h-72 w-full -mt-8 md:-mt-5">
        <main class="ml-4 md:ml-8">
          <!-- nft cards -->
          <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
            <template #cards>
              <swiper-slide
                v-for="nft in userflowing.nfts.slice(11, 98)"
                :key="nft.name"
              >
                <!-- for home nft cards -->
                <CollectionCard :nft="nft" :to="true" :action="false" />
              </swiper-slide>
            </template>
          </swiping-cards>
          <div v-else class="min-h-screen mt-10 text-center mx-auto">
            <div class="mx-auto text-center flex justify-center">
              <img
                src="@/assets/not-found.gif"
                width="200"
                class="mt-5 block"
              />
            </div>
            <p class="text-slate-900 font-semibold dark:text-slate-100 mt-4">
              Loading Collections...
            </p>
          </div>
        </main>
      </section>

      <main class="md:w-11/12 mx-auto">
        <div class="px-3 font-semibold flex justify-between items-center">
          <p>Best Seller🤩</p>

          <div
            class="float-end text-right cursor-pointer"
            @click="showSearch = !showSearch"
          >
            <DButton class="!bg-transparent !p-0">
              <svg-comp
                :Sclass="`${
                  showSearch ? 'fill-green-400 dark:!fill-green-500' : ''
                }`"
                icon="M20 20L15.8033 15.8033M18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C14.6421 18 18 14.6421 18 10.5Z"
              />
            </DButton>
          </div>
        </div>

        <DTextfield
          v-if="showSearch"
          @emitInput="(input) => (search = input)"
          label="Search Collection..."
          name="collection"
          :type="theme == 'dark' ? 'outlined' : 'filled'"
          class="px-3"
        />

        <section
          class="mt-3 px-3 min-h-96"
          v-if="
            collections.filter(
              (nft) =>
                nft.name.includes(search) ||
                nft.name.toLowerCase().includes(search) ||
                nft.key.includes(search) ||
                nft.key.toLowerCase().includes(search)
            ).length > 0
          "
        >
          <TransitionGroup name="list">
            <main
              class="flex hover:bg-slate-200 dark:hover:bg-slate-700 items-center my-3 cursor-pointer justify-between gap-y-5 md:justify-start gap-5 bg-slate-100 shadow dark:bg-slate-800 p-2 rounded-xl transit group overflow-auto min-h-24"
              v-for="collection in collections
                .slice(11, 98)
                .filter(
                  (nft) =>
                    nft.name.includes(search) ||
                    nft.name.toLowerCase().includes(search) ||
                    nft.key.includes(search) ||
                    nft.key.toLowerCase().includes(search)
                )"
              :key="collection.name"
              @click="
                $router.push(
                  `/dashboard/collection/${collection && collection.key}`
                )
              "
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
          </TransitionGroup>
        </section>

        <section v-else class="flex justify-center items-center">
          <div class="mt-10">
            <img
              src="@/assets/svg/darkfilter.svg"
              class="mx-auto rotate-180 text-center dark:hidden"
              alt=""
              width="150"
            />
            <img
              src="@/assets/svg/whitefilter.svg"
              class="mx-auto rotate-180 text-center hidden dark:block"
              alt=""
              width="150"
            />
            <p class="font-light text-center mt-4" v-if="!search">
              No Collection
            </p>
            <p class="font-light text-center mt-4" v-if="search">
              <span class="text-green-400 dark:text-green-500">{{
                search
              }}</span>
              Collection Can't Be Found.
            </p>
          </div>
        </section>
      </main>
    </main>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

//components
import DTextfield from "@/components/utils/DTextfield.vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import SwipingCards from "@/components/swipingCards.vue";
import NftCard from "@/components/cards/nftCard.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, onMounted, ref } from "vue";

onMounted(() => {
  setTimeout(() => {
    window.scrollTo({
      top: -10,
      left: 0,
      behavior: "smooth",
    });
  }, 3);
});

const search = ref("");
const showSearch = ref(false);

const userflowing = userflow();

const collections = computed(() => {
  return userflowing.nfts;
});

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

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
  width: 100%;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
  width: 100%;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  width: 100%;
  position: fixed;
}
</style>
