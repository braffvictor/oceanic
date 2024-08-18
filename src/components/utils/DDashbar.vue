<template>
  <main
    class="sticky py-4 top-0 px-3 z-10 bg-slate-50 dark:bg-slate-900 transit"
  >
    <div class="flex items-center justify-between">
      <slot>
        <div class="text-gray-400 text-sm md:text-lg">
          Welcome,
          <p
            class="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Swae Dave👋
          </p>
        </div>
      </slot>

      <!-- essentials -->
      <p class="text-lg flex items-center min-h-10 min-w-16">
        <button
          v-if="
            userflowing.themeState != 'light' && userflowing.themeState != null
          "
          class="p-2 rounded-lg transit active:animate-spin"
          @click="userflowing.changeTheme('light')"
        >
          <img
            src="@/assets/svg/lightmode.svg"
            class="max-w-5"
            alt="light Mode"
          />
        </button>
        <button
          v-if="userflowing.themeState != 'dark'"
          class="p-2 rounded-lg transit active:animate-ping relative"
          @click="userflowing.changeTheme('dark')"
        >
          <img
            src="@/assets/svg/darkmode.svg"
            class="max-w-5 transform -rotate-45"
            alt="dark mode"
          /></button
        >🔔
      </p>
    </div>
  </main>
</template>

<script setup>
import { userflow } from "@/stores/userflow";
import { inject, ref } from "vue";

const theme = inject("theme");

const userflowing = userflow();
</script>

<style></style>
