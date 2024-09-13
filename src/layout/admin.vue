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
        <div class="relative mt-10">
          <div
            class="h-12 w-full mt-1 flex items-center justify-start px-4 transit cursor-pointer"
            :class="[
              drawer ? 'gap-x-4' : 'gap-x-0',
              $route.name.includes(link.text)
                ? 'bg-[#29295b3b] dark:bg-[#a3a3cb4d]'
                : '',
            ]"
            v-for="link in links"
            :key="link.text"
            @click="$router.push(link.to)"
          >
            <SvgComp
              Sclass="group-active:stroke-green-500 transit dark:!stroke-slate-200 dark:!fill-slate-200 !stroke-slate-900 !fill-slate-900"
              class=""
              :icon="link.icon"
            />
            <p
              :class="drawer ? 'w-0' : 'scale-x-0 opacity-0 transit'"
              class="group-active:text-green-500 transit capitalize font-medium dark:text-slate-100 text-slate-900"
            >
              {{ drawer ? link.text : "" }}
            </p>
          </div>
          <div
            class="h-12 w-full flex mt-2 items-center justify-start px-4 transit cursor-pointer"
            :class="[drawer ? 'gap-x-4' : 'gap-x-0']"
            @click="useAuthentication.signOutUser(), (drawer = false)"
          >
            <SvgComp
              Sclass="fill-red-500 !stroke-red-500 dark:!stroke-red-500"
              class=""
              icon="M8.37905 2.66859L12.0686 2.08881C15.2892 1.58272 16.8995 1.32967 17.9497 2.22779C19 3.12591 19 4.75596 19 8.01607V10.9996H13.0806L15.7809 7.62428L14.2191 6.37489L10.2191 11.3749L9.71938 11.9996L10.2191 12.6243L14.2191 17.6243L15.7809 16.3749L13.0806 12.9996H19V15.9831C19 19.2432 19 20.8733 17.9497 21.7714C16.8995 22.6695 15.2892 22.4165 12.0686 21.9104L8.37905 21.3306C6.76632 21.0771 5.95995 20.9504 5.47998 20.3891C5 19.8279 5 19.0116 5 17.3791V6.6201C5 4.98758 5 4.17132 5.47998 3.61003C5.95995 3.04874 6.76632 2.92202 8.37905 2.66859Z"
            />
            <p
              :class="drawer ? '' : 'scale-x-0 opacity-0 transit'"
              class="group-active:text-green-500 transit capitalize font-medium dark:text-red-500 text-red-500 transit"
            >
              {{ drawer ? "Log Out" : "" }}
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

      <DAlert />
    </main>

    <!-- sidebar for mobile -->
    <section
      @click.self="drawer = !drawer"
      class="min-h-[150vh] min-w-full fixed top-0 left-0 z-20 md:hidden transition-all duration-300 ease-out"
      :class="[
        drawer ? 'translate-x-0  ' : '-translate-x-full bg-transparent ',
        loading ? '!bg-[#06061220] transit backdrop-blur-sm ' : '',
      ]"
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
          <div
            class="h-12 w-full flex mt-2 items-center justify-start px-4 transit"
            :class="[drawer ? 'gap-x-4' : 'gap-x-0']"
            @click="useAuthentication.signOutUser(), (drawer = false)"
          >
            <SvgComp
              Sclass="fill-red-500 !stroke-red-500 dark:!stroke-red-500"
              class=""
              icon="M8.37905 2.66859L12.0686 2.08881C15.2892 1.58272 16.8995 1.32967 17.9497 2.22779C19 3.12591 19 4.75596 19 8.01607V10.9996H13.0806L15.7809 7.62428L14.2191 6.37489L10.2191 11.3749L9.71938 11.9996L10.2191 12.6243L14.2191 17.6243L15.7809 16.3749L13.0806 12.9996H19V15.9831C19 19.2432 19 20.8733 17.9497 21.7714C16.8995 22.6695 15.2892 22.4165 12.0686 21.9104L8.37905 21.3306C6.76632 21.0771 5.95995 20.9504 5.47998 20.3891C5 19.8279 5 19.0116 5 17.3791V6.6201C5 4.98758 5 4.17132 5.47998 3.61003C5.95995 3.04874 6.76632 2.92202 8.37905 2.66859Z"
            />
            <p
              :class="drawer ? '' : 'scale-x-0 opacity-0 transit'"
              class="group-active:text-green-500 transit capitalize font-medium dark:text-red-500 text-red-500"
            >
              {{ drawer ? "Log Out" : "" }}
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
import { authentication } from "@/stores/authentication";

//components
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";

import credit from "@/assets/svg/credit.svg";
import burger from "@/assets/png/burger.png";

import { computed, onMounted, provide, ref, watch } from "vue";
import DDashbar from "@/components/utils/DDashbar.vue";
import DAlert from "@/components/utils/DAlert.vue";

const useAuthentication = authentication();
useAuthentication.userWatch("admin");

const drawer = ref(false);
const userflowing = userflow();
const themeState = computed(() => {
  return userflowing.themeState;
});

const loading = ref(false);

watch(drawer, () => {
  if (drawer.value) {
    setTimeout(() => {
      loading.value = true;
    }, 160);
  } else {
    loading.value = false;
  }
});

const adminflowing = adminflow();
adminflowing.adminRoutes = "Admin Dashboard";

const theme = provide("theme", themeState);

const links = computed(() => {
  return [
    {
      icon: "M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z",
      text: "dashboard",
      to: "/admin/dashboard",
    },
    {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "users",
      to: "/admin/users",
    },
    {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "nfts",
      to: "/admin/nfts",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "deposits",
      to: "/admin/deposits",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "withdraws",
      to: "/admin/withdraws",
    },
    {
      icon: "M9.33497 4.72727V5.25342C6.64516 6.35644 4.76592 9.97935 4.83412 13.1192L4.83409 14.8631C3.45713 16.6333 3.53815 19.2727 6.9735 19.2727H9.33497C9.33497 19.996 9.61684 20.6897 10.1186 21.2012C10.6203 21.7127 11.3008 22 12.0104 22C12.72 22 13.4005 21.7127 13.9022 21.2012C14.404 20.6897 14.6858 19.996 14.6858 19.2727H17.0538C20.4826 19.2727 20.5323 16.6278 19.1555 14.8576L19.1938 13.1216C19.2631 9.97811 17.3803 6.35194 14.6858 5.25049V4.72727C14.6858 4.00396 14.404 3.31026 13.9022 2.7988C13.4005 2.28734 12.72 2 12.0104 2C11.3008 2 10.6203 2.28734 10.1186 2.7988C9.61684 3.31026 9.33497 4.00395 9.33497 4.72727ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186ZM17.0538 17.4545C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4787 9.99416 15.0427 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.65748 14.9289C6.66561 15.303 6.53726 15.6674 6.29639 15.9538C5.80054 16.5435 6.21158 17.4545 6.9735 17.4545H17.0538Z",
      text: "notifications",
      to: "/admin/notifications",
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
