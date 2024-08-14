<template>
  <div class="select-none">
    <div
      :class="cardSize"
      @click="checkRoute()"
      class="rounded-2xl hover:-translate-y-2 group shadow-lg relative bg-slate-50 active:bg-slate-200 dark:active:bg-slate-700 dark:bg-slate-800 overflow-hidden transit cursor-pointer"
    >
      <div class="min-h-36 max-h-36 w-full overflow-hidden">
        <img
          :src="nft && nft.image_url"
          alt=""
          class="object-fit group-hover:scale-110 transit pointer-events-none"
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
          v-if="!learn && !action && nft.stats"
        >
          <div v-if="!learn && nft && !action">
            <p class="text-gray-400 font-light">Floor</p>
            <p>
              {{ nft && nft.stats.floor_price.slice(0, 5)
              }}{{ nft && nft.stats.floor_price_symbol }}
            </p>
          </div>
          <div v-if="!learn && nft && !action">
            <p class="text-gray-400 font-light">Volume</p>
            <p>
              {{ (Number(nft && nft.stats.floor_price) * 6000).toFixed(0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- for collection nft with action div -->
      <div
        v-if="nft && action"
        class="bg-green-400 p-1 pb-5 dark:bg-green-500 items-center w-full flex divide-x divide-slate-900 dark:divide-slate-100 h-14 justify-around absolute -bottom-20 group-hover:-bottom-3 overflow-hidden transit"
      >
        <p
          class="text-slate-900 dark:text-slate-100 transit active:scale-90 text-xs md:text-md select-none w-full py-3"
          @click="gotoItem()"
        >
          <!-- use for price data for deduct function -->
          <!-- {{ nft && nft.stats.floor_price
          }}{{ nft && nft.stats.floor_price_symbol }} -->
          Buy At
          {{ nft && Number(nft.stats.floor_eth).toLocaleString().slice(0, 5)
          }}{{ nft && nft.stats.floor_price_symbol }}
        </p>
        <div class="px-2" @click="getNft">
          <svgComp
            Sclass="active:stroke-green-400 active:scale-90"
            icon="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userflow } from "@/stores/userflow";
import router from "@/router";
import { useRoute } from "vue-router";
import svgComp from "../svgComp.vue";

const route = useRoute();

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
  dashboard: {
    type: Boolean,
    default: false,
  },
});

// let userflowCartList = userflow().cartList;
const userflowing = userflow();

const getNft = () => {
  const { nft } = props;
  if (!nft) return;

  const watchList = JSON.parse(localStorage.getItem("watchList")) || [];

  const nftExist = watchList.find((el) => el.name === nft.name);

  if (nftExist) {
    // console.log("Already exist");
    userflowing.initAlert({
      message: `${nft.name} Already Added in Your Cart List`,
      is: true,
      type: "error",
      timer: 6000,
      close: true,
    });
  } else {
    const newList = [nft, ...watchList];
    localStorage.setItem("watchList", JSON.stringify(newList));
    // userflowCartList = JSON.parse(localStorage.getItem("watchList")).length;

    userflowing.checkLocalStorage(
      JSON.parse(localStorage.getItem("watchList")).length
    );

    userflowing.initAlert({
      message: `${nft.name} Added To Your Cart List`,
      is: true,
      type: "info",
      timer: 6000,
      close: true,
    });
  }
};

function checkRoute() {
  if (props.learn) {
    router.push(`${props.routeName}`);
  } else if (props.to) {
    router.push(`/collection/${props.nft && props.nft.key}`);
  } else {
    () => {};
  }
}

function gotoItem() {
  if (props.dashboard) {
    router.push(
      `/dashboard/collection/item/${route.params.id}?identifier=${
        props.nft && props.nft.identifier
      }`
    );
  } else {
    router.push(
      `/collection/item/${route.params.id}?identifier=${
        props.nft && props.nft.identifier
      }`
    );
  }
}
</script>

<style></style>
