<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="{1.5}"
      stroke="currentColor"
      :class="Sclass"
      class="min-w-7 max-w-7 transit dark:stroke-slate-200 stroke-[1.1px] stroke-slate-900"
    >
      <path strokeLinecap="round" strokeLinejoin="round" :d="icon" />
    </svg>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  icon: {
    type: String,
    default:
      "M4.745 3A23.933 23.933 0 0 0 3 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 0 1 1.105.402l2.402 7.206a.75.75 0 0 0 1.104.401l1.445-.889m-8.25.75.213.09a1.687 1.687 0 0 0 2.062-.617l4.45-6.676a1.688 1.688 0 0 1 2.062-.618l.213.09",
  },
  Sclass: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
