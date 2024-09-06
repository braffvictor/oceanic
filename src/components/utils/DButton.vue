<template>
  <!--todo filled button -->

  <router-link
    v-if="type == 'filled' && !disabled"
    :to="to"
    class="p-3 !border-none rounded-2xl select-none active:!scale-90 flex justify-center items-center dark:text-white text-center text-slate-900 transit inline-block !min-h-11"
    :class="loading ? 'pointer-events-none' : ''"
  >
    <slot v-if="!loading"> Sign Up </slot>
    <div
      v-if="loading"
      class="rounded-br-lg mt-1 md:mt-0 rounded-tl-lg h-4 animate-spin w-4 border-2 border-slate-800 transit my-auto dark:border-slate-50 bg-slate-900 dark:bg-slate-100 mx-auto text-center"
    ></div>
  </router-link>

  <!--todo outlined button -->
  <router-link
    v-else-if="type == 'outlined' && !disabled"
    :to="to"
    class="p-3 border rounded-2xl select-none active:!scale-90 dark:text-white text-center text-slate-900 transit flex justify-center items-center inline-block !bg-transparent !min-h-11"
    :class="loading ? 'pointer-events-none' : ''"
  >
    <slot v-if="!loading"> Sign Up </slot>
    <div
      v-if="loading"
      class="rounded-br-lg mt-1 md:mt-0 rounded-tl-lg h-4 animate-spin w-4 border-2 my-auto border-slate-800 transit dark:border-slate-50 bg-slate-900 dark:bg-slate-100 mx-auto text-center"
    ></div>
  </router-link>

  <!--todo elevated button -->
  <router-link
    v-else-if="type == 'elevated' && !disabled"
    :to="to"
    class="p-3 rounded-2xl select-none dark:text-white active:!scale-90 text-slate-900 text-center flex justify-center items-center shadow-md transit inline-block !min-h-11"
    :class="loading ? 'pointer-events-none' : ''"
  >
    <slot v-if="!loading"> Sign Up </slot>
    <div
      v-if="loading"
      class="rounded-br-lg mt-1 md:mt-0 rounded-tl-lg h-4 animate-spin w-4 my-auto border-2 border-slate-700 transit dark:border-slate-200 bg-slate-900 dark:bg-slate-100 mx-auto text-center"
    ></div>
  </router-link>

  <router-link
    v-else-if="type == '' && !disabled"
    :to="to"
    class="p-3 rounded-2xl select-none dark:text-slate-900 flex justify-center items-center active:!scale-90 text-slate-100 transit text-center inline-block bg-slate-900 dark:bg-slate-100 !min-h-11"
    :class="loading ? 'pointer-events-none' : ''"
  >
    <slot v-if="!loading"> Sign Up </slot>
    <div
      v-if="loading"
      class="rounded-br-lg mt-1 md:mt-0 rounded-tl-lg h-4 animate-spin w-4 border-2 border-slate-800 transit dark:border-slate-50 bg-slate-900 dark:bg-slate-100 mx-auto text-center"
    ></div>
  </router-link>

  <!-- disabled button -->
  <router-link
    v-else-if="(type && disabled) || (!type && disabled)"
    :to="to"
    class="p-3 rounded-2xl !cursor-not-allowed select-none pointer-events-none w-full dark:!text-slate-100 active:!scale-90 !text-slate-900 transit text-center inline-block !bg-gray-500 dark:!bg-gray-400 flex justify-center gap-x-2 !min-h-11 items-center"
  >
    <svg-comp
      v-if="!loading"
      icon="M4 12C4 7.58172 7.58172 4 12 4C13.6284 4 15.1432 4.48652 16.4068 5.32214L6.07523 17.3757C4.78577 15.9554 4 14.0694 4 12ZM7.59321 18.6779C8.85689 19.5135 10.3716 20 12 20C16.4183 20 20 16.4183 20 12C20 9.93057 19.2142 8.04467 17.9248 6.62436L7.59321 18.6779ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
      Sclass="min-w-6"
    /><slot class="mr-9" v-if="!loading"></slot>
    <div
      v-if="loading"
      class="rounded-br-lg mt-1 md:mt-0 rounded-tl-lg h-4 animate-spin w-4 border-2 border-slate-800 transit dark:border-slate-50 bg-slate-900 dark:bg-slate-100 mx-auto text-center"
    ></div>
  </router-link>
</template>

<script setup>
import { defineProps, ref } from "vue";
import SvgComp from "../svgComp.vue";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
