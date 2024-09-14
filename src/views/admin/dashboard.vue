<template>
  <main
    class="h-auto pb-10 min-h-screen bg-slate-100 dark:bg-slate-900 transit"
  >
    <div
      class="flex md:px-8 px-5 justify-between bg-slate-100 dark:bg-slate-900 items-center transit"
    >
      <p class="">Welcome, Super Admin</p>

      <d-textfield
        @emitInput="(input) => (search = input)"
        label="Search"
        :type="theme == 'dark' ? 'filled' : 'default'"
        class="w-8/12"
      />
    </div>

    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative pt-5"
    >
      <div
        class="mx-auto w-[93%] md:w-[96%] transit gap-4 dark:bg-slate-900 bg-slate-100 h-auto grid md:grid-cols-3"
      >
        <admin-card
          v-for="dashCard in dashCards.filter(
            (dash) =>
              dash.text.includes(search) ||
              dash.text.toLowerCase().includes(search)
          )"
          :key="dashCard.text"
          :icon="dashCard.icon"
          :text="dashCard.text"
          :length="dashCard.length"
          :to="dashCard.to"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
//stores
import { adminflow } from "@/stores/adminflow";

import AdminCard from "@/components/cards/adminCard.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import SvgComp from "@/components/svgComp.vue";
import { computed, inject, onMounted, ref } from "vue";

const search = ref("");
const theme = inject("theme");

const adminflowing = adminflow();

const dashCards = computed(() => {
  return [
    {
      icon: "M2.049 1.802L5.854 5.15 9.244.976a1 1 0 0 1 1.565.017l3.235 4.156 3.928-3.396a1 1 0 0 1 1.643.9L18.115 13H1.922L.399 2.7a1 1 0 0 1 1.65-.898zM2 14h16v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z",
      text: "Admin",
      length: adminflowing.getUsers.filter((user) => user.role == "admin")
        ?.length,
    },
    {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "Users",
      length: adminflowing.getUsers.filter((user) => user.role == "user")
        ?.length,
      to: "/admin/users",
    },
    {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: "NFTs",
      length: adminflowing.getNfts.length,
      to: "/admin/nfts",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "Deposits",
      length: adminflowing.getDeposits.length,
      to: "/admin/deposits",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "Withdraws",
      length: adminflowing.getWithdraws.length,
      to: "/admin/withdraws",
    },
    {
      icon: "M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12zm11.814-7.581a1 1 0 0 0-1.628 0l-5 7a1 1 0 0 0 0 1.162l5 7a1 1 0 0 0 1.628 0l5-7a1 1 0 0 0 0-1.162l-5-7zM12 12.923 9.693 12 12 11.077l2.307.923-2.307.923zm.371 2.005 1.832-.732L12 17.279l-2.203-3.083 1.832.732a1 1 0 0 0 .742 0zM12 6.72 9.797 9.804l1.832-.732a1 1 0 0 1 .742 0l1.832.732L12 6.72z",
      text: "Wallets",
      length: adminflowing.getWallets.length,
      to: "/admin/account",
    },
    {
      icon: "M9.33497 4.72727V5.25342C6.64516 6.35644 4.76592 9.97935 4.83412 13.1192L4.83409 14.8631C3.45713 16.6333 3.53815 19.2727 6.9735 19.2727H9.33497C9.33497 19.996 9.61684 20.6897 10.1186 21.2012C10.6203 21.7127 11.3008 22 12.0104 22C12.72 22 13.4005 21.7127 13.9022 21.2012C14.404 20.6897 14.6858 19.996 14.6858 19.2727H17.0538C20.4826 19.2727 20.5323 16.6278 19.1555 14.8576L19.1938 13.1216C19.2631 9.97811 17.3803 6.35194 14.6858 5.25049V4.72727C14.6858 4.00396 14.404 3.31026 13.9022 2.7988C13.4005 2.28734 12.72 2 12.0104 2C11.3008 2 10.6203 2.28734 10.1186 2.7988C9.61684 3.31026 9.33497 4.00395 9.33497 4.72727ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186ZM17.0538 17.4545C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4787 9.99416 15.0427 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.65748 14.9289C6.66561 15.303 6.53726 15.6674 6.29639 15.9538C5.80054 16.5435 6.21158 17.4545 6.9735 17.4545H17.0538Z",
      text: "Notifications",
      length: adminflowing.getNotifications.length,
      to: "/admin/notifications",
    },
  ];
});
</script>

<style scoped></style>
