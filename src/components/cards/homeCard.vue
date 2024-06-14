<template>
  <div class="">
    <div
      class="rounded-2xl hover:-translate-y-2 group shadow-lg min-w-56 min-h-72 max-w-56 max-h-72 bg-slate-50 dark:bg-slate-800 overflow-hidden transit cursor-pointer"
    >
      <div class="min-h-36 max-h-36 w-full overflow-hidden">
        <img
          :src="nft && nft.image_url"
          alt=""
          class="object-fit group-hover:scale-110 transit"
        />
      </div>
      <div class="px-3 mt-3">
        <p class="font-bold text-slate-900 dark:text-slate-100">
          {{
            nft && nft.name.length > 14 && !learn
              ? nft && nft.name.slice(0, 14) + "..."
              : nft && nft.name
          }}
          <img
            src="@/assets/verified.svg"
            alt="tick"
            v-if="!learn"
            class="max-w-5 inline pl-1"
          />
        </p>
        <div
          class="flex justify-between text-slate-900 font-bold dark:text-slate-100 mt-5"
        >
          <div v-if="!learn">
            <p class="text-gray-400 font-light">Floor</p>
            <p>
              {{ nft && nft.stats.floor_price
              }}{{ nft && nft.stats.floor_price_symbol }}
            </p>
          </div>
          <div v-if="!learn">
            <p class="text-gray-400 font-light">Volume</p>
            <p>
              {{
                nft && nft.stats.total_volume
                  ? nft && nft.stats.total_volume.toString().slice(0, 7)
                  : "0"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  nft: {
    type: Object,
    default: () => {
      return {};
    },
  },
  learn: {
    type: Boolean,
    default: false,
  },
});

console.log(props.nft);
</script>

<style></style>
