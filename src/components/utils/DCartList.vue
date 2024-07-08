<template>
  <section
    class="transit inset-0 fixed overflow-auto top-0 left-0 z-20 min-h-screen h-auto scrolls"
    @click="$emit('closeSearchBar')"
  >
    <aside
      class="backdrop-blur-md grid md:grid-cols-3 md:px-3 transit min-h-screen h-auto scrolls"
    >
      <div
        class="text-slate-900 transit w-screen md:w-auto dark:text-slate-100 pt-4 mt-16 md:mt-20 px-4 col-start-3 bg-slate-100 dark:bg-slate-800 md:rounded-xl"
      >
        <!-- top text and close icon -->
        <div class="flex justify-between my-2">
          <p class="font-semibold text-xl md:text-2xl">Your Cart</p>
          <!-- close icon -->
          <button @click="$emit('closeCartList'), (num = 1)">
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
            themeState == 'light' || themeState == null
              ? 'whiteT border-b-gray-200'
              : 'darkT border-b-gray-600'
          "
        ></div>

        <div class="flex justify-between mt-3 text-lg mt-3">
          <p class="font-semibold">
            {{
              cartedNfts && cartedNfts.length > 0
                ? cartedNfts && cartedNfts.length
                : "0"
            }}
            item{{ cartedNfts && cartedNfts.length > 1 ? "s" : "" }}
          </p>
          <p
            class="font-semibold active:text-green-600 active:text-lg active:scale-95 transit"
            @click="clearList"
            v-if="cartedNfts && cartedNfts.length > 0"
          >
            Clear all
          </p>
        </div>

        <!-- todo carted nfts List -->
        <div v-if="cartedNfts && cartedNfts.length > 0">
          <main
            class="flex items-center cursor-pointer justify-between z-50 gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 mt-4 p-2 rounded-xl transit group overflow-auto"
            v-for="cart in cartedNfts"
            :key="cart.name"
          >
            <div class="rounded-xl overflow-hidden">
              <img :src="cart.image_url" class="transit" alt="" width="100" />
            </div>
            <div>
              <p class="font-semibold text-slate-900 dark:text-slate-100">
                {{ cart.name }}
              </p>
              <p class="font-light text-slate-900 dark:text-slate-100">
                {{ cart.collection }}
                <img
                  src="@/assets/verified.svg"
                  alt="tick"
                  class="max-w-5 inline pl-1"
                />
              </p>
            </div>
            <div class="group-hover:hidden">
              <p class="font-light text-gray-400 flex">{{ cart.identifier }}</p>
            </div>
            <div
              class="group-hover:block hidden px-5 md:px-4 float-end text-right"
            >
              <button>
                <svg-comp
                  Sclass="active:stroke-red-500"
                  icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
                />
              </button>
            </div>
          </main>

          <!-- divider -->
          <div
            class="border-b border w-full mt-4"
            :class="
              themeState == 'light' || themeState == null
                ? 'whiteT border-b-gray-200'
                : 'darkT border-b-gray-600'
            "
          ></div>

          <!-- total price of all carted nfts -->
          <div class="flex justify-between mt-4">
            <p class="font-semibold">Total Price</p>
            <div class="font-semibold">
              <p class="font-semibold">0.0035ETH</p>
              <p class="font-thin text-slate-400">$10.36</p>
            </div>
          </div>

          <div class="w-full mt-4 mb-6">
            <d-button
              type="elevated"
              class="shadow-green-400 w-full bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
              >Complete purchase</d-button
            >
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { ref } from "vue";

const props = defineProps({
  themeState: {
    default: null,
  },
});

let cartedNfts = ref(JSON.parse(localStorage.getItem("watchList")) || []);
function clearList() {
  localStorage.removeItem("watchList");
  cartedNfts.value = ref(JSON.parse(localStorage.getItem("watchList")) || []);
}

const num = ref(1);
</script>

<style scoped>
.whiteT {
  background: rgba(255, 255, 255, 0.241);
}

.darkT {
  background: rgba(15, 23, 42, 0.321);
}

.scrolls::-webkit-scrollbar {
  width: 100%;
  height: 0%;
}
.scrolls::-webkit-scrollbar-track {
  background-color: rgba(180, 140, 252, 0.1);
  border-radius: 100%;
}
.scrolls::-webkit-scrollbar-thumb {
  background: rgba(180, 140, 252, 0.1);
  border-radius: 100%;
}
.scrolls::-webkit-scrollbar-corner {
  border-radius: 100%;
  background: rgba(180, 140, 252, 0.1);
}
.scrolls {
  transition: all 1s;
}
.scrolling {
  transition: all 1s;
}
</style>
