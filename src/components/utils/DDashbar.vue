<template>
  <main
    class="sticky py-4 top-0 px-3 z-10 bg-slate-50 dark:bg-slate-900 transit"
  >
    <div class="flex items-center justify-between">
      <slot>
        <div class="text-gray-400 text-sm md:text-lg">
          Welcome,
          <p
            class="text-lg md:text-2xl font-semibold text-slate-900 dark:text-slate-100"
          >
            {{ user && user.fullName }}👋
          </p>
        </div>
      </slot>

      <!-- essentials -->
      <div class="text-lg flex items-center min-h-10 min-w-16">
        <button
          v-if="
            userflowing.themeState != 'light' && userflowing.themeState != null
          "
          class="p-2 rounded-lg transit active:animate-spin"
          @click="userflowing.changeTheme('light')"
        >
          <img
            src="@/assets/svg/lightmode.svg"
            class="max-w-5"
            alt="light Mode"
          />
        </button>
        <button
          v-if="userflowing.themeState != 'dark'"
          class="p-2 rounded-lg transit active:animate-ping relative"
          @click="userflowing.changeTheme('dark')"
        >
          <img
            src="@/assets/svg/darkmode.svg"
            class="max-w-5 transform -rotate-45"
            alt="dark mode"
          />
        </button>
        <div
          v-if="user && user.role == 'user'"
          class="p-1 cursor-pointer relative"
          @click="$router.push('/dashboard/notification')"
        >
          <p>🔔</p>
          <p
            v-if="notify"
            :class="
              notify
                ? 'w-2 h-2 rounded-full bg-green-500 absolute top-1 right-1 animate-bounce'
                : 'opacity-0 bg-transparent'
            "
          ></p>
        </div>
        <div
          v-if="user && user.role == 'admin'"
          class="cursor-pointer"
          @click="$router.push('/admin/account')"
        >
          <svgComp
            icon="M12,2 C6.47715,2 2,6.47715 2,12 C2,17.5228 6.47715,22 12,22 C17.5228,22 22,17.5228 22,12 C22,6.47715 17.5228,2 12,2 Z M8.5,8.5 C8.5,6.567 10.067,5 12,5 C13.933,5 15.5,6.567 15.5,8.5 C15.5,10.433 13.933,12 12,12 C10.067,12 8.5,10.433 8.5,8.5 Z M5.2782,16.3396 C6.92693,14.9918 9.33472,14 12,14 C14.6653,14 17.0731,14.9918 18.7218,16.3396 C17.2969,18.5423 14.8187,20 12,20 C9.18136,20 6.70318,18.5423 5.2782,16.3396 Z"
            Sclass="!stroke-slate-100 fill-slate-900 dark:!stroke-slate-900 dark:fill-slate-100"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { authentication } from "@/stores/authentication";
import { userflow } from "@/stores/userflow";

import svgComp from "../svgComp.vue";
import { computed, inject, ref } from "vue";

const userflowing = userflow();

const userAuthentication = authentication();

const user = computed(() => {
  return userAuthentication.user;
});

const notify = computed(() => {
  return userflowing.notifications.find((notification) => !notification.open);
});
</script>

<style></style>
