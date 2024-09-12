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
          <p class="text-center w-full font-semibold">Crypto Withdrawal</p>
        </div>
      </DDashbar>

      <section
        class="mx-2 border-green-400 border-2 bg-green-50 dark:bg-green-200 transit dark:border-green-500 rounded-xl p-3 flex mt-5 gap-4"
      >
        <SvgComp
          icon="M12,2 C17.5228,2 22,6.47715 22,12 C22,17.5228 17.5228,22 12,22 C6.47715,22 2,17.5228 2,12 C2,6.47715 6.47715,2 12,2 Z M11.99,10 L11,10 C10.4477,10 10,10.4477 10,11 C10,11.51285 10.386027,11.9355092 10.8833761,11.9932725 L11,12 L11,16.99 C11,17.5106133 11.3938293,17.9392373 11.8999333,17.9940734 L12.01,18 L12.5,18 C13.0523,18 13.5,17.5523 13.5,17 C13.5,16.6710222 13.3411062,16.3791012 13.0958694,16.1968582 L13,16.1338 L13,11.01 C13,10.4893867 12.6060836,10.0607627 12.1000493,10.0059266 L11.99,10 Z M12,7 C11.4477,7 11,7.44772 11,8 C11,8.55228 11.4477,9 12,9 C12.5523,9 13,8.55228 13,8 C13,7.44772 12.5523,7 12,7 Z"
          Sclass="!stroke-green-500 dark:!stroke-green-600"
        />
        <p class="text-green-500 dark:text-green-600 font-thin text-sm">
          Dear {{ user && user.fullName }}, Please Kindly Verify Your Account By
          Contacting Support In order to Withdraw your funds.
        </p>
      </section>

      <section
        class="mt-5 px-2"
        :class="
          user && !user.verified ? 'opacity-65 pointer-events-none' : null
        "
      >
        <form action="">
          <!-- form like -->
          <section class="px-1 relative">
            <!-- the crypto paid in ethereum -->
            <main
              class="group mt-2 p-3 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
              @click="show = true"
              @keyup="checkCrypto()"
            >
              <div class="w-full">
                <input
                  class="cursor-pointer placeholder:text-slate-500 dark:placeholder:text-slate-00 bg-transparent outline-none w-full"
                  type="text"
                  name="crypto"
                  id="crypto"
                  v-model="crypto"
                  readonly
                  placeholder="Select Crypto Currency"
                />
              </div>

              <div>
                <SvgComp
                  Sclass="rotate-360 group-hover:rotate-90"
                  class="pt-1 pl-1"
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                />
              </div>
            </main>
            <p
              class="text-xs text-red-500 transit mt-3 text-center"
              :class="errorCrypto ? 'transit ' : 'scale-y-0 transit'"
            >
              {{ errorCrypto }}
            </p>

            <!-- list of avaibable cryptoCurrencies -->
            <main
              class="absolute w-full -top-1 left-0 z-10 shadow-md bg-slate-100 dark:bg-slate-800 rounded-lg transit overflow-hidden"
              :class="
                show
                  ? 'transit h-auto py-1 '
                  : 'h-0 py-0 overflow-hidden opacity-0'
              "
            >
              <p
                class="hover:bg-slate-200 font-semibold dark:hover:bg-slate-700 my-3 px-3 py-2 transit active:bg-slate-200 dark:active:bg-slate-700 cursor-pointer"
                v-for="cryp in cryptoCurrencies"
                :key="cryp.name"
                @click="(show = false), (crypto = cryp.name)"
              >
                {{ cryp.name }}
              </p>
            </main>

            <!-- the crypto currency network-->
            <section v-if="crypto">
              <div
                class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
                :class="errorNetwork ? '!border-red-500' : null"
              >
                <div class="relative w-full">
                  <input
                    type="text"
                    name="network"
                    v-model="network"
                    @keyup="checkNetwork()"
                    id="network"
                    class="block px-0 w-full mt-2 indent-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="network"
                    class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0 indent-3"
                    :class="errorNetwork ? '!text-red-500' : null"
                    >Enter {{ crypto }} Network</label
                  >
                </div>
              </div>

              <p
                class="text-xs text-red-500 transit mt-3 text-center"
                :class="errorNetwork ? 'transit ' : 'scale-y-0 transit'"
              >
                {{ errorNetwork }}
              </p>
            </section>

            <section v-if="crypto">
              <!-- the wallet address-->
              <div
                class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
                :class="errorAddress ? '!border-red-500' : null"
              >
                <div class="relative w-full">
                  <input
                    type="text"
                    name="address"
                    @keyup="checkAddress()"
                    v-model="address"
                    id="amount"
                    class="block px-0 w-full mt-2 indent-2 text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="amount"
                    class="w-96 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0 indent-3"
                    :class="errorAddress ? '!text-red-500' : null"
                    >Enter {{ crypto }} Wallet Address</label
                  >
                </div>
              </div>

              <p
                class="text-xs text-red-500 transit mt-3 text-center"
                :class="errorAddress ? 'transit ' : 'scale-y-0 transit'"
              >
                {{ errorAddress }}
              </p>
            </section>

            <!-- amount withdrawn -->
            <section v-if="crypto">
              <div
                class="group mt-2 p-1 rounded-lg dark:border-gray-600 border bg-transparent dark:text-slate-100 text-slate-900 overflow-hidden caret:slate-700 dark:caret-slate-100 h-[50px] has-[:focus]:border-green-500 outline-none transit relative z-0 flex items-center gap-x-3"
                :class="errorAmount ? '!border-red-500' : null"
              >
                <div class="relative w-full">
                  <input
                    type="number"
                    name="amount"
                    @keyup="checkAmount()"
                    v-model="amount"
                    id="amount"
                    class="block px-0 w-full mt-2 text-sm indent-2 text-gray-900 bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="amount"
                    class="w-96 indent-2 peer-focus:w-96 peer-focus:font-medium left-0 absolute text-slate-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-8 peer-focus:text-green-500 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:left-0"
                    :class="errorAmount ? '!text-red-500' : null"
                    >Enter Amount in (ETH)</label
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

            <div class="mt-28 md:mt-20" v-if="crypto">
              <d-button
                @click="submit"
                type="elevated"
                :loading="loading"
                class="bg-green-400 dark:bg-green-500 w-full mt-5 shadow-md shadow-green-400 dark:shadow-green-500 !text-slate-100 dark:!text-slate-900"
                >Submit</d-button
              >
            </div>
          </section>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";

//composables
import { getDate } from "@/composables/getDate";

//components
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, ref } from "vue";
import DButton from "@/components/utils/DButton.vue";

const userflowing = userflow();

const loading = computed(() => {
  return userflowing.loading.withdraw;
});

const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

const { getCurrentTimeAndDate } = getDate();

const theme = inject("theme");

const amount = ref("");
const errorAmount = ref("");

const crypto = ref("");
const errorCrypto = ref("");

const address = ref("");
const errorAddress = ref("");

const network = ref("");
const errorNetwork = ref("");

const show = ref(false);

const convertAmount = computed(() => {
  const dollars = Number(amount.value) * 3043;
  return amount.value
    ? `${dollars?.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}`
    : "";
});

function checkAmount() {
  if (!amount.value) {
    errorAmount.value = "Amount is required";
    return false;
  } else {
    errorAmount.value = "";
    return true;
  }
}

function checkCrypto() {
  if (!crypto.value) {
    errorCrypto.value = `Crypto Currency is required`;
    return false;
  } else {
    errorCrypto.value = "";
    return true;
  }
}

function checkAddress() {
  if (!address.value) {
    errorAddress.value = `${crypto.value} Address is required`;
    return false;
  } else {
    errorAddress.value = "";
    return true;
  }
}

function checkNetwork() {
  if (!network.value) {
    errorNetwork.value = `${crypto.value} Network is required`;
    return false;
  } else {
    errorNetwork.value = "";
    return true;
  }
}

function submit() {
  checkAddress();
  checkAmount();
  checkCrypto();
  checkNetwork();

  if (
    checkAddress() &&
    checkAmount() &&
    checkNetwork() &&
    checkCrypto() &&
    user.value
  ) {
    if (user.value.wallet.balance < amount.value) {
      userflowing.initAlert({
        is: true,
        message: `Dear ${
          user.value && user.value.fullName
        }, You Do Not Have The Sufficient Amount In Your Wallet Balance For This Transaction.`,
        type: "error",
        timer: 5000,
      });
      return;
    }

    const payload = {
      amount: amount.value,
      convertAmount: convertAmount.value,
      walletAddress: address.value,
      crypto: crypto.value,
      network: network.value,

      fullName: user.value && user.value.fullName,
      email: user.value && user.value.email,
      userID: user.value && user.value.userID,
      date: getCurrentTimeAndDate(),
      formattedDate: getCurrentTimeAndDate("format"),
      status: "pending",
      category: "withdraws",
      type: "debit",
    };

    console.log(payload);
    userflowing.withdrawFN(payload).then(() => {
      amount.value = "";
      address.value = "";
      crypto.value = "";
      network.value = "";
    });
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

<style></style>
