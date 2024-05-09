<template>
  <div
    :class="themeState == 'light' || themeState == null ? '' : 'dark'"
    class="h-auto"
  >
    <!-- navbar section -->
    <nav
      class="p-4 md:px-8 bg-red flex items-center justify-between border-b fixed w-full z-30 backdrop-blur-sm"
      :class="
        themeState == 'light' || themeState == null
          ? 'whiteT border-b-gray-200'
          : 'darkT border-b-gray-600'
      "
    >
      <!-- for logo -->
      <div class="inline-flex items-center gap-x-2">
        <img
          src="https://solanart.io/solanart-logo-black.svg"
          class="max-w-7"
          v-if="themeState != 'dark'"
          alt=""
        />
        <img
          src="https://solanart.io/solanart-logo.svg"
          class="max-w-7"
          alt=""
          v-if="themeState != 'light' && themeState != null"
        />
        <!-- Site name -->
        <p
          class="inline-block text-slate-800 dark:text-slate-50 text-xl font-semibold"
        >
          Oceanic
        </p>
      </div>

      <!-- search bar -->
      <div class="w-full ml-8 hidden md:block">
        <input
          type="text"
          placeholder="Search Collection, Nft, User..."
          class="bg-gray-200 dark:text-slate-100 text-slate-900 dark:bg-slate-700 dark:caret-slate-100 w-6/12 h-9 justify-self-start inline-block align-start rounded-3xl indent-5 focus:ring-green-400 focus:ring-1 outline-none transit"
        />
      </div>
      <!-- nav button -->
      <div class="inline-flex gap-x-3">
        <button
          v-for="text in ['Collections', 'Explore', 'About', 'Contact']"
          :key="text"
          class="p-2 px-3 dark:text-slate-200 dark:active:bg-green-100 dark:hover:text-green-400 hover:text-green-500 transit rounded-lg active:bg-green-200 md:block hidden text-slate-900"
        >
          {{ text }}
        </button>

        <!-- search icon -->
        <button>
          <svg-comp
            Sclass="active:stroke-green-400"
            icon="M10.5,4 C6.91015,4 4,6.91015 4,10.5 C4,14.0899 6.91015,17 10.5,17 C14.0899,17 17,14.0899 17,10.5 C17,6.91015 14.0899,4 10.5,4 Z M2,10.5 C2,5.80558 5.80558,2 10.5,2 C15.1944,2 19,5.80558 19,10.5 C19,12.4869 18.3183,14.3145 17.176,15.7618 L20.8284,19.4142 C21.2189,19.8047 21.2189,20.4379 20.8284,20.8284 C20.4379,21.2189 19.8047,21.2189 19.4142,20.8284 L15.7618,17.176 C14.3145,18.3183 12.4869,19 10.5,19 C5.80558,19 2,15.1944 2,10.5 Z M9.5,7 C9.5,6.44772 9.94772,6 10.5,6 C12.9853,6 15,8.01472 15,10.5 C15,11.0523 14.5523,11.5 14,11.5 C13.4477,11.5 13,11.0523 13,10.5 C13,9.11929 11.8807,8 10.5,8 C9.94772,8 9.5,7.55228 9.5,7 Z"
          />
        </button>

        <!-- Cart icon -->
        <button>
          <svg-comp
            Sclass="active:stroke-green-400"
            icon="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z"
          />
        </button>

        <!-- light and dark mode button -->
        <button
          v-if="themeState != 'light' && themeState != null"
          class="p-2 rounded-lg transit active:animate-spin"
          @click="localTheme('light')"
        >
          <img src="../assets/svg/lightmode.svg" class="max-w-6" alt="" />
        </button>
        <button
          v-if="themeState != 'dark'"
          class="p-2 rounded-lg transit active:animate-ping"
          @click="localTheme('dark')"
        >
          <img
            src="../assets/svg/darkmode.svg"
            class="max-w-6 transform -rotate-45"
            alt=""
          />
        </button>

        <!-- burger menu -->
        <button class="md:hidden" @click="show = true">
          <svg-comp icon="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </button>
      </div>
    </nav>

    <!--todo top navigation drawer -->
    <div
      class="w-[100vw] fixed z-30 top-0 border-b transition-all ease-in-out duration-1000 !overflow-hidden backdrop-blur-md"
      :class="[
        show ? 'md:h-[58%] h-[50%]' : 'h-0',
        themeState == 'light' || themeState == null
          ? 'whiteT border-b-gray-200'
          : 'darkT border-b-gray-600',
      ]"
    >
      <!-- top navbar section -->
      <nav
        class="p-4 md:px-8 bg-red flex items-center justify-between border-b w-full backdrop-blur-sm"
        :class="
          themeState == 'light' || themeState == null
            ? 'bg-slate-100 border-b-gray-200'
            : 'bg-slate-900 border-b-gray-600'
        "
      >
        <!-- top for logo -->
        <div class="inline-flex items-center gap-x-2">
          <img
            src="https://solanart.io/solanart-logo-black.svg"
            class="max-w-7"
            v-if="themeState != 'dark'"
            alt=""
          />
          <img
            src="https://solanart.io/solanart-logo.svg"
            class="max-w-7"
            alt=""
            v-if="themeState != 'light' && themeState != null"
          />
          <!-- Site name -->
          <p
            class="inline-block text-slate-800 dark:text-slate-50 text-xl font-semibold"
          >
            Oceanic
          </p>
        </div>

        <!-- nav button -->
        <div class="gap-x-3">
          <!-- search icon -->
          <button>
            <svg-comp
              Sclass="active:stroke-green-400"
              icon="M10.5,4 C6.91015,4 4,6.91015 4,10.5 C4,14.0899 6.91015,17 10.5,17 C14.0899,17 17,14.0899 17,10.5 C17,6.91015 14.0899,4 10.5,4 Z M2,10.5 C2,5.80558 5.80558,2 10.5,2 C15.1944,2 19,5.80558 19,10.5 C19,12.4869 18.3183,14.3145 17.176,15.7618 L20.8284,19.4142 C21.2189,19.8047 21.2189,20.4379 20.8284,20.8284 C20.4379,21.2189 19.8047,21.2189 19.4142,20.8284 L15.7618,17.176 C14.3145,18.3183 12.4869,19 10.5,19 C5.80558,19 2,15.1944 2,10.5 Z M9.5,7 C9.5,6.44772 9.94772,6 10.5,6 C12.9853,6 15,8.01472 15,10.5 C15,11.0523 14.5523,11.5 14,11.5 C13.4477,11.5 13,11.0523 13,10.5 C13,9.11929 11.8807,8 10.5,8 C9.94772,8 9.5,7.55228 9.5,7 Z"
            />
          </button>

          <!-- Cart icon -->
          <button>
            <svg-comp
              Sclass="active:stroke-green-400"
              icon="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z"
            />
          </button>

          <!-- light and dark mode button -->
          <button
            v-if="themeState != 'light' && themeState != null"
            class="p-2 rounded-lg transit active:animate-spin"
            @click="localTheme('light')"
          >
            <img src="../assets/svg/lightmode.svg" class="max-w-6" alt="" />
          </button>
          <button
            v-if="themeState != 'dark'"
            class="p-2 rounded-lg transit active:animate-ping"
            @click="localTheme('dark')"
          >
            <img
              src="../assets/svg/darkmode.svg"
              class="max-w-6 transform -rotate-45"
              alt=""
            />
          </button>

          <!-- close icon -->
          <button @click="show = false">
            <svg-comp
              Sclass="active:stroke-red-500"
              icon="M12,14.1215 L17.3032,19.4248 C17.889,20.0106 18.8388,20.0106 19.4246,19.4248 C20.0104,18.839 20.0104,17.8893 19.4246,17.3035 L14.1213,12.0002 L19.4246,6.6969 C20.0104,6.11112 20.0104,5.16137 19.4246,4.57558 C18.8388,3.9898 17.889,3.9898 17.3032,4.57558 L12,9.87888 L6.69665,4.57557 C6.11086,3.98978 5.16111,3.98978 4.57533,4.57557 C3.98954,5.16136 3.98954,6.1111 4.57533,6.69689 L9.87863,12.0002 L4.57533,17.3035 C3.98954,17.8893 3.98954,18.839 4.57533,19.4248 C5.16111,20.0106 6.11086,20.0106 6.69665,19.4248 L12,14.1215 Z"
            />
          </button>
        </div>
      </nav>

      <!-- content in navigation drawer -->
      <div class="ml-10">
        <button
          class="text-slate-900 block dark:text-slate-100 font-semibold active:text-green-400 mb-6 mt-2 transit"
          v-for="link in ['Collections', 'Explore', 'About', 'Contact']"
          :key="link"
        >
          {{ link }}
        </button>
      </div>

      <!-- divider -->
      <div
        class="border-b w-full"
        :class="
          themeState == 'light' || themeState == null
            ? 'whiteT border-b-gray-200'
            : 'darkT border-b-gray-600'
        "
      ></div>

      <!-- login and registration button -->
      <div class="flex mt-4 ml-10 gap-x-2">
        <d-button
          type="outlined"
          class="border-green-500 px-4 !text-green-400 dark:!text-green-500 active:!bg-green-200"
          >Login</d-button
        >
        <d-button
          type="elevated"
          class="bg-green-400 dark:bg-green-500 shadow-green-300 dark:shadow-green-400 active:!bg-green-200"
        />
      </div>
    </div>

    <router-view class="pt-20" @click="show = !show" />
  </div>
</template>

<script setup>
import svgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { provide, ref } from "vue";
const themeState = ref(localStorage.getItem("theme"));

// const scrollPosition = ref("No Scrolls");
// window.addEventListener("scroll", () => {
//   console.log(scrollPosition.value);
// });

const show = ref(false);

function localTheme(theme) {
  localStorage.setItem("theme", theme);
  themeState.value = localStorage.getItem("theme");
}

const theme = provide("theme", themeState);
</script>

<style scoped>
.whiteT {
  background: rgba(255, 255, 255, 0.241);
}

.darkT {
  background: rgba(15, 23, 42, 0.321);
}
</style>
