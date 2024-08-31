<template>
  <section>
    <div
      class="h-3 w-3 mt-5 animate-pulse rounded-full bg-green-400 dark:bg-green-500 inline-block"
    ></div>
    <span
      class="text-slate-900 dark:text-slate-100 md:text-md text-sm ml-1 mb-3"
      >Live</span
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
        placeholder="Search Item..."
        class="w-full bg-transparent outline-none ml-2"
      />
    </div>

    <div class="text-center mx-auto flex justify-center">
      <div
        class="grid grid-cols-2 justify-center items-center md:grid-cols-5 mt-7 gap-6 text-center mx-auto"
        v-if="filterCollection && filterCollection.length > 0"
      >
        <nftCard
          v-for="nft in filterCollection"
          :key="nft.name"
          :nft="nft"
          :action="true"
          :dashboard="dashboard"
          :card-size="'min-w-40 min-h-64 max-w-40 max-h-64 md:min-w-56 md:min-h-72 md:max-w-56 md:max-h-72'"
        />
      </div>

      <div v-else class="min-h-screen mt-10 text-center mx-auto">
        <div class="mx-auto text-center flex justify-center">
          <img src="@/assets/not-found.gif" width="200" class="mt-5 block" />
        </div>
        <p
          class="text-slate-900 font-semibold dark:text-slate-100 mt-4"
          v-if="loading == false"
        >
          No NFTs found for
          <span class="text-green-500">{{
            searchName ? `${searchName} in` : ""
          }}</span>
          "{{ headerName }}" Collection
        </p>

        <p
          class="text-slate-900 font-semibold dark:text-slate-100 mt-4"
          v-if="loading == true"
        >
          Loading {{ headerName }} Collection....Hold a bit
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import nftCard from "@/components/cards/nftCard.vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  headerName: {
    type: String,
    default: "",
  },
  dashboard: {
    type: Boolean,
    default: false,
  },
  headerObj: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const loading = ref(true);
const route = useRoute();

// setTimeout(() => {

// }, 3000);

const searchName = ref("");

function headerclick() {
  console.log(props.headerObj);
}

const collectionNfts = ref([]);
const filterCollection = ref([]);
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
        delete nft.is_disabled;
        delete nft.is_nsfw;
        delete nft.metadata_url;
        delete nft.display_animation_url;

        nft.action = true;
        nft.category = "nfts";
        nft.type = "bought";
        nft.categoryType = props.headerObj.category || "";
        nft.created_date = props.headerObj.created_date || "";
        nft.description = nft.description
          ? nft.description
          : props.headerObj.description;
        nft.banner_image_url = props.headerObj.banner_image_url || "";
        //todo generate a random name here instead of ####
        nft.name = nft.name ? nft.name : "####";
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

      filterCollection.value = collectionNfts.value;
      loading.value = false;
      // console.log(filterCollection.value, "is the array");
    })
    .catch((err) => console.error(err));
};

//to watch the nft search bar
watch(searchName, () => {
  filterCollection.value = collectionNfts.value.filter((nft) => {
    return (
      nft.name.includes(searchName.value) ||
      nft.name.toLowerCase().includes(searchName.value)
    );
  });
});

watch(route, () => {
  specificCollectionNfts(route.params.id);
  // console.log("fetching nfts");
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

specificCollectionNfts(route.params.id);
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-in-out;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px), translateY(20px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
