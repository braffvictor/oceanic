<template>
  <!-- the balance card -->
  <main
    class="h-32 shadow-sm shadow-green-400 dark:shadow-green-500 md:h-40 mx-auto rounded-3xl w-full md:w-full !bg-green-400 dark:!bg-green-500 p-5 md:p-6 relative text-slate-600 dark:text-slate-200 transit"
    :style="`background: url(${waving[rando]}); background-position: center; background-size : 100%; background-repeat: no-repeat`"
  >
    <section class="flex justify-between items-center">
      <div>
        <p class="font-semibold md:text-lg text-sm opacity-65">
          Current Balance
        </p>
        <p class="font-bold md:text-4xl text-2xl">
          {{ Number(user && user.wallet.balance).toFixed(1) }}ETH
        </p>
        <p class="text-xs md:text-sm opacity-70">
          ${{
            user && user.wallet.balance
              ? (user?.wallet?.balance * 3047.3)?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              : "0.00"
          }}
        </p>
      </div>

      <div>
        <SvgComp
          icon="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.814-7.581a1 1 0 0 0-1.628 0l-5 7a1 1 0 0 0 0 1.162l5 7a1 1 0 0 0 1.628 0l5-7a1 1 0 0 0 0-1.162l-5-7zM12 12.923 9.693 12 12 11.077l2.307.923-2.307.923zm.371 2.005 1.832-.732L12 17.279l-2.203-3.083 1.832.732a1 1 0 0 0 .742 0zM12 6.72 9.797 9.804l1.832-.732a1 1 0 0 1 .742 0l1.832.732L12 6.72z"
          Sclass="min-w-[41px] !stroke-slate-600 dark:!stroke-slate-200"
          class="min-w-12"
        />
      </div>
    </section>

    <section class="bottom-0 absolute mb-4 text-center mx-auto">
      <!-- <p>Last Transaction: 12 April 2023</p> -->
      <p class="font-thin text-sm text-center mx-auto">
        {{ text }}
        <span class="font-semibold">{{ data }}</span>
      </p>
    </section>
  </main>
</template>

<script setup>
import { authentication } from "@/stores/authentication";
import wave1 from "@/assets/wave1.png";
import wave2 from "@/assets/wave2.png";
import wave4 from "@/assets/wave4.png";
import wave5 from "@/assets/wave5.png";
import SvgComp from "@/components/svgComp.vue";
import { computed, ref } from "vue";

const waving = ref([wave1, wave2, wave4, wave5]);
const rando = Math.round(Math.random() * 3);

const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

function checkBalance(balance) {
  if (!balance) {
    return "0.00";
  } else {
    return balance;
  }
}

const props = defineProps({
  text: {
    type: String,
    default: "ETH Address:",
  },
  data: {
    type: String,
    default: "0xq3r42.....fds4fef",
  },
});
</script>

<style></style>
