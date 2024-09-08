<template>
  <main class="bg-slate-100 dark:bg-slate-900 transit min-h-screen pb-10">
    <section
      class="px-3 dark:bg-slate-900 bg-slate-100 w-full transit relative md:pt-5"
    >
      <div
        class="mx-auto transit gap-4 dark:bg-slate-900 bg-slate-100 justify-center items-center text-center h-auto pt-2"
      >
        <admin-card
          :icon="dashCard[$route.query.type].icon"
          :text="dashCard[$route.query.type].text"
          :length="dashCard[$route.query.type].length"
          :icon-color="dashCard[$route.query.type].iconColor"
          class="!w-80"
        />
      </div>
    </section>

    <section class="w-10/12 md:w-7/12 mx-auto my-6">
      <d-textfield
        @emitInput="(input) => (search = input)"
        :label="`Search...`"
        :type="theme == 'dark' ? 'filled' : 'default'"
      />
    </section>

    <div class="w-full" v-if="dashCard[$route.query.type].array.length > 0">
      <TransitionGroup name="list">
        <admin-prop-card
          v-for="type in dashCard[$route.query.type].array.filter(
            (depositText) =>
              depositText.fullName.includes(search) ||
              depositText.fullName.toLowerCase().includes(search) ||
              depositText.email.includes(search)
          )"
          :key="type.id"
          :title="type.category == 'nfts' ? type.name : type.fullName"
          :text1="
            type.category == 'nfts'
              ? type.fullName
              : `${type.amount.toFixed(1)} ETH `
          "
          :text2="
            type.category == 'nfts'
              ? type.type.toUpperCase()
              : type.convertAmount
          "
          :text3="type.email"
          :date="
            type.category == 'nfts' ? type.created_date || type.date : type.date
          "
          :text4="
            type.adminText && type.category == 'deposits'
              ? 'Admin Deposit'
              : !type.adminText && type.category == 'deposits'
              ? 'User Deposit'
              : '' || (type.adminText && type.category == 'withdraws')
              ? 'Admin Withdrawal'
              : !type.adminText && type.category == 'withdraws'
              ? 'User Withdrawal'
              : ''
          "
          :data="type"
          :actions="actions"
          :status="type.status"
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

const user = computed(() => {
  return adminflowing.getUserByUserID(route.params.id);
});

const dashCard = computed(() => {
  return {
    alldeposits: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z",
      text: `All ${user.value && user.value.fullName} Deposits`,
      length: adminflowing.getDeposits.filter(
        (deposit) => deposit.userID == (user.value && user.value.userID)
      ).length,
      array: adminflowing.getDeposits.filter(
        (deposit) => deposit.userID == (user.value && user.value.userID)
      ),
    },
    allwithdraws: {
      icon: "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12Z",
      text: `All ${user.value && user.value.fullName} Withdraws`,
      length: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.userID == (user.value && user.value.userID)
      ).length,
      array: adminflowing.getWithdraws.filter(
        (withdraw) => withdraw.userID == (user.value && user.value.userID)
      ),
    },
    allnfts: {
      icon: "M9.5,2 C12.8843427,2 15.7451256,4.24162622 16.678598,7.32112804 C19.7583738,8.25487439 22,11.1156573 22,14.5 C22,18.6421356 18.6421356,22 14.5,22 C11.1156573,22 8.25487439,19.7583738 7.32140198,16.678872 C4.24162622,15.7451256 2,12.8843427 2,9.5 C2,5.35786438 5.35786438,2 9.5,2 Z M16.998366,9.59887466 L17,9.5 C17,13.6089099 13.6957891,16.9460801 9.59952435,16.9993532 C10.508932,18.7800922 12.3620036,20 14.5,20 C17.5375661,20 20,17.5375661 20,14.5 C20,12.3620036 18.7800922,10.508932 16.998366,9.59887466 Z M9.5,4 C6.46243388,4 4,6.46243388 4,9.5 C4,11.6379964 5.21990783,13.491068 7.00163397,14.4011253 L7,14.5 C7,10.3912876 10.3038933,7.05424076 14.399885,7.00065454 C13.491068,5.21990783 11.6379964,4 9.5,4 Z",
      text: `All ${user.value && user.value.fullName} Nfts`,
      length: adminflowing.getNfts.filter(
        (nft) => nft.userID == (user.value && user.value.userID)
      ).length,
      array: adminflowing.getNfts.filter(
        (nft) => nft.userID == (user.value && user.value.userID)
      ),
    },
  };
});
onMounted(() => {
  adminflowing.adminRoutes = "User Activities";
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
      is: true,
      text: "Approve",
      color: "bg-green-500",
      action: (e, data) => {
        if (data.status == "approved") {
          if (data.category == "deposits") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} Deposit Of ${data.amount} ETH Has Already Been Approved.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          } else if (data.category == "withdraws") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} Withdrawal Of ${data.amount} ETH Has Already Been Approved.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          } else if (data.category == "nfts") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} NFT Has Already Been Approved.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          }
        } else {
          if (data.category == "deposits") {
            let message = `${data.fullName} Deposit Of ${data.amount} ETH Has Been Approved Successfully.`;

            const payload = {
              id: data.id,
              category: "deposits",
              data: { status: "approved" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
            // todo a function here to add amount to the user wallet balance

            userflowing.addition({
              amount: data.amount,
              uid: data.userID,
            });

            userflowing.notificationFN({
              type: "success",
              message: `Dear ${data.fullName}, Your Deposit of ${data.amount} ETH Has Been Successfully Approved, Please Contact Support For More Enquires. Thank You.`,
              uid: data.userID,
              email: data.email,
              fullName: data.fullName,
              open: false,
            });
          } else if (data.category == "withdraws") {
            let message = `${data.fullName} Withdrawal Of ${data.amount} ETH Has Been Approved Successfully.`;
            const payload = {
              id: data.id,
              category: "withdraws",
              data: { status: "approved" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
          } else if (data.category == "nfts") {
            let message = `${data.fullName} NFT Has Been Approved Successfully.`;

            const payload = {
              id: data.id,
              category: "nfts",
              data: { status: "approved" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
          }
        }
      },
    },

    {
      is: true,
      text: "Decline",
      color: "bg-red-500",
      action: (e, data) => {
        if (data.status == "declined") {
          if (data.category == "deposits") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} Deposit Of ${data.amount} ETH Has Already Been Declined.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          } else if (data.category == "withdraws") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} Withdrawal Of ${data.amount} ETH Has Already Been Declined.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          } else if (data.category == "nfts") {
            userflowing.initAlert({
              is: true,
              message: `${data.fullName} NFT Has Already Been Declined.`,
              type: "info",
              close: true,
              timer: 5000,
            });
          }
        } else {
          if (data.category == "deposits") {
            let message = `${data.fullName} Deposit Of ${data.amount} ETH Has Been Declined Successfully.`;

            // todo a function here to add amount to the user wallet balance

            const payload = {
              id: data.id,
              category: "deposits",
              data: { status: "declined" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
          } else if (data.category == "withdraws") {
            let message = `${data.fullName} Withdrawal Of ${data.amount} ETH Has Been Declined Successfully.`;
            const payload = {
              id: data.id,
              category: "withdraws",
              data: { status: "declined" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
          } else if (data.category == "nfts") {
            let message = `${data.fullName} NFT Has Been Declined Successfully.`;

            const payload = {
              id: data.id,
              category: "nfts",
              data: { status: "declined" },
              message: message,
            };
            adminflowing.dynamicUpdate(payload);
          }
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
