<template>
  <div
    class="w-11/12 md:w-5/12 rounded-2xl p-4 !backdrop-blur-xl transit z-10"
    :class="
      themeState == 'light' || themeState == null
        ? 'whiteT border-b-gray-200'
        : 'darkT border-b-gray-600'
    "
  >
    <!-- logo image -->
    <section>
      <img
        src="https://solanart.io/solanart-logo-black.svg"
        class="max-w-12 mx-auto text-center"
        v-if="themeState != 'dark'"
        alt=""
      />
      <img
        src="https://solanart.io/solanart-logo.svg"
        class="max-w-12 mx-auto text-center"
        alt=""
        v-if="themeState != 'light' && themeState != null"
      />
    </section>

    <p class="text-center font-light mt-5 text-slate-900 dark:text-slate-100">
      Please Register An Account With Us.
    </p>

    <!-- textfield -->
    <section class="mt-3">
      <!-- the username -->
      <div
        class="flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-400 outline-none transit group"
      >
        <svg-comp
          icon="M12,1a11,11,0,0,0,0,22,1,1,0,0,0,0-2,9,9,0,1,1,9-9v2.857a1.857,1.857,0,0,1-3.714,0V7.714a1,1,0,1,0-2,0v.179A5.234,5.234,0,0,0,12,6.714a5.286,5.286,0,1,0,3.465,9.245A3.847,3.847,0,0,0,23,14.857V12A11.013,11.013,0,0,0,12,1Zm0,14.286A3.286,3.286,0,1,1,15.286,12,3.29,3.29,0,0,1,12,15.286Z"
          Sclass="group-has-[:focus]:stroke-green-400"
        />
        <input
          type="text"
          class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none"
          placeholder="Username"
        />
      </div>

      <!-- the email -->
      <div
        class="mt-4 flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-400 outline-none transit group"
      >
        <svg-comp
          icon="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
          Sclass="group-has-[:focus]:stroke-green-400"
        />
        <input
          type="text"
          class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none peer-fo"
          placeholder="Email"
        />
      </div>

      <!-- the password -->
      <div
        class="mt-4 flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-400 outline-none transit group"
      >
        <svg-comp
          icon="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13.1,15.5c0,0-0.1,0.1-0.1,0.1V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1.4c-0.6-0.6-0.7-1.5-0.1-2.1c0.6-0.6,1.5-0.7,2.1-0.1C13.6,13.9,13.7,14.9,13.1,15.5z"
          Sclass="group-has-[:focus]:stroke-green-400"
        />
        <input
          type="text"
          class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none peer-fo"
          placeholder="Password"
        />

        <!-- eyes off -->
        <svg-comp
          icon="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z"
          Sclass="group-has-[:focus]:stroke-green-400"
        />

        <!-- eyes on -->
        <!-- <svg-comp

            icon="M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 011.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0116.771 10a16.9 16.9 0 01-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 01-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 01-.628.854 18.805 18.805 0 01-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 01-2.44-2.852 6.01 6.01 0 01-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 01.17-.245 18.804 18.804 0 012.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 012.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454L2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 112 0 1 1 0 01-2 0zm1-3a3 3 0 100 6 3 3 0 000-6z"
            Sclass="group-has-[:focus]:stroke-green-400"
          /> -->
      </div>

      <div class="w-full mt-6 mb-6">
        <d-button
          type="elevated"
          :loading="loading"
          :disabled="false"
          @click="setLoading"
          class="shadow-green-400 w-full bg-green-400 dark:bg-green-500 !text-slate-900 dark:!text-slate-100 active:!bg-green-300"
          >Register</d-button
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
import { ref } from "vue";

let loading = ref(false);
function setLoading() {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 4000);
}

const props = defineProps({
  themeState: {
    default: null,
  },
});
</script>

<style></style>
