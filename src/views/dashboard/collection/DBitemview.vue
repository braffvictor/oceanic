<template>
  <div class="bg-slate-100 dark:bg-slate-900 font-sans">
    <DDashbar
      class="-mt-5 mx-auto backdrop-blur-sm border-b transit"
      :class="
        theme == 'light' || theme == null
          ? 'whiteT border-b-gray-200'
          : 'darkT border-b-gray-600'
      "
    >
      <div class="w-full flex justify-between items-center">
        <button
          @click="$router.go(-1)"
          class="rounded-full bg-transparent active:scale-75 border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
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
        <p class="text-center w-full font-semibold">
          #{{ nftDetails && nftDetails.identifier.slice(0, 4) }}
        </p>
      </div>
    </DDashbar>
    <section class="md:w-11/12 mx-auto">
      <section class="px-3">
        <main class="flex-col mt-10 md:flex-row flex gap-5">
          <div
            class="border md:w-1/2 rounded-2xl overflow-hidden dark:bg-slate-800 border-gray-300 dark:border-gray-600 transit"
          >
            <p class="p-2 text-slate-900 dark:text-slate-100">
              <SvgComp
                icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
              />
            </p>
            <!-- <img
              :src="nftDetails && nftDetails.image_url"
              :alt="nftDetails && nftDetails.name"
              width="500"
              class="object-cover pointer-events-none"
            /> -->
            <vLazyImage
              :src="nftDetails && nftDetails.image_url"
              class="pointer-events-none"
            />
          </div>
          <div class="rounded-2xl md:w-8/12 w-full p-2">
            <p
              @click="
                $router.push(
                  `/dashboard/collection/${nftDetails && nftDetails.collection}`
                )
              "
              class="text-green-500 font-normal text-lg cursor-pointer"
              :class="
                nftDetails && nftDetails.name ? null : 'pointer-events-none'
              "
            >
              {{ $route.params.id
              }}<img
                src="@/assets/verified.svg"
                alt="tick"
                v-if="nftDetails && nftDetails.collection"
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
              <p class="text-slate-800 dark:text-slate-50 text-sm">
                Best offer
              </p>
              <p
                class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100"
              >
                {{
                  nftDetails &&
                  nftDetails.stats.floor_eth.toString().slice(0, 5)
                }}ETH
                <span class="text-sm text-gray-400">{{
                  nftDetails &&
                  nftDetails?.stats?.floor_price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }}</span>
              </p>
              <div class="flex gap-4 mt-3">
                <d-button
                  class="w-full active:!bg-slate-300 dark:active:!bg-slate-600"
                  type="outlined"
                  :loading="loading"
                  :to="route.fullPath"
                  @click="buyNft(nftDetails)"
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

        <main class="pb-8 px-2">
          <div
            class="border-gray-300 cursor-pointer dark:border-gray-600 dark:bg-slate-800 border rounded-xl transit p-4 mt-4"
          >
            <p class="mx-3 text-slate-900 dark:text-slate-100">
              Collection Activities
            </p>

            <CollectionActivities
              :contract-address="contrac ? contrac : ''"
              v-if="contrac"
            />
          </div>
        </main>
      </section>
    </section>
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";

import { getNames } from "@/composables/getNames";

//components
import CollectionActivities from "@/components/dynamicComps/CollectionActivities.vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import vLazyImage from "v-lazy-image";
import DButton from "@/components/utils/DButton.vue";

//composables
import { getDate } from "@/composables/getDate";

import { computed, inject, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const theme = inject("theme");
const { getCurrentTimeAndDate } = getDate();
const { generateNFTName } = getNames();

const userflowing = userflow();
const loading = computed(() => {
  return userflowing.loading.buy;
});

const useAuthentication = authentication();
const user = computed(() => {
  return useAuthentication.user;
});

const listing = ref(false);
const description = ref(false);
const details = ref(false);

const image = ref("");
const contract = ref("");

onBeforeMount(() => {
  // console.log("red");
  window.scrollTo(0, 0);

  setTimeout(() => {
    window.scrollTo({
      top: -10,
      left: 0,
      behavior: "smooth",
    });
  }, 3);
});

const collectionHeader = ref(null);

// for top header display details
const specificCollectionDetails = async (routeParams) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  await fetch(
    `https://api.opensea.io/api/v2/collections/${routeParams}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      collectionHeader.value = response;
      // console.log(collectionHeader.value);

      contract.value = collectionHeader.value.contracts[0].address;
      // console.log(contract.value);

      image.value = collectionHeader.value.image_url.slice(
        0,
        collectionHeader.value.image_url.indexOf("?")
      );
    })
    .catch((err) => console.error(err));
};

const contrac = computed(() => {
  return collectionHeader.value?.contracts[0]?.address;
});

// to search for the nft contract address
const collectionNfts = ref([]);
const nftDetails = ref(null);
const specificCollectionNfts = async (routeParams) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  await fetch(
    `https://api.opensea.io/api/v2/collection/${routeParams}/nfts?limit=200`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      collectionNfts.value = response.nfts;

      collectionNfts.value.forEach((nft) => {
        nft.action = true;
        //todo generate a random name here instead of ####
        nft.name = nft.name ? nft.name : generateNFTName();
        nft.key = nft.collection;
        nft.contract_address = generateContractAddressWithSeed(
          nft.identifier || 1500
        );
        nft.stats = {
          floor_price:
            (Number(nft.identifier.slice(0, 4) || 1500) / 4000) * 3037.97,
          floor_eth: Number(nft.identifier.slice(0, 4) || 1500) / 4000,
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
});

//buy the nft
function buyNft(nft) {
  if (
    !nft ||
    !nft.name ||
    !collectionHeader.value ||
    nft.stats.floor_eth < 0.1 ||
    !user.value
  ) {
    userflowing.initAlert({
      message: `An Error Occured`,
      is: true,
      type: "error",
      timer: 6000,
      close: true,
    });
    return;
  }

  delete nft.display_animation_url;
  delete nft.is_disabled;
  delete nftDetails.metadata_url;
  delete nft.is_nsfw;

  if (nft.stats.floor_eth >= user.value.wallet.balance) {
    userflowing.initAlert({
      message: `Dear, ${
        user.value && user.value.fullName
      }, You Do Not Have The Sufficient Amount In Your Wallet Balance To Purchase "${
        nft.name
      }" From The ${
        nft.collection.toUpperCase() || nft.key.toUpperCase()
      } Collection.`,
      is: true,
      type: "error",
      timer: 5000,
    });
    return;
  }

  nft.fullName = user.value && user.value.fullName;
  nft.email = user.value && user.value.email;
  nft.userID = user.value && user.value.userID;
  nft.type = "bought";
  nft.collection = user.value && user.value.userName;
  nft.category = "nfts";
  nft.status = "pending";
  nft.date = getCurrentTimeAndDate();
  nft.formattedDate = getCurrentTimeAndDate("format");

  // using collectionHeader
  nft.description = nft.description
    ? nft.description
    : collectionHeader.value.description;
  nft.categoryType = collectionHeader.value.category;
  nft.created_date = collectionHeader.value.created_date;

  // console.log(nft);
  // console.log(collectionHeader.value);

  userflowing.buyFN(nft);
}

//to cart the nft
function cartNft(nftDetails) {
  if (
    nftDetails == null ||
    nftDetails == undefined ||
    !nftDetails.name ||
    nftDetails.stats.floor_eth < 0.03
  ) {
    userflowing.initAlert({
      message: `Carting Error`,
      is: true,
      type: "error",
      timer: 6000,
      close: true,
    });
    return;
  }
  const cartedNfts = JSON.parse(localStorage.getItem("watchList")) || [];

  const nft = cartedNfts.find((cart) => nftDetails.name == cart.name);

  if (nft) {
    userflowing.initAlert({
      message: `${nftDetails.name} Already Added in Your Cart List`,
      is: true,
      type: "error",
      timer: 6000,
      close: true,
    });
  } else {
    delete nftDetails.display_animation_url;
    delete nftDetails.is_disabled;
    delete nftDetails.metadata_url;
    delete nftDetails.is_nsfw;

    nftDetails.fullName = user.value && user.value.fullName;
    nftDetails.email = user.value && user.value.email;
    nftDetails.userID = user.value && user.value.userID;
    nftDetails.type = "bought";
    nftDetails.category = "nfts";
    nftDetails.collection =
      nftDetails.key || nftDetails.collection || "Not Given";
    nftDetails.status = "pending";
    nftDetails.date = getCurrentTimeAndDate();
    nftDetails.formattedDate = getCurrentTimeAndDate("format");

    // using collectionHeader
    nftDetails.description = nftDetails.description
      ? nftDetails.description
      : collectionHeader.value.description;
    nftDetails.categoryType = collectionHeader.value.category || "Not Given";
    nftDetails.created_date = collectionHeader.value.created_date || "Nil";

    const newList = [nftDetails, ...cartedNfts];
    localStorage.setItem("watchList", JSON.stringify(newList));
    userflowing.checkLocalStorage(newList.length);

    console.log(nftDetails);

    userflowing.initAlert({
      message: `${nftDetails.name} Added To Your Cart List`,
      is: true,
      type: "info",
      timer: 6000,
      close: true,
    });
  }
}

const detailsOfNft = computed(() => {
  return [
    {
      text: "Contract Address",
      data:
        (nftDetails.value && nftDetails.value.contract_address.slice(0, 5)) +
        "...." +
        (nftDetails.value && nftDetails.value.contract_address.slice(10, 15)),
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

function generateContractAddressWithSeed(seed) {
  const hexChars = "0123456789abcdef";
  let address = "0x";

  // Simple seed-based random number generator
  function seededRandom() {
    seed = parseInt(seed);

    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Generate the address using the seeded random number generator
  for (let i = 0; i < 40; i++) {
    address += hexChars[Math.floor(seededRandom() * 16)];
  }

  return address;
}

specificCollectionDetails(route.params.id);
specificCollectionNfts(route.params.id);
</script>

<style>
.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
