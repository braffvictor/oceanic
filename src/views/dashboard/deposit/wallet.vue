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
          <p class="text-center w-full font-semibold">Deposit Ethereum</p>
        </div>
      </DDashbar>

      <section>
        <div class="mt-5 text-slate-900 dark:text-slate-100">
          <div class="mx-auto text-center">
            <div
              class="overflow-hidden rounded-lg border inline-block mx-auto text-center"
            >
              <img
                src="@/assets/qrcode.png"
                alt=""
                class="mx-auto text-center"
              />
            </div>
          </div>

          <div class="rounded-3xl dark:border-slate-500 p-4 mt-6">
            <p class="opacity-55 text-sm">Network</p>
            <p class="opacity-85 font-semibold">Ethereum (ERC20)</p>

            <!-- divider -->
            <div
              class="border-b w-full my-3"
              :class="
                theme == 'light' || theme == null
                  ? 'whiteT border-b-gray-200'
                  : 'darkT border-b-gray-600'
              "
            ></div>

            <p class="opacity-55 text-sm">Deposit Address</p>
            <p class="opacity-85 font-semibold break-words">
              KJJjhJHlhLHbHJHhklJLBUIghjHy685tgiI76tgibkT6885rfuv
            </p>
          </div>

          <!-- form like -->
          <section class="px-4">
            <!-- the amount paid in ethereum -->
            <div
              class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
            >
              <div>
                <SvgComp
                  icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                  Sclass="group-has-[:focus]:stroke-green-500"
                  class=""
                />
              </div>
              <div class="relative w-full">
                <input
                  type="number"
                  name="amount"
                  v-model="amount"
                  id="amount"
                  class="block px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="amount"
                  class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
                  >Deposit Amount in (ETH)</label
                >
              </div>
            </div>
            <p
              class="mt-1 text-xs font-light font-sans text-center"
              :class="amount ? ' transit' : 'scale-y-0 transit '"
            >
              Dollar Conversion : {{ convertAmount }}
            </p>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, ref } from "vue";

const theme = inject("theme");

const amount = ref("");

const convertAmount = computed(() => {
  const dollars = Number(amount.value) * 3043;
  return amount.value ? `$${dollars.toLocaleString()}` : "";
});
</script>

<style></style>
