<template>
  <div class="relative">
    <main
      class="group mt-2 dark:p-2 z-0 dark:text-slate-100 text-slate-900 caret:slate-700 dark:caret-slate-100 h-[55px] has-[:focus]:border-b-green-500 outline-none transit relative flex items-center gap-x-3"
      @click="$emit('openMenu')"
      :class="[
        !type || type == 'default'
          ? 'bg-transparent hover:border-b-gray-700 dark:hover:border-b-gray-400 dark:border-b-gray-600 border-b-gray-400 border-b hov'
          : '',
        type == 'outlined'
          ? 'rounded-lg dark:border-gray-600 border bg-transparent hover:border-gray-500 border-gray-400 dark:hover:border-slate-400 p-2'
          : '',
        type == 'filled'
          ? 'bg-slate-200 dark:bg-slate-900 rounded-tl-lg rounded-tr-lg border-b dark:border-b-gray-600 hover:border-b-gray-600  border-b-gray-400 dark:hover:bg-slate-800 hover:bg-slate-200 p-2'
          : '',
        err ? '!border-red-500 !border-b' : '',
      ]"
    >
      <div class="w-full relative">
        <input
          class="cursor-pointer placeholder:text-gray-500 placeholder:text-sm dark:placeholder:text-gray-400 text-sm bg-transparent outline-none w-full"
          :class="err ? 'placeholder:!text-red-500' : null"
          type="text"
          v-model="input"
          :name="name"
          :id="name"
          readonly
          :placeholder="placeholder"
        />
      </div>

      <div>
        <SvgComp
          Sclass="rotate-360 group-hover:rotate-90"
          class="pt-1 pl-1"
          icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        />
      </div>
    </main>
    <p
      class="text-xs text-red-500 transit mt-3 text-center"
      :class="err ? 'transit ' : 'scale-y-0 transit'"
    >
      {{ err }}
    </p>

    <!-- list of avaibable cryptoCurrencies -->
    <main
      v-if="lists.length > 0"
      class="absolute w-full -top-1 left-0 shadow-md bg-slate-100 dark:bg-slate-800 rounded-lg transit overflow-hidden z-10"
      :class="
        show ? 'transit h-auto py-1 ' : 'h-0 py-0 overflow-hidden opacity-0'
      "
    >
      <p
        class="hover:bg-slate-200 font-semibold dark:hover:bg-slate-700 my-3 px-3 py-2 transit active:bg-slate-200 dark:active:bg-slate-700 cursor-pointer"
        v-for="list in lists"
        :key="list.name"
        @click="
          $emit('closeMenu'), (input = list.name), $emit('emitInput', input)
        "
      >
        {{ list.name }}
      </p>
    </main>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, inject, ref } from "vue";

const input = ref("");

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  show: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "label",
  },
  placeholder: {
    type: String,
    default: "Select Something",
  },
  err: {
    type: String,
    default: "Error is required",
  },
  lists: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
</script>

<style></style>
