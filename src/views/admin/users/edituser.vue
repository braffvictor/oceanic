<template>
  <main class="min-h-screen bg-slate-100 dark:bg-slate-900 transit">
    <section class="md:w-7/12 mx-auto w-11/12 pt-5">
      <div
        class="rounded-2xl bg-slate-900 dark:bg-slate-100 transit h-auto pb-4 w-full shadow-md shadow-slate-900 text-slate-100 dark:text-slate-900 px-4 py-1 md:px-5"
      >
        <div class="flex justify-between items-center">
          <p class="text-base md:text-lg font-semibold">Bio Data</p>

          <button class="block">
            <SvgComp
              icon="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13ZM16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
              class="mx-auto text-center w-full peer md:p-4 p-2 rotate-90"
              Sclass="mx-auto text-center !stroke-slate-100 dark:!stroke-slate-900"
            />
          </button>
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
</script>

<style scoped></style>
