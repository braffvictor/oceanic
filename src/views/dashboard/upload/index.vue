<template>
  <div
    class="min-h-screen transit bg-gradient-to-t md:bg-gradient-to-br md:from-slate-100 md:to-green-300 from-30% md:from-50% dark:md:from-slate-950 dark:md:to-emerald-900 from-slate-100 via-green-50 to-green-300 dark:from-slate-900 dark:to-emerald-900 dark:to-100% to-95% via-40%"
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

    <main class="md:w-10/12 mx-auto">
      <section class="w-11/12 mx-auto mt-1">
        <p class="font-semibold text-xl md:text-2xl">
          SUBMIT YOUR NFT FOR EVALUATION
        </p>
        <p class="text-xs md:text-sm my-2 text-teal-600">
          NOTE GAS FEES OF ETH 0.10 WILL BE DEDUCTED FROM YOUR BALANCE FOR YOUR
          FIRST UPLOAD
        </p>

        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center transit py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-transparent backdrop-blur-lg"
        >
          <div class="mb-3 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              v-if="!proof"
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

            <!-- the image proof displayed -->
            <div
              class="mx-auto text-center mt-5 text-slate-900 dark:text-slate-100"
              v-if="proof"
            >
              <div
                class="overflow-hidden rounded-lg shadow-sm inline-block mx-auto text-center"
              >
                <img
                  :src="proof"
                  alt=""
                  width="300"
                  class="mx-auto text-center"
                />
              </div>
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
              PNG, JPG or PDF, smaller than 15MB
            </h2>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            @change="(event) => ((photo = event.target.files[0]), checkImage())"
          />
        </label>

        <form action="" class="mt-4">
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Creator's Name"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Collection Name"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Item Name/id"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />

          <DDropList
            @openMenu="show = true"
            @closeMenu="show = false"
            :err="categoryError"
            :show="show"
            @emitInput="(input) => (category = input)"
            :lists="categories"
            name="category"
            placeholder="Category Your NFT Belong In"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />

          <DFileinput
            label="NFT"
            :err="nftPhotoError"
            @emitPhoto="(photo) => (nftPhoto = photo)"
            :type="theme == 'dark' ? 'filled' : 'default'"
          />
        </form>

        <DButton
          class="mt-5"
          type="outlined"
          @click="checkFullName(), checkCategory(), checkPhoto()"
          >Check composable</DButton
        >
      </section>
    </main>
    {{ fullName }}

    <!-- 
    collection
    name
    description 
    trait
    properties(optional)
    ethereum(default?)
    network(erc-default?)

    contract address for nft
    id for nft
     -->
  </div>
</template>

<script setup>
// composable
import { checkInput } from "@/composables/checkInput";

import DDashbar from "@/components/utils/DDashbar.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import DButton from "@/components/utils/DButton.vue";
import SvgComp from "@/components/svgComp.vue";
import DDropList from "@/components/utils/DDropList.vue";
import DFileinput from "@/components/utils/DFileinput.vue";

import { computed, inject, ref } from "vue";
const show = ref(false);

const photo = ref(null);
const proof = ref(null);

function checkImage() {
  if (photo.value) {
    proof.value = URL.createObjectURL(photo.value);
  } else {
    proof.value = null;
  }
}

const theme = inject("theme");

const fullName = ref("");
const fullNameError = ref("");
const category = ref("");
const categoryError = ref("");
const nftPhoto = ref(null);
const nftPhotoError = ref("");

const checkFullName = (model) =>
  checkInput("FullName", fullName, fullNameError, "text");
// console.log(model);

const checkCategory = (model) =>
  checkInput("Category", category, categoryError, "text");

const checkPhoto = (model) => checkInput("Photo", nftPhoto, nftPhotoError);

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

<style></style>
