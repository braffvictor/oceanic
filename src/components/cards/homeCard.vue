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
            nft && nft.name.length > 14
              ? nft && nft.name.slice(0, 14) + "..."
              : nft && nft.name
          }}
          <img
            src="@/assets/verified.svg"
            alt="tick"
            class="max-w-5 inline pl-1"
          />
        </p>
        <div
          class="flex justify-between text-slate-900 font-bold dark:text-slate-100 mt-5"
        >
          <div>
            <p class="text-gray-400 font-light">Floor</p>
            <p>0.004 ETH</p>
          </div>
          <div>
            <p class="text-gray-400 font-light">Volume</p>
            <p>54 ETH</p>
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
});
</script>

<style></style>
