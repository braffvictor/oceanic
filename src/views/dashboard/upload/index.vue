<template>
  <div
    class="min-h-screen transit bg-gradient-to-b from-slate-50 via-green-50 to-green-300 dark:from-slate-900 dark:to-emerald-900 dark:to-100% to-95%"
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
      <section class="w-11/12 mx-auto mt-3">
        <p class="font-semibold text-xl md:text-2xl">
          SUBMIT YOUR NFT FOR EVALUATION
        </p>
        <p class="text-xs md:text-sm my-2 text-teal-600">
          NOTE GAS FEES OF ETH 0.10 WILL BE DEDUCTED FROM YOUR BALANCE FOR YOUR
          FIRST UPLOAD
        </p>

        <form action="" class="mt-4">
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Creator's Name"
          />
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Collection Name"
          />
          <d-textfield
            @emitInput="(input) => (fullName = input)"
            :err="fullNameError"
            label="Item Name/id"
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
          />
        </form>

        <DButton
          class="mt-5"
          type="outlined"
          @click="checkFullName(), checkCategory()"
          >Check composable</DButton
        >
      </section>
    </main>
    {{ fullName }}
  </div>
</template>

<script setup>
// composable
import { checkInput } from "@/composables/checkInput";

import DDashbar from "@/components/utils/DDashbar.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import DButton from "@/components/utils/DButton.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, ref } from "vue";
import DDropList from "@/components/utils/DDropList.vue";

const show = ref(false);

const theme = inject("theme");

const fullName = ref("");
const fullNameError = ref("");
const category = ref("");
const categoryError = ref("");

const checkFullName = (model) =>
  checkInput("FullName", fullName, fullNameError, "text");
// console.log(model);

const checkCategory = (model) =>
  checkInput("Category", category, categoryError, "text");

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
