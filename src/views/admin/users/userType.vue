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
        label="Search Users..."
        :type="theme == 'dark' ? 'filled' : 'default'"
      />
    </section>

    <div
      class="w-full"
      v-if="
        dashCard[$route.params.id].array.filter(
          (userText) =>
            userText.fullName.includes(search) ||
            userText.fullName.toLowerCase().includes(search) ||
            userText.email.includes(search)
        ).length > 0
      "
    >
      <TransitionGroup name="list">
        <admin-prop-card
          v-for="user in dashCard[$route.params.id].array.filter(
            (userText) =>
              userText.fullName.includes(search) ||
              userText.fullName.toLowerCase().includes(search) ||
              userText.email.includes(search)
          )"
          :key="user.userID"
          :title="user.fullName"
          :text1="user.email"
          :text3="`Balance: ${user.wallet.balance.toFixed(1)} ETH`"
          :date="user.joinDate"
          :verified="user.verified"
          :data="user"
          :actions="actions"
          :blocked="user.blocked"
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
          Not Found.
        </p>
      </div>
    </section>
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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const search = ref("");

const adminflowing = adminflow();
const userflowing = userflow();
const theme = inject("theme");

const users = computed(() => {
  return adminflowing.users.filter((user) => {
    return (
      user.fullName.includes(search.value) ||
      user.fullName.toLowerCase().includes(search.value) ||
      user.email.includes(search.value)
    );
  });
});

const dashCard = computed(() => {
  return {
    allusers: {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "All Users",
      length: adminflowing.getUsers.filter((user) => user.role == "user")
        .length,
      array: adminflowing.getUsers.filter((user) => user.role == "user"),
    },
    verifiedusers: {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "Verified Users",
      length: adminflowing.getUsers.filter((user) => user.verified)?.length,
      iconColor: "!fill-green-500 ",
      array: adminflowing.getUsers.filter((user) => user.verified),
    },
    blockedusers: {
      icon: "M7.5,5C5.6,5,4,6.6,4,8.5S5.6,12,7.5,12S11,10.4,11,8.5S9.4,5,7.5,5z M16.5,5C14.6,5,13,6.6,13,8.5s1.6,3.5,3.5,3.5S20,10.4,20,8.5S18.4,5,16.5,5z M7.5,14C2.6,14,1,18,1,18v2h13v-2C14,18,12.4,14,7.5,14z M16.5,14c-1.5,0-2.7,0.4-3.6,0.9 c1.4,1.2,2,2.6,2.1,2.7l0.1,0.2V20h8v-2C23,18,21.4,14,16.5,14z",
      text: "Blocked User",
      length: adminflowing.getUsers.filter((user) => user.blocked)?.length,
      iconColor: "!fill-red-500",
      array: adminflowing.getUsers.filter((user) => user.blocked),
    },
  };
});
onMounted(() => {
  adminflowing.adminRoutes = "Users Management";
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
      text: "View User",
      color: "bg-slate-900 dark:bg-slate-100",
      action: (e, data) => {
        router.push(`/admin/edituser/${data.userID}`);
      },
    },
    {
      is: route.params.id == "allusers" ? true : false,
      text: "Verify",
      color: "!bg-green-500",
      action: (e, data) => {
        if (data.verified) {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} Account Is Already Verified`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} Account Is Successfully Verified`;

          const payload = {
            id: data.userID,
            category: "users",
            data: { verified: true },
            message: message,
          };
          adminflowing.dynamicUpdate(payload);
        }
      },
    },
    {
      is: route.params.id == "verifiedusers" ? true : false,
      text: "Unverify",
      color: "bg-red-500",
      action: (e, data) => {
        let message = `${data.fullName} Account Is Successfully Unverified`;

        const payload = {
          id: data.userID,
          category: "users",
          data: { verified: false },
          message: message,
        };
        adminflowing.dynamicUpdate(payload);
      },
    },
    {
      is: route.params.id == "allusers" ? true : false,
      text: "Block",
      color: "bg-red-500",
      action: (e, data) => {
        if (data.blocked) {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} Account Is Already Blocked`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} Account Is Blocked`;

          const payload = {
            id: data.userID,
            category: "users",
            data: { blocked: true },
            message: message,
          };
          adminflowing.dynamicUpdate(payload);
        }
      },
    },
    {
      is: route.params.id == "blockedusers" ? true : false,
      text: "Unblock",
      color: "bg-green-500",
      action: (e, data) => {
        let message = `${data.fullName} Account Is Successfully Unblocked`;

        const payload = {
          id: data.userID,
          category: "users",
          data: { blocked: false },
          message: message,
          timer: 5000,
        };
        adminflowing.dynamicUpdate(payload);
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
