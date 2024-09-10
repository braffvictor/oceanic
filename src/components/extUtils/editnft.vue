<template>
  <main>
    <section class="px-3 md:px-6">
      <form @submit="submit">
        <DTextfield
          @emitInput="(input) => (nftName = input)"
          :label="`Name: ${nft && nft?.name?.toUpperCase()}`"
          name="nftName"
          type="outlined"
        />

        <d-textfield
          class="mt-2"
          @emitInput="(input) => ((bidPrice = input), checkBidPrice())"
          :label="`Bid Price - ${nft && nft?.stats?.floor_eth} ETH`"
          name="bidprice"
          inputType="number"
          :icon="true"
          :err="bidPriceError"
          type="outlined"
        />
        <p
          class="mt-3 text-xs font-light font-sans text-center"
          :class="bidPrice ? ' transit' : 'scale-y-0 transit hidden'"
        >
          Dollar Conversion : {{ convertAmount }}
        </p>

        <DTextfield
          @emitInput="(input) => (collectionName = input)"
          :label="`Collection: ${nft && nft?.collection}`"
          name="collectionName"
          type="outlined"
        />
        <!-- 
        <DTextfield
          @emitInput="(input) => (categoryType = input)"
          :label="`Category: ${nft && nft?.categoryType?.toUpperCase()}`"
          name="categoryType"
          type="outlined"
        /> -->

        <DDropList
          @openMenu="show = true"
          @closeMenu="show = false"
          :show="show"
          @emitInput="(input) => (categoryType = input)"
          :lists="categories"
          name="category"
          :placeholder="`Category: ${
            (nft && nft?.categoryType?.toUpperCase()) || 'Not Given'
          }`"
          type="outlined"
          :err="''"
        />

        <DTextfield
          @emitProps="(input) => getInput(input)"
          :label="`Properties(${properties.length}), Press Space To List.`"
          :chips="true"
          type="outlined"
        />
        <!--todo to display props -->
        <div class="flex flex-wrap gap-2 mt-2">
          <TransitionGroup name="list">
            <p
              class="capitalize transit dark:shadow-sm select-none shadow-green-400 border border-green-400 text-sm font-thin flex items-center justify-between rounded-2xl h-8 dark:border-green-500 dark:shadow-green-500 py-1 px-4"
              v-for="prop in properties"
              :key="prop"
            >
              {{ prop
              }}<SvgComp
                icon="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                class="inline cursor-pointer"
                Sclass="!stroke-red-400 dark:!stroke-red-500"
                @click="removeProp(prop)"
              />
            </p>
          </TransitionGroup>
        </div>

        <DTextarea
          @emitInput="(input) => (description = input)"
          label="Description"
          name="description"
          type="outlined"
          rows="3"
        />
        <DTextfield
          @emitInput="(input) => (date = input)"
          :label="`Date: ${
            (nft && nft?.created_date) || (nft && nft?.date) || 'Not Given'
          }`"
          name="date"
          type="outlined"
        />

        <button class="w-full mb-3" type="submit">
          <DButton
            type="filled"
            :loading="loading"
            @click="submit"
            class="bg-slate-900 shadow shadow-slate-900 dark:shadow-slate-100 dark:bg-slate-100 !text-slate-100 dark:!text-slate-900 rounded-md"
            >Proceed</DButton
          >
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";

//composables
import { checkInput } from "@/composables/checkInput";

import DTextfield from "../utils/DTextfield.vue";
import DTextarea from "../utils/DTextarea.vue";
import DButton from "../utils/DButton.vue";
import DDropList from "../utils/DDropList.vue";
import SvgComp from "../svgComp.vue";

import { computed, ref } from "vue";

const userflowing = userflow();
const loading = computed(() => {
  return userflowing.loading.nft;
});
const props = defineProps({
  nft: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(["closeDialog"]);

const show = ref(false);

const bidPrice = ref("");
const bidPriceError = ref("");
const nftName = ref("");
const collectionName = ref("");
const categoryType = ref("");
const properties = ref([]);
const description = ref("");
const date = ref("");

const checkBidPrice = () => checkInput("Bid price", bidPrice, bidPriceError);
const convertAmount = computed(() => {
  const dollars = Number(bidPrice.value) * 3043;
  return bidPrice.value ? `$${dollars.toLocaleString()}` : "";
});

function getInput(input) {
  const findInput = properties.value.find(
    (chip) => input.value.toLowerCase().trim() == chip
  );
  if (findInput) {
    userflowing.initAlert({
      is: true,
      message: "Property Already Listed",
      type: "info",
      close: true,
    });
  } else {
    properties.value.push(input.value.toLowerCase().trim());
  }
}
function removeProp(prop) {
  properties.value = properties.value.filter((item) => item != prop);
}

function submit() {
  const { nft } = props;

  const payload = {
    name: nftName.value ? nftName.value : nft.name,
    collection: collectionName.value.trim()
      ? collectionName.value.trim()
      : nft.collection,
    categoryType: categoryType.value
      ? categoryType.value
      : nft.categoryType || "Not Given",
    date: date.value ? date.value : nft.date || nft.created_date || "Not Given",
    created_date: nft.created_date
      ? nft.created_date
      : date.value || nft.date || "Not Given",
    stats: {
      floor_eth: Math.abs(bidPrice.value)
        ? Math.abs(bidPrice.value)
        : nft.stats.floor_eth,
      floor_price: bidPrice.value
        ? Math.abs(Math.round(bidPrice.value * 3043))
        : nft.stats.floor_price,
      floor_price_symbol: "ETH",
    },
    description: description.value
      ? description.value
      : nft.description || "Not Given",
    properties:
      properties.value.length > 0
        ? properties.value
        : nft.properties
        ? nft.properties
        : [],

    id: nft.id,
  };

  emit("closeDialog");
  userflowing.editNftDetails(payload);
  console.log(payload);
}

const categories = computed(() => {
  return [
    {
      name: "Art",
    },
    {
      name: "Music",
    },
    {
      name: "PFP",
    },
    {
      name: "Sport",
    },
    {
      name: "Collectible",
    },
    {
      name: "Photography",
    },
  ];
});
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
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
