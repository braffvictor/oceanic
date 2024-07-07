<template>
  <div class="bg-slate-50 dark:bg-slate-900 px-5 md:px-7 transit">
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
          v-if="nftApiCollection && nftApiCollection.length > 0"
        >
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(nft, n) in nftApiCollection"
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
                {{ nft.stats.floor_price }}{{ nft.stats.floor_price_symbol }}
              </p>
            </td>
            <td class="font-bold px-4 text-slate-900 dark:text-slate-100">
              {{
                nft.stats.total_volume
                  ? nft.stats.total_volume.toString().slice(0, 7)
                  : "0"
              }}
            </td>
            <td class="font-bold px-4 text-slate-900 dark:text-slate-100">
              {{
                nft.stats.total_minted
                  ? nft.stats.total_minted.toString().slice(0, 7)
                  : "0"
              }}
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              {{
                nft.stats.total_sales
                  ? nft.stats.total_sales.toString().slice(0, 7)
                  : "0"
              }}
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
import DDropDown from "@/components/utils/DDropDown.vue";
import { computed, onMounted, ref } from "vue";

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
    `https://api.blockspan.com/v1/exchanges/collections?chain=${chain}&exchange=opensea&page_size=100`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // console.log(response)
      nftApiCollection.value = response.results;
      console.log(nftApiCollection.value[0]);
    })
    .catch((err) => console.error(err));
};
onMounted(() => {
  getNftCollection("eth-main");
  window.scrollTo(0, 0);
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
