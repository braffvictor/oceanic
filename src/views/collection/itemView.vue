<template>
  <div class="px-4 md:px-7 bg-slate-100 dark:bg-slate-900 transit">
    <section class="">
      <main class="flex-col md:flex-row flex gap-5">
        <div
          class="border rounded-2xl overflow-hidden dark:bg-slate-800 border-gray-300 dark:border-gray-600 transit"
        >
          <p class="p-2 text-slate-900 dark:text-slate-100">
            <SvgComp
              icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
            />
          </p>
          <img :src="nftDetails && nftDetails.image_url" alt="" width="500" />
        </div>
        <div class="rounded-2xl md:w-8/12 w-full p-2">
          <p class="text-green-400 dark:text-green-500 font-normal text-lg">
            {{ nftDetails && nftDetails.collection
            }}<img
              src="@/assets/verified.svg"
              alt="tick"
              class="max-w-5 inline pl-1"
            />
          </p>
          <p
            class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 mt-2"
          >
            {{ nftDetails && nftDetails.name }}
          </p>
          <p class="mt-2 font-light text-slate-900 dark:text-slate-100">
            Owned by voberoi
          </p>

          <span class="text-slate-900 dark:text-slate-100"> 12</span>
          <span class="text-slate-900 dark:text-slate-100"> 12</span>
          <span class="text-slate-900 dark:text-slate-100"> 12</span>

          <div
            class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
          >
            <p class="text-slate-800 dark:text-slate-50 text-sm">Best offer</p>
            <p
              class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {{ nftDetails && nftDetails.stats.floor_price.slice(0, 5) }}ETH
              <span class="text-sm text-gray-400">$2,084.90</span>
            </p>
            <div class="flex gap-4 mt-3">
              <DButton class="w-full" type="outlined" :to="route.fullPath"
                >Buy Now For
                {{
                  nftDetails && nftDetails.stats.floor_price.slice(0, 5)
                }}ETH</DButton
              >
              <DButton class="w-full" :to="route.fullPath"
                >Cart {{ nftDetails && nftDetails.name }}</DButton
              >
            </div>
          </div>

          <div
            class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800 group"
          >
            <div class="flex justify-between gap-2 items-center">
              <div>
                <svg-comp
                  icon="M4,5 C4,3.34315 5.34315,2 7,2 L17,2 C18.6569,2 20,3.34315 20,5 L20,21.0284 C20,22.2485 18.6209,22.9581 17.6281,22.249 L12,18.2289 L6.37186,22.249 C5.37906,22.9581 4,22.2485 4,21.0284 L4,5 Z"
                />
              </div>
              <div class="w-full">Listing</div>
              <div class="text-right float-end shrink-0">
                <svg-comp
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  class="group-hover:rotate-90 transit"
                />
              </div>
            </div>
            <div class="mx-auto text-center hidden group-hover:block transit">
              <img
                src="https://opensea.io/static/images/empty-asks.svg"
                width="100"
                class="mx-auto text-center"
                alt=""
              />
              <p class="text-center text-slate-900 dark:text-center-100">
                No listings yet
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const activeBtn = ref("items");

const detailed = ref(false);
const image = ref("");

onMounted(() => {
  // console.log("red");
  specificCollectionDetails(route.query.key);
  specificCollectionNfts(route.query.key);
  window.scrollTo(0, 0);
});

const collectionHeader = ref(null);

// for top header display details
const specificCollectionDetails = (queryKey) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(`https://api.opensea.io/api/v2/collections/${queryKey}`, options)
    .then((response) => response.json())
    .then((response) => {
      collectionHeader.value = response;
      // console.log(collectionHeader.value);

      image.value = collectionHeader.value.image_url.slice(
        0,
        collectionHeader.value.image_url.indexOf("?")
      );
    })
    .catch((err) => console.error(err));
};

// to search for the nft contract address
const collectionNfts = ref([]);
const nftDetails = ref(null);
const specificCollectionNfts = (queryKey) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(
    `https://api.opensea.io/api/v2/collection/${queryKey}/nfts?limit=200`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      collectionNfts.value = response.nfts;

      collectionNfts.value.forEach((nft) => {
        nft.action = "red";
        nft.cart = false;
        nft.stats = {
          floor_price: (Math.random() * 0.5).toString(),
          floor_price_symbol: "ETH",
        };
      });

      nftDetails.value = collectionNfts.value.find(
        (nft) => nft.identifier == route.params.id
      );
      console.log(nftDetails.value, "is the nft");
    })
    .catch((err) => console.error(err));
};

watch(route, () => {
  specificCollectionDetails(route.query.key);
  console.log("changing route");
});
</script>

<style></style>
