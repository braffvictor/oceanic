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
        label="Search Withdraws"
        :type="theme == 'dark' ? 'filled' : 'default'"
      />
    </section>

    <div class="w-full" v-if="dashCard[$route.params.id].array.length > 0">
      <TransitionGroup name="list">
        <admin-prop-card
          v-for="withdraw in dashCard[$route.params.id].array.filter(
            (withdrawText) =>
              withdrawText.fullName.includes(search) ||
              withdrawText.fullName.toLowerCase().includes(search) ||
              withdrawText.email.includes(search)
          )"
          :key="withdraw.id"
          :title="withdraw.fullName"
          :text1="`${withdraw.amount.toFixed(1)} ETH `"
          :text2="withdraw.convertAmount"
          :text3="withdraw.email"
          :date="withdraw.date"
          :data="withdraw"
          :actions="actions"
          :status="withdraw.status"
        />
      </TransitionGroup>
    </div>

    <!-- dialog -->
    <DDialog
      :dialog="dialog"
      @closeDialog="(dialog = false), (loading = false)"
      :loading="loading"
      :data="transaction"
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
    allwithdraws: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "All Withdrawals",
      length: adminflowing.getWithdraws.length,
      array: adminflowing.getWithdraws,
    },
    approvedwithdraws: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "Approved Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "approved"
      )?.length,
      iconColor: "!fill-green-500 ",
      array: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "approved"
      ),
    },
    pendingwithdraws: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "Pending Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "pending"
      )?.length,
      iconColor: "!fill-yellow-500",
      array: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "pending"
      ),
    },
    declinedwithdraws: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: "Declined Withdrawals",
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "declined"
      )?.length,
      iconColor: "!fill-red-500",
      array: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.status == "declined"
      ),
    },
  };
});
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

const actions = computed(() => {
  return [
    {
      is: true,
      text: "View",
      color: "bg-slate-900 dark:bg-slate-100",
      action: (e, data) => {
        transaction.value = data;
        dialog.value = true;
      },
    },
    {
      is:
        route.params.id == "allwithdraws" ||
        route.params.id == "pendingwithdraws" ||
        route.params.id == "declinedwithdraws"
          ? true
          : false,
      text: "Approve",
      color: "bg-green-500",
      action: (e, data) => {
        if (data.status == "approved") {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} Withdrawal Of ${data.amount} ETH  Has Already Been Approved.`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} Withdrawal Of ${data.amount} ETH Has Been Approved Successfully.`;

          // todo a function here to add amount to the user wallet balance

          const payload = {
            id: data.id,
            category: "withdraws",
            data: { status: "approved" },
            message: message,
          };
          adminflowing.dynamicUpdate(payload);
        }
      },
    },

    {
      is:
        route.params.id == "allwithdraws" ||
        route.params.id == "pendingwithdraws" ||
        route.params.id == "approvedwithdraws"
          ? true
          : false,
      text: "Decline",
      color: "bg-red-500",
      action: (e, data) => {
        if (data.status == "declined") {
          userflowing.initAlert({
            is: true,
            message: `${data.fullName} Withdrawal Of ${data.amount} ETH  Has Already Been Declined.`,
            type: "info",
            close: true,
            timer: 5000,
          });
        } else {
          let message = `${data.fullName} Withdrawal Of ${data.amount} ETH  Has Been Declined Successfully.`;

          const payload = {
            id: data.id,
            category: "withdraws",
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
