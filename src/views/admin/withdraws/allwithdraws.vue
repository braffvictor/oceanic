<template>
  <main
    class="bg-slate-100 dark:bg-slate-900 md:min-h-screen h-auto pb-10 transit"
  >
    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative pt-5"
    >
      <div
        class="mx-auto w-[93%] md:w-[96%] transit gap-4 dark:bg-slate-900 bg-slate-100 h-auto grid md:grid-cols-3"
      >
        <admin-card
          v-for="dashCard in dashCards"
          :key="dashCard.text"
          :icon="dashCard.icon"
          :text="dashCard.text"
          :length="dashCard.length"
          :to="dashCard.to"
          :icon-color="dashCard.iconColor"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import AdminCard from "@/components/cards/adminCard.vue";

import { adminflow } from "@/stores/adminflow";
import { computed, onMounted, onUnmounted } from "vue";

const adminflowing = adminflow();
onMounted(() => {
  adminflowing.adminRoutes = "Withdrawal Management";
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});
onUnmounted(() => {
  adminflowing.adminRoutes = "Admin Dashboard";
});

const dashCards = computed(() => {
  return [
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "All Withdrawals",
      length: adminflowing.getWithdraws.length,
      to: "/admin/withdraws/allwithdraws",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "Approved Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "approved"
      )?.length,
      iconColor: "!fill-green-500 ",
      to: "/admin/withdraws/approvedwithdraws",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "Pending Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "pending"
      )?.length,
      iconColor: "!fill-yellow-500",
      to: "/admin/withdraws/pendingwithdraws",
    },
    {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: "Declined Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "declined"
      )?.length,
      iconColor: "!fill-red-500",
      to: "/admin/withdraws/declinedwithdraws",
    },
  ];
});
</script>

<style></style>
