<template>
  <div class="bg-white h-auto dark:bg-slate-900 transit font-mono">
    <section class="h-svh">
      <main class="md:px-8 relative h-full -mt-4 md:mt-8">
        <!-- div with just image -->

        <div
          class="h-[50em] md:h-[35em] md:rounded-xl w-[100%] md:w-[100%] transit"
          :style="`background: linear-gradient(
            to bottom,
           ${theme == 'light' || theme == null ? lightShade : darkShade}
          ),
         url(${nftApiCollection[0].image_url});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all linear 300ms`"
          v-if="nftApiCollection && nftApiCollection.length > 0"
        >
          <!-- url(https://i.seadn.io/gcs/files/4f627345f3a6a7718d447fd148052ee1.png?w=500&auto=format);-->
        </div>

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
                  type="outlined"
                  class="border-green-400 !text-green-400 active:!bg-green-300 dark:active:!bg-green-400"
                  >Login</d-button
                >
                <d-button
                  type="elevated"
                  class="shadow-green-400 bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
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
                :src="nftApiCollection[0].image_url"
                v-if="nftApiCollection && nftApiCollection.length > 0"
                alt=""
                class="rounded-xl hover:scale-[1.05] hover:-translate-y-5 transit mx-auto text-center min-h-60 max-h-60 md:min-h-80 md:max-h-80"
              />
              <p
                class="text-green-400 text-left mt-2"
                v-if="nftApiCollection && nftApiCollection.length > 0"
              >
                {{
                  nftApiCollection[0].name.length > 15
                    ? nftApiCollection[0].name.slice(0, 15) + "..."
                    : nftApiCollection[0].name
                }}
              </p>
              <div
                class="flex justify-between"
                v-if="nftApiCollection && nftApiCollection.length > 0"
              >
                <p>
                  {{
                    nftApiCollection[0].key.length > 15
                      ? nftApiCollection[0].key.slice(0, 15) + "..."
                      : nftApiCollection[0].key
                  }}
                </p>
                <p>{{ nftApiCollection[0].stats.num_owners }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>

    <!-- for the large table -->
    <big-tab />

    <!-- nft cards collection swipes -->
    <section class="h-auto md:mt-12 mt-8">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Notable Collection
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(0, 10)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Top Collector Buys Today
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(11, 20)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in PFPs
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(21, 30)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>
    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Ranks
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(31, 40)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>
    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Artist
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(41, 50)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Artworks
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(51, 60)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">Explore</p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="nftApiCollection.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in nftApiCollection.slice(61, 70)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <home-card :nft="nft" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">NFT 101</p>

        <!-- nft cards -->
        <swiping-cards class="py-5">
          <template #cards>
            <swiper-slide v-for="learn in learnNft" :key="learn.name">
              <!-- for home nft cards -->
              <home-card :nft="learn" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 p-7 md:p-12">
      <main
        class="grid md:grid-cols-2 items-center bg-slate-50 dark:bg-slate-800 transit rounded-2xl md:p-12 p-8"
      >
        <div class="w-full">
          <p
            class="shining md:uppercase text-3xl md:text-4xl text-left font-extrabold"
          >
            Create, Sell & Collect NFTs At Oceanic
          </p>
          <p class="text-gray-400 mt-5">
            Created with the collaboration of over 60 of the world's best Nuron
            Artists.
          </p>

          <div class="flex mt-8 gap-x-5 justify-center md:justify-start">
            <d-button
              type="outlined"
              class="border-green-400 !text-green-400 active:!bg-green-300 dark:active:!bg-green-400"
              >Login</d-button
            >
            <d-button
              type="elevated"
              class="shadow-green-400 bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
            />
          </div>
        </div>
        <div class="rounded-xl text-center mx-auto mt-8 md:mt-0">
          <img
            src="https://solanart.io/solanart-logo-black.svg"
            alt=""
            width="300"
            class="animate__animated animate__tada animate__delay-5s animate__repeat-3 animate__slow"
          />
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import homeCard from "@/components/cards/homeCard.vue";
import bigTab from "@/components/tables/bigTab.vue";
import svgComp from "@/components/svgComp.vue";
import "animate.css";

// @ is an alias to /src
import { computed, inject, onMounted, ref, watch } from "vue";
import SwipingCards from "@/components/swipingCards.vue";

const value = ref("1");
watch(value, () => {
  console.log(value.value);
});

const theme = inject("theme");

const darkShade = ref("rgba(0, 0, 0, 0.247), #0e182f 90%");
const lightShade = ref("rgba(255, 255, 255, 0.216), white 90%");

// const darkShade2 = ref("rgba(0, 0, 0, 0.247), rgba(0, 0, 0, 0.247)");
const lightShade2 = ref(
  "rgba(255, 255, 255, 0.216), rgba(255, 255, 255, 0.216)"
);
const darkShade2 = ref("rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)");

// for nft
const nftApiCollection = ref([]);

const getNftCollection = (chain) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
    },
  };

  fetch(
    `https://api.blockspan.com/v1/exchanges/collections?chain=${chain}&exchange=opensea&page_size=72`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      // console.log(response)
      nftApiCollection.value = response.results;
    })
    .catch((err) => console.error(err));
};
onMounted(() => {
  getNftCollection("eth-main");
});

const learnNft = computed(() => {
  return [
    {
      name: "What is an NFT",
      image_url:
        "https://opensea.io/static/images/learn-center//what-is-nft.png",
    },
    {
      name: "How to create an NFT",
      image_url:
        "https://opensea.io/static/images/learn-center//how-to-create-nft.png",
    },
    {
      name: "What is a crypto wallet",
      image_url:
        "https://opensea.io/static/images/learn-center//what-is-crypto-wallet.png",
    },
    {
      name: "About Oceanic",
      image_url:
        "https://i.pinimg.com/736x/fc/98/08/fc9808ed756f6b11956c3983ae5412c6.jpg",
    },
  ];
});
</script>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
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
