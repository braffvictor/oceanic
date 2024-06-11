<template>
  <div
    :class="themeState == 'light' || themeState == null ? '' : 'dark'"
    class="h-auto"
  >
    <!-- navbar section -->
    <nav
      class="px-4 py-3 md:px-8 bg-red flex items-center justify-between border-b fixed w-full z-30 backdrop-blur-sm"
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
          class="inline-block text-slate-800 dark:text-slate-50 text-xl font-semibold transit"
        >
          Oceanic
        </p>
      </div>

      <!-- search bar -->
      <div class="w-full ml-8 hidden md:block">
        <input
          type="text"
          placeholder="Search Collection, Nft..."
          class="bg-gray-200 dark:text-slate-100 text-slate-900 dark:bg-slate-700 dark:caret-slate-100 w-6/12 h-9 justify-self-start inline-block align-start rounded-3xl indent-5 focus:ring-green-400 focus:ring-1 outline-none transit"
        />
      </div>
      <!-- nav button -->
      <div class="inline-flex gap-x-1">
        <button
          v-for="text in dropLinks"
          :key="text.title"
          class="p-2 px-3 dark:text-slate-200 dark:hover:text-green-400 hover:text-green-500 transit rounded-lg md:block hidden text-slate-900 relative group"
        >
          <div
            class="block flex w-auto items-center"
            @click="text.to ? $router.push(text.to) : () => {}"
          >
            <p class="w-24">{{ text.title }}</p>
            <svg-comp
              v-if="text.children"
              icon="M7 10L12 15L17 10"
              class="transit group-hover:!stroke-green-400"
            />
          </div>
          <div
            class="absolute bg-green-400 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out text-slate-900 dark:text-slate-100 dark:bg-green-500 rounded-xl shadow-sm p-4 flex flex-col divide-y divide-opacity-10 dark:divide-opacity-20 divide-slate-800 dark:divide-slate-100"
            v-if="text.children"
          >
            <router-link
              class="text-left my-1 hover:text-white dark:hover:text-slate-900 block font-light"
              v-for="link in text.children"
              :key="link.name"
              :to="link.to"
            >
              {{ link.name }}
            </router-link>
          </div>
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
          @click="changeTheme('light')"
        >
          <img
            src="../assets/svg/lightmode.svg"
            class="max-w-6"
            alt="light Mode"
          />
        </button>
        <button
          v-if="themeState != 'dark'"
          class="p-2 rounded-lg transit active:animate-ping relative"
          @click="changeTheme('dark')"
        >
          <img
            src="../assets/svg/darkmode.svg"
            class="max-w-6 transform -rotate-45"
            alt="dark mode"
          />
        </button>

        <!-- burger menu -->
        <button class="md:hidden" @click="show = true">
          <svg-comp
            icon="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            Sclass="active:stroke-green-400"
          />
        </button>
      </div>
    </nav>

    <!--todo top navigation drawer -->
    <div
      class="w-[100vw] fixed z-30 top-0 border-b transition-all ease-linear duration-1000 !overflow-hidden backdrop-blur-md transit"
      :class="[
        show ? 'min-h-[58%] md:min-h-[70%] h-auto pb-3' : 'h-0',
        themeState == 'light' || themeState == null
          ? 'whiteT border-b-gray-200'
          : 'darkT border-b-gray-600',
      ]"
    >
      <!-- top navbar section -->
      <nav
        class="px-4 py-3 md:px-8 bg-red flex items-center justify-between border-b w-full transit"
        :class="
          themeState == 'light' || themeState == null
            ? 'bg-white border-b-gray-200'
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
          <!-- light and dark mode button -->
          <button
            v-if="themeState != 'light' && themeState != null"
            class="p-2 rounded-lg transit active:animate-spin"
            @click="changeTheme('light')"
          >
            <img src="../assets/svg/lightmode.svg" class="max-w-6" alt="" />
          </button>
          <button
            v-if="themeState != 'dark'"
            class="p-2 rounded-lg transit active:animate-ping"
            @click="changeTheme('dark')"
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
      <div class="mx-5 my-4">
        <main
          class="group p-4 rounded-md active:bg-slate-100 dark:active:bg-slate-900 transit"
          v-for="links in dropLinks"
          :key="links.title"
        >
          <div
            class="flex transit items-center bg-transparent justify-between"
            @click="links.to ? closeMenu(links.to) : () => {}"
          >
            <p class="text-slate-900 dark:text-slate-100">
              {{ links.title }}
            </p>
            <p v-if="links.children">
              <svg-comp
                icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                class="group-hover:rotate-90 transit"
              />
            </p>
          </div>

          <!-- children -->
          <router-link
            class="block mt-2 h-0 opacity-0 group-hover:opacity-100 scale-y-0 group-hover:scale-y-100 group-hover:h-full transition-transform ease-in-out duration-300"
            v-if="links.children"
            to="/"
          >
            <div
              class="flex items-center my-2"
              v-for="link in links.children"
              :key="link.name"
              @click="show = false"
            >
              <p class="ml-2">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="-2.4 -2.4 28.80 28.80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  transform="rotate(90)"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0">
                    <path
                      transform="translate(-2.4, -2.4), scale(0.8999999999999999)"
                      d="M16,25.34989281329844C18.30394671824662,25.15983651407102,20.491104958274494,27.094522700053883,22.70735154343742,26.436842723812333C25.132071442342365,25.71729746374057,27.288006889386505,23.9342186724785,28.40962694306877,21.667286731591183C29.54331233261071,19.37596926447505,29.707765871633704,16.544760844351377,28.780405173238464,14.162455147627245C27.913690771349525,11.93594429739833,25.380525108624184,11.014651163808452,23.62991547899439,9.388640602564696C22.10831262562228,7.975337335105285,21.175247916459064,5.74098128900742,19.162595252814356,5.229189705718429C17.160506481224452,4.720084383769054,15.344261014311988,6.5771118151535415,13.286428898881283,6.758425529101322C10.479488935217912,7.005742453462634,6.870471808884203,4.360824547541324,5.009006085789586,6.476249559785886C3.154132488387522,8.584183084327574,6.1355610642907585,11.817926368658895,6.372379310470743,14.615757122028773C6.5406798134450925,16.604101899615635,5.865486076383431,18.509971343956007,6.194177842288495,20.478168929790463C6.6147079641892335,22.996292158148925,6.255296169764145,26.46947946531938,8.541666780785222,27.605393020869897C10.915804733909662,28.784911105427774,13.357975405742362,25.567837704504328,16,25.34989281329844"
                      :fill="
                        themeState == 'light' || themeState == null
                          ? '#37e69a'
                          : '#1FC97F'
                      "
                      strokewidth="0"
                    />
                  </g>

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.096"
                  />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M12 4.5L17 9.5M12 4.5L7 9.5M12 4.5C12 4.5 12 12.8333 12 14.5C12 16.1667 11 19.5 7 19.5"
                      :stroke="
                        themeState == 'light' || themeState == null
                          ? '#ffffff'
                          : '#1C274C'
                      "
                      stroke-width="0.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </svg>
              </p>
              <p class="dark:text-slate-100 text-slate-900">{{ link.name }}</p>
            </div>
          </router-link>
        </main>
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
      <div class="flex mt-3 ml-10 gap-x-2">
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

    <router-view class="pt-20" @click="show = false" />

    <!-- footer section -->
    <section
      @click="show = false"
      class="bg-gradient-to-t transit from-green-400 to-white dark:bg-gradient-to-t dark:from-green-500 dark:to-slate-900 text-slate-900 dark:text-slate-100"
    >
      <main class="px-5 py-5 md:px-8">
        <div class="grid md:grid-cols-2 gap-y-4">
          <div>
            <div class="flex gap-x-3 items-center mb-3">
              <img
                src="https://solanart.io/solanart-logo-black.svg"
                class="md:max-w-10 max-w-8 block"
                v-if="themeState != 'dark'"
                alt=""
              />
              <img
                src="https://solanart.io/solanart-logo.svg"
                class="max-w-10 max-w-8 block"
                alt=""
                v-if="themeState != 'light' && themeState != null"
              />
              <p
                class="inline text-slate-800 dark:text-slate-50 md:text-3xl text-2xl font-semibold transit"
              >
                Oceanic
              </p>
            </div>
            <p class="text-slate-900 dark:text-slate-100 transit">
              The first marketplace on Solana to buy, trade and sell
              non-fungible tokens (NFTs). Chat on chain with buyers/sellers,
              launch a project with our launchpad or just explore.
            </p>
          </div>
          <div>
            <p
              class="font-semibold text-slate-900 text-xl mb-3 md:text-3xl dark:text-slate-100 transit"
            >
              Stay In the Loop
            </p>
            <p class="text-slate-900 dark:text-slate-100 transit">
              Join our mailing list to stay in the loop with our newest feature
              releases, NFT drops, and tips and tricks for navigating solana.
            </p>
            <div class="my-3">
              <input
                type="text"
                placeholder="Your Email Address"
                class="bg-gray-200 dark:text-slate-100 text-slate-900 dark:bg-slate-700 dark:caret-slate-100 w-8/12 h-12 justify-self-start inline-block align-start rounded-lg indent-5 focus:ring-green-400 focus:ring-1 outline-none transit"
              />
              <d-button
                class="w-3/12 text-center h-12 ml-3 bg-green-400 dark:bg-green-500 dark:!text-slate-900 !text-slate-100"
                type="filled"
                >Sign Up</d-button
              >
            </div>
          </div>
        </div>
        <!-- divider -->
        <div
          class="border-b w-full opacity-20"
          :class="
            themeState == 'light' || themeState == null
              ? 'whiteT border-b-slate-900'
              : 'darkT border-b-slate-100'
          "
        ></div>
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-2 opacity-90 my-3 transit"
        >
          <div
            class="bg-transparent text-center mx-auto"
            v-for="links in dropLinks"
            :key="links.title"
          >
            <p
              class="dark:text-slate-100 text-slate-900 font-semibold text-lg md:text-xl"
              @click="links.to ? $router.push(links.to) : () => {}"
              :class="links.to ? 'cursor-pointer' : null"
            >
              {{ links.title }}
            </p>
            <div v-if="links.children">
              <d-button
                v-for="link in links.children"
                :key="link.name"
                type="filled"
                class="rounded-sm block w-full font-light !transition-all !duration-200 !ease-in-out hover:font-semibold"
                >{{ link.name }}</d-button
              >
            </div>
          </div>
        </div>
        <!-- divider -->
        <div
          class="border-b w-full opacity-20"
          :class="
            themeState == 'light' || themeState == null
              ? 'whiteT border-b-slate-900'
              : 'darkT border-b-slate-100'
          "
        ></div>

        <div
          class="md:flex justify-between text-center items-center mt-3 dark:text-slate-100 text-slate-900 text-xs"
        >
          <p>© 2018 - 2024 Ozone Networks, Inc</p>
          <p>
            <d-button type="filled" class="bg-transparent"
              >Privacy Policy</d-button
            >
            <d-button type="filled" class="bg-transparent"
              >Terms of Service</d-button
            >
          </p>
        </div>
      </main>
    </section>
    <!-- todo the translation widget -->
    <!-- <div class="gtranslate_wrapper"></div> -->
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import router from "@/router";
import { useHead } from "@vueuse/head";
import { computed, onMounted, provide, ref } from "vue";

onMounted(() => {
  // window.gtranslateSettings = {
  //   default_language: "en",
  //   detect_browser_language: true,
  //   languages: [
  //     "en",
  //     "fr",
  //     "de",
  //     "it",
  //     "es",
  //     "ko",
  //     "ps",
  //     "sd",
  //     "fy",
  //     "xh",
  //     "mn",
  //     "bs",
  //     "sn",
  //     "my",
  //     "zh-CN",
  //     "zh-TW",
  //     "ru",
  //     "hu",
  //   ],
  //   wrapper_selector: ".gtranslate_wrapper",
  // };
});

//for the head properties
useHead({
  script: [
    // tidio link
    // {
    //   src: "//code.tidio.co/zccgj8k6v1twa1uydrnxydegil8o2rlv.js",
    // },
    // for translation
    // {
    //   src: "https://cdn.gtranslate.net/widgets/latest/float.js",
    // },
  ],
});

//for controlling the drop down nav
const show = ref(false);

//chaning the route....and closing the nav bar
function closeMenu(to) {
  router.push(to);
  show.value = false;
}

// const scrollPosition = ref("No Scrolls");
// window.addEventListener("scroll", () => {
//   console.log(scrollPosition.value);
// });

const themeState = ref(localStorage.getItem("theme"));
//change theme function
function changeTheme(theme) {
  localStorage.setItem("theme", theme);
  themeState.value = localStorage.getItem("theme");
}

//for injecting and sharing the value of themeState througout the default children
const theme = provide("theme", themeState);

const dropLinks = computed(() => {
  return [
    {
      title: "Market Place",
      children: [
        {
          name: "Collection",
          to: "",
        },
        {
          name: "Random NFTs",
          to: "",
        },
        {
          name: "Drops",
          to: "",
        },
        {
          name: "Rankings",
          to: "",
        },
      ],
    },
    {
      title: "Learn More",
      children: [
        {
          name: "What is an NFT",
          to: "",
        },
        {
          name: "How to create an NFT",
          to: "",
        },
        {
          name: "How to purchased an NFT",
          to: "",
        },
      ],
    },
    {
      title: "About Us",
      to: "/about",
    },
    {
      title: "Contact Us",
      to: "/about",
    },
  ];
});
</script>

<style scoped>
.whiteT {
  background: rgba(255, 255, 255, 0.241);
}

.darkT {
  background: rgba(15, 23, 42, 0.321);
}
</style>
