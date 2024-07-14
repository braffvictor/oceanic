<template>
  <div class="transit">
    <section
      :class="`flex items-end p-4 pb-10 md:p-8 min-h-96 -mt-20 `"
      :style="`background-image : url(${
        banner && banner
      }); background-position: center; background-size : cover; background-repeat: no-repeat`"
    >
      <main class="w-full">
        <div class="flex w-full justify-between">
          <div>
            <img
              :src="image && image"
              class="rounded-xl min-w-24 max-w-24"
              alt=""
            />
            <p class="mt-3 md:mt-5 font-bold text-slate-400 text-2xl">
              {{ collectionHeader && collectionHeader.name
              }}<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
            <p class="text-gray-300 dark:text-slate-100">
              {{ route.params.id
              }}<img
                src="@/assets/verified.svg"
                alt="tick"
                class="max-w-5 inline pl-1"
              />
            </p>
          </div>

          <div class="flex flex-row gap-x-3 items-end">
            <div
              class="font-semibold text-slate-900 dark:text-slate-100 flex items-center cursor-pointer"
              @click="
                copyContract(
                  collectionHeader && collectionHeader.contracts[0]?.address
                    ? collectionHeader && collectionHeader.contracts[0]?.address
                    : 'Contract Address Unavailable'
                )
              "
            >
              <svg-comp
                icon="M9,2 C7.89543,2 7,2.89543 7,4 L7,6 L9,6 L9,4 L20,4 L20,15 L18,15 L18,17 L20,17 C21.1046,17 22,16.1046 22,15 L22,4 C22,2.89543 21.1046,2 20,2 L9,2 Z M4,7 C2.89543,7 2,7.89543 2,9 L2,20 C2,21.1046 2.89543,22 4,22 L15,22 C16.1046,22 17,21.1046 17,20 L17,9 C17,7.89543 16.1046,7 15,7 L4,7 Z"
              />
              <p>
                <!-- {{
                  (collectionHeader &&
                    collectionHeader.contracts[0].address.slice(0, 4)) +
                  "...." +
                  (collectionHeader &&
                    collectionHeader.contracts[0].address.slice(38))
                }} -->
              </p>
            </div>
            <!-- <div
              v-for="perk in [
                {
                  text: 'Max Ranked',
                  num: collectionHeader && collectionHeader.rarity.max_rank,
                },
                {
                  text: 'Token Score',
                  num:
                    collectionHeader && collectionHeader.rarity.tokens_scored,
                },
                {
                  text: 'Total Supply',
                  num: collectionHeader && collectionHeader.total_supply,
                },
              ]"
              :key="perk.total_supply"
              class="text-slate-100 text-sm font-semibold md:font-bold md:text-lg"
            >
              <p>{{ perk.num }}</p>
              <p class="font-light text-xs">{{ perk.text }}</p>
            </div> -->
          </div>
        </div>
      </main>
    </section>

    <section
      class="p-4 md:p-8 bg-slate-50 dark:bg-slate-900 transit rounded-tr-3xl rounded-tl-3xl overflow-none -mt-6"
    >
      <p
        class="text-slate-900 dark:text-slate-100 text-md md:text-lg transit"
        :class="detailed ? 'line-clamp-none' : 'line-clamp-2'"
        @click="detailed = !detailed"
      >
        {{ collectionHeader && collectionHeader.description }}
      </p>
      <p class="text-slate-900 dark:text-slate-100 text-md md:text-lg mt-3">
        Created
        <strong>{{ collectionHeader && collectionHeader.created_date }}</strong>
        · Category
        <strong>{{ collectionHeader && collectionHeader.category }}</strong>
        · Chain
        <strong class="capitalize">
          {{ collectionHeader && collectionHeader.contracts[0]?.chain }}
        </strong>
        · Total Supply
        <strong class="capitalize">
          {{ collectionHeader && collectionHeader.total_supply }}</strong
        >
      </p>

      <!-- the button to control component -->
      <div class="flex mt-3 gap-x-4">
        <DButton
          class="!text-slate-900 dark:!text-slate-100 font-semibold"
          :class="
            activeBtn == 'overview'
              ? '!bg-gray-200 dark:!bg-gray-700'
              : '!bg-transparent'
          "
          @click="activeBtn = 'overview'"
          >Overview</DButton
        >
        <DButton
          class="!text-slate-900 dark:!text-slate-100 font-semibold"
          :class="
            activeBtn == 'items'
              ? '!bg-gray-200 dark:!bg-gray-700'
              : '!bg-transparent'
          "
          @click="activeBtn = 'items'"
          >Items</DButton
        >
        <DButton
          class="!text-slate-900 dark:!text-slate-100 font-semibold"
          :class="
            activeBtn == 'activity'
              ? '!bg-gray-200 dark:!bg-gray-700'
              : '!bg-transparent'
          "
          @click="activeBtn = 'activity'"
          >Activity</DButton
        >
      </div>

      <!-- the items components -->
      <CollectionItems
        v-if="activeBtn == 'items'"
        :headerName="collectionHeader && collectionHeader.name"
      />

      <collection-activities
        v-if="activeBtn == 'activity'"
        :contractAddress="collectionHeader?.contracts[0]?.address"
      />
    </section>
  </div>
</template>

<script setup>
import CollectionActivities from "@/components/dynamicComps/CollectionActivities.vue";
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import CollectionItems from "@/components/dynamicComps/CollectionItems.vue";

const route = useRoute();

const activeBtn = ref("items");

const detailed = ref(false);
const banner = ref("");
const image = ref("");

onMounted(() => {
  // console.log("red");
  specificCollectionDetails(route.params.id);
  window.scrollTo(0, 0);
});

function copyContract(contractAddress) {
  navigator.clipboard.writeText(contractAddress);
  alert("Copied Text");
}
const collectionHeader = ref(null);

// for top header display details
const specificCollectionDetails = (paramsID) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(`https://api.opensea.io/api/v2/collections/${paramsID}`, options)
    .then((response) => response.json())
    .then((response) => {
      collectionHeader.value = response;
      // console.log(collectionHeader.value);

      banner.value = collectionHeader.value.banner_image_url.slice(
        0,
        collectionHeader.value.banner_image_url.indexOf("?")
      );

      image.value = collectionHeader.value.image_url.slice(
        0,
        collectionHeader.value.image_url.indexOf("?")
      );

      console.log(collectionHeader.value);
    })
    .catch((err) => console.error(err));
};

watch(route, () => {
  specificCollectionDetails(route.params.id);
  console.log("changing route");
});
</script>

<style scoped></style>
