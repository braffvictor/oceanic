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
                Sclass="group-active:stroke-green-500 transit"
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
    <section class="w-full md:min-w-80">
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
  </div>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";
//composables

import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, onMounted, provide, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DAlert from "@/components/utils/DAlert.vue";
import DDashbar from "@/components/utils/DDashbar.vue";

const userflowing = userflow();
const useAuthentication = authentication();
useAuthentication.userWatch();

userflowing.initAllNfts();

const route = useRoute();

const drawer = ref(false);

const links = computed(() => {
  return [
    {
      icon: "M12.2796 3.71579C12.097 3.66261 11.903 3.66261 11.7203 3.71579C11.6678 3.7311 11.5754 3.7694 11.3789 3.91817C11.1723 4.07463 10.9193 4.29855 10.5251 4.64896L5.28544 9.3064C4.64309 9.87739 4.46099 10.0496 4.33439 10.24C4.21261 10.4232 4.12189 10.6252 4.06588 10.8379C4.00765 11.0591 3.99995 11.3095 3.99995 12.169V17.17C3.99995 18.041 4.00076 18.6331 4.03874 19.0905C4.07573 19.536 4.14275 19.7634 4.22513 19.9219C4.41488 20.2872 4.71272 20.5851 5.07801 20.7748C5.23658 20.8572 5.46397 20.9242 5.90941 20.9612C6.36681 20.9992 6.95893 21 7.82995 21H7.99995V18C7.99995 15.7909 9.79081 14 12 14C14.2091 14 16 15.7909 16 18V21H16.17C17.041 21 17.6331 20.9992 18.0905 20.9612C18.5359 20.9242 18.7633 20.8572 18.9219 20.7748C19.2872 20.5851 19.585 20.2872 19.7748 19.9219C19.8572 19.7634 19.9242 19.536 19.9612 19.0905C19.9991 18.6331 20 18.041 20 17.17V12.169C20 11.3095 19.9923 11.0591 19.934 10.8379C19.878 10.6252 19.7873 10.4232 19.6655 10.24C19.5389 10.0496 19.3568 9.87739 18.7145 9.3064L13.4748 4.64896C13.0806 4.29855 12.8276 4.07463 12.621 3.91817C12.4245 3.7694 12.3321 3.7311 12.2796 3.71579ZM11.1611 1.79556C11.709 1.63602 12.2909 1.63602 12.8388 1.79556C13.2189 1.90627 13.5341 2.10095 13.8282 2.32363C14.1052 2.53335 14.4172 2.81064 14.7764 3.12995L20.0432 7.81159C20.0716 7.83679 20.0995 7.86165 20.1272 7.88619C20.6489 8.34941 21.0429 8.69935 21.3311 9.13277C21.5746 9.49916 21.7561 9.90321 21.8681 10.3287C22.0006 10.832 22.0004 11.359 22 12.0566C22 12.0936 22 12.131 22 12.169V17.212C22 18.0305 22 18.7061 21.9543 19.2561C21.9069 19.8274 21.805 20.3523 21.5496 20.8439C21.1701 21.5745 20.5744 22.1701 19.8439 22.5496C19.3522 22.805 18.8274 22.9069 18.256 22.9543C17.706 23 17.0305 23 16.2119 23H15.805C15.7972 23 15.7894 23 15.7814 23C15.6603 23 15.5157 23.0001 15.3883 22.9895C15.2406 22.9773 15.0292 22.9458 14.8085 22.8311C14.5345 22.6888 14.3111 22.4654 14.1688 22.1915C14.0542 21.9707 14.0227 21.7593 14.0104 21.6116C13.9998 21.4843 13.9999 21.3396 13.9999 21.2185L14 18C14 16.8954 13.1045 16 12 16C10.8954 16 9.99995 16.8954 9.99995 18L9.99996 21.2185C10 21.3396 10.0001 21.4843 9.98949 21.6116C9.97722 21.7593 9.94572 21.9707 9.83107 22.1915C9.68876 22.4654 9.46538 22.6888 9.19142 22.8311C8.9707 22.9458 8.75929 22.9773 8.6116 22.9895C8.48423 23.0001 8.33959 23 8.21847 23C8.21053 23 8.20268 23 8.19495 23H7.78798C6.96944 23 6.29389 23 5.74388 22.9543C5.17253 22.9069 4.64769 22.805 4.15605 22.5496C3.42548 22.1701 2.8298 21.5745 2.4503 20.8439C2.19492 20.3523 2.09305 19.8274 2.0456 19.2561C1.99993 18.7061 1.99994 18.0305 1.99995 17.212L1.99995 12.169C1.99995 12.131 1.99993 12.0936 1.99992 12.0566C1.99955 11.359 1.99928 10.832 2.1318 10.3287C2.24383 9.90321 2.42528 9.49916 2.66884 9.13277C2.95696 8.69935 3.35105 8.34941 3.87272 7.8862C3.90036 7.86165 3.92835 7.83679 3.95671 7.81159L9.22354 3.12996C9.58274 2.81064 9.89467 2.53335 10.1717 2.32363C10.4658 2.10095 10.781 1.90627 11.1611 1.79556Z",
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
  transition: all 0.6s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.9;
  transform: translateY(10px);
}
</style>
