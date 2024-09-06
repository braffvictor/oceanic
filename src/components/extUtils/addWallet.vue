<template>
  <main>
    <form class="px-3 md:px-6 pt-5" @submit="submit">
      <DTextfield
        @emitInput="(input) => ((walletName = input), checkWalletName())"
        :err="walletNameError"
        label="Wallet Name"
        :type="theme == 'dark' ? 'outlined' : 'filled'"
      />
      <DTextfield
        @emitInput="(input) => ((walletNetwork = input), checkWalletNetwork())"
        :err="walletNetworkError"
        label="Wallet Network"
        :type="theme == 'dark' ? 'outlined' : 'filled'"
      />
      <DTextfield
        @emitInput="(input) => ((walletAddress = input), checkWalletAddress())"
        :err="walletAddressError"
        label="Wallet Address"
        :type="theme == 'dark' ? 'outlined' : 'filled'"
      />
      <!-- the qrCodeImage of payment in ethereum -->
      <label
        for="qrCodeImage"
        class="group mt-2 dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
        :class="[
          qrCodeError ? '!border-red-500' : null,
          theme == 'light' || !theme
            ? 'bg-slate-200 dark:bg-slate-900 rounded-tl-lg rounded-tr-lg border-b dark:border-b-gray-600 hover:border-b-gray-600 border-b-gray-400 dark:hover:bg-slate-800 hover:bg-slate-200 p-2 '
            : 'rounded-lg  dark:border-gray-600 border bg-transparent hover:border-gray-500 border-gray-400 dark:hover:border-slate-400 p-2',
        ]"
      >
        <div>
          <!-- <SvgComp
            icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
            :Sclass="
              qrCodeError
                ? 'group-has-[:focus]:stroke-red-500 !stroke-red-500'
                : 'group-has-[:focus]:stroke-green-500'
            "
          /> -->
        </div>
        <div class="relative w-full">
          <input
            type="file"
            name="qrCodeImage"
            @change="
              (event) => (
                (qrCode = event.target.files[0]),
                checkImage(),
                checkWalletQrcode()
              )
            "
            id="qrCodeImage"
            class="cursor-pointer file:bg-transparent file:w-0 file:px-0 file:mx-0 file:border-0 px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
            placeholder="Proof"
            required
          />
          <label
            for="amount"
            class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
            :class="qrCodeError ? '!text-red-500' : null"
            >Wallet Qr code</label
          >
        </div>
      </label>

      <p
        class="text-xs text-red-500 transit mt-3 text-center"
        :class="qrCodeError ? 'transit ' : 'scale-y-0 transit'"
      >
        {{ qrCodeError }}
      </p>

      <!-- the image qrCodeImage displayed -->
      <div class="mx-auto text-center mt-5" v-if="qrCodeImage">
        <div
          class="overflow-hidden rounded-lg shadow-sm inline-block mx-auto text-center"
        >
          <img
            :src="qrCodeImage"
            alt=""
            width="300"
            class="mx-auto text-center"
          />
        </div>
      </div>

      <button type="submit" class="w-full pb-4">
        <DButton
          type="elevated"
          :loading="loading"
          @click="submit"
          class="w-full mt-5 shadow-slate-900 rounded-lg bg-slate-900 dark:bg-slate-50 dark:shadow-slate-100 !text-slate-100 dark:!text-slate-900"
          >Submit</DButton
        >
      </button>
    </form>
  </main>
</template>

<script setup>
import { adminflow } from "@/stores/adminflow";
import { authentication } from "@/stores/authentication";

import { checkInput } from "@/composables/checkInput";
import { getDate } from "@/composables/getDate";

import DTextfield from "../utils/DTextfield.vue";
import DButton from "../utils/DButton.vue";

import { computed, inject, ref } from "vue";

const emits = defineEmits(["closeDialog"]);

const adminflowing = adminflow();
const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

const loading = computed(() => {
  return adminflowing.loading.wallet;
});

const { getCurrentTimeAndDate } = getDate();
const theme = inject("theme");

const walletName = ref("");
const walletNameError = ref("");

const walletNetwork = ref("");
const walletNetworkError = ref("");

const walletAddress = ref("");
const walletAddressError = ref("");

const qrCode = ref(null);
const qrCodeError = ref("");
const qrCodeImage = ref(null);

function checkImage() {
  if (qrCode.value) {
    qrCodeImage.value = URL.createObjectURL(qrCode.value);
  } else {
    qrCodeImage.value = null;
  }
}

const checkWalletName = () =>
  checkInput("Wallet Name", walletName, walletNameError);
const checkWalletNetwork = () =>
  checkInput("Wallet Network", walletNetwork, walletNetworkError);
const checkWalletAddress = () =>
  checkInput("Wallet Address", walletAddress, walletAddressError);
const checkWalletQrcode = () => checkInput("Qr code", qrCode, qrCodeError);

function submit() {
  checkWalletName();
  checkWalletNetwork();
  checkWalletAddress();
  checkWalletQrcode();

  if (
    checkWalletName() &&
    checkWalletAddress() &&
    checkWalletNetwork() &&
    checkWalletQrcode()
  ) {
    const payload = {
      walletName: walletName.value,
      walletNetwork: walletNetwork.value,
      walletAddress: walletAddress.value,
      qrCode: qrCode.value,

      userID: user.value && user.value.userID,
      date: getCurrentTimeAndDate(),
      formattedDate: getCurrentTimeAndDate("format"),
    };
    adminflowing.walletFN(payload);
    console.log(payload);
    emits("closeDialog");
  }
}
</script>

<style scoped></style>
