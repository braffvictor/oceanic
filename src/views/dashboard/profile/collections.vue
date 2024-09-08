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
          <p class="text-center w-full font-semibold">My Collections</p>
        </div>
      </DDashbar>

      <section class="px-3" v-if="nfts.length > 0">
        <main
          v-for="(nft, n) in getUniqueByProperty(nfts, 'collection')"
          :key="nft.id"
          class="cursor-pointer"
          @click="
            $router.push(
              `/dashboard/profile/collections/${nft.collection.trim()}`
            )
          "
        >
          <div
            class="flex rounded-xl px-3 justify-start items-center md:items-center gap-x-2 gap-y-12 my-3"
          >
            <div
              class="rounded-xl min-w-3 md:min-w-5 md:max-w-5 select-none transit cursor-pointer md:rounded-2xl transit bg-transparent"
            >
              ·
            </div>
            <div
              class="font-normal italic md:text-[16px] select-none capitalize md:font-extralight w-full"
            >
              {{ checkCollection(nft.collection) }}
              <!-- <p class="text-xs opacity-65">02/09/2024</p> -->
            </div>
            <div class="float-end text-right">
              <button>
                <svg-comp
                  Sclass="active:stroke-red-500 -rotate-90"
                  icon="M7 10L12 15L17 10"
                />
              </button>
            </div>
          </div>
          <!-- divider -->
          <div
            class="border-b w-full opacity-20"
            v-if="n + 1 != getUniqueByProperty(nfts, 'collection').length"
            :class="
              theme == 'light' || theme == null
                ? 'whiteT border-b-slate-500'
                : 'darkT border-b-slate-100'
            "
          ></div>
        </main>
      </section>

      <section v-else class="flex justify-center items-center">
        <div class="mt-10">
          <img
            src="@/assets/svg/filter.svg"
            class="mx-auto rotate-180 text-center"
            alt=""
            width="150"
          />
          <p class="font-light text-center mt-4">You Have No Collection Yet.</p>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";

//components
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, onMounted } from "vue";

import filter from "@/assets/svg/filter.svg";

const theme = inject("theme");

const userflowing = userflow();

const nfts = computed(() => {
  return userflowing.userNfts;
});

function getUniqueByProperty(arr, property) {
  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item[property])) {
      seen.add(item[property]);
      result.push(item);
    }
  }

  return result;
}

onMounted(() => {
  if (nfts.value.length == 0) userflowing.initUserNfts();
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});

function checkCollection(collection) {
  if (collection.includes("collection") || collection.includes("Collection")) {
    return collection;
  } else {
    return `${collection} Collections`;
  }
}
</script>

<style></style>
