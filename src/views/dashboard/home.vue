<template>
  <div class="min-h-screen">
    <section class="md:w-10/12 mx-auto">
      <!-- for the top bar in dashboard -->
      <DDashbar />

      <section class="mt-2 px-3">
        <div class="mx-auto">
          <!-- the balance card -->
          <BalanceCard
            text="ETH Address:"
            :data="
              (user && user.walletAddress.slice(0, 7)) +
              '...' +
              (user && user.walletAddress.slice(35))
            "
          />
        </div>
      </section>

      <!-- Shortcuts -->
      <section class="my-8 select-none px-3">
        <!-- <p class="font-semibold text-center text-lg md:text-xl">Shortcuts</p> -->
        <div
          class="flex justify-evenly md:justify-center items-center mt-2 gap-2"
        >
          <div
            class="rounded-xl h-[88px] w-20 shadow-sm active:scale-75 select-none transit md:w-60 cursor-pointer md:rounded-2xl flex transit items-center justify-center bg-slate-100 dark:bg-slate-800"
            v-for="quick in quickLinks"
            :key="quick.text"
            :class="
              quick.text == 'Random' && !randomNft
                ? 'pointer-events-none opacity-30 transit'
                : null
            "
          >
            <router-link
              class="flex w-full flex-col justify-center items-center !p-2 gap-2"
              :to="quick.to"
            >
              <img :src="quick.img" width="40" alt="" />
              <p
                class="text-[10px] bg-green- break-all hyphens-auto md:text-xs"
              >
                {{ quick.text }}
              </p>
            </router-link>
          </div>
        </div>
      </section>

      <section class="mt-5 select-none px-3">
        <div class="flex justify-between items-center">
          <p class="font-light">🔥Hot Collection</p>
          <p
            class="font-semibold flex items-center cursor-pointer active:text-green-500 transit group text-sm py-2 pl-2 text-green-400"
            @click.self="$router.push('/dashboard/view-all')"
          >
            View All<SvgComp
              Sclass="group-active:!stroke-green-500 !stroke-green-400"
              class="pt-1 inline"
              icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            />
          </p>
        </div>

        <section class="mt-3" v-if="collections.length > 5">
          <main
            class="flex items-center border-2 border-slate-200 dark:border-slate-700 my-3 cursor-pointer justify-between gap-y-5 md:justify-start gap-5 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-xl transit group overflow-auto min-h-24"
            v-for="collection in collections.slice(0, 5)"
            :key="collection.name"
            @click="$router.push(`/dashboard/collection/${collection.key}`)"
          >
            <div class="rounded-xl overflow-hidden">
              <img
                :src="collection.image_url"
                class="transit"
                alt=""
                width="200"
              />
            </div>
            <div class="w-full">
              <p
                class="font-semibold text-slate-900 dark:text-slate-100 text-sm md:text-lg"
              >
                {{
                  collection.name.length >= 25
                    ? collection.name.slice(0, 25) + "..."
                    : collection.name
                }}
              </p>
              <p
                class="font-thin text-xs opacity-50 text-slate-900 dark:text-slate-100 md:text-sm"
              >
                {{
                  collection.key.length >= 20
                    ? collection.key.slice(0, 20) + "..."
                    : collection.key
                }}
                <img
                  src="@/assets/verified.svg"
                  alt="tick"
                  class="max-w-5 inline"
                />
              </p>
            </div>

            <div class="float-end w-full text-right">
              <button>
                <svg-comp
                  Sclass="active:stroke-red-500 -rotate-90"
                  icon="M7 10L12 15L17 10"
                />
              </button>
            </div>
          </main>
        </section>

        <div v-else class="min-h-screen mt-10 text-center mx-auto">
          <div class="mx-auto text-center flex justify-center">
            <!-- <img src="@/assets/not-found.gif" width="200" class="mt-5 block" /> -->
            <!-- <img
              src="https://steamuserimages-a.akamaihd.net/ugc/1829040563493991891/74C475FCD2F54226FDE8A6A5583EEC3440DD3242/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%2300&letterbox=true"
              width="200"
              class="mt-5 block"
            /> -->
            <img src="@/assets/not-found.gif" width="200" class="mt-5 block" />
          </div>
          <p class="text-slate-900 font-semibold dark:text-slate-100 mt-4">
            Loading Collections...
          </p>
        </div>
      </section>
    </section>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";
//components
import BalanceCard from "@/components/cards/balanceCard.vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import vLazyImage from "v-lazy-image";
import SvgComp from "@/components/svgComp.vue";
import upload from "@/assets/png/mint.png";
import explore from "@/assets/png/explore.png";
import minted from "@/assets/png/minted.png";
import transact from "@/assets/png/transfer.png";
import random from "@/assets/png/rando.png";

import { computed, inject, onMounted, ref, watch } from "vue";

onMounted(() => {
  setTimeout(() => {
    window.scrollTo({ top: -10, left: 0, behavior: "smooth" });
  }, 3);
});

const useAuthentication = authentication();
const user = computed(() => useAuthentication.user);
const userflowing = userflow();

const rando = Math.abs(Math.round(Math.random() * 98));
const randomNft = computed(() => {
  return userflowing.randomNfts.length > 0 && userflowing.randomNfts[rando];
});

const theme = inject("theme");

const collections = computed(() => {
  return userflowing.getNfts;
});

const quickLinks = computed(() => {
  return [
    {
      img: upload,
      text: "Upload NFT",
      to: "/dashboard/upload",
    },
    {
      img: explore,
      text: "Explore",
      to: "/dashboard/explore",
    },
    {
      img: random,
      text: "Random",
      to: `/dashboard/collection/item/${
        randomNft.value && randomNft.value.collection
      }?identifier=${randomNft.value && randomNft.value?.identifier}`,
    },
    {
      img: transact,
      text: "Transactions",
      to: "/dashboard/transactions",
    },
  ];
});
</script>

<style>
.fe {
  color: #22c55e;
}

.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
