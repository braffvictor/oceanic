<template>
  <section
    class="h-auto min-h-96 bg-white dark:bg-slate-900 pt-5 w-full md:px-8 mt-28 md:mt-0 px-4 transit"
  >
    <div class="flex items-center gap-x-5">
      <p class="dark:text-slate-100 inline">NFTs Collection</p>

      <!-- drop down menu component -->
      <d-drop-down :title="select" :children="collectionChains" />
    </div>

    <div class="flex gap-4 overflow-auto">
      <table
        class="w-6/12 border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b p-3">#</th>
            <th class="border-b text-left">Collection</th>
            <th class="border-b">Floor Price</th>
            <th class="border-b">Volume</th>
          </tr>
        </thead>
        <tbody
          class="rounded-2xl"
          v-if="userflowing.nfts && userflowing.nfts.length > 0"
        >
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in userflowing.nfts.slice(0, 5)"
            @click="$router.push(`/collection/${nft.key}`)"
            :key="nft.contracts[0].contract_address"
          >
            <td class="p-4 rounded-l-xl">{{ n + 1 }}</td>
            <td class="py-4">
              <div class="flex items-center justify-start gap-x-3">
                <img
                  class="block object-contain max-w-16 rounded-xl"
                  :src="nft.image_url"
                  alt=""
                />
                <p class="font-bold text-slate-900 dark:text-slate-100 flex">
                  {{ nft.name }}
                  <img
                    src="@/assets/verified.svg"
                    alt="tick"
                    class="max-w-5 block pl-1"
                  />
                </p>
              </div>
            </td>
            <td>
              <p class="font-bold text-slate-900 px-3 dark:text-slate-100">
                {{ nft.stats.floor_price.slice(0, 5)
                }}{{ nft.stats.floor_price_symbol }}
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{ (Number(nft && nft.stats.floor_price) * 6000).toFixed(0) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            class="text-center cursor-pointer transit"
            v-for="n in 5"
            :key="n"
          >
            <td class="p-4 rounded-l-xl">
              <div class="">
                {{ n }}
              </div>
            </td>
            <td class="py-4 animate-pulse">
              <div class="flex items-center justify-start gap-x-3">
                <div
                  class="w-16 min-w-16 max-w-16 rounded-xl h-14 bg-slate-200 transit dark:bg-slate-700"
                ></div>
                <p
                  class="w-28 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl"
                ></p>
              </div>
            </td>
            <td class="animate-pulse">
              <p
                class="w-20 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl mx-4"
              ></p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100 animate-pulse"
            >
              <p
                class="w-20 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl"
              ></p>
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="w-6/12 border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b p-3">#</th>
            <th class="border-b text-left">Collection</th>
            <th class="border-b">Floor Price</th>
            <th class="border-b">Volume</th>
          </tr>
        </thead>
        <tbody class="rounded-2xl" v-if="userflowing.nfts.length > 0">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in userflowing.nfts.slice(5, 10)"
            @click="$router.push(`/collection/${nft.key}`)"
            :key="nft.contracts[0].contract_address"
          >
            <td class="p-4 rounded-l-xl">{{ n + 6 }}</td>
            <td class="py-4">
              <div class="flex items-center justify-start gap-x-3">
                <img
                  class="block object-contain max-w-16 rounded-xl"
                  :src="nft.large_image_url"
                  alt=""
                />
                <p class="font-bold text-slate-900 dark:text-slate-100 flex">
                  {{ nft.name.slice(0, 7) }}
                  <img
                    src="@/assets/verified.svg"
                    alt="tick"
                    class="max-w-5 block pl-1"
                  />
                </p>
              </div>
            </td>
            <td>
              <p class="font-bold text-slate-900 px-3 dark:text-slate-100">
                {{ nft.stats.floor_price.slice(0, 5)
                }}{{ nft.stats.floor_price_symbol }}
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{ (Number(nft && nft.stats.floor_price) * 6000).toFixed(0) }}
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr
            class="text-center cursor-pointer transit"
            v-for="n in 5"
            :key="n"
          >
            <td class="p-4 rounded-l-xl">
              <div class="">
                {{ n + 5 }}
              </div>
            </td>
            <td class="py-4 animate-pulse">
              <div class="flex items-center justify-start gap-x-3">
                <div
                  class="w-16 min-w-16 max-w-16 rounded-xl h-14 bg-slate-200 transit dark:bg-slate-700"
                ></div>
                <p
                  class="w-28 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl"
                ></p>
              </div>
            </td>
            <td class="animate-pulse">
              <p
                class="w-20 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl mx-4"
              ></p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100 animate-pulse"
            >
              <p
                class="w-20 bg-slate-200 transit dark:bg-slate-700 h-6 rounded-xl"
              ></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

import { computed, onMounted, ref } from "vue";
import DDropDown from "../utils/DDropDown.vue";

const nftApiCollection = ref([]);
const userflowing = userflow();

const select = ref("Blockchain");

onMounted(() => {
  // getNftCollection("eth-main");
});

const collectionChains = computed(() => {
  return [
    {
      name: "eth-main",
      action: () => {
        userflowing.initAllNfts("eth-main");
        select.value = "eth-main";
      },
    },
    {
      name: "arbitrum-main",
      action: () => {
        userflowing.initAllNfts("arbitrum-main");
        select.value = "arbitrum-main";
      },
    },
    {
      name: "optimism-main",
      action: () => {
        userflowing.initAllNfts("optimism-main");
        select.value = "optimism-main";
      },
    },
    {
      name: "poly-main",
      action: () => {
        userflowing.initAllNfts("poly-main");
        select.value = "poly-main";
      },
    },
  ];
});
</script>

<style></style>
