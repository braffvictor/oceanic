<template>
  <div class="bg-white h-auto dark:bg-slate-900 transit font-mono">
    <!-- form -->

    <d-auth
      :themeState="theme"
      @closeForm="form = false"
      :form="form"
      :type="type"
    />
    <section class="h-[107vh] md:min-h-screen">
      <main class="md:px-8 relative h-full -mt-4 md:mt-8">
        <!-- div with just image -->

        <div
          class="h-[50em] md:h-[35em] md:rounded-xl w-[100%] md:w-[100%] transit"
          :style="`background: linear-gradient(
            to bottom,
           ${theme == 'light' || theme == null ? lightShade : darkShade}
          ),
         url(${userflowing.nfts[0].image_url});
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all linear 300ms`"
          v-if="userflowing.nfts && userflowing.nfts.length > 0"
        >
          <!-- url(https://i.seadn.io/gcs/files/4f627345f3a6a7718d447fd148052ee1.png?w=500&auto=format);-->
        </div>

        <div
          class="h-full md:rounded-xl p-4 px-8 py-12 md:py-8 md:px-12 absolute top-0 text-slate-100 w-[100%] md:w-[95%] backdrop-blur-lg"
        >
          <div class="grid md:grid-cols-2 items-center justify-center">
            <div>
              <p
                class="text-5xl md:text-7xl font-semibold dark:text-slate-100 text-slate-900 transit"
              >
                <span class="shining uppercase font-semibold">Oceanic</span>
                - <br />Discover, collect and trade NFTs
              </p>
              <p
                class="dark:text-slate-100 text-slate-900 md:text-2xl font-light my-5 md:my-10 text-sm"
              >
                Get quick and easy access to digital collectibles and explore,
                buy and sell NFTs...
              </p>

              <!-- login and registration button -->
              <div class="flex mt-4 gap-x-2">
                <d-button
                  type="outlined"
                  class="border-green-400 !text-green-400 active:!bg-green-300 dark:active:!bg-green-400"
                  @click="(form = true), (type = 'registration')"
                  >Sign Up</d-button
                >
                <d-button
                  type="elevated"
                  class="shadow-green-400 bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
                  @click="(form = true), (type = 'login')"
                  >Login</d-button
                >
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
              <!-- <img
                :src="userflowing.nfts[0].image_url"
                v-if="userflowing.nfts && userflowing.nfts.length > 0"
                class="rounded-xl hover:scale-[1.05] hover:-translate-y-5 transit mx-auto text-center min-h-60 max-h-60 md:min-h-80 md:max-h-80"
                alt=""
              /> -->

              <vLazyImage
                :src="userflowing.nfts[0].image_url"
                v-if="userflowing.nfts && userflowing.nfts.length > 0"
                class="rounded-xl hover:scale-[1.05] hover:-translate-y-5 transit mx-auto text-center min-h-60 max-h-60 md:min-h-80 md:max-h-80"
              />
              <p
                class="text-green-400 text-left mt-2"
                v-if="userflowing.nfts && userflowing.nfts.length > 0"
              >
                {{
                  userflowing.nfts[0].name.length > 15
                    ? userflowing.nfts[0].name.slice(0, 15) + "..."
                    : userflowing.nfts[0].name
                }}
              </p>
              <div
                class="flex justify-between"
                v-if="userflowing.nfts && userflowing.nfts.length > 0"
              >
                <p>
                  {{
                    userflowing.nfts[0].key.length > 15
                      ? userflowing.nfts[0].key.slice(0, 15) + "..."
                      : userflowing.nfts[0].key
                  }}
                </p>
                <p>{{ userflowing.nfts[0].stats.num_owners }}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>

    <!-- for the large table -->
    <big-tab />

    <!-- nft cards collection swipes -->
    <section class="h-auto md:mt-12 mt-8 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Notable Collection
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(0, 10)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Top Collector Buys Today
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(11, 20)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in PFPs
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(21, 30)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>
    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Ranks
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(31, 40)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>
    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Artist
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(41, 50)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Trending in Artworks
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(51, 60)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">Explore</p>

        <!-- nft cards -->
        <swiping-cards class="py-5" v-if="userflowing.nfts.length > 0">
          <template #cards>
            <swiper-slide
              v-for="nft in userflowing.nfts.slice(61, 70)"
              :key="nft.name"
            >
              <!-- for home nft cards -->
              <NftCard :nft="nft" :to="true" :action="false" />
            </swiper-slide>
          </template>
        </swiping-cards>

        <swiping-cards class="py-5" v-else>
          <template #cards>
            <swiper-slide v-for="n in 10" :key="n">
              <!-- for home nft cards -->
              <LoadingCards />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72">
      <main class="ml-4 md:ml-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">NFT 101</p>

        <!-- nft cards -->
        <swiping-cards class="py-5">
          <template #cards>
            <swiper-slide v-for="learn in learnNft" :key="learn.name">
              <!-- for home nft cards -->
              <NftCard :nft="learn" :learn="true" :route-name="learn.route" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>

    <section class="h-auto mt-5 min-h-72 p-7 md:p-12">
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
              @click="(form = true), (type = 'login')"
              >Login</d-button
            >
            <d-button
              type="elevated"
              class="shadow-green-400 bg-green-400 dark:bg-green-500 text-white dark:!text-slate-900 active:!bg-green-300"
              @click="(form = true), (type = 'registration')"
            />
          </div>
        </div>
        <div class="rounded-xl text-center mx-auto mt-8 md:mt-0 h-full w-full">
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
// stores
import { userflow } from "@/stores/userflow";

import DAuth from "@/components/utils/DAuth.vue";
import DButton from "@/components/utils/DButton.vue";
import vLazyImage from "v-lazy-image";
import NftCard from "@/components/cards/nftCard.vue";
import bigTab from "@/components/tables/bigTab.vue";
import svgComp from "@/components/svgComp.vue";
import "animate.css";

// @ is an alias to /src
import { computed, inject, onMounted, ref, watch } from "vue";
import SwipingCards from "@/components/swipingCards.vue";

//for controlling form
const form = ref(false);
const type = ref("registration");

const theme = inject("theme");

const darkShade = ref("rgba(0, 0, 0, 0.247), #0f172a 90%");
const lightShade = ref("rgba(255, 255, 255, 0.216), white 90%");

// const darkShade2 = ref("rgba(0, 0, 0, 0.247), rgba(0, 0, 0, 0.247)");
const lightShade2 = ref(
  "rgba(255, 255, 255, 0.216), rgba(255, 255, 255, 0.216)"
);
const darkShade2 = ref("rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)");

// for nft
const userflowing = userflow();
console.log(userflowing.nfts, "is getting nfts");

onMounted(() => {
  window.scrollTo(0, 0);
});

const learnNft = computed(() => {
  return [
    {
      name: "What is an NFT",
      image_url:
        "https://opensea.io/static/images/learn-center//what-is-nft.png",
      route: "/learn/what-are-nfts",
    },
    {
      name: "How to create an NFT",
      image_url:
        "https://opensea.io/static/images/learn-center//how-to-create-nft.png",
      route: "/learn/how-to-create-nfts",
    },
    {
      name: "What is web3",
      image_url:
        "https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe0d5c538f6e7736ab8f4_63d1a70e2fe07c7f11a6b195_637bb7c970c23116e14990d1_What%252520is%252520Web3-p-1080.png",
      route: "/learn/what-is-web3",
    },
    {
      name: "What is a Blockchain",
      image_url:
        "https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe0d5ef66bd821c0c477a_63d1a70f914ea5352493efb5_637eb7b98b0e8434b165a1b1_What%252520is%252520a%252520blockchain.png",
      route: "/learn/what-is-a-blockchain",
    },
    {
      name: "About Oceanic",
      image_url:
        "https://i.pinimg.com/736x/fc/98/08/fc9808ed756f6b11956c3983ae5412c6.jpg",
      route: "/learn/about-us",
    },
  ];
});
</script>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import LoadingCards from "@/components/cards/loadingCards.vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style scoped>
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

.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
