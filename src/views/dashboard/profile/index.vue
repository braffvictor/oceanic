<template>
  <div class="min-h-auto pb-10">
    <main class="md:w-10/12 mx-auto">
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
          <p class="text-center w-full font-semibold">Profile</p>
        </div>
      </DDashbar>

      <section class="transit mt-3 px-3">
        <!-- circle div -->
        <div class="mx-auto text-center">
          <div
            class="flex justify-center shadow-md items-center text-[60px] md:text-[80px] font-bold h-60 w-60 dark:border-gray-600 rounded-full mx-auto text-center bg-gradient-to-b from-green-100 transit via-purple-100 to-slate-50 dark:from-emerald-600 dark:to-slate-900 to-100%"
          >
            <p>D S</p>
          </div>
        </div>

        <main class="mt-8 md:w-6/12 mx-auto text-center transit">
          <section
            class="grid grid-cols-2 md:grid-cols-4 justify-center items-center *:w-full gap-2"
          >
            <DButton type="outlined"
              >Collection
              <p class="text-green-500">0</p>
            </DButton>
            <DButton type="outlined"
              >Uploaded
              <p class="text-green-500">0</p>
            </DButton>
            <DButton type="outlined"
              >Bought
              <p class="text-green-500">0</p>
            </DButton>
            <DButton type="outlined"
              >All
              <p class="text-green-500">0</p>
            </DButton>
          </section>

          <section class="mt-4 transit">
            <p class="text-gray-500 dark:text-gray-400 text-left">
              Personal Details
            </p>
            <div
              class="rounded-xl transit bg-slate-100 dark:bg-slate-800 h-auto w-full shadow text-left p-4"
            >
              <p>Name: David Swae</p>
              <p class="my-2">Email: dave@gmail.com</p>
              <p>Username: swaedavid</p>
            </div>

            <div class="mt-4 rounded-xl">
              <DButton
                class="w-full bg-red-500 text-white !shadow-red-500"
                to="/"
                type="elevated"
                >Log Out</DButton
              >
            </div>
          </section>
        </main>
      </section>
    </main>
  </div>
</template>

<script setup>
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { inject } from "vue";
import DButton from "@/components/utils/DButton.vue";

const theme = inject("theme");
</script>

<style></style>
