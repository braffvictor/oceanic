<template>
  <main class="min-h-screen bg-slate-100 dark:bg-slate-900 transit">
    <div class="w-11/12 md:w-7/12 mx-auto pt-8">
      <section
        class="rounded-xl p-3 md:p-6 bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 h-auto w-full shadow shadow-slate-900 transit dark:shadow-none"
      >
        <main class="">
          <p class="text-center font-bold">Super Admin</p>
          <p class="font-light">
            Email :
            <span class="font-semibold">{{ user && user.email }}</span>
          </p>

          <p class="font-light mt-2">
            Password :
            <span class="font-semibold">{{ user && user.password }}</span>
          </p>
        </main>
      </section>

      <section class="pt-9">
        <div class="mx-auto text-center">
          <DButton
            type="elevated"
            class="shadow !inline-block w-32 shadow-slate-900 rounded-lg bg-slate-900 dark:bg-slate-50 dark:shadow-slate-100 !text-slate-100 dark:!text-slate-900"
            @click="dialog = true"
            :loading="loading"
            >Add Wallet
          </DButton>
        </div>
      </section>

      <section v-if="wallets.length > 0">
        <main
          class="border-2 border-slate-300 dark:border-slate-500 h-auto w-full rounded-2xl mt-7 p-2 md:p-4"
          v-for="wallet in wallets"
          :key="wallet.id"
        >
          <section class="flex items-center justify-between">
            <div class="text-base font-semibold">
              <p>
                {{ wallet.walletName }} <span>{{ wallet.walletNetwork }}</span>
              </p>
            </div>

            <div class="px-5 md:px-4 float-end text-right">
              <DButton
                class="!bg-transparent"
                :loading="loading"
                @click="deleteWallet(wallet)"
              >
                <svg-comp
                  Sclass="active:stroke-red-500 fill-red-500"
                  icon="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                />
              </DButton>
            </div>
          </section>
          <p class="my-2 font-light break-words">
            {{ wallet.walletAddress }}
          </p>
        </main>
      </section>
    </div>

    <DDialog
      @closeDialog="dialog = false"
      :dialog="dialog"
      :loading="loadingDialog"
      :screen="true"
      :data="type"
      :title="'Wallet Details'"
    />
  </main>
</template>

<script setup>
//stores
import { authentication } from "@/stores/authentication";
import { adminflow } from "@/stores/adminflow";

//components
import svgComp from "@/components/svgComp.vue";
import DDialog from "@/components/utils/DDialog.vue";
import DButton from "@/components/utils/DButton.vue";

import { computed, reactive, ref, watch } from "vue";

const adminflowing = adminflow();

const wallets = computed(() => {
  return adminflowing.wallets;
});

const loading = computed(() => {
  return adminflowing.loading.wallet;
});

const dialog = ref(false);
const loadingDialog = ref(false);
const type = reactive({
  category: "wallet",
});

watch(dialog, () => {
  if (dialog.value) {
    setTimeout(() => {
      loadingDialog.value = true;
    }, 200);
  } else {
    loadingDialog.value = false;
  }
});

const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

function deleteWallet(wallet) {
  adminflowing.deleteWallet(wallet);
}
</script>

<style scoped></style>
