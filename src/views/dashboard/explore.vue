<template>
  <main class="min-h-screen">
    This is the explore page

    {{ nfts }}
    {{ loading }}
  </main>
</template>

<script setup>
import { userflow } from "@/stores/userflow";
import { computed, onMounted, ref, watch } from "vue";

const userflowing = userflow();

const nfts = computed(() => {
  return userflowing.nfts.map((nft) => {
    return {
      key: nft.key,
    };
  });
});

const loading = ref("true");

const collectionNfts = ref([]);
const filterCollection = ref([]);
function specificCollectionNfts(routeParams) {
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
          floor_price:
            (Number(nft.identifier.slice(0, 4) || 1500) / 4000) * 3037.97,
          floor_eth: Number(nft.identifier.slice(0, 4) || 1500) / 4000,
          floor_price_symbol: "ETH",
        };
      });

      filterCollection.value = collectionNfts.value;
      console.log(filterCollection.value, "is the array");
    })
    .catch((err) => console.error(err));

  specificCollectionNfts(nfts.value[0].key);

  onMounted(() => {
    setTimeout(() => {
      console.log(collectionNfts.value);
      console.log(true);
      loading.value = "false";
    }, 3000);
  });
}
</script>

<style></style>
