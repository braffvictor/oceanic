<template>
  <section
    class="inset-0 fixed top-0 left-0 right-0 z-[100] flex justify-center md:items-center items-end transition-all duration-300 ease-out"
    :class="[
      dialog
        ? 'translate-y-0 md:scale-100 opacity-100'
        : 'md:scale-0 md:translate-y-0 translate-y-full opacity-0 bg-transparent',
      loading ? 'bg-[#06061220] backdrop-blur-sm' : '',
    ]"
  >
    <main
      class="md:h-4/5 overflow-y-auto w-full md:w-6/12 bg-slate-100 dark:bg-slate-900 pt-2 md:pb-2 pb-3 md:rounded-2xl"
      :class="screen ? 'h-full rounded-none' : 'h-auto rounded-t-2xl'"
    >
      <div class="flex justify-between items-center px-3 md:px-6 py-1">
        <p class="font-semibold">{{ title }}</p>

        <button @click="$emit('closeDialog')">
          <svg-comp
            Sclass="active:stroke-red-500"
            icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
          />
        </button>
      </div>

      <!-- divider -->
      <div
        class="border-b border w-full"
        :class="
          theme == 'light' || theme == null
            ? 'whiteT border-b-gray-200'
            : 'darkT border-b-gray-600'
        "
      ></div>
      <!-- to show the deposit props -->
      <Depositprops
        :transact="data"
        v-if="data && data.category == 'deposits'"
      />

      <withdrawprops
        :transact="data"
        v-if="data && data.category == 'withdraws'"
      />

      <Nftprops :nft="data" v-if="data && data.category == 'nfts'" />

      <AddWallet
        v-if="data && data.category == 'wallet'"
        @closeDialog="$emit('closeDialog')"
      />

      <EditBalance
        :user="data.user"
        v-if="data && data.category == 'edit'"
        @closeDialog="$emit('closeDialog')"
      />

      <div class="text-right float-end px-3 md:px-6 mt-3 hidden md:block">
        <p
          class="bg-slate-900 p-3 rounded-md cursor-pointer active:scale-75 transit dark:bg-slate-100 text-slate-100 dark:text-slate-900"
          @click="$emit('closeDialog')"
        >
          Close
        </p>
      </div>
    </main>
  </section>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import { inject, ref, watch } from "vue";
import Depositprops from "../extUtils/depositprops.vue";
import Withdrawprops from "../extUtils/withdrawprops.vue";
import Nftprops from "../extUtils/nftprops.vue";
import AddWallet from "../extUtils/addWallet.vue";
import EditBalance from "../extUtils/editBalance.vue";

const theme = inject("theme");

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  screen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Transaction",
  },
});
</script>

<style></style>
