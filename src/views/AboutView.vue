<template>
  <div class="bg-slate-50 dark:bg-slate-900 min-h-screen transit px-5 md:px-7">
    <main class="mt-10 text-slate-900 dark:text-slate-100">
      <section class="">
        <p class="text-3xl md:text-6xl font-bold">
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
        <div class="py-7 px-7">
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
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";

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
</script>

<style></style>
