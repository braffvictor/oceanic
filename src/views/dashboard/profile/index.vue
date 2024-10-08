<template>
  <div class="min-h-auto pb-10">
    <main class="md:w-10/12 mx-auto">
      <DDashbar class="md:w-10/12 mx-auto">
        <div class="flex w-full justify-between items-center">
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
          <p class="text-center w-full font-semibold">Profile</p>
        </div>
      </DDashbar>

      <section class="transit mt-3 px-3">
        <!-- circle div -->
        <div class="mx-auto text-center">
          <div
            class="flex justify-center shadow-md items-center text-[60px] md:text-[80px] font-bold h-60 w-60 dark:border-gray-600 rounded-full mx-auto text-center bg-gradient-to-b from-green-100 transit via-purple-100 to-slate-50 dark:from-emerald-600 dark:to-slate-900 to-100%"
          >
            <p>{{ userflowing.name }}</p>
          </div>
        </div>

        <main class="mt-8 md:w-6/12 mx-auto text-center">
          <section
            class="grid grid-cols-2 md:grid-cols-4 justify-center items-center *:w-full gap-2"
          >
            <DButton
              type="outlined"
              to="/dashboard/profile/collections"
              class="flex flex-col"
            >
              <p>Collection</p>
              <p class="text-green-500">
                {{ getUniqueByProperty(nfts, "collection").length }}
              </p>
            </DButton>

            <DButton
              type="outlined"
              class="flex flex-col"
              to="/dashboard/profile/items/uploaded"
              ><p>Uploaded</p>
              <p class="text-green-500">{{ uploadedNfts.length }}</p>
            </DButton>
            <DButton
              type="outlined"
              class="flex flex-col"
              to="/dashboard/profile/items/bought"
              ><p>Bought</p>
              <p class="text-green-500">{{ boughtNfts.length }}</p>
            </DButton>
            <DButton
              type="outlined"
              class="flex flex-col"
              to="/dashboard/profile/items/all"
              ><p>All</p>
              <p class="text-green-500">{{ nfts.length }}</p>
            </DButton>
          </section>

          <section class="mt-4">
            <p class="text-gray-500 dark:text-gray-400 text-left">
              Personal Details
            </p>
            <div
              class="rounded-xl transit bg-slate-100 dark:bg-slate-800 h-auto w-full shadow text-left p-4"
            >
              <p>Name: {{ user && user.fullName }}</p>
              <p class="my-2">Email: {{ user && user.email }}</p>
              <p class="my-2">Username: {{ user && user.userName }}</p>
              <p class="flex items-center">
                Account Status:
                <span
                  class="ml-2 py-1"
                  :class="
                    user && user.verified ? 'text-green-500' : 'text-red-600'
                  "
                >
                  {{ user && user.verified ? "Verified" : "Unverified" }}
                  <img
                    class="inline"
                    v-if="user && user.verified"
                    src="@/assets/svg/verified.svg"
                    width="15"
                    alt=""
                  />
                  <img
                    class="inline"
                    v-if="user && !user.verified"
                    src="@/assets/svg/unverified.svg"
                    width="17"
                    alt=""
                  />
                </span>
              </p>
            </div>

            <div class="mt-4 rounded-xl">
              <DButton
                class="w-full bg-red-500 text-white !shadow-red-500"
                to="/"
                type="elevated"
                @click="signOut"
                >Log Out</DButton
              >
            </div>
          </section>
        </main>
        <!-- {{ splitName }} -->
      </section>
    </main>
  </div>
</template>

<script setup>
//stores
import { authentication } from "@/stores/authentication";
import { userflow } from "@/stores/userflow";

//components
import DDashbar from "@/components/utils/DDashbar.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, onMounted, ref, watch } from "vue";

import DButton from "@/components/utils/DButton.vue";
const useAuthentication = authentication();

const user = computed(() => {
  return useAuthentication.user;
});

const userflowing = userflow();

const nfts = computed(() => {
  return userflowing.userNfts;
});

const boughtNfts = computed(() => {
  return userflowing.userNfts.filter((nft) => nft.type == "bought");
});

const uploadedNfts = computed(() => {
  return userflowing.userNfts.filter((nft) => nft.type == "uploaded");
});

function signOut() {
  useAuthentication.signOutUser();
}

const theme = inject("theme");

function getUniqueByProperty(arr, property) {
  const seen = new Set();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item[property])) {
      seen.add(item[property]);
      result.push(item);
    }
  }

  return result;
}

onMounted(() => {
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});
</script>

<style></style>
