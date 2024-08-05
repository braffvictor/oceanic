<template>
  <main class="min-h-screen md:w-10/12 mx-auto">
    <DDashbar>
      <div class="w-full flex justify-between items-center">
        <button
          @click="$router.go(-1)"
          class="rounded-full bg-slate-50 dark:bg-slate-900 active:scale-75 border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
          :class="[
            theme == 'light' || theme == null
              ? ' border-gray-200'
              : ' border-gray-600',
          ]"
        >
          <SvgComp
            Sclass="rotate-180"
            class="pb-1 pr-1"
            icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          />
        </button>
        <p class="text-center w-full font-semibold">Cart List</p>
      </div>
    </DDashbar>

    <div
      class="text-slate-900 transit dark:text-slate-100 col-start-3 bg-transparent"
    >
      <div class="flex justify-between items-center mt-3 text-lg">
        <p class="font-semibold">
          {{
            cartedNfts && cartedNfts.length > 0
              ? cartedNfts && cartedNfts.length
              : "0"
          }}
          item{{ cartedNfts && cartedNfts.length > 1 ? "s" : "" }}
        </p>
        <p
          class="font-semibold active:text-green-600 text-sm active:scale-95 transit text-red-400 dark:text-red-500"
          @click="clearList"
          v-if="cartedNfts && cartedNfts.length > 0"
        >
          Clear all
        </p>
      </div>

      <!-- divider -->
      <div
        class="border-b border w-full my-4"
        :class="
          theme == 'light' || theme == null
            ? 'whiteT border-b-gray-200'
            : 'darkT border-b-gray-600'
        "
      ></div>

      <!-- todo carted nfts List -->
      <div v-if="cartedNfts && cartedNfts.length > 0">
        <TransitionGroup name="list">
          <main
            class="flex min-h-24 items-center cursor-pointer justify-between z-50 gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 mt-4 p-3 rounded-xl transit group overflow-visible"
            v-for="cart in cartedNfts"
            :key="cart.name"
          >
            <div class="rounded-xl overflow-hidden">
              <img :src="cart.image_url" class="transit" alt="" width="100" />
            </div>
            <div class="w-full">
              <p
                class="font-semibold text-slate-900 dark:text-slate-100 text-sm md:"
              >
                {{
                  cart.name.length >= 25
                    ? cart.name.slice(0, 25) + "..."
                    : cart.name
                }}
              </p>
              <p class="font-light text-slate-900 dark:text-slate-100">
                {{
                  cart.collection.length >= 20
                    ? cart.collection.slice(0, 20) + "..."
                    : cart.collection
                }}<img
                  src="@/assets/verified.svg"
                  alt="tick"
                  class="max-w-4 inline"
                />
              </p>
            </div>
            <div class="group-hover:hidden transit">
              <p class="font-light text-gray-400 flex">
                {{ cart.stats.floor_eth.toFixed(3) }}ETH
              </p>
            </div>
            <div
              class="mx-auto text-center md:px-4 relative group-hover:block hidden transit"
            >
              <svg-comp
                icon="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
                class="mx-auto text-center w-full peer md:p-4 p-2"
                Sclass="mx-auto text-center"
              />
              <!-- options for nft menu -->
              <div
                class="absolute shadow-md h-auto -left-10 md:left-4 transit top-10 md:text-base text-sm md:text- font-normal z-20 w-24 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col divide-y p-1 scale-y-0 peer-hover:scale-y-100 -translate-y-full divide-slate-900 dark:divide-slate-100 divide-opacity-20 dark:divide-opacity-45 peer-hover:-translate-y-0 md:translate-y-0 opacity-0 peer-hover:opacity-100 gap-y-2 peer-hover:block py-2 hover:scale-100 hover:-translate-y-0 hover:block md:hover:opacity-100"
              >
                <p class="p-1 active:bg-slate-200 dark:active:bg-slate-700">
                  Buy
                </p>
                <p class="p-1 text-red-500" @click="removeNft(cart)">Remove</p>
              </div>
            </div>
          </main>

          <!-- divider -->
          <div
            class="border-b border w-full mt-4"
            :class="
              theme == 'light' || theme == null
                ? 'whiteT border-b-gray-200'
                : 'darkT border-b-gray-600'
            "
          ></div>

          <!-- total price of all carted nfts -->
          <div class="flex justify-between mt-4">
            <p class="font-semibold">Total Price</p>
            <div class="font-semibold">
              <p class="font-semibold">{{ totalETH.toFixed(3) }}ETH</p>
              <p class="font-light text-slate-400">
                ${{
                  totalPrice
                    .toLocaleString()
                    .slice(0, totalPrice.toLocaleString().indexOf(".")) + ".00"
                }}
              </p>
            </div>
          </div>

          <div class="w-full mt-4 mb-6">
            <d-button
              type="elevated"
              class="shadow-green-400 w-full bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
              >Complete purchase</d-button
            >
          </div>
        </TransitionGroup>
      </div>
    </div>
  </main>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";

import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { inject, onMounted, ref } from "vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import { collection } from "firebase/firestore";

onMounted(() => {
  checkAmount();
});

const theme = inject("theme");

let cartedNfts = ref(JSON.parse(localStorage.getItem("watchList")) || []);
const userflowing = userflow();

//to round up the total amount
let totalETH = ref(0);
let totalPrice = ref(0);

function checkAmount() {
  totalETH.value = 0;
  totalPrice.value = 0;
  if (cartedNfts.value.length > 0) {
    cartedNfts.value.forEach((cart) => {
      totalETH.value += cart.stats.floor_eth;
      totalPrice.value += cart.stats.floor_price;
    });
    // console.log(totalETH.value);
    // console.log(totalPrice.value);
  }
}

console.log(cartedNfts.value[0]);
function clearList() {
  localStorage.removeItem("watchList");
  cartedNfts.value = ref(JSON.parse(localStorage.getItem("watchList")) || []);
  userflowing.checkLocalStorage(
    JSON.parse(localStorage.getItem("watchList") || "[]")?.length
  );
}

const removeNft = (nft) => {
  const newArr = cartedNfts.value.filter((cartNft) => {
    return nft.name != cartNft.name;
  });
  localStorage.setItem("watchList", JSON.stringify(newArr));
  cartedNfts.value = JSON.parse(localStorage.getItem("watchList")) || [];
  checkAmount();
  userflowing.checkLocalStorage(
    JSON.parse(localStorage.getItem("watchList") || "[]")?.length
  );
};
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

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px), translateY(20px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
