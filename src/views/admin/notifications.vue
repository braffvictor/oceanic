<template>
  <main class="bg-slate-100 dark:bg-slate-900 transit min-h-screen pb-10">
    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative md:pt-5"
    >
      <div
        class="mx-auto transit gap-4 dark:bg-slate-900 bg-slate-100 justify-center items-center text-center h-auto pt-2"
      >
        <admin-card
          :icon="dashCard.icon"
          :text="dashCard.text"
          :length="dashCard.length"
          :icon-color="dashCard.iconColor"
          class="!w-80"
        />
      </div>
    </section>

    <section class="w-10/12 md:w-7/12 mx-auto my-6">
      <d-textfield
        @emitInput="(input) => (search = input)"
        label="Search Notifications"
        :type="theme == 'dark' ? 'filled' : 'default'"
      />
    </section>

    <div
      class="w-full"
      v-if="
        dashCard.array.filter(
          (userText) =>
            userText.fullName.includes(search) ||
            userText.fullName.toLowerCase().includes(search) ||
            userText.email.includes(search)
        ).length > 0
      "
    >
      <TransitionGroup name="list">
        <admin-prop-card
          v-for="user in dashCard.array.filter(
            (userText) =>
              userText.fullName.includes(search) ||
              userText.fullName.toLowerCase().includes(search) ||
              userText.email.includes(search)
          )"
          :key="user.userID"
          :title="user.fullName"
          :text1="user.email"
          :date="user.joinDate"
          :data="user"
          :actions="actions"
        />
      </TransitionGroup>
    </div>

    <section v-else class="flex justify-center items-center">
      <div class="mt-10">
        <img
          src="@/assets/svg/darkfilter.svg"
          class="mx-auto rotate-180 text-center dark:hidden"
          alt=""
          width="150"
        />
        <img
          src="@/assets/svg/whitefilter.svg"
          class="mx-auto rotate-180 text-center hidden dark:block"
          alt=""
          width="150"
        />
        <p class="font-light text-center mt-4" v-if="!search">Empty List</p>
        <p class="font-light text-center mt-4" v-if="search">
          <span class="text-green-400 dark:text-green-500">{{ search }}</span>
          User Not Found.
        </p>
      </div>
    </section>

    <!-- dialog -->
    <DDialog
      :dialog="dialog"
      @closeDialog="(dialog = false), (loading = false)"
      :loading="loading"
      :data="transaction"
      title="Send Notification"
      :screen="true"
    />
  </main>
</template>

<script setup>
//stores
import { adminflow } from "@/stores/adminflow";
import { userflow } from "@/stores/userflow";

import DDialog from "@/components/utils/DDialog.vue";
import AdminCard from "@/components/cards/adminCard.vue";
import AdminPropCard from "@/components/cards/adminPropCard.vue";
import DTextfield from "@/components/utils/DTextfield.vue";
import { computed, inject, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const search = ref("");

const dialog = ref(false);
const transaction = ref(null);
const loading = ref(false);

watch(dialog, () => {
  if (dialog.value) {
    setTimeout(() => {
      loading.value = true;
    }, 200);
  } else {
    loading.value = false;
  }
});

const adminflowing = adminflow();
const userflowing = userflow();
const theme = inject("theme");

const dashCard = computed(() => {
  return {
    icon: "M9.33497 4.72727V5.25342C6.64516 6.35644 4.76592 9.97935 4.83412 13.1192L4.83409 14.8631C3.45713 16.6333 3.53815 19.2727 6.9735 19.2727H9.33497C9.33497 19.996 9.61684 20.6897 10.1186 21.2012C10.6203 21.7127 11.3008 22 12.0104 22C12.72 22 13.4005 21.7127 13.9022 21.2012C14.404 20.6897 14.6858 19.996 14.6858 19.2727H17.0538C20.4826 19.2727 20.5323 16.6278 19.1555 14.8576L19.1938 13.1216C19.2631 9.97811 17.3803 6.35194 14.6858 5.25049V4.72727C14.6858 4.00396 14.404 3.31026 13.9022 2.7988C13.4005 2.28734 12.72 2 12.0104 2C11.3008 2 10.6203 2.28734 10.1186 2.7988C9.61684 3.31026 9.33497 4.00395 9.33497 4.72727ZM12.9022 4.72727C12.9022 4.74573 12.9017 4.76414 12.9006 4.78246C12.6101 4.74603 12.3142 4.72727 12.014 4.72727C11.7113 4.72727 11.413 4.74634 11.1203 4.78335C11.1192 4.76474 11.1186 4.74603 11.1186 4.72727C11.1186 4.48617 11.2126 4.25494 11.3798 4.08445C11.547 3.91396 11.7739 3.81818 12.0104 3.81818C12.2469 3.81818 12.4738 3.91396 12.641 4.08445C12.8083 4.25494 12.9022 4.48617 12.9022 4.72727ZM11.1186 19.2727C11.1186 19.5138 11.2126 19.7451 11.3798 19.9156C11.547 20.086 11.7739 20.1818 12.0104 20.1818C12.2469 20.1818 12.4738 20.086 12.641 19.9156C12.8083 19.7451 12.9022 19.5138 12.9022 19.2727H11.1186ZM17.0538 17.4545C17.8157 17.4545 18.2267 16.5435 17.7309 15.9538C17.49 15.6673 17.3616 15.3028 17.3699 14.9286L17.4106 13.0808C17.4787 9.99416 15.0427 6.54545 12.014 6.54545C8.98598 6.54545 6.55028 9.99301 6.61731 13.0789L6.65748 14.9289C6.66561 15.303 6.53726 15.6674 6.29639 15.9538C5.80054 16.5435 6.21158 17.4545 6.9735 17.4545H17.0538Z",
    text: "All Notifications",
    length: adminflowing.getNotifications.length,
    array: adminflowing.getUsers,
  };
});

onMounted(() => {
  adminflowing.adminRoutes = "Notifications Management";
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
      text: "Send Notification",
      color: "bg-slate-900 dark:bg-slate-100",
      action: (e, data) => {
        data.type = "notification";
        transaction.value = data;
        dialog.value = true;
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
