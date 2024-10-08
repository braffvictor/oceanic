<template>
  <main>
    <div class="p-5">
      <p class="text-center text-slate-700 dark:text-slate-300">Total Amount</p>
      <p class="text-center text-2xl font-bold md:text-4xl">
        {{ (transact && transact.amount).toFixed(1) }} ETH<span
          class="text-xs font-thin"
        >
          ~ {{ transact && transact.convertAmount }}</span
        >
      </p>

      <main class="flex justify-center">
        <div
          class="text-center mt-2 border border-slate-200 dark:border-slate-700 p-[7px] inline-block rounded-3xl mx-auto"
        >
          <div class="flex justify-center items-center gap-1">
            <div
              class="h-3 w-3 rounded-full inline-block"
              :class="[
                checkStatusBackground(transact && transact.status),
                transact && transact.status == 'pending' ? 'animate-pulse' : '',
              ]"
            ></div>
            <p class="font-semibold text-sm capitalize">
              {{ checkStatusText(transact && transact.status) }}
            </p>
          </div>
        </div>
      </main>
    </div>

    <div
      v-if="user && user.role == 'admin' && transact && transact.adminText"
      class="text-center font-semibold text-lg md:text-xl mb-3"
    >
      {{ transact && transact.adminText }} To
      {{ transact && transact.fullName }}
    </div>

    <section
      class="px-3 md:px-6"
      :class="user && user.role == 'user' ? 'mt-5' : ''"
    >
      <p class="font-bold">Deposit Details</p>

      <!-- the image proof displayed -->
      <div
        class="mx-auto text-center text-slate-900 dark:text-slate-100 mt-2"
        v-if="user && user.role == 'admin' && transact && !transact?.adminText"
      >
        <div
          class="overflow-hidden rounded-lg shadow-sm inline-block mx-auto text-center"
        >
          <vLazyImage
            :src="transact && transact.photo"
            alt="Proof Of Payment"
            width="500"
            class="mx-auto text-center"
          />
        </div>
      </div>

      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">FullName</p>
        <p class="font-medium">{{ transact && transact.fullName }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Email</p>
        <p class="font-medium">{{ transact && transact.email }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>
      <div class="flex justify-between text-sm md:text-base mt-2">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Reference
        </p>
        <p class="font-medium">{{ transact && transact.id }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Deposited Amount(ETH)
        </p>
        <p class="font-medium">{{ transact && transact.amount }}ETH</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Crypto</p>
        <p class="font-medium capitalize">{{ transact && transact.wallet }}</p>
      </div>
      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">
          Wallet Address
        </p>
        <p class="font-medium">
          {{
            (transact && transact.walletAddress.slice(0, 10)) +
            "..." +
            (transact && transact.walletAddress.slice(30))
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
          :class="checkStatus(transact && transact.status)"
        >
          {{ checkStatusText(transact && transact.status) }}
        </p>
      </div>

      <!-- divider dash-->
      <div
        class="border border-gray-300 dark:border-gray-700 border-dashed my-2 w-full"
      ></div>

      <div class="flex justify-between text-sm md:text-base">
        <p class="font-extralight text-gray-500 dark:text-gray-400">Date</p>
        <p class="font-medium">{{ transact && transact.date }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { authentication } from "@/stores/authentication";
import vLazyImage from "v-lazy-image";

import { computed } from "vue";

const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

const props = defineProps({
  transact: {
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

function checkStatusText(status) {
  if (status == "approved" || status == "success") {
    return "Success";
  } else if (status == "pending") {
    return "Pending";
  } else if (status == "declined" || status == "failed") {
    return "Failed";
  }
}
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
