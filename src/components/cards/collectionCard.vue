<template>
  <main class="">
    <div
      class="h-auto mt-5 min-w-56 min-h-[310px] max-w-56 max-h-[310px] w-60 rounded-3xl dark:bg-slate-800 bg-slate-100 p-3 group hover:-translate-y-2 overflow-hidden transit dark:active:bg-slate-700 active:bg-slate-200 cursor-pointer shadow"
      @click="checkRoute()"
    >
      <div
        class="mx-auto w-full text-center min-h-[200px] max-h-[200px] overflow-hidden rounded-3xl transit"
      >
        <!-- <img
          :src="nft && nft.image_url"
          :alt="nft && nft?.name"
          width="200"
          height="200"
          class="object-contain rounded-3xl pointer-events-none mx-auto text-center transit group-hover:-translate-y-1 group-hover:scale-105"
        /> -->

        <v-lazy-image
          :src="nft && nft.image_url"
          class="object-contain rounded-3xl pointer-events-none mx-auto text-center transit group-hover:-translate-y-1 group-hover:scale-105"
        />
      </div>
      <div class="mt-2 py-2 flex gap-x-2 items-center">
        <div>
          <img
            :src="sliceBannerText(nft && nft.banner_image_url)"
            alt=""
            width="100"
            class="object-contain max-w-12 rounded-full mx-auto text-center transit pointer-events-none"
          />
        </div>
        <div class="w-full">
          <p class="font-bold text-slate-900 dark:text-slate-100 text-sm">
            {{
              nft && nft.name?.length > 8 && !learn
                ? nft && nft.name.slice(0, 8) + "..."
                : nft && nft.name
            }}
            <img
              src="@/assets/verified.svg"
              alt="tick"
              v-if="!learn"
              class="max-w-5 inline pl-1"
            />
          </p>
          <p
            class="font-thin text-xs opacity-50 text-slate-900 dark:text-slate-100 md:text-sm"
          >
            {{
              nft && nft.key?.length > 8 && !learn
                ? nft && nft.key.slice(0, 8) + "..."
                : nft && nft.key
            }}
          </p>
        </div>

        <div class="float-end text-right">
          <button>
            <svg-comp
              Sclass="active:stroke-red-500 -rotate-90"
              icon="M7 10L12 15L17 10"
            />
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import SvgComp from "@/components/svgComp.vue";
import vLazyImage from "v-lazy-image";

import router from "@/router";
import { useRoute } from "vue-router";

const route = useRoute();

function sliceBannerText(text) {
  if (text) {
    return text.slice(0, text.indexOf("?"));
  }
}

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
  action: {
    type: Boolean,
    default: false,
  },
  cardSize: {
    type: String,
    default: "min-w-56 min-h-72 max-w-56 max-h-72",
  },
  to: {
    type: Boolean,
    default: false,
  },
  routeName: {
    type: String,
    default: "",
  },
});

function checkRoute() {
  if (props.learn) {
    router.push(`${props.routeName}`);
  } else if (props.to) {
    router.push(`/dashboard/collection/${props.nft && props.nft.key}`);
  } else {
    () => {};
  }
}
</script>

<style>
.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
