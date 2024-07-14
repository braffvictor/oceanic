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
          <button @click="$emit('closeCartList')">
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
          <TransitionGroup name="list">
            <main
              class="flex items-center cursor-pointer justify-between z-50 gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 mt-4 p-2 rounded-xl transit group overflow-auto"
              v-for="cart in cartedNfts"
              :key="cart.name"
            >
              <div class="rounded-xl overflow-hidden">
                <img :src="cart.image_url" class="transit" alt="" width="100" />
              </div>
              <div>
                <p
                  class="font-semibold text-slate-900 dark:text-slate-100 text-sm"
                >
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
                <p class="font-light text-gray-400 flex">
                  {{ cart.stats.floor_eth.toFixed(3) }}ETH
                </p>
              </div>
              <div
                class="group-hover:block hidden px-5 md:px-4 float-end text-right"
              >
                <button @click="removeNft(cart)">
                  <svg-comp
                    Sclass="active:stroke-red-500"
                    icon="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
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
                <p class="font-semibold">{{ totalETH.toFixed(3) }}ETH</p>
                <p class="font-light text-slate-400">
                  ${{
                    totalPrice
                      .toLocaleString()
                      .slice(0, totalPrice.toLocaleString().indexOf(".")) +
                    ".00"
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
    </aside>
  </section>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { onMounted, ref } from "vue";

onMounted(() => {
  checkAmount();
});

const props = defineProps({
  themeState: {
    default: null,
  },
});

let cartedNfts = ref(JSON.parse(localStorage.getItem("watchList")) || []);

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
}

const removeNft = (nft) => {
  const newArr = cartedNfts.value.filter((cartNft) => {
    return nft.name != cartNft.name;
  });
  localStorage.setItem("watchList", JSON.stringify(newArr));
  cartedNfts.value = JSON.parse(localStorage.getItem("watchList")) || [];
  checkAmount();
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
