<template>
  <div
    class="text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-900 px-3 md:px-7 transit mb-7"
  >
    <p class="text-2xl md:text-3xl font-bold">All Events</p>
    <div class="flex text-lg md:text-xl font-light mt-3 justify-between">
      <p>Event Type</p>
      <DDropDown class="md:hidden" :title="event" :children="eventBtns" />
    </div>
    <div class="flex mt-3 gap-x-6 hidden md:block">
      <DButton
        class="!text-slate-900 dark:!text-slate-100 font-semibold w-1/12"
        v-for="btn in eventBtns"
        :key="btn.name"
        :class="
          activeBtn == btn.name
            ? '!bg-gray-200 dark:!bg-gray-700'
            : '!bg-transparent'
        "
        @click="(activeBtn = btn.name), btn.action()"
        >{{ btn.name }}</DButton
      >
    </div>

    <div
      class="overflow-auto border border-gray-300 cursor-pointer dark:border-gray-600 rounded-xl p-3 mt-3 min-h-screen transit"
    >
      <table
        class="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto transit"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b border-b-gray-300 dark:border-b-gray-600 p-3">
              #
            </th>
            <th
              class="border-b border-b-gray-300 dark:border-b-gray-600 text-center"
            >
              Type
            </th>
            <th
              class="border-b border-b-gray-300 dark:border-b-gray-600 text-center"
            >
              Chain
            </th>
            <th class="border-b border-b-gray-300 dark:border-b-gray-600">
              Item
            </th>
            <th class="border-b border-b-gray-300 dark:border-b-gray-600">
              Quantity
            </th>
            <th class="border-b border-b-gray-300 dark:border-b-gray-600">
              Token Standard
            </th>
            <th class="border-b border-b-gray-300 dark:border-b-gray-600">
              Order Hash
            </th>
          </tr>
        </thead>
        <tbody class="rounded-2xl" v-if="events.length > 0 && !loading">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="(event, n) in events"
            :key="event.identifier"
          >
            <td class="p-4 rounded-l-xl">
              {{ n + 1 }}
            </td>
            <td
              class="p-4 text-slate-900 font-light capitalize dark:text-slate-100"
            >
              {{ event.event_type }}
            </td>
            <td
              class="p-4 text-slate-900 font-light capitalize dark:text-slate-100"
            >
              {{ event.chain }}
            </td>
            <td class="py-4">
              <div class="flex items-center justify-start gap-x-3">
                <img
                  class="block object-contain max-w-16 rounded-xl"
                  :src="event.asset.image_url"
                  alt=""
                />
                <div>
                  <p
                    class="font-semibold text-slate-900 dark:text-slate-100 flex"
                  >
                    {{ event.asset.name }}
                  </p>
                  <p class="font-light text-slate-900 dark:text-slate-100 flex">
                    {{ event.asset.collection }}
                    <img
                      src="@/assets/verified.svg"
                      alt="tick"
                      class="max-w-5 block pl-1"
                    />
                  </p>
                </div>
              </div>
            </td>
            <td>
              <p class="font-semibold text-slate-900 px-3 dark:text-slate-100">
                {{ event.quantity }}
              </p>
            </td>
            <td
              class="px-4 uppercase text-slate-900 dark:text-slate-100 font-light"
            >
              {{ event.asset.token_standard }}
            </td>
            <td
              class="px-4 text-slate-900 dark:text-slate-100 font-light rounded-r-xl"
            >
              {{ event.order_hash }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="font-bold">
            <td class="columns-4 row-span-4 w-full">
              <p>Loading {{ event }} Events, Please Hold a bit...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import DButton from "@/components/utils/DButton.vue";
import DDropDown from "@/components/utils/DDropDown.vue";
import { computed, onMounted, ref } from "vue";

onMounted(() => {
  getEventType("all");
  window.scrollTo(0, 0);
});

const events = ref([]);
const event = ref("All");
const loading = ref(true);

const activeBtn = ref("All");

const eventBtns = computed(() => {
  return [
    {
      name: "All",
      action: () => {
        getEventType("all");
        event.value = "All";
      },
    },
    {
      name: "Cancel",
      action: () => {
        getEventType("cancel");
        event.value = "Cancel";
      },
    },
    {
      name: "Listing",
      action: () => {
        getEventType("listing");
        event.value = "Listings";
      },
    },
    {
      name: "Offer",
      action: () => {
        getEventType("offer");
        event.value = "Offers";
      },
    },
    {
      name: "Order",
      action: () => {
        getEventType("order");
        event.value = "Orders";
      },
    },
    {
      name: "Redemption",
      action: () => {
        getEventType("redemption");
        event.value = "Redemptions";
      },
    },
    {
      name: "Sale",
      action: () => {
        getEventType("sale");
        event.value = "Sales";
      },
    },
    {
      name: "Transfer",
      action: () => {
        getEventType("transfer");
        event.value = "Transfer";
      },
    },
  ];
});

function getEventType(type) {
  loading.value = true;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
    },
  };

  fetch(`https://api.opensea.io/api/v2/events?event_type=${type}`, options)
    .then((response) => response.json())
    .then((response) => {
      events.value = response.asset_events;
      events.value = events.value.filter((event) => {
        return event.asset;
      });
      loading.value = false;
    })
    .catch((err) => console.error(err));
}
</script>

<style></style>
