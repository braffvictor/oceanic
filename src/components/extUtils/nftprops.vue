<template>
  <main>
    <section class="mt-5 px-3 md:px-6">
      <!-- the image proof displayed -->
      <div class="mx-auto text-center text-slate-900 dark:text-slate-100 mt-2">
        <div
          class="overflow-hidden rounded-lg inline-block mx-auto text-center"
        >
          <vLazyImage
            :src="nft && nft.image_url"
            alt="Nft image"
            width="500"
            class="mx-auto text-center"
          />
        </div>
      </div>

      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">FullName</p>
        <p class="font-medium">{{ nft && nft.fullName }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Email</p>
        <p class="font-medium">{{ nft && nft.email }}</p>
      </div>
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Type</p>
        <p class="font-medium capitalize border rounded-xl p-1">
          {{ nft && nft.type }}
        </p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Name</p>
        <p class="font-medium">{{ nft && nft.name }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Collection
        </p>
        <p class="font-medium">{{ nft && nft.collection }}</p>
      </div>

      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Contract Address
        </p>
        <p class="font-medium">
          {{ nft && nft.contract_address.slice(0, 20) + "..." }}
        </p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Bidprice(ETH)
        </p>
        <p class="font-medium capitalize">{{ nft && nft.stats.floor_eth }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Bidprice($)
        </p>
        <p class="font-medium capitalize">
          ${{
            nft &&
            nft.stats.floor_price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })
          }}
        </p>
      </div>

      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between items-center text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Status</p>
        <p
          class="font-medium border capitalize p-1 rounded-lg"
          :class="checkStatus(nft && nft.status)"
        >
          {{ nft && nft.status }}
        </p>
      </div>

      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Date</p>
        <p class="font-medium">
          {{ (nft && nft.date) || (nft && nft.created_date) }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { authentication } from "@/stores/authentication";

import vLazyImage from "v-lazy-image";

import { computed, onMounted } from "vue";

const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

const props = defineProps({
  nft: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

function checkStatus(status) {
  if (status == "approved" || status == "success") {
    return "border-green-500 text-green-500";
  } else if (status == "pending") {
    return "border-yellow-500 text-yellow-500";
  } else if (status == "declined" || status == "failed") {
    return "border-red-500 text-red-500";
  }
}
function checkStatusBackground(status) {
  if (status == "approved" || status == "success") {
    return "bg-green-500";
  } else if (status == "pending") {
    return "bg-yellow-500";
  } else if (status == "declined" || status == "failed") {
    return "bg-red-500";
  }
}
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
  opacity: 0;
}
.v-lazy-image-loaded {
  filter: blur(0);
  opacity: 1;
}
</style>
