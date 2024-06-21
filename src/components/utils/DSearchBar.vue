<template>
  <div
    class="absolute bg-slate-50 dark:bg-slate-800 mt-1 rounded-xl shadow-lg p-4 w-full transit"
  >
    <slot></slot>
    <p
      class="text-slate-900 dark:text-slate-100 text-center md:text-left font-semibold"
      v-if="filterSearch.length > 0"
    >
      Collections
    </p>
    <section v-if="filterSearch.length > 0">
      <main
        class="flex mt-1 justify-self-auto w-full gap-x-3 items-center"
        v-for="nft in filterSearch"
        :key="nft.contracts[0].contract_address || nft.name"
      >
        <div class="col-span-1">
          <img :src="nft.image_url" class="rounded-xl" width="40" alt="" />
        </div>
        <div class="shrink w-64 h-14">
          <p class="text-slate-900 dark:text-slate-100 text-sm md:text-md mt-1">
            {{ nft.name
            }}<img
              src="@/assets/verified.svg"
              alt="tick"
              class="max-w-5 inline pl-1"
            />
          </p>
          <p class="text-gray-400 text-sm md:text-md">
            {{ nft.stats.floor_price.slice(0, 5)
            }}{{ nft.stats.floor_price_symbol }}
          </p>
        </div>
        <div>
          <p
            class="text-slate-900 dark:text-slate-100 justify-self-end text-sm md:text-md font-light"
          >
            {{
              nft.contracts[0].contract_address.slice(0, 6) +
              "..." +
              nft.contracts[0].contract_address.slice(6, 12)
            }}
          </p>
        </div>
      </main>
    </section>

    <section v-else>
      <p class="text-slate-900 dark:text-slate-100 font-thin text-center">
        {{ searchCollection }} Collection Not Found...
      </p>
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  searchCollection: {
    type: String,
    default: "",
  },
  filterSearch: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
</script>

<style></style>
