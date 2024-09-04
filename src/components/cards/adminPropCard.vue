<template>
  <section class="w-11/12 md:w-7/12 mx-auto mt-5">
    <div
      class="border-2 dark:border-slate-200 border-slate-700 rounded-3xl h-40 w-full p-3 md:p-6 flex items-center justify-between"
    >
      <div>
        <p class="font-bold text-xl">{{ title }}</p>
        <p class="text-sm">{{ text1 }}</p>
        <p class="text-sm">{{ text2 }}</p>
        <p class="text-sm">{{ text3 }}</p>
        <p class="text-sm">{{ date }}</p>
      </div>

      <div class="flex flex-col gap-1">
        <p
          v-if="status"
          class="border rounded-lg p-1 text-sm capitalize"
          :class="checkStatus(status)"
        >
          {{ status }}
        </p>
        <p
          v-if="verified"
          class="border rounded-lg text-green-500 border-green-500 text-center p-1 text-sm"
        >
          Verified
        </p>
        <p
          v-if="blocked"
          class="border rounded-lg text-red-500 border-red-500 text-center p-1 text-sm"
        >
          Blocked
        </p>
      </div>

      <section>
        <main v-if="actions.length > 0" class="flex flex-col gap-1 *:text-xs">
          <div v-for="action in actions" :key="action.text">
            <p
              class="text-slate-100 dark:text-slate-900 p-2 rounded-lg transit active:scale-75 text-center font-semibold select-none cursor-pointer"
              :class="action.color"
              v-if="action.is"
              @click="action.action($event, data)"
            >
              {{ action.text }}
            </p>
          </div>
        </main>
      </section>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {};
    },
  },
  title: {
    type: String,
    default: "Title",
  },
  text1: {
    type: String,
    default: "text one",
  },
  text2: {
    type: String,
    default: "",
  },
  text3: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    default: "date",
  },
  status: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  actions: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

function checkStatus(status) {
  if (status == "approved") {
    return "border-green-500 text-green-500";
  } else if (status == "pending") {
    return "border-yellow-500 text-yellow-500";
  } else if (status == "declined") {
    return "border-red-500 text-red-500";
  }
}
</script>

<style></style>
