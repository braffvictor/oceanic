<template>
  <!--todo filled button -->

  <router-link
    v-if="type == 'filled'"
    :to="to"
    class="p-3 !border-none rounded-2xl active:scale-90 dark:text-white text-center text-slate-900 transit inline-block"
  >
    <slot> Sign Up </slot>
  </router-link>

  <!--todo outlined button -->
  <router-link
    :to="to"
    class="p-3 border rounded-2xl active:scale-90 dark:text-white text-center text-slate-900 transit inline-block !bg-transparent"
    v-else-if="type == 'outlined'"
  >
    <slot> Sign Up </slot>
  </router-link>

  <!--todo elevated button -->
  <router-link
    v-else-if="type == 'elevated'"
    :to="to"
    class="p-3 rounded-2xl dark:text-white active:scale-90 text-slate-900 text-center shadow-md transit inline-block"
  >
    <slot> Sign Up </slot>
  </router-link>

  <router-link
    v-else-if="type == ''"
    :to="to"
    class="p-3 rounded-2xl dark:text-slate-900 active:scale-90 text-slate-100 transit text-center inline-block bg-slate-900 dark:bg-slate-100"
  >
    <slot> text</slot>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
