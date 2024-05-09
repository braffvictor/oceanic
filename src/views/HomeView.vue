<template>
  <div class="bg-white h-auto dark:bg-slate-900 transit">
    <section class="h-svh">
      <main class="md:mt-5 md:px-8 relative h-full -mt-2">
        <!-- div with just image -->
        <div
          class="h-full absolute md:rounded-xl w-[100%] md:w-[95%] transit"
          :style="`background: linear-gradient(
            to bottom,
           ${theme == 'light' || theme == null ? lightShade : darkShade}
          ),
          url(https://solanart.io/_next/image?url=https%3A%2F%2Fapi-v2.solanart.io%2Fcdn%2F500%2Fhttps%3A%2F%2Farweave.net%2Fjm6wD4dL6h-ngCdATOmufSbaYLXsAzCseyOveXnkYk8&w=1920&q=75);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all linear 300ms;`"
        ></div>

        <!-- div with content -->
        <div
          class="h-full md:rounded-xl p-4 px-8 py-16 md:py-8 md:px-12 absolute text-slate-100 w-[100%] md:w-[95%] backdrop-blur-lg"
        >
          <div class="grid md:grid-cols-2">
            <div>
              <p
                class="text-5xl md:text-7xl font-semibold dark:text-slate-100 text-slate-900 transit"
              >
                Trade NFTs <br />at
                <span class="shining uppercase">Lowest</span>
                <br />cost
              </p>
              <p
                class="dark:text-slate-100 text-slate-900 font-thin md:text-2xl my-5 md:my-10"
              >
                Buy or sell NFTs and save in fees. The lowest-fee marketplace on
                Solana.
              </p>

              <!-- login and registration button -->
              <div class="flex mt-4 gap-x-2">
                <d-button
                  type="outlined"
                  class="border-green-500 w-1/4 text-center px-4 !text-green-400 hover:!bg-green-200 dark:!text-green-500 active:!bg-green-300"
                  >Login</d-button
                >
                <d-button
                  type="elevated"
                  class="bg-green-400 dark:bg-green-500 shadow-green-300 hover:scale-105 hover:-translate-y-2 dark:shadow-green-400 active:!bg-green-300"
                />
              </div>
            </div>

            <!-- second div -->
            <div class="h-[110%] mt-12 md:mt-0 border w-10/12 rounded-xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis
              quas tempore quae ipsa, nostrum, enim illo eum debitis, quidem
              molestiae ab ipsam nobis itaque?
            </div>
          </div>
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

const darkShade = ref("rgba(0, 0, 0, 0.247), #0e182f 90%");
const lightShade = ref(" rgba(255, 255, 255, 0.216), white 90%");
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

.shining {
  text-align: center;
  background: linear-gradient(
    90deg,
    #d71ef9 10%,
    #1bee97 40%,
    #0057ff 60%,
    #d71ef9 90%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: shine 6s linear infinite;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: shine;
}
@keyframes shine {
  100% {
    background-position: 200%;
    background-position-x: 200%;
    background-position-y: center;
  }
}
</style>
