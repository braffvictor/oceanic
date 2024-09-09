<template>
  <main>
    <section class="px-3 md:px-6">
      <DTextfield
        @emitInput="(input) => (nftName = input)"
        :label="`Name: ${nft && nft.name.toUpperCase()}`"
        name="nftName"
        type="outlined"
      />

      <d-textfield
        class="mt-2"
        @emitInput="(input) => (bidPrice = input)"
        :label="`Bid Price - ${nft && nft.stats.floor_eth} ETH`"
        name="bidprice"
        inputType="number"
        :icon="true"
        type="outlined"
      />
      <DTextfield
        @emitInput="(input) => (collectionName = input)"
        :label="`Collection: ${nft && nft.collection.toUpperCase()}`"
        name="collectionName"
        type="outlined"
      />
      <DTextfield
        @emitInput="(input) => (categoryType = input)"
        :label="`Category: ${nft && nft.categoryType.toUpperCase()}`"
        name="categoryType"
        type="outlined"
      />

      <DTextarea
        @emitInput="(input) => (date = input)"
        label="Description"
        name="description"
        type="outlined"
        rows="3"
      />
      <DTextfield
        @emitInput="(input) => (date = input)"
        :label="`Date: ${(nft && nft.created_date) || (nft && nft.date)}`"
        name="date"
        type="outlined"
      />
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import DTextfield from "../utils/DTextfield.vue";
import DTextarea from "../utils/DTextarea.vue";
const props = defineProps({
  nft: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const nftName = ref("");
const collectionName = ref("");
const categoryType = ref("");
const date = ref("");
const bidPrice = ref("");
</script>

<style scoped></style>
