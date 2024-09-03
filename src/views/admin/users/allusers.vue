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
  adminflowing.adminRoutes = "All Users";
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
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "All Users",
      length: adminflowing.getUsers.length,
      to: "/admin/users/allusers",
    },
    {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "Verified Users",
      length: adminflowing.getUsers.filter((user) => user.verified)?.length,
      iconColor: "!fill-green-500 ",
    },
    {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "Blocked User",
      length: adminflowing.getUsers.filter((user) => user.blocked)?.length,
      iconColor: "!fill-red-500",
    },
  ];
});
</script>

<style></style>
