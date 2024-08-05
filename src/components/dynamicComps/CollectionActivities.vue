<template>
  <div class="min-h-screen">
    <div class="flex gap-4 overflow-auto">
      <table
        class="w-full border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 text-slate-900 table-auto"
      >
        <thead>
          <tr class="*:font-bold text-slate-800 dark:text-slate-50 text-sm">
            <th class="border-b p-3">id</th>
            <th class="border-b p-3">Token</th>
            <th class="border-b p-3">Type</th>
            <th class="border-b">Price</th>
            <th class="border-b">Quantity</th>
            <th class="border-b">From</th>
            <th class="border-b">To</th>
            <th class="border-b">Transaction Hash</th>
            <th class="border-b">Date Of Transaction</th>
          </tr>
        </thead>
        <tbody class="rounded-2xl" v-if="events && events.length > 0">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="event in events"
            :key="event.contract_address"
          >
            <td class="p-4 rounded-l-xl font-light">{{ event.id }}</td>
            <td class="p-4 font-light">{{ event.token_type }}</td>
            <td class="py-4">
              <p class="capitalize font-light">{{ event.transfer_type }}</p>
            </td>
            <td class="font-light px-4 text-slate-900 dark:text-slate-100">
              {{ (Number(event.id) / 4000).toLocaleString() }}ETH
            </td>
            <td class="font-light px-4 text-slate-900 dark:text-slate-100">
              {{ event.quantity }}
            </td>
            <td class="font-light px-4 text-slate-900 dark:text-slate-100">
              {{ event.from_address }}
            </td>
            <td class="font-light px-4 text-slate-900 dark:text-slate-100">
              {{ event.to_address }}
            </td>

            <td
              class="font-light px-4 text-slate-900 dark:text-slate-100"
              v-for="price in event.price || [
                {
                  price: 'red',
                  hash: '	0xe6f856e288b1bd5b3f8bc044e02ba9d8426f96295e572174eedfdasjhfjlsdfhsjkdfjsklje33272',
                },
              ]"
              :key="price.price"
            >
              {{ price.hash }}
            </td>
            <td
              class="font-light px-4 text-slate-900 dark:text-slate-100 rounded-r-xl"
            >
              {{ changeTimeFormat(event.block_timestamp) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr class="font-bold">
            <td class="columns-4 row-span-4 w-full">
              <p>Loading Events...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  contractAddress: {
    type: String,
    default: "",
  },
});

const events = ref([]);

onMounted(() => {
  getTransferEventofCollection(props.contractAddress);
});

function getTransferEventofCollection(contractAddress) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
    },
  };

  fetch(
    `https://api.blockspan.com/v1/transfers/contract/${contractAddress}?chain=eth-main&page_size=50`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      events.value = response.results;

      console.log(events.value[0]);
    })
    .catch((err) => console.error(err));
}

function changeTimeFormat(time) {
  // ISO 8601 date-time string

  // Parse the ISO string to a Date object
  const date = new Date(time);

  // Extract components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Format to normal 24-hour day time format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
</script>

<style></style>
