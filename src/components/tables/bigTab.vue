<template>
  <section
    class="h-screen bg-white dark:bg-slate-900 pt-5 pb-32 w-full md:px-8 mt-20 px-4 transit"
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
          v-if="nftApiCollection && nftApiCollection.length > 0"
        >
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in nftApiCollection.slice(0, 5)"
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
                {{ nft.stats.floor_price }}{{ nft.stats.floor_price_symbol }}
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{ nft.stats.total_volume.toString().slice(0, 7) }}
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
        <tbody class="rounded-2xl" v-if="nftApiCollection.length > 0">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in nftApiCollection.slice(5, 10)"
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
                {{ nft.stats.floor_price }}{{ nft.stats.floor_price_symbol }}
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{ nft.stats.total_volume.toString().slice(0, 7) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import DDropDown from "../utils/DDropDown.vue";

const nftApiCollection = ref([]);

const select = ref("Blockchain");

const getNftCollection = (chain) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
    },
  };

  fetch(
    `https://api.blockspan.com/v1/exchanges/collections?chain=${chain}&exchange=opensea&page_size=25`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // console.log(response)
      nftApiCollection.value = response.results;
      console.log(nftApiCollection.value);
    })
    .catch((err) => console.error(err));
};
onMounted(() => {
  getNftCollection("eth-main");
});

const collectionChains = computed(() => {
  return [
    {
      name: "eth-main",
      action: () => {
        getNftCollection("eth-main");
        select.value = "eth-main";
      },
    },
    {
      name: "arbitrum-main",
      action: () => {
        getNftCollection("arbitrum-main");
        select.value = "arbitrum-main";
      },
    },
    {
      name: "optimism-main",
      action: () => {
        getNftCollection("optimism-main");
        select.value = "optimism-main";
      },
    },
    {
      name: "poly-main",
      action: () => {
        getNftCollection("poly-main");
        select.value = "poly-main";
      },
    },
  ];
});
</script>

<style></style>
