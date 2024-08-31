<template>
  <div
    class="flex items-center justify-center min-h-screen text-slate-400 bg-slate-50 dark:bg-slate-900"
  >
    <main class="h-full w-full bg-slate-50 dark:bg-slate-900">
      <div class="text-center flex justify-center item-center">
        <p class="text-9xl font-semibold">4</p>
        <div>
          <img
            src="https://opensea.io/static/images/404-compass-full.gif"
            alt=""
            width="100"
          />
        </div>
        <p class="text-9xl font-semibold">4</p>
      </div>
      <p
        class="font-bold text-center text-2xl md:3xl text-slate-900 dark:text-slate-100"
      >
        This page is lost.
      </p>
      <p
        class="text-slate-700 text-center dark:text-slate-100 text-lg md:text-xl mx-3"
      >
        We've explored deep and wide, but we can't find the page you were
        looking for.
      </p>
      <div class="text-center mx-auto">
        <d-button
          type="elevated"
          to="/"
          class="bg-green-500 mt-5 !text-slate-50 shadow-green-500 w-80 mx-auto text-center"
          >Navigate Back Home</d-button
        >
      </div>
    </main>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
</script>

<style></style>
