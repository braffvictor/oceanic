<template>
  <div class="min-h-screen">
    <main class="md:w-8/12 mx-auto">
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
          <p class="text-center w-full font-semibold">Crypto Withdrawal</p>
        </div>
      </DDashbar>

      <section
        class="border-green-400 border-2 bg-green-50 dark:bg-green-200 transit dark:border-green-500 rounded-xl p-3 flex mt-5 gap-4"
      >
        <SvgComp
          icon="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.99,10 L11,10 C10.4477,10 10,10.4477 10,11 C10,11.51285 10.386027,11.9355092 10.8833761,11.9932725 L11,12 L11,16.99 C11,17.5106133 11.3938293,17.9392373 11.8999333,17.9940734 L12.01,18 L12.5,18 C13.0523,18 13.5,17.5523 13.5,17 C13.5,16.6710222 13.3411062,16.3791012 13.0958694,16.1968582 L13,16.1338 L13,11.01 C13,10.4893867 12.6060836,10.0607627 12.1000493,10.0059266 L11.99,10 Z M12,7 C11.4477,7 11,7.44772 11,8 C11,8.55228 11.4477,9 12,9 C12.5523,9 13,8.55228 13,8 C13,7.44772 12.5523,7 12,7 Z"
          Sclass="!stroke-green-500 dark:!stroke-green-600"
        />
        <p class="text-green-500 dark:text-green-600 font-thin text-sm">
          Dear Swae David, Please Kindly Activate Your Account By Contacting
          Support In order to Withdraw your funds.
        </p>
      </section>

      <section class="mt-5">
        <form action="">
          <!-- form like -->
          <section class="px-1">
            <!-- the crypto paid in ethereum -->
            <div
              class="group mt-2 p-3 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
            >
              <!-- for selecting the crypto currency -->
              <div
                class="absolute group-abs z-10 hidden group-hover:block group-hover:opacity-100 opacity-0 transit bg-slate-100 dark:bg-slate-800 shadow-xl rounded-lg -top-1 left-0 right-0 w-full py-3 h-auto"
              >
                <div class="w-full cursor-pointer">
                  <p
                    class="font-semibold p-3 hover:bg-slate-200 dark:hover:bg-slate-700 transit"
                    v-for="cryp in cryptoCurrencies"
                    :key="cryp.name"
                    @click="crypto = cryp.name"
                  >
                    {{ cryp.name }}
                  </p>
                </div>
              </div>

              <div class="relative w-full">
                <input
                  type="text"
                  name="crypto"
                  v-model="crypto"
                  id="crypto"
                  class="block px-0 w-full mt-2 disabled:opacity-100 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                  required
                  disabled
                />
                <label
                  for="crypto"
                  class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
                  >Select Crypto</label
                >
              </div>
              <div>
                <SvgComp
                  Sclass="rotate-360"
                  class="pb-1 pr-1"
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                />
              </div>
            </div>
          </section>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, ref } from "vue";

const theme = inject("theme");

const crypto = ref("red");
const show = ref(false);

const cryptoCurrencies = computed(() => {
  return [
    {
      name: "Bitcoin",
    },
    {
      name: "Ethereum",
    },
    {
      name: "USDT",
    },
    {
      name: "Litecoin",
    },
  ];
});
</script>

<style></style>
