<template>
  <main class="bg-slate-100 dark:bg-slate-900 transit min-h-screen pb-10">
    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative md:pt-5"
    >
      <div
        class="mx-auto transit gap-4 dark:bg-slate-900 bg-slate-100 justify-center items-center text-center h-auto pt-2"
      >
        <admin-card
          :icon="dashCard[$route.params.id].icon"
          :text="dashCard[$route.params.id].text"
          :length="dashCard[$route.params.id].length"
          :icon-color="dashCard[$route.params.id].iconColor"
          class="!w-80"
        />
      </div>
    </section>

    <section class="w-10/12 md:w-7/12 mx-auto my-6">
      <d-textfield
        @emitInput="(input) => (search = input)"
        label="Search NFTs"
        :type="theme == 'dark' ? 'filled' : 'default'"
      />
    </section>

    <div class="w-full" v-if="dashCard[$route.params.id].array.length > 0">
      <TransitionGroup name="list">
        <admin-prop-card
          v-for="nft in dashCard[$route.params.id].array.filter(
            (nftText) =>
              nftText.fullName.includes(search) ||
              nftText.fullName.toLowerCase().includes(search) ||
              nftText.email.includes(search) ||
              nftText.name.includes(search) ||
              nftText.name.toLowerCase().includes(search) ||
              nftText.collection.includes(search) ||
              nftText.collection.toLowerCase().includes(search)
          )"
          :key="nft.id"
          :title="nft.name"
          :text1="nft.fullName"
          :text2="nft.collection"
          :date="nft.created_date"
          :data="nft"
          :actions="actions"
          :status="nft.status"
        />
      </TransitionGroup>
    </div>
  </main>
</template>

<script setup>
//stores
import { adminflow } from "@/stores/adminflow";
import { userflow } from "@/stores/userflow";

import AdminCard from "@/components/cards/adminCard.vue";
import AdminPropCard from "@/components/cards/adminPropCard.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const search = ref("");

const adminflowing = adminflow();
const userflowing = userflow();
const theme = inject("theme");

const dashCard = computed(() => {
  return {
    allnfts: {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "All Nfts",
      length: adminflowing.getNfts.length,
      array: adminflowing.getNfts,
    },
    approvednfts: {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "Approved NFTs",
      length: adminflowing.getNfts.filter((nft) => nft.status == "approved")
        ?.length,
      iconColor: "!fill-green-500 ",
      array: adminflowing.getNfts.filter((nft) => nft.status == "approved"),
    },
    pendingnfts: {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "Pending NFTs",
      length: adminflowing.getNfts.filter((nft) => nft.status == "pending")
        ?.length,
      iconColor: "!fill-yellow-500",
      array: adminflowing.getNfts.filter((nft) => nft.status == "pending"),
    },
    declinednfts: {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "Declined NFTS",
      length: adminflowing.getNfts.filter((nft) => nft.status == "declined")
        ?.length,
      iconColor: "!fill-red-500",
      array: adminflowing.getNfts.filter((nft) => nft.status == "declined"),
    },
  };
});
onMounted(() => {
  adminflowing.adminRoutes = "NFTs Management";
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});
onUnmounted(() => {
  adminflowing.adminRoutes = "Admin Dashboard";
});

const actions = computed(() => {
  return [
    {
      is: true,
      text: "View",
      color: "bg-slate-900 dark:bg-slate-100",
      action: (e, data) => {
        console.log(data);
      },
    },
    {
      is:
        route.params.id == "allnfts" ||
        route.params.id == "pendingnfts" ||
        route.params.id == "declinednfts"
          ? true
          : false,
      text: "Approve",
      color: "bg-green-500",
      action: (e, data) => {
        if (data.status == "approved") {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} NFT Has Already Been Approved.`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} NFT Has Been Approved Successfully.`;

          const payload = {
            id: data.id,
            category: "nfts",
            data: { status: "approved" },
            message: message,
          };
          adminflowing.dynamicUpdate(payload);
        }
      },
    },

    {
      is:
        route.params.id == "allnfts" ||
        route.params.id == "pendingnfts" ||
        route.params.id == "approvednfts"
          ? true
          : false,
      text: "Decline",
      color: "bg-red-500",
      action: (e, data) => {
        if (data.status == "declined") {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} NFT Has Already Been Declined.`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} NFT Has Been Declined Successfully.`;

          const payload = {
            id: data.id,
            category: "nfts",
            data: { status: "declined" },
            message: message,
          };
          adminflowing.dynamicUpdate(payload);
        }
      },
    },
  ];
});
</script>

<style>
.list-move, /* apply transition to moving elements */
  .list-enter-active,
  .list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ensure leaving items are taken out of layout flow so that moving
     animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
