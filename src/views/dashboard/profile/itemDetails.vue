<template>
  <div class="min-h-screen font-sans">
    <main class="md:w-11/12 mx-auto pb-10">
      <DDashbar>
        <div class="w-full flex justify-between items-center">
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
          <p class="text-center w-full font-semibold capitalize">
            {{ userNFT && userNFT.name }} Details
          </p>
        </div>
      </DDashbar>

      <!-- todo build a dialog to edit the nft details -->

      <section class="md:w-full mx-auto">
        <section class="px-3">
          <main class="flex-col md:flex-row flex gap-5">
            <div
              class="border rounded-2xl overflow-hidden dark:bg-slate-800 border-gray-300 dark:border-gray-600 transit md:w-1/2"
            >
              <div
                class="p-2 text-slate-900 dark:text-slate-100 flex justify-between items-center py-2"
              >
                <SvgComp
                  icon="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"
                />

                <DButton
                  type="outlined"
                  @click="dialog = true"
                  class="border-slate-900 !text-slate-900 dark:border-slate-100 dark:!text-slate-100 py-1 rounded-xl"
                  >Edit</DButton
                >
              </div>
              <!-- <img
                :src="nftDetails && nftDetails.image_url"
                :alt="nftDetails && nftDetails.name"
                width="500"
                class="object-cover pointer-events-none"
              /> -->
              <vLazyImage
                :src="userNFT && userNFT.image_url"
                class="pointer-events-auto w-full h-full object-cover"
              />
            </div>
            <div class="rounded-2xl md:w-8/12 w-full p-2">
              <p class="text-green-500 font-normal text-lg cursor-pointer">
                {{ userNFT && userNFT.collection
                }}<img
                  src="@/assets/verified.svg"
                  alt="tick"
                  v-if="userNFT && userNFT.collection"
                  class="max-w-5 inline pl-1"
                />
              </p>
              <p
                class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100 mt-2"
              >
                {{ userNFT && userNFT.name }}
              </p>

              <p class="capitalize mt-2">
                Type :
                <span class="uppercase">{{ userNFT && userNFT.type }}</span>
              </p>
              <p class="capitalize mt-2">
                Status :
                <span
                  class=""
                  :class="checkStatus(userNFT && userNFT.status)"
                  >{{ userNFT && userNFT.status }}</span
                >
              </p>
              <p class="capitalize mt-2">
                Collection :
                <span class="">{{ userNFT && userNFT.collection }}</span>
              </p>
              <p class="text-slate-900 mt-2 dark:text-slate-100">
                Category :
                <span class="uppercase">{{
                  userNFT && userNFT.categoryType
                }}</span>
              </p>
              <p class="mt-2 text-slate-900 dark:text-slate-100">
                Created : {{ userNFT && userNFT.created_date }}
              </p>

              <div
                v-if="userNFT && userNFT?.properties.length > 0"
                class="mt-1"
              >
                Properties :
                <span
                  class="capitalize transit dark:shadow-sm select-none shadow-green-400 border border-green-400 text-sm font-thin rounded-2xl h-8 dark:border-green-500 dark:shadow-green-500 py-1 px-4 mx-1"
                  v-for="prop in userNFT && userNFT?.properties"
                  :key="prop"
                >
                  {{ prop }}
                </span>
              </div>

              <div
                class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
              >
                <p class="text-slate-800 dark:text-slate-50 text-sm">
                  Your offer
                </p>
                <p
                  class="text-2xl md:text-4xl font-semibold text-slate-900 dark:text-slate-100"
                >
                  {{
                    userNFT && userNFT.stats.floor_eth.toString().slice(0, 5)
                  }}ETH
                  <span class="text-sm text-gray-400"
                    >${{
                      userNFT &&
                      userNFT.stats.floor_price
                        .toLocaleString()
                        .slice(
                          0,
                          (userNFT && userNFT.stats.floor_price)
                            .toLocaleString()
                            .indexOf(".")
                        ) + ".00"
                    }}</span
                  >
                </p>
                <div class="flex gap-4 mt-3">
                  <d-button
                    class="w-full active:!bg-slate-300 dark:active:!bg-slate-600"
                    type="outlined"
                    :to="$route.fullPath"
                    @click="() => {}"
                    >Selling For
                    {{
                      userNFT && userNFT.stats.floor_eth.toString().slice(0, 5)
                    }}ETH</d-button
                  >
                  <!-- <d-button
                    class="w-full active:!bg-slate-600 dark:active:bg-slate-600"
                    :to="$route.fullPath"
                    >Cart {{ userNFT && userNFT.name }}</d-button
                  > -->
                </div>
              </div>

              <div
                class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-5 mt-4 dark:bg-slate-800"
                @click="listing = !listing"
              >
                <div class="flex justify-between gap-2 items-center">
                  <div>
                    <svg-comp
                      icon="M4,5 C4,3.34315 5.34315,2 7,2 L17,2 C18.6569,2 20,3.34315 20,5 L20,21.0284 C20,22.2485 18.6209,22.9581 17.6281,22.249 L12,18.2289 L6.37186,22.249 C5.37906,22.9581 4,22.2485 4,21.0284 L4,5 Z"
                    />
                  </div>
                  <div class="w-full text-slate-900 dark:text-slate-100">
                    Listing
                  </div>
                  <div class="text-right float-end shrink-0">
                    <svg-comp
                      icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                      class="transit"
                      :class="listing ? 'rotate-90' : null"
                    />
                  </div>
                </div>
                <div class="mx-auto text-center transit mt-2" v-if="listing">
                  <img
                    src="https://opensea.io/static/images/empty-asks.svg"
                    width="100"
                    class="mx-auto text-center"
                    alt=""
                  />
                  <p class="text-center text-slate-900 dark:text-slate-100">
                    No listings yet
                  </p>
                </div>
              </div>
            </div>
          </main>

          <div
            class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-3 mt-2 md:mt-4 mx-2 dark:bg-slate-800"
            @click="description = !description"
          >
            <div class="flex justify-between gap-2 items-center">
              <div class="">
                <svg-comp
                  icon="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
                  Sclass="mt-3 mx-auto text-center"
                />
              </div>
              <div class="w-full text-slate-900 dark:text-slate-100">
                Description
              </div>
              <div class="text-right float-end shrink-0">
                <svg-comp
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  class="transit"
                  :class="description ? 'rotate-90' : null"
                />
              </div>
            </div>
            <div class="mx-auto text-center transit mt-2" v-if="description">
              <p class="text-center text-slate-900 dark:text-slate-100">
                {{ userNFT && userNFT.description }}
              </p>
            </div>
          </div>

          <div
            class="border-gray-300 cursor-pointer dark:border-gray-600 border transit rounded-xl p-3 md:p-3 mt-4 mx-2 dark:bg-slate-800"
            @click="details = !details"
          >
            <div class="flex justify-between gap-2 items-center">
              <div class="">
                <svg-comp
                  icon="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6zm4 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zM7 7a1 1 0 0 0 0 2h.001a1 1 0 0 0 0-2H7zm-1 5a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm1 3a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H7z"
                  Sclass=" mx-auto text-center"
                />
              </div>
              <div class="w-full text-slate-900 dark:text-slate-100">
                Details
              </div>
              <div class="text-right float-end shrink-0">
                <svg-comp
                  icon="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  class="transit"
                  :class="details ? 'rotate-90' : null"
                />
              </div>
            </div>
            <div class="mx- text-center transit md:mx-7 mt-2" v-if="details">
              <div
                v-for="detail in detailsOfNft"
                :key="detail.text"
                class="flex justify-between text-slate-900 gap-y-2 dark:text-slate-100"
              >
                <p>{{ detail.text }}</p>
                <p
                  class="font-light text-green-500"
                  :class="detail.text == 'Token Standard' ? 'uppercase' : null"
                >
                  {{ detail.data }}
                </p>
              </div>
            </div>
          </div>

          <!-- <main class="pb-8 px-2">
            <div
              class="border-gray-300 cursor-pointer dark:border-gray-600 dark:bg-slate-800 border rounded-xl transit p-4 mt-4"
            >
              <p class="mx-3 text-slate-900 dark:text-slate-100">
                Collection Activities
              </p>
  
              <CollectionActivities
                :contract-address="contrac ? contrac : ''"
                v-if="contrac"
              />
            </div>
          </main> -->
        </section>
      </section>
    </main>

    <DDialog
      :dialog="dialog"
      @closeDialog="dialog = false"
      :data="type"
      :screen="true"
      title="Edit NFT Details"
      :loading="loadingDialog"
    />
  </div>
</template>

<script setup>
import { userflow } from "@/stores/userflow";

import DDialog from "@/components/utils/DDialog.vue";
import SvgComp from "@/components/svgComp.vue";
import vLazyImage from "v-lazy-image";
import DDashbar from "@/components/utils/DDashbar.vue";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import DButton from "@/components/utils/DButton.vue";

const userNFT = computed(() => {
  return userflowing.getNftByID(route.params.id);
});

const dialog = ref(false);
const loadingDialog = ref(false);
const type = reactive({
  category: "editnft",
  nft: userNFT,
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

onMounted(() => {
  if (!userNFT.value) userflowing.initUserNfts();

  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});

const route = useRoute();
const theme = inject("theme");

const userflowing = userflow();

const listing = ref(true);
const description = ref(true);
const details = ref(true);

const detailsOfNft = computed(() => {
  return [
    {
      text: "Contract Address",
      data:
        (userNFT.value && userNFT.value.contract_address.slice(0, 5)) +
        "...." +
        (userNFT.value && userNFT.value.contract_address.slice(10, 15)),
    },
    {
      text: "Token ID",
      data: userNFT.value && userNFT.value.identifier.slice(0, 4),
    },
    {
      text: "Token Standard",
      data: "ERC20",
    },
    {
      text: "Creator Earnings",
      data: "5%",
    },
  ];
});

function checkStatus(status) {
  if (status == "approved") {
    return "text-green-500";
  } else if (status == "pending") {
    return "text-yellow-500";
  } else {
    return "text-red-500";
  }
}
</script>

<style scoped></style>
