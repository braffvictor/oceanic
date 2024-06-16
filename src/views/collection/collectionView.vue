<template>
  <div class="transit">
    <section
      class="flex items-end p-4 md:p-8 bg-[url('https://i.seadn.io/gae/WRcl2YH8E3_7884mcJ0DRN7STGqA8xZQKd-0MFmPftlxUR6i1xB9todMXRW2M6SIpXKAZ842UqKDm1UrkKG8nr7l9NjCkIw-GLQSFQ')] min-h-96 bg-no-repeat bg-center bg-cover -mt-20"
    >
      <main class="w-full">
        <div class="flex flex-col md:flex-row md:justify-between">
          <div>
            <img
              src="https://i.seadn.io/gae/_R4fuC4QGYd14-KwX2bD1wf-AWjDF2VMabfqWFJhIgiN2FnAUpnD5PLdJORrhQ8gly7KcjhQZZpuzYVPF7CDSzsqmDh97z84j2On?w=500&auto=format"
              class="rounded-xl min-w-24 max-w-24"
              alt=""
            />
            <p class="mt-3 md:mt-5 font-bold text-slate-100 text-2xl">
              Mocaverse<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
            <p class="text-gray-300">
              mocaverse<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
          </div>

          <div class="flex flex-row gap-x-3 items-end">
            <div
              v-for="n in 3"
              :key="n"
              class="text-slate-100 text-sm font-semibold md:font-bold md:text-lg"
            >
              <p>33 ETH</p>
              <p class="font-light text-xs">Total Volume</p>
            </div>
          </div>
        </div>
      </main>
    </section>

    <section class="p-4 md:p-8 bg-slate-50 dark:bg-slate-900 transit">
      <p
        class="text-slate-900 dark:text-slate-100 text-md md:text-lg transit"
        :class="detailed ? 'line-clamp-none' : 'line-clamp-2'"
        @click="detailed = !detailed"
      >
        BEANZ are a small species that sprouts from the dirt in the garden. They
        make for a great sidekick to an Azuki, although some like to kick it
        alone. They're earnestly driven by the desire to help. However, certain
        BEANZ feel a calling to pave their own path...
      </p>
      <p class="text-slate-900 dark:text-slate-100 text-md md:text-lg mt-3">
        Items <strong>15.5K</strong> · Created <strong>May 2024</strong> ·
        Category <strong>Gaming</strong> · Chain <strong>Blast</strong>
      </p>

      <!-- the button to control component -->
      <div class="flex mt-3 gap-x-4">
        <DButton
          class="!bg-gray-200 dark:!bg-gray-700 !text-slate-900 dark:!text-slate-100 font-semibold"
          >Overview</DButton
        >
        <DButton
          class="!bg-gray-200 dark:!bg-gray-700 !text-slate-900 dark:!text-slate-100 font-semibold"
          >Items</DButton
        >
        <DButton
          class="!bg-gray-200 dark:!bg-gray-700 !text-slate-900 dark:!text-slate-100 font-semibold"
          >Activity</DButton
        >
      </div>

      <!-- the items components -->
      <section>
        <div
          class="h-3 w-3 mt-5 animate-pulse rounded-full bg-green-400 dark:bg-green-500 inline-block"
        ></div>
        <span class="ml-2 text-slate-900 dark:text-slate-100"
          >Live 15,508 results</span
        >
        <!-- the search item bar -->
        <div
          class="mt-2 p-2 flex bg-gray-200 md:w-2/3 dark:text-slate-100 text-slate-900 overflow-hidden dark:bg-slate-700 dark:caret-slate-100 h-11 justify-self-start inline-block align-start rounded-2xl indent-5 has-[:focus]:ring-green-400 has-[:focus]:ring-1 outline-none transit"
        >
          <SvgComp
            icon="M10.5,4 C6.91015,4 4,6.91015 4,10.5 C4,14.0899 6.91015,17 10.5,17 C14.0899,17 17,14.0899 17,10.5 C17,6.91015 14.0899,4 10.5,4 Z M2,10.5 C2,5.80558 5.80558,2 10.5,2 C15.1944,2 19,5.80558 19,10.5 C19,12.4869 18.3183,14.3145 17.176,15.7618 L20.8284,19.4142 C21.2189,19.8047 21.2189,20.4379 20.8284,20.8284 C20.4379,21.2189 19.8047,21.2189 19.4142,20.8284 L15.7618,17.176 C14.3145,18.3183 12.4869,19 10.5,19 C5.80558,19 2,15.1944 2,10.5 Z M9.5,7 C9.5,6.44772 9.94772,6 10.5,6 C12.9853,6 15,8.01472 15,10.5 C15,11.0523 14.5523,11.5 14,11.5 C13.4477,11.5 13,11.0523 13,10.5 C13,9.11929 11.8807,8 10.5,8 C9.94772,8 9.5,7.55228 9.5,7 Z"
          />
          <input
            type="text"
            v-model="searchName"
            placeholder="Search Nft..."
            class="w-full bg-transparent outline-none ml-2"
          />
        </div>

        <div class="text-center mx-auto flex justify-center">
          <div
            class="grid grid-cols-2 justify-center items-center md:grid-cols-5 mt-7 gap-6 text-center mx-auto"
            v-if="filterCollection.length > 0"
          >
            <HomeCard
              v-for="nft in filterCollection"
              :key="nft.name"
              :nft="nft"
              :card-size="'min-w-40 min-h-64 max-w-40 max-h-64 md:min-w-56 md:min-h-72 md:max-w-56 md:max-h-72'"
            />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
import HomeCard from "@/components/cards/homeCard.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, onMounted, ref, watch } from "vue";

const detailed = ref(false);
const searchName = ref("");

onMounted(() => {
  specificCollectionNfts();
});
const collectionNfts = ref([]);
const filterCollection = ref([]);
const specificCollectionNfts = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch("https://api.opensea.io/api/v2/collection/beanzofficial/nfts", options)
    .then((response) => response.json())
    .then((response) => {
      collectionNfts.value = response.nfts;

      collectionNfts.value.forEach((nft) => {
        nft.action = "red";
        nft.stats = {
          floor_price: "0.0034",
          floor_price_symbol: "ETH",
        };
      });

      filterCollection.value = collectionNfts.value;
    })
    .catch((err) => console.error(err));

  watch(searchName, () => {
    filterCollection.value = collectionNfts.value.filter((nft) => {
      return (
        nft.name.includes(searchName.value) ||
        nft.name.toLowerCase().includes(searchName.value)
      );
    });
  });
};
</script>

<style scoped></style>
