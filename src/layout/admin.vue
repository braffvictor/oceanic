<template>
  <main
    class="min-h-screen relative bg-slate-50 dark:bg-slate-900 transit text-slate-900 dark:text-slate-100 flex"
    :class="[themeState == 'light' || !themeState ? '' : 'dark']"
  >
    <!-- sidebar for pc -->
    <main
      @click.self="drawer = !drawer"
      class="min-h-screen bg-slate-100 dark:bg-slate-900 hidden md:block transit relative overflow-clip border-r dark:border-slate-800"
      :class="drawer ? 'w-[220px]' : 'w-16'"
    >
      <!-- toggle drawer button -->
      <button
        @click="drawer = !drawer"
        class="my-4 fixed top-64 rounded-full border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 z-30"
        :class="[
          themeState == 'light' || themeState == null
            ? 'whiteT border-gray-200'
            : 'darkT border-gray-600',
          drawer ? 'left-[170px]' : 'left-[44px]',
        ]"
      >
        <SvgComp
          class="pt-1 pl-1"
          :class="drawer ? 'rotate-180 transit' : 'rotate-0 transit'"
          icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        />
      </button>

      <section class="fixed transit" :class="drawer ? 'w-[187px]' : 'w-[60px]'">
        <!-- first content...logo -->
        <div
          class="justify-center items-center gap-x-2 cursor-pointer pt-7 mb-3"
        >
          <img
            src="https://solanart.io/solanart-logo-black.svg"
            class="mx-auto text-center transit min-w-12 max-w-12"
            v-if="themeState != 'dark'"
            alt=""
          />
          <img
            src="https://solanart.io/solanart-logo.svg"
            class="mx-auto text-center transit min-w-12 max-w-12"
            alt=""
            v-if="themeState != 'light' && themeState != null"
          />
        </div>

        <!-- link content -->
        <div class="relative">
          <div
            class="h-12 w-full mt-10 flex items-center justify-start px-4 bg-[#29295b3b] dark:bg-[#a3a3cb4d] transit"
            :class="drawer ? 'gap-x-4' : 'gap-x-0'"
          >
            <SvgComp
              Sclass="group-active:stroke-green-500 transit dark:!stroke-slate-200 dark:!fill-slate-200 !stroke-slate-900 !fill-slate-900"
              class=""
              icon="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
            />
            <p
              :class="drawer ? 'w-0' : 'scale-x-0 opacity-0 transit'"
              class="group-active:text-green-500 transit capitalize font-medium dark:text-slate-100 text-slate-900"
            >
              {{ drawer ? "Dashboard" : "" }}
            </p>
          </div>
        </div>
      </section>
    </main>

    <main class="w-full min-w-96">
      <!-- navbar -->
      <DDashbar class="md:px-6 !bg-slate-100 dark:!bg-slate-900">
        <div class="w-full flex justify-between md:justify-start items-center">
          <button
            class="active:scale-75 transit cursor-pointer md:hidden p-2"
            @click="drawer = !drawer"
          >
            <img :src="burger" alt="" width="20" />
          </button>
          <p
            class="text-center w-full font-semibold md:text-left text-slate-900 dark:text-slate-100"
          >
            {{ adminflowing.adminRoutes }}
          </p>
        </div>
      </DDashbar>

      <section class="h-auto">
        <Transition duration="1000">
          <router-view />
        </Transition>
      </section>
    </main>

    <!-- sidebar for mobile -->
    <section
      @click.self="drawer = !drawer"
      class="min-h-[150vh] min-w-full fixed top-0 left-0 z-20 md:hidden transition-all duration-300 ease-in-out"
      :class="
        drawer
          ? 'translate-x-0 !bg-[#06061220] backdrop-blur-sm opacity-100'
          : '-translate-x-full bg-transparent opacity-0'
      "
    >
      <!-- content -->
      <main
        class="min-h-[150vh] w-[55%] md bg-slate-100 dark:bg-slate-800 shadow-md"
      >
        <!-- first content...logo -->
        <div class="justify-center items-center gap-x-2 cursor-pointer pt-7">
          <img
            src="https://solanart.io/solanart-logo-black.svg"
            class="max-w-20 mx-auto text-center"
            v-if="themeState != 'dark'"
            alt=""
          />
          <img
            src="https://solanart.io/solanart-logo.svg"
            class="max-w-20 mx-auto text-center"
            alt=""
            v-if="themeState != 'light' && themeState != null"
          />
        </div>

        <!-- link content -->
        <div class="relative mt-4">
          <div
            class="h-12 w-full flex mt-2 items-center justify-start px-4 transit"
            :class="[
              drawer ? 'gap-x-4' : 'gap-x-0',
              $route.name.includes(link.text)
                ? 'bg-[#29295b3b] dark:bg-[#a3a3cb4d]'
                : '',
            ]"
            v-for="link in links"
            :key="link.text"
            @click="$router.push(link.to), (drawer = false)"
          >
            <SvgComp
              Sclass="group-active:stroke-green-500 transit dark:!stroke-slate-200 dark:!fill-slate-200 !stroke-slate-900 !fill-slate-900"
              class=""
              :icon="link.icon"
            />
            <p
              :class="drawer ? '' : 'scale-x-0 opacity-0 transit'"
              class="group-active:text-green-500 transit capitalize font-medium dark:text-slate-100 text-slate-900"
            >
              {{ drawer ? link.text : "" }}
            </p>
          </div>
        </div>
      </main>
    </section>
  </main>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { adminflow } from "@/stores/adminflow";

//components
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";

import credit from "@/assets/svg/credit.svg";
import burger from "@/assets/png/burger.png";

import { computed, onMounted, provide, ref } from "vue";
import DDashbar from "@/components/utils/DDashbar.vue";

const drawer = ref(false);
const userflowing = userflow();
const themeState = computed(() => {
  return userflowing.themeState;
});

const adminflowing = adminflow();
adminflowing.adminRoutes = "Admin Dashboard";
onMounted(() => {
  if (adminflowing.users.length == 0) adminflowing.initAllUsers();
  if (adminflowing.nfts.length == 0) adminflowing.initAllNfts();
  if (adminflowing.deposits.length == 0) adminflowing.initAllDeposits();
  if (adminflowing.withdraws.length == 0) adminflowing.initAllWithdraws();
  // if (adminflowing.wallets.length == 0) adminflowing.initAllWallet();
  if (adminflowing.notifications.length == 0)
    adminflowing.initAllNotifications();
});

const theme = provide("theme", themeState);

const links = computed(() => {
  return [
    {
      icon: "M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z",
      text: "dashboard",
      to: "/admin",
    },
    {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "users",
      to: "/admin/users",
    },
  ];
});
</script>

<style>
.pen {
  color: #0000003f;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.6s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0, 6;
  transform: translateY(-20px);
}
</style>
