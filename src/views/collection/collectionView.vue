<template>
  <div class="transit">
    <section
      :class="`flex items-end p-4 md:p-8 min-h-96 -mt-20 `"
      :style="`background-image : url(${
        banner && banner
      }); background-position: center; background-size : cover; background-repeat: no-repeat`"
    >
      <main class="w-full">
        <div class="flex w-full justify-between">
          <div>
            <img
              :src="image && image"
              class="rounded-xl min-w-24 max-w-24"
              alt=""
            />
            <p class="mt-3 md:mt-5 font-bold text-slate-400 text-2xl">
              {{ collectionHeader && collectionHeader.name
              }}<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
            <p class="text-gray-300 dark:text-slate-100">
              {{ route.params.id
              }}<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
          </div>

          <div class="flex flex-row gap-x-3 items-end">
            <div
              class="font-semibold text-slate-900 dark:text-slate-100 flex items-center"
            >
              <svg-comp
                icon="M9,2 C7.89543,2 7,2.89543 7,4 L7,6 L9,6 L9,4 L20,4 L20,15 L18,15 L18,17 L20,17 C21.1046,17 22,16.1046 22,15 L22,4 C22,2.89543 21.1046,2 20,2 L9,2 Z M4,7 C2.89543,7 2,7.89543 2,9 L2,20 C2,21.1046 2.89543,22 4,22 L15,22 C16.1046,22 17,21.1046 17,20 L17,9 C17,7.89543 16.1046,7 15,7 L4,7 Z"
              />
              <p>
                {{
                  (collectionHeader &&
                    collectionHeader.contracts[0].address.slice(0, 4)) +
                  "...." +
                  (collectionHeader &&
                    collectionHeader.contracts[0].address.slice(38))
                }}
              </p>
            </div>
            <!-- <div
              v-for="perk in [
                {
                  text: 'Max Ranked',
                  num: collectionHeader && collectionHeader.rarity.max_rank,
                },
                {
                  text: 'Token Score',
                  num:
                    collectionHeader && collectionHeader.rarity.tokens_scored,
                },
                {
                  text: 'Total Supply',
                  num: collectionHeader && collectionHeader.total_supply,
                },
              ]"
              :key="perk.total_supply"
              class="text-slate-100 text-sm font-semibold md:font-bold md:text-lg"
            >
              <p>{{ perk.num }}</p>
              <p class="font-light text-xs">{{ perk.text }}</p>
            </div> -->
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
        {{ collectionHeader && collectionHeader.description }}
      </p>
      <p class="text-slate-900 dark:text-slate-100 text-md md:text-lg mt-3">
        Created
        <strong>{{ collectionHeader && collectionHeader.created_date }}</strong>
        · Category
        <strong>{{ collectionHeader && collectionHeader.category }}</strong>
        · Chain
        <strong class="capitalize">
          {{ collectionHeader && collectionHeader.contracts[0].chain }}</strong
        >
        · Total Supply
        <strong class="capitalize">
          {{ collectionHeader && collectionHeader.total_supply }}</strong
        >
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
        Live

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
            placeholder="Search NFTs..."
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
import { useRoute } from "vue-router";

const route = useRoute();

const detailed = ref(false);
const banner = ref("");
const image = ref("");
const searchName = ref("");

onMounted(() => {
  specificCollectionDetails();
  specificCollectionNfts();
  window.scrollTo(0, 0);
});
const collectionHeader = ref(null);
const collectionNfts = ref([]);
const filterCollection = ref([]);

const specificCollectionDetails = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(`https://api.opensea.io/api/v2/collections/${route.params.id}`, options)
    .then((response) => response.json())
    .then((response) => {
      collectionHeader.value = response;
      // console.log(collectionHeader.value);

      banner.value = collectionHeader.value.banner_image_url.slice(
        0,
        collectionHeader.value.banner_image_url.indexOf("?")
      );

      image.value = collectionHeader.value.image_url.slice(
        0,
        collectionHeader.value.image_url.indexOf("?")
      );
    })
    .catch((err) => console.error(err));
};

const specificCollectionNfts = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(
    `https://api.opensea.io/api/v2/collection/${route.params.id}/nfts?limit=200`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      collectionNfts.value = response.nfts;

      collectionNfts.value.forEach((nft) => {
        nft.action = "red";
        nft.stats = {
          floor_price: (Math.random() * 0.5).toString(),
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
