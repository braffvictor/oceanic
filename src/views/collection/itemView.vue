<template>
  <div class="px-4 md:px-7 bg-slate-100 dark:bg-slate-900 transit">
    <section class="">
      <main class="flex-col md:flex-row flex gap-5">
        <div
          class="border rounded-2xl overflow-hidden dark:bg-slate-800 border-gray-300 dark:border-gray-600 border transit"
        >
          <p class="p-2 text-slate-900 dark:text-slate-100">ETH</p>
          <img
            src="https://i.seadn.io/s/raw/files/3a6aec32ee049454380cbce32365433d.png?auto=format&dpr=1&w=1000"
            alt=""
            width="500"
          />
        </div>
        <div class="rounded-2xl md:w-8/12 w-full p-2">
          <p class="text-green-400 dark:text-green-500 font-normal text-lg">
            Kanpai Pandas<img
              src="@/assets/verified.svg"
              alt="tick"
              class="max-w-5 inline pl-1"
            />
          </p>
          <p
            class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 mt-2"
          >
            Kanpai Panda
          </p>
          <p class="mt-2 font-light text-slate-900 dark:text-slate-100">
            Owned by voberoi
          </p>

          <span class="text-slate-900 dark:text-slate-100"> 12</span>
          <span class="text-slate-900 dark:text-slate-100"> 12</span>
          <span class="text-slate-900 dark:text-slate-100"> 12</span>

          <div
            class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
          >
            <p class="text-slate-800 dark:text-slate-50 text-sm">Best offer</p>
            <p
              class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100"
            >
              0.6161 WETH <span class="text-sm text-gray-400">$2,084.90</span>
            </p>
            <div class="flex gap-4 mt-3">
              <DButton class="w-full" type="outlined"
                >Buy Now For 0.112ETH</DButton
              >
              <DButton class="w-full">Cart Kanpai Panda</DButton>
            </div>
          </div>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
</script>

<style></style>
