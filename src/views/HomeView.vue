<template>
  <div class="bg-white h-auto dark:bg-slate-900 transit font-mono">
    <section class="h-svh">
      <main class="md:mt-9 md:px-8 relative h-full -mt-4">
        <!-- div with just image -->

        <div
          class="h-[50em] md:h-[35em] md:rounded-xl w-[100%] md:w-[100%] transit"
          :style="`background: linear-gradient(
            to bottom,
           ${theme == 'light' || theme == null ? lightShade : darkShade}
          ),
         url(https://i.seadn.io/gcs/files/4f627345f3a6a7718d447fd148052ee1.png?w=500&auto=format);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all linear 300ms`"
        ></div>

        <div
          class="h-full md:rounded-xl p-4 px-8 py-16 md:py-8 md:px-12 absolute top-0 text-slate-100 w-[100%] md:w-[95%] backdrop-blur-lg"
        >
          <div class="grid md:grid-cols-2">
            <div>
              <p
                class="text-5xl md:text-7xl font-semibold dark:text-slate-100 text-slate-900 transit"
              >
                Trade NFTs<br />at
                <span class="shining uppercase font-semibold">Lowest</span>
                <br />cost
              </p>
              <p
                class="dark:text-slate-100 text-slate-900 md:text-2xl my-5 md:my-10"
              >
                Buy or sell NFTs and save in fees. The lowest-fee marketplace on
                Solana.
              </p>

              <!-- login and registration button -->
              <div class="flex mt-4 gap-x-2">
                <d-button
                  to="/about"
                  type="outlined"
                  class="border-slate-700 active:!bg-slate-50 text-center dark:border-slate-100 px-4 !text-slate-700 dark:!text-slate-100 hover:!bg-slate-50 dark:hover:!bg-slate-900 !bg-green-200 hover:scale-105 hover:-translate-y-2"
                  >Login</d-button
                >
                <d-button
                  type="elevated"
                  class="bg-green-400 dark:bg-green-500 shadow-green-300 hover:scale-105 hover:-translate-y-2 dark:shadow-green-400 active:!bg-green-300"
                />
              </div>
            </div>

            <!-- second div -->
            <div
              class="md:h-[103%] h-[90%] mx-auto text-center mt-12 md:mt-0 w-10/12 rounded-xl p-4 dark:text-slate-100 text-slate-900 bg-center"
              :class="
                theme == 'light' || theme == null
                  ? 'border border-slate-100'
                  : 'border border-gray-600'
              "
              :style="`
                background: linear-gradient(
                    to bottom,
                    ${
                      theme == 'light' || theme == null
                        ? lightShade2
                        : darkShade2
                    }
                  );
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;`"
            >
              <img
                src="https://i.seadn.io/gcs/files/4f627345f3a6a7718d447fd148052ee1.png?w=500&auto=format"
                alt=""
                class="rounded-xl hover:scale-[1.05] hover:-translate-y-5 transit mx-auto text-center"
              />
              <p class="text-green-400 text-left mt-2">
                Solaan Monkey Business
              </p>
              <div class="flex justify-between">
                <p>SMB #1695</p>
                <p>380</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>

    <section class="h-screen bg-white w-full"></section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
// @ is an alias to /src
import { inject, ref } from "vue";

const theme = inject("theme");

const darkShade = ref("rgba(0, 0, 0, 0.247), #0e182f 90%");
const lightShade = ref("rgba(255, 255, 255, 0.216), white 90%");

// const darkShade2 = ref("rgba(0, 0, 0, 0.247), rgba(0, 0, 0, 0.247)");
const lightShade2 = ref(
  "rgba(255, 255, 255, 0.216), rgba(255, 255, 255, 0.216)"
);
const darkShade2 = ref("rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)");
</script>

<style>
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
