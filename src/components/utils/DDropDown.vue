<template>
  <div class="inline ml-2 relative group">
    <div
      class="border flex cursor-pointer gap-x-7 px-1 justify-between w-40 rounded-lg text-slate-900 dark:text-slate-100 hover:bg-green-200 hover:border-green-400 dark:hover:bg-green-500 dark:hover:border-green-300 transit"
    >
      <p class="block select-none">{{ title }}</p>

      <p>
        <svg-comp
          icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          class="group-hover:rotate-90 transit"
        />
      </p>
    </div>
    <div
      class="absolute flex flex-col divide-y w-full overflow-hidden shadow-xl rounded-2xl bg-slate-50 dark:bg-slate-800 transit hidden group-hover:block"
    >
      <p
        v-for="child in children"
        :key="child.name"
        class="text-slate-900 px-3 py-1 dark:text-slate-100 hover:bg-green-200 cursor-pointer dark:hover:bg-green-500"
        @click="child.action ? child.action : () => {}"
      >
        {{ child.name }}
      </p>
    </div>
  </div>
</template>

<script setup>
import svgComp from "../svgComp.vue";
const props = defineProps({
  title: {
    type: String,
    default: "Select",
  },
  children: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
</script>

<style></style>
