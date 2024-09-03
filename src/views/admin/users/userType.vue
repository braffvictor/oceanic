<template>
  <main class="bg-slate-100 dark:bg-slate-900 transit min-h-screen">
    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative md:pt-5"
    >
      <div
        class="mx-auto transit gap-4 dark:bg-slate-900 bg-slate-100 justify-center items-center text-center h-auto pt-2"
      >
        <admin-card
          icon="M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z"
          text="All Users"
          :length="1"
          icon-color=""
          class="!w-80"
        />
      </div>
    </section>

    <section class="w-11/12 md:w-7/12 mx-auto mt-5">
      <div
        class="border-2 dark:border-slate-200 border-slate-700 rounded-3xl h-40 w-full p-3 md:p-6 flex items-center justify-between"
      >
        <div>
          <p class="font-bold text-xl">Swae David</p>
          <p class="text-sm">swaeDavid@gmail.com</p>
          <p class="text-sm">01/41/2044</p>
        </div>

        <div class="flex flex-col">
          <p
            class="border rounded-3xl border-yellow-500 text-yellow-500 p-1 text-sm"
          >
            Pending
          </p>
          <p
            class="border rounded-3xl text-green-500 border-green-500 text-center p-2 text-sm"
          >
            Active
          </p>
        </div>

        <div class="flex flex-col gap-1">
          <p
            class="bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900 p-2 rounded-lg transit"
          >
            View User
          </p>

          <p
            class="bg-green-500 text-slate-100 dark:text-slate-900 text-center p-1 rounded-lg transit"
          >
            Activate
          </p>
          <p
            class="bg-red-500 text-slate-100 dark:text-slate-900 text-center p-1 rounded-lg transit"
          >
            Block
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import AdminCard from "@/components/cards/adminCard.vue";
import { adminflow } from "@/stores/adminflow";
import { computed, onMounted, onUnmounted } from "vue";

const adminflowing = adminflow();

const dashCard = computed(() => {
  return {
    allusers: {
      icon: "",
    },
  };
});
onMounted(() => {
  adminflowing.adminRoutes = "";
  window.scrollTo({
    top: -10,
    left: 0,
    behavior: "smooth",
  });
});
onUnmounted(() => {
  adminflowing.adminRoutes = "Admin Dashboard";
});
</script>

<style></style>
