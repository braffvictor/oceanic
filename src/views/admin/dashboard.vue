<template>
  <main class="h-auto pb-10 min-h-[160vh] md:min-h-screen">
    <div
      class="flex md:px-8 px-5 justify-between bg-slate-100 dark:bg-slate-900 items-center transit pb-3"
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
      class="px-3 min-h-screen dark:bg-slate-900 bg-slate-100 w-full transit relative"
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
onMounted(() => {
  if (adminflowing.users.length == 0) adminflowing.initUsers();
});

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
      length: adminflowing.getUsers.length,
    },
  ];
});
</script>

<style scoped></style>
