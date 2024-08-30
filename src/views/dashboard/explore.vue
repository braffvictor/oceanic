<template>
  <section class="min-h-screen pb-8">
    <main class="md:w-10/12 mx-auto">
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
          <p class="text-center w-full font-semibold">Explore Items</p>
        </div>
      </DDashbar>

      <!-- the search item bar -->
      <section class="px-3">
        <div
          class="mt-2 p-2 flex mx-auto bg-gray-200 md:w-2/3 dark:text-slate-100 text-slate-900 overflow-hidden dark:bg-slate-700 dark:caret-slate-100 h-11 justify-self-start inline-block align-start rounded-2xl indent-5 has-[:focus]:ring-green-400 has-[:focus]:ring-1 outline-none transit"
        >
          <SvgComp
            icon="M10.5,4 C6.91015,4 4,6.91015 4,10.5 C4,14.0899 6.91015,17 10.5,17 C14.0899,17 17,14.0899 17,10.5 C17,6.91015 14.0899,4 10.5,4 Z M2,10.5 C2,5.80558 5.80558,2 10.5,2 C15.1944,2 19,5.80558 19,10.5 C19,12.4869 18.3183,14.3145 17.176,15.7618 L20.8284,19.4142 C21.2189,19.8047 21.2189,20.4379 20.8284,20.8284 C20.4379,21.2189 19.8047,21.2189 19.4142,20.8284 L15.7618,17.176 C14.3145,18.3183 12.4869,19 10.5,19 C5.80558,19 2,15.1944 2,10.5 Z M9.5,7 C9.5,6.44772 9.94772,6 10.5,6 C12.9853,6 15,8.01472 15,10.5 C15,11.0523 14.5523,11.5 14,11.5 C13.4477,11.5 13,11.0523 13,10.5 C13,9.11929 11.8807,8 10.5,8 C9.94772,8 9.5,7.55228 9.5,7 Z"
          />
          <input
            type="text"
            v-model="searchName"
            placeholder="Search Item..."
            class="w-full bg-transparent outline-none ml-2"
          />
        </div>
      </section>

      <div class="text-center mx-auto">
        <div
          class="grid grid-cols-2 sm:grid-cols-3 justify-around items-center md:grid-cols-4 mt-7 px-2"
          v-if="randomNfts && randomNfts.length > 0"
        >
          <nftCard
            v-for="nft in randomNfts"
            class="mx-auto text-center m-2"
            :key="nft.name"
            :nft="nft"
            :action="true"
            :explore-page="true"
            :dashboard="true"
            :card-size="'min-w-40 min-h-64 max-w-40 max-h-64 md:min-w-56 md:min-h-72 md:max-w-56 md:max-h-72'"
          />
        </div>

        <div v-else class="min-h-screen mt-10 text-center mx-auto">
          <div class="mx-auto text-center flex justify-center">
            <img src="@/assets/not-found.gif" width="200" class="mt-5 block" />
          </div>
          <p
            class="text-slate-900 font-semibold dark:text-slate-100 mt-4"
            v-if="randomNfts.length == 0 && !searchName"
          >
            Loading...
            <span class="text-green-500">{{
              searchName ? `For ${searchName}` : ""
            }}</span>
          </p>
          <div v-if="randomNfts.length == 0 && searchName">
            <span class="text-green-500"> {{ searchName }} </span> Item Not
            Found....
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup>
//store
import { userflow } from "@/stores/userflow";

//components
import nftCard from "@/components/cards/nftCard.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import DDashbar from "@/components/utils/DDashbar.vue";

import { computed, inject, onMounted, ref, watch } from "vue";
const theme = inject("theme");
const userflowing = userflow();
const searchName = ref("");

// onMounted(() => {
//   setTimeout(() => {
//     userflowing.initRandomNfts();
//   }, 1500);
// });

const randomNfts = computed(() => {
  return userflowing.getRandoms.filter((random) => {
    return (
      random &&
      random.name &&
      (random?.name.includes(searchName.value) ||
        random?.name.toLowerCase().includes(searchName.value))
    );
  });
});
</script>

<style></style>
