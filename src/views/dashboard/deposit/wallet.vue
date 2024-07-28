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
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { inject } from "vue";

const theme = inject("theme");
</script>

<style></style>
