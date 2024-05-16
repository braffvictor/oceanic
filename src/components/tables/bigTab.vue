<template>
  <section
    class="h-screen bg-white dark:bg-slate-900 pt-5 w-full md:px-8 mt-2 transit"
  >
    <p class="font-bold text-slate-500 text-xl">
      Trending Collection
      <label
        for="timeframe"
        class="border-2 border-green-400 dark:border-green-500 rounded-lg overflow-hidden p-1"
      >
        <select
          name="timeframe"
          class="text-base cursor-pointer font-medium outline-none dark:bg-slate-900 transit"
          id=""
          v-model="value"
        >
          <option value="1">Last 5 Minutes</option>
          <option value="2">Last 1 Hour</option>
          <option value="3">Last 24 Hours</option>
        </select>
      </label>
    </p>
    <div class="flex gap-16 overflow-auto">
      <table
        class="w-6/12 border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b p-3">#</th>
            <th class="border-b text-left">Collection</th>
            <th class="border-b">Floor Price</th>
            <th class="border-b">Volume</th>
          </tr>
        </thead>
        <tbody class="rounded-2xl">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="n in 5"
            :key="n"
          >
            <td class="p-4 rounded-l-xl">{{ n }}</td>
            <td class="py-4">
              <div class="flex items-center justify-start gap-x-3">
                <img
                  class="block object-contain max-w-16 rounded-2xl"
                  src="https://i.seadn.io/gcs/files/9b9979a9e40659c788d66fd2ed2749e3.png?auto=format&dpr=1&w=136&h=136&fr=1"
                  alt=""
                />
                <p class="font-bold text-slate-900 dark:text-slate-100">
                  Kanpai Pandas<img
                    src="@/assets/verified.svg"
                    alt="tick"
                    class="max-w-5 inline"
                  />
                </p>
              </div>
            </td>
            <td>
              <p class="font-bold text-slate-900 dark:text-slate-100">
                0.97ETH
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              178ETH
            </td>
          </tr>

          <!-- <tr class="text-center">
            <td class="border">Carter</td>
            <td class="border">34</td>
            <td class="border">carter@yahoo.com</td>
            <td class="border">21/21/2012</td>
          </tr> -->
        </tbody>
      </table>
      <table
        class="w-6/12 border-separate border-spacing-x-0 border-spacing-y-1.5 dark:text-slate-100 table-auto"
      >
        <thead>
          <tr class="*:font-extralight text-slate-500 text-sm">
            <th class="border-b p-3">#</th>
            <th class="border-b text-left">Collection</th>
            <th class="border-b">Floor Price</th>
            <th class="border-b">Volume</th>
          </tr>
        </thead>
        <tbody class="rounded-2xl">
          <tr
            class="text-center cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transit"
            v-for="n in 5"
            :key="n"
          >
            <td class="p-4 rounded-l-xl">{{ n }}</td>
            <td class="py-4">
              <div class="flex items-center justify-start gap-x-3">
                <img
                  class="block object-contain max-w-16 rounded-2xl"
                  src="https://i.seadn.io/gcs/files/9b9979a9e40659c788d66fd2ed2749e3.png?auto=format&dpr=1&w=136&h=136&fr=1"
                  alt=""
                />
                <p class="font-bold text-slate-900 dark:text-slate-100">
                  Kanpai Pandas<img
                    src="@/assets/verified.svg"
                    alt="tick"
                    class="max-w-5 inline"
                  />
                </p>
              </div>
            </td>
            <td>
              <p class="font-bold text-slate-900 dark:text-slate-100">
                0.97ETH
              </p>
            </td>
            <td
              class="font-bold px-4 rounded-r-xl text-slate-900 dark:text-slate-100"
            >
              178ETH
            </td>
          </tr>

          <!-- <tr class="text-center">
            <td class="border">Carter</td>
            <td class="border">34</td>
            <td class="border">carter@yahoo.com</td>
            <td class="border">21/21/2012</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const value = ref("1");
</script>

<style></style>
