<template>
  <main class="sticky py-4 top-0 z-10 bg-slate-50 dark:bg-slate-900 transit">
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
          v-if="theme != 'light' && theme != null"
          class="p-2 rounded-lg transit active:animate-spin"
        >
          <img
            src="@/assets/svg/lightmode.svg"
            class="max-w-5"
            alt="light Mode"
          />
        </button>
        <button
          v-if="theme != 'dark'"
          class="p-2 rounded-lg transit active:animate-ping relative"
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
import { inject } from "vue";

const theme = inject("theme");
</script>

<style></style>
