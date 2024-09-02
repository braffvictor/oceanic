<template>
  <main class="h-auto pb-10 min-h-[160vh] md:min-h-screen">
    <div
      class="flex md:px-6 px-3 justify-between bg-slate-100 dark:bg-slate-900 items-center transit pb-10"
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
      class="px-3 md:px-6 min-h-screen dark:bg-slate-900 bg-slate-100 w-full transit relative"
    >
      <div
        class="mx-auto p-3 w-[93%] md:w-[96%] transit rounded-2xl gap-4 dark:bg-slate-900 bg-slate-50 h-auto -top-7 left-0 right-0 absolute grid md:grid-cols-3"
      >
        <div
          class="border w-full h-56 mx-auto rounded-xl border-slate-700 dark:border-slate-200 dark:bg-slate-50 bg-slate-900"
          v-for="n in 5"
          :key="n"
        ></div>
      </div>
    </section>
  </main>
</template>

<script setup>
import DTextfield from "@/components/utils/DTextfield.vue";
import SvgComp from "@/components/svgComp.vue";
import { inject, ref } from "vue";

const search = ref("");
const theme = inject("theme");
</script>

<style scoped></style>
