<template>
  <main>
    <form class="px-3 md:px-6 pt-5" @submit="submit">
      <DDropList
        @openMenu="show = true"
        @closeMenu="show = false"
        :show="show"
        @emitInput="(input) => ((type = input), checkType())"
        :err="typeError"
        placeholder="Notification Type"
        :type="theme == 'dark' ? 'outlined' : 'filled'"
        :lists="types"
        name="type"
      />

      <DTextfield
        @emitInput="(input) => ((message = input), checkMessage())"
        :err="messageError"
        label="Notification Message"
        :type="theme == 'dark' ? 'outlined' : 'filled'"
      />

      <button type="submit" class="w-full pb-4">
        <DButton
          type="elevated"
          :loading="loading"
          @click="submit"
          class="break-words w-full mt-5 shadow-slate-900 rounded-lg bg-slate-900 dark:bg-slate-50 dark:shadow-slate-100 !text-slate-100 dark:!text-slate-900"
          >Send To<span class="ml-1 font-semibold">{{
            user && user.fullName
          }}</span></DButton
        >
      </button>
    </form>
  </main>
</template>

<script setup>
import { adminflow } from "@/stores/adminflow";
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";

import { checkInput } from "@/composables/checkInput";
import { getDate } from "@/composables/getDate";

import DDropList from "../utils/DDropList.vue";
import DTextfield from "../utils/DTextfield.vue";
import DButton from "../utils/DButton.vue";

import { computed, inject, ref } from "vue";
import router from "@/router";

const show = ref(false);

const emits = defineEmits(["closeDialog"]);

const adminflowing = adminflow();
const userflowing = userflow();
const useAuthentication = authentication();

const props = defineProps({
  user: {
    type: Object,
  },
});

const loading = computed(() => {
  return adminflowing.loading.notification;
});

const { getCurrentTimeAndDate } = getDate();
const theme = inject("theme");

const type = ref("");
const typeError = ref("");

const message = ref("");
const messageError = ref("");

const checkType = () => checkInput("Type Of Notification", type, typeError);
const checkMessage = () => checkInput("Message", message, messageError);

function submit() {
  checkType();
  checkMessage();

  if (checkType() && checkMessage()) {
    const { user } = props;

    const payload = {
      type: type.value.toLowerCase(),
      message: message.value,
      uid: user.userID,
      open: false,
      fullName: user.fullName,
      email: user.email,
    };
    console.log({ ...payload });
    userflowing.notificationFN({ ...payload }).then(() => {
      adminflowing.initAllNotifications();
      router.go(-1);
    });
    emits("closeDialog");
  }
}

const types = computed(() => {
  return [
    {
      name: "Success",
    },
    {
      name: "Info",
    },
    {
      name: "Error",
    },
  ];
});
</script>

<style scoped></style>
