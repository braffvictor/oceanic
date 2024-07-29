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
        <div class="mt-3 text-slate-900 dark:text-slate-100">
          <img src="@/assets/qrcode.png" alt="" class="mx-auto text-center" />

          <div class="border rounded-3xl dark:border-slate-500 p-4 mt-6">
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

            <div
              class="mt-2 p-3 rounded-xl bg-gray-200 dark:text-slate-100 text-slate-900 overflow-hidden dark:bg-slate-700 caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:ring-green-400 has-[:focus]:ring-1 outline-none transit relative z-0 flex items-center justify-between overflow-hidden"
            >
              <div>
                <SvgComp
                  icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                  Sclass="max-w-4"
                  class="min-w-5"
                />
              </div>
              <input
                type="tel"
                name="amount"
                id="amount"
                class="block py-2.5 px-0 w-full ml-4 mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                placeholder=" "
                required
              />
              <label
                for="amount"
                class="peer-focus:font-medium left-12 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-12"
                >Deposit Amount in (ETH)</label
              >
              <!-- class="absolute block top-2 text-gray-400 peer-focus:top-0 peer-focus:text-xs left-10 text-left peer-focus:left-8 transit" -->
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { inject, ref } from "vue";

const theme = inject("theme");

const amount = ref("");
</script>

<style></style>
