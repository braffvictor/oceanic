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
          <img
            :src="nftDetails && nftDetails.image_url"
            alt=""
            width="500"
            class="object-cover"
          />
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
          <p class="text-slate-900 mt-2 dark:text-slate-100">
            Category :
            <span class="uppercase">{{
              collectionHeader && collectionHeader.category
            }}</span>
          </p>
          <p class="mt-2 text-slate-900 dark:text-slate-100">
            Created : {{ collectionHeader && collectionHeader.created_date }}
          </p>

          <div
            class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
          >
            <p class="text-slate-800 dark:text-slate-50 text-sm">Best offer</p>
            <p
              class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100"
            >
              {{
                nftDetails && nftDetails.stats.floor_eth.toString().slice(0, 5)
              }}ETH
              <span class="text-sm text-gray-400"
                >${{
                  nftDetails &&
                  nftDetails.stats.floor_price
                    .toLocaleString()
                    .slice(
                      0,
                      (nftDetails && nftDetails.stats.floor_price)
                        .toLocaleString()
                        .indexOf(".")
                    ) + ".00"
                }}</span
              >
            </p>
            <div class="flex gap-4 mt-3">
              <d-button
                class="w-full active:!bg-slate-300 dark:active:!bg-slate-600"
                type="outlined"
                :to="route.fullPath"
                >Buy Now For
                {{
                  nftDetails &&
                  nftDetails.stats.floor_eth.toString().slice(0, 5)
                }}ETH</d-button
              >
              <d-button
                class="w-full active:!bg-slate-600 dark:active:bg-slate-600"
                :to="route.fullPath"
                @click="cartNft(nftDetails && nftDetails)"
                >Cart {{ nftDetails && nftDetails.name }}</d-button
              >
            </div>
          </div>

          <div
            class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
            @click="listing = !listing"
          >
            <div class="flex justify-between gap-2 items-center">
              <div>
                <svg-comp
                  icon="M4,5 C4,3.34315 5.34315,2 7,2 L17,2 C18.6569,2 20,3.34315 20,5 L20,21.0284 C20,22.2485 18.6209,22.9581 17.6281,22.249 L12,18.2289 L6.37186,22.249 C5.37906,22.9581 4,22.2485 4,21.0284 L4,5 Z"
                />
              </div>
              <div class="w-full text-slate-900 dark:text-slate-100">
                Listing
              </div>
              <div class="text-right float-end shrink-0">
                <svg-comp
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  class="transit"
                  :class="listing ? 'rotate-90' : null"
                />
              </div>
            </div>
            <div class="mx-auto text-center transit mt-2" v-if="listing">
              <img
                src="https://opensea.io/static/images/empty-asks.svg"
                width="100"
                class="mx-auto text-center"
                alt=""
              />
              <p class="text-center text-slate-900 dark:text-slate-100">
                No listings yet
              </p>
            </div>
          </div>
        </div>
      </main>

      <div
        class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-3 mt-2 md:mt-4 mx-2 dark:bg-slate-800"
        @click="description = !description"
      >
        <div class="flex justify-between gap-2 items-center">
          <div class="">
            <svg-comp
              icon="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
              Sclass="mt-3 mx-auto text-center"
            />
          </div>
          <div class="w-full text-slate-900 dark:text-slate-100">
            Description
          </div>
          <div class="text-right float-end shrink-0">
            <svg-comp
              icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              class="transit"
              :class="description ? 'rotate-90' : null"
            />
          </div>
        </div>
        <div class="mx-auto text-center transit mt-2" v-if="description">
          <p class="text-center text-slate-900 dark:text-slate-100">
            {{
              nftDetails && nftDetails.description
                ? nftDetails && nftDetails.description
                : collectionHeader && collectionHeader.description
            }}
          </p>
        </div>
      </div>

      <div
        class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-3 mt-4 mx-2 dark:bg-slate-800"
        @click="details = !details"
      >
        <div class="flex justify-between gap-2 items-center">
          <div class="">
            <svg-comp
              icon="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zM7 7a1 1 0 0 0 0 2h.001a1 1 0 0 0 0-2H7zm-1 5a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H7z"
              Sclass=" mx-auto text-center"
            />
          </div>
          <div class="w-full text-slate-900 dark:text-slate-100">Details</div>
          <div class="text-right float-end shrink-0">
            <svg-comp
              icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              class="transit"
              :class="details ? 'rotate-90' : null"
            />
          </div>
        </div>
        <div class="mx- text-center transit md:mx-7 mt-2" v-if="details">
          <div
            v-for="detail in detailsOfNft"
            :key="detail.text"
            class="flex justify-between text-slate-900 gap-y-2 dark:text-slate-100"
          >
            <p>{{ detail.text }}</p>
            <p
              class="font-light text-green-500"
              :class="detail.text == 'Token Standard' ? 'uppercase' : null"
            >
              {{ detail.data }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div
      class="border-gray-300 cursor-pointer dark:border-gray-600 border rounded-xl transit p-4 mx-2 mt-4 pb-6"
    >
      <p class="mx-3 text-slate-900 dark:text-slate-100">
        Collection Activities
      </p>

      <CollectionActivities
        :contract-address="contract ? contract : ''"
        v-if="loading == true"
      />
    </div>
  </div>
</template>

<script setup>
import CollectionActivities from "@/components/dynamicComps/CollectionActivities.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const listing = ref(false);
const description = ref(false);
const details = ref(false);

const image = ref("");
const contract = ref("");
const loading = ref(false);
onMounted(() => {
  // console.log("red");
  specificCollectionDetails(route.params.id);
  specificCollectionNfts(route.params.id);
  window.scrollTo(0, 0);
  setTimeout(() => {
    loading.value = true;
  }, 1000);
});

const collectionHeader = ref(null);

// for top header display details
const specificCollectionDetails = (routeParams) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(`https://api.opensea.io/api/v2/collections/${routeParams}`, options)
    .then((response) => response.json())
    .then((response) => {
      collectionHeader.value = response;
      console.log(collectionHeader.value);

      contract.value = collectionHeader.value.contracts[0].address;
      console.log(contract.value);

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
const specificCollectionNfts = (routeParams) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(
    `https://api.opensea.io/api/v2/collection/${routeParams}/nfts?limit=200`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      collectionNfts.value = response.nfts;

      collectionNfts.value.forEach((nft) => {
        nft.action = "red";
        nft.stats = {
          floor_price: (Number(nft.identifier) / 4000) * 3037.97,
          floor_eth: Number(nft.identifier) / 4000,
          floor_price_symbol: "ETH",
        };
      });

      nftDetails.value = collectionNfts.value.find(
        (nft) => nft.identifier == route.query.identifier
      );
    })
    .catch((err) => console.error(err));
};

watch(route, () => {
  specificCollectionDetails(route.params.id);
  console.log("changing route");
});

function cartNft(nftDetails) {
  const cartedNfts = JSON.parse(localStorage.getItem("watchList")) || [];

  const nft = cartedNfts.find((cart) => nftDetails.name == cart.name);

  if (nft) {
    alert("Nft already exist");
  } else {
    const newList = [nftDetails, ...cartedNfts];
    localStorage.setItem("watchList", JSON.stringify(newList));
  }
}

const detailsOfNft = computed(() => {
  return [
    {
      text: "Contract Address",
      data:
        (nftDetails.value && nftDetails.value.contract.slice(0, 5)) +
        "...." +
        (nftDetails.value &&
          nftDetails.value &&
          nftDetails.value.contract.slice(10, 15)),
    },
    {
      text: "Token ID",
      data: nftDetails.value && nftDetails.value.identifier.slice(0, 4),
    },
    {
      text: "Token Standard",
      data: nftDetails.value && nftDetails.value.token_standard,
    },
    {
      text: "Creator Earnings",
      data: "5%",
    },
  ];
});
</script>

<style></style>
