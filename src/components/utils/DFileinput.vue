<template>
  <div>
    <!-- the proof of payment in ethereum -->
    <section class="pb-4">
      <label
        :for="name"
        class="group hover:border-b-gray-700 dark:hover:border-b-gray-600 dark:hover:bg-slate-700 mt-2 p-1 dark:bg-slate-800 rounded-tl-lg rounded-tr-lg dark:p-2 dark:border-gray-600 border-b border-gray-400 bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[55px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
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
            type="file"
            :name="name"
            @change="
              (event) => (
                (file = event.target.files[0]), $emit('emitPhoto', file)
              )
            "
            :id="name"
            class="cursor-pointer file:bg-transparent file:w-0 file:px-0 file:mx-0 file:border-0 px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
            placeholder=""
            required
          />
          <label
            for="amount"
            class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
            >{{ label }}</label
          >
        </div>
      </label>

      <p
        class="text-xs text-red-500 transit mt-3 text-center"
        :class="err ? 'transit ' : 'scale-y-0 transit'"
      >
        {{ err }}
      </p>

      <!-- the image proof displayed
            <div class="mx-auto text-center mt-5" v-if="proof">
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
            </div> -->
    </section>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import { ref } from "vue";

const file = ref(null);

const props = defineProps({
  label: {
    type: String,
    default: "Label??",
  },
  name: {
    type: String,
    default: "label",
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
  err: {
    type: String,
    default: "Error is required",
  },
});
</script>

<style></style>
