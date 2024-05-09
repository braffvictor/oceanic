<template>
  <div class="bg-slate-100 h-auto dark:bg-slate-900 transit">
    <section class="h-svh">
      <main class="md:mt-5 md:px-8 relative h-full">
        <div
          class="h-full absolute md:rounded-xl w-[100%] md:w-[95%] transit"
          :style="`background: linear-gradient(
            to bottom,
           ${theme == 'light' || theme == null ? lightShade : darkShade}
          ),
          url(https://ipfs.io/ipfs/QmYmce6oPzkCZhPM9mB8874i1ywx3c4P2ogsPp5YFCc5H3);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;`"
        ></div>
        <div
          class="h-full md:rounded-xl absolute text-slate-100 w-[100%] md:w-[95%] backdrop-blur-lg"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          corrupti optio ut et culpa consectetur fugit numquam quaerat
          excepturi. Quod obcaecati pariatur nobis?
          {{ theme }}
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
// @ is an alias to /src
import { inject, ref } from "vue";

const theme = inject("theme");

const darkShade = ref("rgba(0, 0, 0, 0.247), rgba(0, 0, 0, 0.416)");
const lightShade = ref(
  " rgba(255, 255, 255, 0.216), rgba(255, 255, 255, 0.253)"
);
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
.blurB {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.216),
      rgba(255, 255, 255, 0.253)
    ),
    url(https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Farweave.net%2Fjm6wD4dL6h-ngCdATOmufSbaYLXsAzCseyOveXnkYk8&w=1920&q=75);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
