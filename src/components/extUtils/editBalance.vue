<template>
  <main>
    <div class="my-6 mx-auto text-center">
      <div
        class="p-2 shadow shadow-slate-900 dark:shadow-slate-100 inline-block rounded-lg bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900"
        @click="submit"
      >
        Wallet Balance :
        <span class="font-semibold">
          {{ (user && user?.wallet?.balance)?.toFixed(1) }} ETH
        </span>
      </div>
    </div>
    <div class="mt-3 mx-auto text-center flex justify-center gap-x-3">
      <div
        class="p-2 inline-block cursor-pointer rounded-lg text-center w-44"
        @click="(type = 'deposits'), (bidPrice = '')"
        :class="
          type == 'deposits'
            ? 'shadow shadow-green-500 bg-green-500 text-slate-100 hover:bg-green-400 active:bg-green-400 hover:shadow-green-400 active:shadow-green-400 transit active:scale-95'
            : 'text-green-500 hover:text-green-400 active:text-green-400 active:scale-95 transit'
        "
      >
        Deposit
      </div>
      <div
        class="p-2 text-center w-44 inline-block cursor-pointer rounded-lg"
        @click="(type = 'withdraws'), (bidPrice = '')"
        :class="
          type == 'withdraws'
            ? 'shadow shadow-red-500 bg-red-500 text-slate-100 hover:bg-red-400 active:bg-red-400 hover:shadow-red-400 active:shadow-red-400 transit active:scale-95'
            : 'text-red-500 hover:text-red-400 active:text-red-400 active:scale-95 transit'
        "
      >
        Withdraw
      </div>
    </div>

    <section v-if="type == 'deposits'" class="mt-5">
      <form @submit="submit">
        <section class="md:px-6 px-3 mt-5">
          <d-textfield
            class="mt-2"
            @emitInput="(input) => ((bidPrice = input), checkBidPrice())"
            :err="bidPriceError"
            label="Amount To Be Deposited (ETH)"
            name="Amount"
            inputType="number"
            :icon="true"
            type="default"
          />
          <p
            class="mt-3 text-xs font-light font-sans text-center"
            :class="bidPrice ? ' transit' : 'scale-y-0 transit hidden'"
          >
            Dollar Conversion : {{ convertAmount }}
          </p>
          <button type="submit" class="w-full">
            <DButton
              type="outlined"
              @click="submit"
              class="dark:border-slate-100 dark:!text-slate-100 border-slate-800 !text-slate-800 mt-5 w-full rounded-lg break-words break-before-auto break-all"
              >Credit {{ user && user.fullName }}</DButton
            >
          </button>
        </section>
      </form>
    </section>

    <section v-if="type == 'withdraws'" class="md:px-6 px-3 mt-5">
      <form @submit="submit">
        <DDropList
          @openMenu="show = true"
          @closeMenu="show = false"
          :err="errorCrypto"
          :show="show"
          @emitInput="(input) => ((crypto = input), checkCrypto())"
          :lists="cryptoCurrencies"
          name="Crypto"
          placeholder="Select Crypto Currency"
          type="default"
        />

        <d-textfield
          @emitInput="(input) => ((network = input), checkNetwork())"
          :err="errorNetwork"
          label="Crypto Network"
          type="default"
        />
        <d-textfield
          @emitInput="(input) => ((address = input), checkAddress())"
          :err="errorAddress"
          label="Wallet Address"
          type="default"
        />

        <d-textfield
          class="mt-2"
          @emitInput="(input) => ((bidPrice = input), checkBidPrice())"
          :err="bidPriceError"
          label="Amount To Be Withdrawn (ETH)"
          name="Amount"
          inputType="number"
          :icon="true"
          type="default"
        />
        <p
          class="mt-3 text-xs font-light font-sans text-center"
          :class="bidPrice ? ' transit' : 'scale-y-0 transit hidden'"
        >
          Dollar Conversion : {{ convertAmount }}
        </p>
        <button type="submit" class="w-full">
          <DButton
            type="outlined"
            :loading="loading"
            @click="submit"
            class="dark:border-slate-100 dark:!text-slate-100 border-slate-800 !text-slate-800 mt-5 w-full rounded-lg break-words break-before-auto break-all"
            >Debit {{ user && user.fullName }}</DButton
          >
        </button>
      </form>
    </section>
  </main>
</template>

<script setup>
//stores
import { adminflow } from "@/stores/adminflow";

import DTextarea from "../utils/DTextarea.vue";
import DTextfield from "../utils/DTextfield.vue";
import DDropList from "../utils/DDropList.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "../utils/DButton.vue";

import { checkInput } from "@/composables/checkInput";
import { getDate } from "@/composables/getDate";
import { computed, inject, ref } from "vue";

const emit = defineEmits(["closeDialog"]);

const adminflowing = adminflow();
const loading = computed(() => {
  return adminflowing.loading.balance;
});
const theme = inject("theme");
const { getCurrentTimeAndDate } = getDate();

const type = ref("deposits");
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const bidPrice = ref("");
const bidPriceError = ref("");

const convertAmount = computed(() => {
  const dollars = Number(bidPrice.value) * 3043;
  return bidPrice.value
    ? `${dollars?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`
    : "";
});

// for withdraws
const show = ref(false);
const crypto = ref("");
const errorCrypto = ref("");
const network = ref("");
const errorNetwork = ref("");
const address = ref("");
const errorAddress = ref("");

const checkCrypto = () => checkInput("Crypto", crypto, errorCrypto);
const checkNetwork = () => checkInput("Crypto Network", network, errorNetwork);
const checkAddress = () =>
  checkInput("Crypto Wallet Address", address, errorAddress);
const checkBidPrice = () => checkInput("Amount", bidPrice, bidPriceError);

function submit() {
  const { user } = props;
  if (type.value == "deposits") {
    checkBidPrice();
    if (checkBidPrice()) {
      const payload = {
        // photo: photo.value,
        amount: bidPrice.value,
        convertAmount: convertAmount.value,

        text: "Account Deposit",
        adminText: "Admin Made This Deposit",

        fullName: user && user.fullName,
        email: user && user.email,
        userID: user && user.userID,
        date: getCurrentTimeAndDate(),
        formattedDate: getCurrentTimeAndDate("format"),
        status: "approved",
        category: "deposits",
        type: "credit",
        photo: "",

        // inject after adding wallets to firebase
        walletAddress: user && user.walletAddress,
        wallet: "Ethereum",
        walletNetwork: "ERC20",
      };
      console.log(payload, "for depositing");
      adminflowing.adminControl(payload);
      emit("closeDialog");
    }
  } else if (type.value == "withdraws") {
    checkBidPrice();
    checkCrypto();
    checkAddress();
    checkNetwork();

    if (checkBidPrice() && checkCrypto() && checkAddress() && checkNetwork()) {
      const payload = {
        amount: bidPrice.value,
        convertAmount: convertAmount.value,
        walletAddress: address.value,
        crypto: crypto.value,
        network: network.value,

        text: `${crypto.value} Withdrawal`,
        adminText: "Admin Made This Withdrawal",

        fullName: user && user.fullName,
        email: user && user.email,
        userID: user && user.userID,
        date: getCurrentTimeAndDate(),
        formattedDate: getCurrentTimeAndDate("format"),
        status: "approved",
        category: "withdraws",
        type: "debit",
      };
      console.log(payload, "for withdrawing");
      adminflowing.adminControl(payload);
      emit("closeDialog");
    }
  }
}

const cryptoCurrencies = computed(() => {
  return [
    {
      name: "Bitcoin",
    },
    {
      name: "Ethereum",
    },
    {
      name: "USDT",
    },
    {
      name: "Litecoin",
    },
  ];
});
</script>

<style scoped></style>
