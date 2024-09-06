<template>
  <div class="min-h-screen">
    <main class="md:w-8/12 mx-auto">
      <DDashbar>
        <div class="w-full flex justify-between items-center">
          <button
            @click="$router.go(-1)"
            class="rounded-full bg-slate-50 dark:bg-slate-900 active:scale-75 border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800"
            :class="[
              theme == 'light' || theme == null
                ? ' border-gray-200'
                : ' border-gray-600',
            ]"
          >
            <SvgComp
              Sclass="rotate-180"
              class="pb-1 pr-1"
              icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
            />
          </button>
          <p class="text-center w-full font-semibold">Deposit Ethereum</p>
        </div>
      </DDashbar>

      <section class="px-3">
        <div class="mt-5 text-slate-900 dark:text-slate-100">
          <div class="mx-auto text-center">
            <div
              class="overflow-hidden rounded-lg border inline-block mx-auto text-center"
            >
              <img
                :src="wallet && wallet.qrCode"
                alt=""
                class="mx-auto text-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        class="px-3 mx-3 border-green-400 border-2 bg-green-50 dark:bg-green-200 transit dark:border-green-500 rounded-xl p-3 flex mt-5 gap-4"
      >
        <SvgComp
          icon="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.99,10 L11,10 C10.4477,10 10,10.4477 10,11 C10,11.51285 10.386027,11.9355092 10.8833761,11.9932725 L11,12 L11,16.99 C11,17.5106133 11.3938293,17.9392373 11.8999333,17.9940734 L12.01,18 L12.5,18 C13.0523,18 13.5,17.5523 13.5,17 C13.5,16.6710222 13.3411062,16.3791012 13.0958694,16.1968582 L13,16.1338 L13,11.01 C13,10.4893867 12.6060836,10.0607627 12.1000493,10.0059266 L11.99,10 Z M12,7 C11.4477,7 11,7.44772 11,8 C11,8.55228 11.4477,9 12,9 C12.5523,9 13,8.55228 13,8 C13,7.44772 12.5523,7 12,7 Z"
          Sclass="!stroke-green-500 dark:!stroke-green-600"
        />
        <p class="text-green-500 dark:text-green-600 text-light text-sm">
          Send Only {{ wallet && wallet.walletName }}-{{
            wallet && wallet.walletNetwork
          }}
          to this deposit address. Sending any other coin or token to this
          address may result to the loss of your deposit.
        </p>
      </section>

      <div class="rounded-3xl dark:border-slate-500 py-4 px-1 mt-4 mx-3">
        <p class="opacity-55 text-xs">Network</p>
        <p class="opacity-85 font-bold text-sm">
          {{ wallet && wallet.walletName }} ({{
            wallet && wallet.walletNetwork
          }})
        </p>

        <!-- divider -->
        <div
          class="border-b w-full my-3 transit"
          :class="
            theme == 'light' || theme == null
              ? 'whiteT border-b-gray-200 transit'
              : 'darkT border-b-gray-600 transit'
          "
        ></div>

        <p class="opacity-55 text-xs">Deposit Address</p>
        <p
          class="opacity-85 font-bold break-words text-sm cursor-pointer"
          @click="copyWallet(wallet && wallet.walletAddress)"
        >
          {{ wallet && wallet.walletAddress }}
          <img class="inline-block" src="@/assets/png/copy.png" width="20" />
        </p>
      </div>

      <!-- form like -->
      <section class="px-1 mx-2">
        <!-- the amount paid in ethereum -->
        <div
          class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
          :class="errorAmount ? '!border-red-500' : null"
        >
          <div>
            <SvgComp
              icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
              :Sclass="
                errorAmount
                  ? 'group-has-[:focus]:stroke-red-500 !stroke-red-500'
                  : 'group-has-[:focus]:stroke-green-500'
              "
              class=""
            />
          </div>
          <div class="relative w-full">
            <input
              type="number"
              name="amount"
              v-model="amount"
              @keyup="checkAmount()"
              id="amount"
              class="block px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
              placeholder=" "
              required
            />
            <label
              for="amount"
              class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
              :class="errorAmount ? '!text-red-500' : null"
              >Deposited Amount in (ETH)</label
            >
          </div>
        </div>
        <p
          class="mt-3 text-xs font-light font-sans text-center"
          :class="amount ? ' transit' : 'scale-y-0 transit hidden'"
        >
          Dollar Conversion : {{ convertAmount }}
        </p>

        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="errorAmount ? 'transit ' : 'scale-y-0 transit'"
        >
          {{ errorAmount }}
        </p>
      </section>

      <!-- the proof of payment in ethereum -->
      <section class="px-1 pb-4 mx-2">
        <label
          for="proof"
          class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
          :class="errorPhoto ? '!border-red-500' : null"
        >
          <div>
            <SvgComp
              icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
              :Sclass="
                errorPhoto
                  ? 'group-has-[:focus]:stroke-red-500 !stroke-red-500'
                  : 'group-has-[:focus]:stroke-green-500'
              "
            />
          </div>
          <div class="relative w-full">
            <input
              type="file"
              name="proof"
              @change="
                (event) => (
                  (photo = event.target.files[0]), checkImage(), checkPhoto()
                )
              "
              id="proof"
              class="cursor-pointer file:bg-transparent file:w-0 file:px-0 file:mx-0 file:border-0 px-0 w-full mt-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
              placeholder="Proof"
              required
            />
            <label
              for="amount"
              class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
              :class="errorPhoto ? '!text-red-500' : null"
              >Proof Of Payment</label
            >
          </div>
        </label>

        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="errorPhoto ? 'transit ' : 'scale-y-0 transit'"
        >
          {{ errorPhoto }}
        </p>

        <!-- the image proof displayed -->
        <div class="mx-auto text-center mt-5" v-if="proof">
          <div
            class="overflow-hidden rounded-lg shadow-sm inline-block mx-auto text-center"
          >
            <img :src="proof" alt="" width="300" class="mx-auto text-center" />
          </div>
        </div>

        <d-button
          type="elevated"
          :loading="loading"
          @click="submit"
          class="bg-green-400 dark:bg-green-500 w-full mt-5 shadow-md shadow-green-400 dark:shadow-green-500"
          >Submit</d-button
        >
      </section>
    </main>
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";
import { adminflow } from "@/stores/adminflow";

//composables
import { getDate } from "@/composables/getDate";

import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, onMounted, ref } from "vue";
import DButton from "@/components/utils/DButton.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const userflowing = userflow();
const useAuthentication = authentication();
const adminflowing = adminflow();

const wallet = computed(() => {
  return adminflowing.getWalletByID(route.params.id);
});

const user = computed(() => {
  return useAuthentication.user;
});

const loading = computed(() => {
  return userflowing.loading.deposit;
});

const { getCurrentTimeAndDate } = getDate();

onMounted(() => {
  window.scrollTo(0, 0);
});

const theme = inject("theme");

const amount = ref("");
const photo = ref(null);
const proof = ref(null);

const convertAmount = computed(() => {
  const dollars = Number(amount.value) * 3043;
  return amount.value ? `$${dollars.toLocaleString()}` : "";
});

const errorAmount = ref("");

function checkAmount() {
  if (!amount.value) {
    errorAmount.value = "Amount is required";
    return false;
  } else {
    errorAmount.value = "";
    return true;
  }
}

const errorPhoto = ref("");
function checkPhoto() {
  if (!photo.value) {
    errorPhoto.value = "Proof of payment is required";
    return false;
  } else {
    errorPhoto.value = "";
    return true;
  }
}

function submit() {
  checkAmount();
  checkPhoto();

  if (checkAmount() && checkPhoto() && user.value && wallet.value) {
    const payload = {
      photo: photo.value,
      amount: amount.value,
      convertAmount: convertAmount.value,

      fullName: user.value && user.value.fullName,
      email: user.value && user.value.email,
      userID: user.value && user.value.userID,
      date: getCurrentTimeAndDate(),
      formattedDate: getCurrentTimeAndDate("format"),
      status: "pending",
      category: "deposits",
      type: "credit",

      // inject after adding wallets to firebase
      walletAddress: wallet.value && wallet.value.walletAddress,
      wallet: wallet.value && wallet.value.walletName,
      walletNetwork: wallet.value && wallet.value.walletNetwork,
    };
    console.log(payload);
    userflowing.depositFN(payload).then(() => {
      amount.value = "";
      photo.value = null;
    });
  } else {
    // console.log("Deposit unsuccessful");
  }
}

function checkImage() {
  if (photo.value) {
    proof.value = URL.createObjectURL(photo.value);
  } else {
    proof.value = null;
  }
}

const copyWallet = (address) => {
  navigator.clipboard
    .writeText(address)
    .then(() => {
      userflowing.initAlert({
        message: "Ethereum Wallet Address Copied Successfully",
        is: true,
        type: "info",
      });
    })
    .catch((error) => {
      userflowing.initAlert({
        message: error.message,
        is: true,
        type: "error",
      });
    });
};
</script>

<style></style>
