<template>
  <div class="bg-slate-50 dark:bg-slate-900 px-5 md:px-7 transit pb-7">
    <p
      class="text-2xl md:text-4xl py-5 md:py-8 font-bold text-slate-900 dark:text-slate-100"
    >
      Collection stats
    </p>

    <div class="flex items-center gap-x-5">
      <p class="dark:text-slate-100 inline">All Collection</p>

      <!-- drop down menu component -->
      <DDropDown :title="select" :children="collectionChains" />
    </div>

    <div class="overflow-auto min-h-screen">
      <table
        class="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b p-3">#</th>
            <th class="border-b text-left">Collection</th>
            <th class="border-b">Floor Price</th>
            <th class="border-b">Volume</th>
            <th class="border-b">Minted</th>
            <th class="border-b">Sales</th>
          </tr>
        </thead>
        <tbody
          class="rounded-2xl"
          v-if="userflowing.nfts && userflowing.nfts.length > 0"
        >
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in userflowing.nfts"
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
                <p
                  class="font-bold text-slate-900 text-left dark:text-slate-100 flex"
                >
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
            <td class="font-bold px-4 text-slate-900 dark:text-slate-100">
              {{ (Number(nft && nft.stats.floor_price) * 6000).toFixed(0) }}
            </td>
            <td class="font-bold px-4 text-slate-900 dark:text-slate-100">
              {{ (Number(nft && nft.stats.floor_price) * 3100).toFixed(0) }}
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{ (Number(nft && nft.stats.floor_price) * 2700).toFixed(0) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="font-bold">
            <td class="columns-4 row-span-4 w-full">
              <p>Loading Collection, Please Hold...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

import DDropDown from "@/components/utils/DDropDown.vue";
import { computed, onMounted, ref } from "vue";

const userflowing = userflow();

const select = ref("Blockchain");

onMounted(() => {
  // getNftCollection("eth-main");
  window.scrollTo(0, 0);
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
