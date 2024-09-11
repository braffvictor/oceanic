<template>
  <div
    class="transit font-mono bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 h-auto pb-16 md:pb-0 relative flex justify-around"
    :class="themeState == 'light' || !themeState ? '' : 'dark'"
  >
    <!-- side nav bar for pc -->
    <section
      class="h-auto hidden md:block bg-slate-100 dark:bg-slate-950 left-0 px-4 top-0 border-r border-gray-200 dark:border-gray-600"
      :class="drawer ? 'w-56 transit ' : 'w-24  transit'"
    >
      <!-- toggle drawer button -->
      <button
        @click="drawer = !drawer"
        class="my-4 fixed top-64 rounded-full border flex justify-center items-center transit backdrop-blur-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 z-30"
        :class="[
          themeState == 'light' || themeState == null
            ? 'whiteT border-gray-200'
            : 'darkT border-gray-600',
          drawer ? 'left-[178px]' : 'left-[74px]',
        ]"
      >
        <SvgComp
          class="pt-1 pl-1"
          :class="drawer ? 'rotate-180 transit' : 'rotate-0 transit'"
          icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        />
      </button>

      <!-- nav content -->
      <div
        class="h-screen fixed top-0 left-0 px-4"
        :class="drawer ? 'w-44 transit' : 'w-20 transit'"
      >
        <!-- first content -->
        <div
          class="justify-center items-center gap-x-2 cursor-pointer mt-7 mb-3"
          @click="$router.push('/')"
        >
          <img
            src="https://solanart.io/solanart-logo-black.svg"
            class="max-w-9 mx-auto text-center"
            v-if="themeState != 'dark'"
            alt=""
          />
          <img
            src="https://solanart.io/solanart-logo.svg"
            class="max-w-9 mx-auto text-center"
            alt=""
            v-if="themeState != 'light' && themeState != null"
          />
          <!-- Site name -->
          <p
            :class="
              drawer
                ? 'opacity-100 transit block'
                : 'opacity-0  transit scale-x-0'
            "
            class="text-center text-slate-800 dark:text-slate-50 text-xl font-semibold transit"
          >
            Oceanic
          </p>
        </div>

        <!-- divider -->
        <div
          class="border-b border w-full"
          :class="
            themeState == 'light' || themeState == null
              ? 'whiteT border-b-gray-200'
              : 'darkT border-b-gray-600'
          "
        ></div>

        <!-- other nav links -->
        <main
          class="flex flex-col h-full w-full gap-y-6 mt-10 mx-auto text-center"
          :class="drawer ? 'items-start' : 'items-center'"
        >
          <DButton
            type="elevated"
            v-for="link in links"
            :key="link.icon"
            :to="link.to"
            class="flex group shadow-none text-green-500 rounded-lg !p-[10px] w-full relative"
            :class="[
              drawer ? 'gap-x-3 justify-between' : 'justify-between',
              route.name.includes(link.text)
                ? '!bg-green-400 dark:!bg-green-500 !shadow-md !shadow-green-400 dark:!shadow-green-500'
                : '',
            ]"
          >
            <div class="relative">
              <p
                v-if="userflowing.cartList > 0 && link.text == 'cart'"
                class="transit bg-green-400 dark:bg-green-500 text-slate-900 dark:text-slate-100 font-bold rounded-3xl text-xs -top-2 -right-2 absolute px-1"
              >
                {{ userflowing.cartList }}
              </p>
              <SvgComp
                :Sclass="
                  route.name.includes(link.text)
                    ? 'dark:!fill-slate-300 !fill-slate-800 dark:!stroke-slate-300 !stroke-slate-800'
                    : 'dark:!stroke-slate-200 !stroke-slate-700'
                "
                class=""
                :icon="link.icon"
              />
            </div>
            <p
              :class="
                drawer
                  ? 'transit opacity-100 w-full text-left'
                  : 'scale-x-0 opacity-0 transit'
              "
              class="group-active:text-green-500 transit capitalize font-medium"
            >
              {{ drawer ? link.text : "" }}
            </p>
          </DButton>
        </main>
      </div>
    </section>

    <!-- children routerview -->
    <section class="w-full md:min-w-80" @click="drawer = !drawer">
      <Transition duration="1000">
        <!-- {{ themeState }} -->
        <router-view class="w-full md:py-4" />
      </Transition>
    </section>

    <!-- bottom nav bar for mobile -->
    <section
      class="fixed h-16 w-full bottom-0 dark:bg-slate-900 bg-slate-100 border-opacity-100 md:hidden transit z-50"
    >
      <!-- divider -->
      <div
        class="border-b border w-full opacity-30"
        :class="
          themeState == 'light' || themeState == null
            ? 'whiteT border-b-gray-200'
            : 'darkT border-b-gray-600'
        "
      ></div>
      <main class="flex h-full w-full items-center justify-evenly">
        <DButton
          v-for="link in links"
          :to="link.to"
          :key="link.text"
          class="flex flex-col items-center group rounded-none z-10 w-full relative"
          :class="
            route.name.includes(link.text)
              ? '!bg-green-400 !shadow-md !shadow-green-400 dark:!bg-green-500 dark:!shadow-green-500 -mt-2 transit rounded-t-md'
              : ' dark:!bg-slate-900 !bg-slate-100 mt-1'
          "
        >
          <p
            v-if="userflowing.cartList > 0 && link.text == 'cart'"
            class="transit bg-green-400 dark:bg-green-500 text-slate-900 dark:text-slate-100 font-bold rounded-3xl text-xs top-1 right-3 absolute px-1"
          >
            {{ userflowing.cartList }}
          </p>
          <SvgComp
            :icon="link.icon"
            :Sclass="
              route.name.includes(link.text)
                ? 'dark:!fill-slate-200 !fill-slate-700 dark:!stroke-slate-300 !stroke-slate-800'
                : 'dark:!stroke-slate-200 !stroke-slate-700'
            "
          />
          <p
            class="text-xs justify-self-center mx-auto text-center capitalize group-active:text-green-400 transit text-slate-900 dark:text-slate-100"
          >
            {{ link.text }}
          </p>
        </DButton>
      </main>
    </section>

    <!-- todo alert comp -->
    <DAlert />
    <DPopup :show="drawer" />
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";
import { adminflow } from "@/stores/adminflow";
//composables

//components
import DPopup from "@/components/utils/DPopup.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DAlert from "@/components/utils/DAlert.vue";
import DDashbar from "@/components/utils/DDashbar.vue";

const adminflowing = adminflow();
const userflowing = userflow();
const useAuthentication = authentication();

//todo remove wallet function later
adminflowing.initAllWallets();
useAuthentication.userWatch();

userflowing.initAllNfts();

const route = useRoute();

const drawer = ref(false);

const links = computed(() => {
  return [
    {
      icon: "M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z",
      text: "home",
      to: "/dashboard/home",
    },
    {
      icon: "M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z",
      text: "deposit",
      to: "/dashboard/deposit",
    },
    {
      icon: "M15.0308 3.3303C13.0345 2.8899 10.9655 2.8899 8.96917 3.3303L8.55155 3.42243C5.76343 4.03749 3.56534 6.17136 2.87698 8.93119C2.37434 10.9465 2.37434 13.0536 2.87698 15.0688C3.56534 17.8286 5.76343 19.9625 8.55155 20.5776L8.96917 20.6697C10.9655 21.1101 13.0345 21.1101 15.0308 20.6697L15.4484 20.5776C18.2366 19.9625 20.4347 17.8286 21.123 15.0688C21.6257 13.0535 21.6257 10.9465 21.123 8.9312C20.4347 6.17136 18.2366 4.03749 15.4484 3.42243L15.0308 3.3303ZM17.9433 9.80778C18.3203 9.74389 18.702 9.72114 19.0807 9.73871C19.4968 9.75801 19.8243 10.0825 19.8802 10.4936C20.0163 11.4933 20.0163 12.5067 19.8802 13.5064C19.8243 13.9175 19.4968 14.242 19.0807 14.2613C18.702 14.2789 18.3203 14.2561 17.9433 14.1922L17.8694 14.1797C16.8874 14.0133 16.1287 13.3507 15.8722 12.5159C15.7684 12.1783 15.7684 11.8217 15.8722 11.4841C16.1287 10.6493 16.8874 9.98674 17.8694 9.82032L17.9433 9.80778ZM7.34559 8.97732C7.34559 8.64344 7.61739 8.37278 7.95269 8.37278L12 8.37278C12.3353 8.37278 12.6071 8.64344 12.6071 8.97732C12.6071 9.3112 12.3353 9.58186 12 9.58186H7.95269C7.61739 9.58186 7.34559 9.3112 7.34559 8.97732Z",
      text: "withdraw",
      to: "/dashboard/withdraw",
    },
    {
      icon: "M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z",
      text: "cart",
      to: "/dashboard/cartlist",
    },
    {
      icon: "M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z",
      text: "profile",
      to: "/dashboard/profile",
    },
  ];
});

const themeState = computed(() => {
  return userflowing.themeState;
});

const theme = provide("theme", themeState);
</script>

<style>
.whiteT {
  background: rgba(255, 255, 255, 0.241);
}

.darkT {
  background: rgba(15, 23, 42, 0.321);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0-3;
  filter: blur(5px);
  transform: translateY(10px);
}
</style>
