<template>
  <div
    class="transit rounded-xl w-full h-56 mx-auto flex flex-col justify-center items-center dark:bg-slate-50 bg-slate-900 text-slate-100 dark:text-slate-900"
    @click="to ? $router.push(to) : () => {}"
  >
    <svg-comp
      :icon="icon"
      :Sclass="`!stroke-slate-50 dark:!stroke-slate-900 fill-slate-50 dark:fill-slate-900 !min-w-10  !max-w-10 pt-1 pl-1 ${iconColor}`"
    />
    <p class="text-center transit font-semibold">{{ text }}</p>
    <p class="text-center">{{ length }}</p>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";

const props = defineProps({
  icon: {
    type: String,
    default:
      "M2.049 1.802L5.854 5.15 9.244.976a1 1 0 0 1 1.565.017l3.235 4.156 3.928-3.396a1 1 0 0 1 1.643.9L18.115 13H1.922L.399 2.7a1 1 0 0 1 1.65-.898zM2 14h16v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z",
  },
  text: {
    type: String,
    default: "text",
  },
  length: {
    type: Number,
    default: 0,
  },
  to: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
