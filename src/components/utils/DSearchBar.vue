<template>
  <div
    class="absolute bg-slate-100 dark:bg-slate-800 mt-1 rounded-3xl shadow-lg p-4 w-11/12 left-0 transit"
  >
    <slot></slot>
    <p
      class="text-slate-900 dark:text-slate-100 text-center md:text-left font-semibold"
      v-if="filterSearch.length > 0"
    >
      Collections
    </p>
    <section v-if="filterSearch.length > 0" class="mt-1">
      <router-link
        :to="`/collection/${nft.key}`"
        class="flex justify-self-auto w-full gap-x-3 gap-y-2 hover:bg-slate-200 dark:hover:bg-slate-700 items-center p-3 transit rounded-xl"
        v-for="nft in filterSearch"
        :key="nft.name"
        @click="$emit('closeSearchBar')"
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
      </router-link>
    </section>

    <section v-else>
      <p class="text-slate-900 dark:text-slate-100 font-light text-center">
        Oops!...
        <span class="font-semibold text-green-500">{{ searchCollection }}</span>
        Collection Loading...
      </p>
      <div class="mt-3 text-center mx-auto">
        <div class="mx-auto text-center flex justify-center">
          <img src="@/assets/not-found.gif" width="170" class="mt-5 block" />
        </div>
      </div>
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
