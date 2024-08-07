<template>
  <div
    class="bg-slate-50 dark:bg-slate-900 min-h-screen transit px-5 md:px-7 relative"
  >
    <main class="mt-10 text-slate-900 dark:text-slate-100">
      <section class="">
        <p class="text-3xl md:text-5xl font-bold">
          <!-- {{ authentications.user }} -->
          Building an open digital economy
        </p>
        <p class="font-light mt-3">
          At OpenSea, we're excited about a brand new type of digital good
          called a non-fungible token, or NFT. NFTs have exciting new
          properties: they’re unique, provably scarce, tradeable, and usable
          across multiple applications. Just like physical goods, you can do
          whatever you want with them! You could throw them in the trash, gift
          them to a friend across the world, or go sell them on an open
          marketplace. But unlike physical goods, they're armed with all the
          programmability of digital goods.
        </p>
        <p class="font-light mt-3">
          A core part of our vision is that open protocols like Ethereum and
          interoperable standards like ERC-721 and ERC-1155 will enable vibrant
          new economies. We're building tools that allow consumers to trade
          their items freely, creators to launch new digital works, and
          developers to build rich, integrated marketplaces for their digital
          items.
        </p>
        <div class="py-14 px-7">
          <img
            class="mx-auto text-center"
            src="https://static.opensea.io/about/All-NFT-Categories-Illustration.svg"
            alt=""
            width="400"
          />
        </div>

        <main class="w-full text-center mx-auto mt-4 md:w-8/12">
          <div class="flex justify-between">
            <div v-for="perk in perks" :key="perk.name">
              <img
                class="mx-auto text-center"
                :src="perk.image"
                alt=""
                width="50"
              />
              <p class="mt-4 font-semibold text-lg md:text-2xl">
                {{ perk.name }}
              </p>
              <p class="text-sm md:text-lg">{{ perk.text }}</p>
            </div>
          </div>
        </main>

        <!-- story section -->
        <main class="mt-14">
          <p class="text-center font-bold text-2xl md:text-5xl">Our story</p>
          <p class="text-center font-light text-lg mt-1">
            Navigating the uncharted waters of non-fungible tokens
          </p>

          <section class="mt-5 md:flex items-center gap-x-5">
            <!-- image -->
            <div>
              <img src="https://static.opensea.io/about/founders.png" alt="" />
            </div>

            <!-- writeup -->
            <div class="md:w-1/2">
              <p class="font-light mt-3">
                In 2017 the world witnessed the birth of CryptoKitties. For the
                first time, the world experienced a decentralized application
                built on blockchains but targetted towards a mainstream
                audience.
              </p>
              <p class="font-light mt-3">
                While CryptoKitties felt like a toy to many, it represented a
                dramatic shift in how we interact with items in the digital
                world. While previous digital items lived on company servers,
                blockchain-native items lived on shared, public blockchains
                owned by no single party. They could be viewed anywhere,
                exchanged openly, and truly owned in a way that was never before
                possible in the digital world.
              </p>
              <p class="font-light mt-3">
                Fascinated by the movement that was forming, Devin Finzer and
                Alex Atallah joined early adopter communities in Discord and
                started talking to users. With the OpenSea beta launch in
                December 2017, the first open marketplace for any non-fungible
                token on the Ethereum blockchain was bor
              </p>
              <p class="font-light mt-3">
                Today, we’re proud to remain the largest general marketplace for
                user-owned digital items, supporting multiple blockchains, with
                the broadest set of categories and the best prices for new
                emerging digital item classes.
              </p>
              <p class="font-light mt-3">
                As a company, we’re thrilled to be at the center of this growing
                industry, and will continue to invest in our core infrastructure
                as we build the most accessible marketplace for buyers, sellers,
                and creators.
              </p>
            </div>
          </section>
        </main>

        <!-- investors logo section -->
        <main class="py-12">
          <p class="text-center font-bold text-2xl md:text-5xl">
            Backed by top firms & industry leaders
          </p>
          <p class="text-center mt-1 font-light text-lg">
            who are helping us pave the way towards a brand new digital economy
          </p>

          <section class="flex mt-4 flex-wrap gap-7 justify-center">
            <div class="" v-for="logo in investorsLogos" :key="logo.img">
              <img :src="logo.img" alt="Investors Logo" width="180" />
            </div>
          </section>
        </main>
      </section>
    </main>

    <DButton @click="spliting" class="rounded-xl !bg-green-500" :loading="false"
      >split
    </DButton>

    <div class="mt-4">
      <input
        type="text"
        class="h-11 border w-80 bg-transparent"
        v-model="firstName"
        placeholder="first name"
      />
      <input
        type="text"
        v-model="lastName"
        class="h-11 border ml-3 w-80 bg-transparent"
        placeholder="last name"
      />
    </div>

    <p class="font-bold">{{ fullName }}</p>
  </div>
</template>

<script setup>
import { authentication } from "@/stores/authentication";
import { userflow } from "@/stores/userflow";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, ref } from "vue";

// import warning from '@/assets/svg.'
const firstName = ref("");
const lastName = ref("");

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

function spliting() {
  const split = fullName.value.split(" ");

  let abrv = "";

  split.forEach((val) => {
    abrv += val[0];
  });

  console.log(abrv);
}

const perks = computed(() => {
  return [
    {
      image: "https://static.opensea.io/about/icon-timeline.svg",
      name: "2017",
      text: "Founded",
    },
    {
      image: "https://static.opensea.io/about/icon-collections.svg",
      name: "2M+",
      text: "Collections",
    },
    {
      image: "https://static.opensea.io/about/nfts.svg",
      name: "80M+",
      text: "NFTs",
    },
    {
      image: "https://static.opensea.io/about/icon-money.svg",
      name: "$20B+",
      text: "Volume",
    },
  ];
});

const investorsLogos = computed(() => {
  return [
    {
      img: "https://static.opensea.io/about/vc-andressen-horowitz.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-coinbase.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-ycombinator.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-trust-wallet.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-quantstamp.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-blockstack.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-NFTKred.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-founders-fund.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-blockchain-capital.svg",
    },
    {
      img: "https://static.opensea.io/about/vc-pascal-capital.svg",
    },
  ];
});
</script>

<style></style>
