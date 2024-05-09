<template>
  <div
    class="home bg-slate-100 h-screen dark:bg-slate-900 text-center mx-auto transition-all ease-linear duration-500 peer/red"
  >
    <!-- <button
    class="p-4 transition-all ease-linear duration-500 border-blue-300 bg-blue-100 box-content outline-none peer-hover/red:!text-purple-900 dark:bg-slate-600 dark:text-white"
    >
    red
  </button> -->
    <DButton class="mt-12" type="filled" to="/about"> Register With Us</DButton>
    <div
      class="mt-12 bg-[url('https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Farweave.net%2Fjm6wD4dL6h-ngCdATOmufSbaYLXsAzCseyOveXnkYk8&w=1920&q=75')] w-full h-full bg-no-repeat"
    >
      <svg-comp />
    </div>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
// @ is an alias to /src
</script>
