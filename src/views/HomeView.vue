<template>
  <div class="bg-slate-100 h-[150vw] dark:bg-slate-900 transit">
    <section>
      <main class="mt-5 md:px-8 relative">
        <div class="h-[500px] absolute md:rounded-xl blurBg w-[95%]"></div>
        <div
          class="h-[500px] md:border md:rounded-xl absolute text-slate-100 w-[95%] backdrop-blur-lg"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          corrupti optio ut et culpa consectetur fugit numquam quaerat
          excepturi. Quod obcaecati pariatur nobis?
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
// @ is an alias to /src
</script>

<style>
.blurBg {
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.247),
      rgba(0, 0, 0, 0.416)
    ),
    url(https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Farweave.net%2Fjm6wD4dL6h-ngCdATOmufSbaYLXsAzCseyOveXnkYk8&w=1920&q=75);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
