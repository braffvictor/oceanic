<template>
  <div>
    <section
      class="dark:p-2 group mt-2 dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[55px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
      :class="[
        !type || type == 'default'
          ? 'bg-transparent hover:border-b-gray-700 dark:hover:border-b-gray-400 dark:border-b-gray-600 border-b-gray-400 border-b hov'
          : '',
        type == 'outlined'
          ? 'rounded-lg dark:border-gray-600 border bg-transparent hover:border-gray-500 border-gray-400 dark:hover:border-slate-400 p-2'
          : '',
        type == 'filled'
          ? 'bg-slate-200 dark:bg-slate-900 rounded-tl-lg rounded-tr-lg border-b dark:border-b-gray-600 hover:border-b-gray-600 border-b-gray-400 dark:hover:bg-slate-800 hover:bg-slate-200 p-2 '
          : '',
      ]"
    >
      <div v-if="icon">
        <SvgComp
          :icon="iconType"
          Sclass="group-has-[:focus]:stroke-green-500"
          class=""
        />
      </div>
      <div class="relative w-full">
        <input
          :type="inputType"
          :name="name"
          :id="name"
          v-model="input"
          @keyup.self="emitProperties($event)"
          @keyup="$emit('emitInput', input)"
          class="block px-0 w-full pt-3 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
          placeholder=" "
          required
        />
        <label
          :for="name"
          class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
          >{{ label }}</label
        >
      </div>
    </section>
    <p
      class="text-xs text-red-500 transit mt-3 text-center"
      :class="err ? 'transit ' : 'scale-y-0 transit'"
    >
      {{ err }}
    </p>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import { ref } from "vue";

const input = ref("");
const emit = defineEmits(["emitProps", "emitInput"]);

function emitProperties(event) {
  if (props.chips && input.value.includes(" ") && input.value.length > 1) {
    emit("emitProps", input);
    input.value = "";
  }
}

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  icon: {
    type: Boolean,
    default: false,
  },
  iconType: {
    type: String,
    default:
      "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z",
  },
  label: {
    type: String,
    default: "Label?",
  },
  inputType: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "name",
  },
  err: {
    type: String,
    default: "",
  },
  chips: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
