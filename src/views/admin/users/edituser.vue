<template>
  <main class="min-h-screen bg-slate-100 dark:bg-slate-900 transit">
    <section class="md:w-7/12 mx-auto w-11/12 pt-5">
      <div
        class="rounded-2xl bg-slate-900 dark:bg-slate-100 transit h-auto pb-4 w-full shadow-md shadow-slate-900 text-slate-100 dark:text-slate-900 px-4 py-1 md:px-5"
      >
        <div class="flex justify-between items-center">
          <p class="text-base md:text-lg font-semibold">Bio Data</p>

          <div class="text-right float-left border relative transit">
            <svg-comp
              icon="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
              class="mx-auto text-center w-full peer"
              Sclass="mx-auto text-center !stroke-slate-100 dark:!stroke-slate-900"
            />
            <!-- options for nft menu -->
            <div
              class="absolute shadow-md h-auto -left-44 md:left-4 transit top-10 md:text-base text-sm md:text- font-normal z-20 w-56 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col divide-y p-1 scale-y-0 peer-hover:scale-y-100 -translate-y-full divide-slate-900 dark:divide-slate-100 divide-opacity-20 dark:divide-opacity-45 peer-hover:-translate-y-0 md:translate-y-0 opacity-0 peer-hover:opacity-100 gap-y-2 peer-hover:block py-2 hover:scale-100 hover:-translate-y-0 hover:block md:hover:opacity-100 text-start"
            >
              <p
                class="p-1 active:bg-slate-200 text-slate-900 dark:text-slate-100 dark:active:bg-slate-700"
                @click="
                  $router.push(
                    `/admin/user/activities/${
                      user && user.userID
                    }?type=alldeposits`
                  )
                "
              >
                {{ user && user.fullName }} Deposits
              </p>
              <p
                class="p-1 active:bg-slate-200 text-slate-900 dark:text-slate-100 dark:active:bg-slate-700"
                @click="
                  $router.push(
                    `/admin/user/activities/${
                      user && user.userID
                    }?type=allwithdraws`
                  )
                "
              >
                {{ user && user.fullName }} Withdrawals
              </p>
              <p
                class="p-1 active:bg-slate-200 text-slate-900 dark:text-slate-100 dark:active:bg-slate-700"
                @click="
                  $router.push(
                    `/admin/user/activities/${user && user.userID}?type=allnfts`
                  )
                "
              >
                {{ user && user.fullName }} NFTs
              </p>
            </div>
          </div>
        </div>

        <main class="">
          <p class="font-light">
            FullName :
            <span class="font-semibold">{{ user && user.fullName }}</span>
          </p>
          <p class="font-light mt-2">
            Email :
            <span class="font-semibold">{{ user && user.email }}</span>
          </p>
          <p class="font-light mt-2">
            Username :
            <span class="font-semibold">{{ user && user.userName }}</span>
          </p>
          <p class="font-light mt-2">
            Password :
            <span class="font-semibold">{{ user && user.password }}</span>
          </p>
          <p class="font-light mt-2">
            Verified :
            <span
              class="font-semibold border p-1 rounded-xl"
              :class="checkVerifiedStatus(user && user.verified)"
              >{{ user && user.verified ? "True" : "False" }}</span
            >
          </p>
        </main>
      </div>
    </section>

    <section class="md:w-7/12 mx-auto w-11/12 pt-5">
      <div
        class="rounded-xl bg-slate-900 dark:bg-slate-100 transit h-auto w-full pb-5 shadow-md shadow-slate-900 text-slate-100 dark:text-slate-900 px-4 py-1 md:px-5"
      >
        <main class="py-1">
          <p class="font-light">
            {{ user && user.fullName }} Wallet Balance :
            <span class="font-semibold"
              >{{ user && user.wallet.balance.toFixed(1) }} ETH</span
            >
          </p>

          <DButton
            type="elevated"
            class="shadow-slate-100 w-full text-slate-900 bg-slate-100 dark:text-slate-100 dark:bg-slate-900 dark:shadow-slate-900 mt-3 !rounded-lg"
            >Edit {{ user && user.fullName }} Account</DButton
          >
        </main>
      </div>
    </section>
  </main>
</template>

<script setup>
import { adminflow } from "@/stores/adminflow";
import SvgComp from "@/components/svgComp.vue";
import { computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import DButton from "@/components/utils/DButton.vue";

const route = useRoute();

const adminflowing = adminflow();
const user = computed(() => {
  return adminflowing.getUserByUserID(route.params.id);
});

onMounted(() => {
  adminflowing.adminRoutes = "Edit User";
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});

onUnmounted(() => {
  adminflowing.adminRoutes = "Admin Dashboard";
});

function checkVerifiedStatus(verified) {
  if (verified) {
    return "border-green-500 text-green-500";
  } else if (!verified) {
    return "border-red-500 text-red-500";
  }
}
</script>

<style scoped></style>
