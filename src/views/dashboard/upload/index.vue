<template>
  <div
    class="h-auto pb-8 transit bg-gradient-to-t md:bg-gradient-to-br md:from-slate-100 md:to-green-400 from-30% md:from-50% dark:md:from-slate-950 dark:md:to-emerald-900 from-slate-100 via-green-50 to-green-400 dark:from-slate-900 dark:to-emerald-900 dark:to-100% to-95% via-40%"
  >
    <DDashbar
      class="md:w-10/12 mx-auto bg-transparent backdrop-blur-md dark:bg-transparent"
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
        <p class="text-center w-full font-semibold">Mint NFT</p>
      </div>
    </DDashbar>

    <main class="md:w-10/12 mx-auto px-2">
      <section class="w-11/12 mx-auto mt-1">
        <p class="font-semibold text-xl md:text-2xl">
          SUBMIT YOUR NFT FOR EVALUATION
        </p>
        <p class="text-xs md:text-sm my-2 text-teal-600">
          NOTE GAS FEES OF ETH 0.10 WILL BE DEDUCTED FROM YOUR BALANCE FOR YOUR
          FIRST UPLOAD
        </p>

        <form action="" class="mt-4">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center transit p-4 md:p-6 mt-4 mb-3 w-full border border-gray-500 dark:border-gray-300 border-dotted rounded-2xl cursor-pointer bg-transparent backdrop-blur-lg"
          >
            <div class="mb-3 flex items-center justify-center" v-if="!proof">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g id="Upload 02">
                  <path
                    id="icon"
                    d="M16.296 25.3935L19.9997 21.6667L23.7034 25.3935M19.9997 35V21.759M10.7404 27.3611H9.855C6.253 27.3611 3.33301 24.4411 3.33301 20.8391C3.33301 17.2371 6.253 14.3171 9.855 14.3171V14.3171C10.344 14.3171 10.736 13.9195 10.7816 13.4326C11.2243 8.70174 15.1824 5 19.9997 5C25.1134 5 29.2589 9.1714 29.2589 14.3171H30.1444C33.7463 14.3171 36.6663 17.2371 36.6663 20.8391C36.6663 24.4411 33.7463 27.3611 30.1444 27.3611H29.2589"
                    stroke="#22c55e"
                    stroke-width="1.6"
                    stroke-linecap="round"
                  />
                </g>
              </svg>
            </div>

            <!-- the image proof displayed -->
            <div
              class="mx-auto text-center text-slate-900 dark:text-slate-100"
              v-if="proof"
            >
              <div
                class="overflow-hidden rounded-lg shadow-sm inline-block mx-auto text-center"
              >
                <img
                  :src="proof"
                  alt=""
                  width="500"
                  class="mx-auto text-center"
                />
              </div>
            </div>

            <div v-if="!proof">
              <h4
                class="text-center text-slate-900 dark:text-slate-100 text-sm font-medium leading-snug"
              >
                Upload your NFT Image Here
              </h4>
              <h2
                class="text-center text-gray-400 text-xs font-normal leading-4 mb-1"
              >
                PNG, JPG or PDF, Gif smaller than 15MB
              </h2>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              @change="
                (event) => (
                  (photo = event.target.files[0]), checkImage(), checkPhoto()
                )
              "
            />
          </label>
          <p
            class="text-xs text-red-500 transit mb-2 text-center"
            :class="photoError ? 'transit ' : 'scale-y-0 transit'"
          >
            {{ photoError }}
          </p>

          <d-textfield
            @emitInput="(input) => ((creator = input), checkCreator())"
            :err="creatorError"
            label="Creator's Name"
            :type="theme == 'dark' ? 'filled' : 'default'"
            name="creator"
          />
          <d-textfield
            @emitInput="(input) => ((collection = input), checkCollection())"
            :err="collectionError"
            label="Collection Name"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
          <d-textfield
            @emitInput="(input) => ((item = input), checkItem())"
            :err="itemError"
            label="Item Name"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />

          <DDropList
            @openMenu="show = true"
            @closeMenu="show = false"
            :err="categoryError"
            :show="show"
            @emitInput="(input) => ((category = input), checkCategory())"
            :lists="categories"
            name="category"
            placeholder="Category Your NFT Belong In"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />

          <DTextfield
            @emitProps="(input) => getInput(input)"
            :label="`Properties(${props.length}), Press Space To List.`"
            :chips="true"
            :err="propsError"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
          <!--todo to display props -->
          <div class="flex flex-wrap gap-2 mt-2">
            <TransitionGroup name="list">
              <p
                class="capitalize shadow-sm select-none shadow-green-400 border border-green-400 text-sm font-thin flex items-center justify-between rounded-2xl h-8 dark:border-green-500 dark:shadow-green-500 py-1 px-4"
                v-for="prop in props"
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

          <d-textfield
            class="mt-2"
            @emitInput="(input) => ((bidPrice = input), checkBidPrice())"
            :err="bidPriceError"
            label="Bid Price in (ETH)"
            name="bidprice"
            inputType="number"
            :icon="true"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
          <p
            class="mt-3 text-xs font-light font-sans text-center"
            :class="bidPrice ? ' transit' : 'scale-y-0 transit hidden'"
          >
            Dollar Conversion : {{ convertAmount }}
          </p>

          <DTextarea
            class="mt-4"
            @emitInput="(input) => ((description = input), checkDescription())"
            label="Description"
            :type="theme == 'dark' ? 'filled' : 'default'"
            :err="descriptionError"
          />
        </form>

        <div class="w-full mt-4 mb-6">
          <d-button
            type="elevated"
            @click="submit"
            class="shadow-green-400 mt-5 w-full bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
            >Complete purchase</d-button
          >
        </div>
      </section>
    </main>

    <!-- 
    collection
    name
    description 
    trait
    properties(optional)
    ethereum(default?)
    network(erc-default?)

    generate ~
    transaction hash for purchased nft
    contract address for nft
    id for nft
     -->
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";

// composable
import { checkInput } from "@/composables/checkInput";

import DDashbar from "@/components/utils/DDashbar.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import DButton from "@/components/utils/DButton.vue";
import SvgComp from "@/components/svgComp.vue";
import DDropList from "@/components/utils/DDropList.vue";
import DTextarea from "@/components/utils/DTextarea.vue";
import { computed, inject, ref } from "vue";

const userflowing = userflow();
const props = ref([]);

function getInput(input) {
  const findInput = props.value.find(
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
    props.value.push(input.value.toLowerCase().trim());
  }
}
function removeProp(prop) {
  props.value = props.value.filter((item) => item != prop);
}
const propsError = ref("");

const show = ref(false);

const theme = inject("theme");

const photo = ref(null);
const proof = ref(null);
const photoError = ref("");
const creator = ref("");
const creatorError = ref("");
const collection = ref("");
const collectionError = ref("");
const item = ref("");
const itemError = ref("");
const category = ref("");
const categoryError = ref("");

const bidPrice = ref("");
const bidPriceError = ref("");
const convertAmount = computed(() => {
  const dollars = Number(bidPrice.value) * 3043;
  return bidPrice.value ? `$${dollars.toLocaleString()}` : "";
});

const description = ref("");
const descriptionError = ref("");

function checkImage() {
  if (photo.value) {
    proof.value = URL.createObjectURL(photo.value);
  } else {
    proof.value = null;
  }
}

const checkPhoto = () => checkInput("NFT", photo, photoError);
const checkCreator = () => checkInput("Creator Name", creator, creatorError);
const checkCollection = () =>
  checkInput("Collection Name", collection, collectionError);
const checkItem = () => checkInput("Item Name", item, itemError);
const checkCategory = () => checkInput("Category", category, categoryError);
const checkBidPrice = () => checkInput("Bid Price", bidPrice, bidPriceError);
const checkDescription = () =>
  checkInput("Description", description, descriptionError);

function submit() {
  checkCreator();
  checkCollection();
  checkItem();
  checkCategory();
  checkPhoto();
  checkDescription();
  checkBidPrice();

  if (
    checkBidPrice() &&
    checkCategory() &&
    checkCollection() &&
    checkDescription() &&
    checkItem() &&
    checkPhoto() &&
    checkCreator()
  ) {
    const payload = {
      bidPrice: bidPrice.value,
      category: category.value,
      item: item.value,
      collection: collection.value,
      photo: photo.value,
      creator: creator.value,
      properties: props.value,
      convertedAmount: convertAmount.value,
      description: description.value,
    };
    console.log(payload);
  } else {
    console.log(false);
  }
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

<style>
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
