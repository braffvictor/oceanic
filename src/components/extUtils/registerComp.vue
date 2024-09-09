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
      <form @submit.prevent="submit">
        <!-- the fullName -->
        <div
          class="flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-500 outline-none transit group"
        >
          <svg-comp
            icon="M16.0724 4.02447C15.1063 3.04182 13.7429 2.5 12.152 2.5C10.5611 2.5 9.19773 3.04182 8.23167 4.02447C7.26636 5.00636 6.73644 6.38891 6.73644 8C6.73644 10.169 7.68081 11.567 8.8496 12.4062C9.07675 12.5692 9.3115 12.7107 9.54832 12.8327C8.24215 13.1916 7.18158 13.8173 6.31809 14.5934C4.95272 15.8205 4.10647 17.3993 3.53633 18.813C3.43305 19.0691 3.55693 19.3604 3.81304 19.4637C4.06914 19.567 4.36047 19.4431 4.46375 19.187C5.00642 17.8414 5.78146 16.4202 6.98653 15.3371C8.1795 14.265 9.82009 13.5 12.152 13.5C14.332 13.5 15.9058 14.1685 17.074 15.1279C18.252 16.0953 19.0453 17.3816 19.6137 18.6532C19.9929 19.5016 19.3274 20.5 18.2827 20.5H6.74488C6.46874 20.5 6.24488 20.7239 6.24488 21C6.24488 21.2761 6.46874 21.5 6.74488 21.5H18.2827C19.9348 21.5 21.2479 19.8588 20.5267 18.2452C19.9232 16.8952 19.0504 15.4569 17.7087 14.3551C16.9123 13.7011 15.9603 13.1737 14.8203 12.8507C15.43 12.5136 15.9312 12.0662 16.33 11.5591C17.1929 10.462 17.5676 9.10016 17.5676 8C17.5676 6.38891 17.0377 5.00636 16.0724 4.02447ZM15.3593 4.72553C16.1144 5.49364 16.5676 6.61109 16.5676 8C16.5676 8.89984 16.2541 10.038 15.544 10.9409C14.8475 11.8265 13.7607 12.5 12.152 12.5C11.5014 12.5 10.3789 12.2731 9.43284 11.5938C8.51251 10.933 7.73644 9.83102 7.73644 8C7.73644 6.61109 8.18963 5.49364 8.94477 4.72553C9.69916 3.95818 10.7935 3.5 12.152 3.5C13.5105 3.5 14.6049 3.95818 15.3593 4.72553Z"
            Sclass="group-has-[:focus]:stroke-green-500"
          />
          <input
            type="text"
            required
            class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none"
            placeholder="FullName"
            @keyup="checkFullname"
            v-model="fullName"
          />
        </div>
        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="
            fullNameError
              ? 'scale-y-100 transit animate__animated animate__shakeX'
              : 'scale-y-0 transit '
          "
        >
          {{ fullNameError }}
        </p>

        <!-- the username -->
        <div
          class="flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-500 outline-none transit group"
        >
          <svg-comp
            icon="M12,1a11,11,0,0,0,0,22,1,1,0,0,0,0-2,9,9,0,1,1,9-9v2.857a1.857,1.857,0,0,1-3.714,0V7.714a1,1,0,1,0-2,0v.179A5.234,5.234,0,0,0,12,6.714a5.286,5.286,0,1,0,3.465,9.245A3.847,3.847,0,0,0,23,14.857V12A11.013,11.013,0,0,0,12,1Zm0,14.286A3.286,3.286,0,1,1,15.286,12,3.29,3.29,0,0,1,12,15.286Z"
            Sclass="group-has-[:focus]:stroke-green-500"
          />
          <input
            type="text"
            required
            class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none"
            placeholder="Username"
            @keyup="checkUsername"
            v-model="userName"
          />
        </div>
        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="
            userNameError
              ? 'scale-y-100 transit animate__animated animate__shakeX'
              : 'scale-y-0 transit '
          "
        >
          {{ userNameError }}
        </p>

        <!-- the email -->
        <div
          class="mt-4 flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-500 outline-none transit group"
        >
          <svg-comp
            icon="M7 2.75C5.38503 2.75 3.92465 3.15363 2.86466 4.1379C1.79462 5.13152 1.25 6.60705 1.25 8.5V15.5C1.25 17.393 1.79462 18.8685 2.86466 19.8621C3.92465 20.8464 5.38503 21.25 7 21.25H17C18.615 21.25 20.0754 20.8464 21.1353 19.8621C22.2054 18.8685 22.75 17.393 22.75 15.5V8.5C22.75 6.60705 22.2054 5.13152 21.1353 4.1379C20.0754 3.15363 18.615 2.75 17 2.75H7ZM19.2285 8.3623C19.5562 8.10904 19.6166 7.63802 19.3633 7.31026C19.1101 6.98249 18.6391 6.9221 18.3113 7.17537L12.7642 11.4616C12.3141 11.8095 11.6858 11.8095 11.2356 11.4616L5.6886 7.17537C5.36083 6.9221 4.88982 6.98249 4.63655 7.31026C4.38328 7.63802 4.44367 8.10904 4.77144 8.3623L10.3185 12.6486C11.3089 13.4138 12.691 13.4138 13.6814 12.6486L19.2285 8.3623Z"
            Sclass="group-has-[:focus]:stroke-green-500"
          />
          <input
            type="text"
            class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none peer-fo"
            placeholder="Email"
            required
            @keyup="checkEmail"
            v-model="email"
          />
        </div>
        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="
            emailError
              ? 'scale-y-100 transit animate__animated animate__shakeX'
              : 'scale-y-0 transit'
          "
        >
          {{ emailError }}
        </p>

        <!-- the password -->
        <label
          class="mt-4 flex border-b border-b-slate-900 dark:border-b-slate-100 items-center bg-transparent h-11 w-full dark:text-slate-100 text-slate-900 overflow-hidden dark:caret-slate-100 justify-self-start align-start indent-5 gap-2 has-[:focus]:border-b-green-500 outline-none transit group"
          for="password"
        >
          <svg-comp
            icon="M17,9V7c0-2.8-2.2-5-5-5S7,4.2,7,7v2c-1.7,0-3,1.3-3,3v7c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3v-7C20,10.3,18.7,9,17,9z M9,7c0-1.7,1.3-3,3-3s3,1.3,3,3v2H9V7z M13.1,15.5c0,0-0.1,0.1-0.1,0.1V17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-1.4c-0.6-0.6-0.7-1.5-0.1-2.1c0.6-0.6,1.5-0.7,2.1-0.1C13.6,13.9,13.7,14.9,13.1,15.5z"
            Sclass="group-has-[:focus]:stroke-green-500"
          />
          <input
            class="h-full w-full placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-transparent outline-none"
            placeholder="Password"
            id="password"
            name="password"
            required
            @keyup="checkPassword"
            :type="passwordType ? 'text' : 'password'"
            v-model="password"
          />

          <!-- eyes off -->
          <svg-comp
            v-if="passwordType == false"
            @click="passwordType = true"
            icon="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z"
            Sclass="group-has-[:focus]:stroke-green-500 active:stroke-green-400"
          />

          <!-- eyes on -->
          <svg-comp
            v-if="passwordType == true"
            @click="passwordType = false"
            icon="M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 011.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0116.771 10a16.9 16.9 0 01-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 01-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 01-.628.854 18.805 18.805 0 01-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 01-2.44-2.852 6.01 6.01 0 01-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 01.17-.245 18.804 18.804 0 012.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 012.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454L2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 112 0 1 1 0 01-2 0zm1-3a3 3 0 100 6 3 3 0 000-6z"
            Sclass="group-has-[:focus]:stroke-green-500 active:stroke-green-400 !min-w-8"
          />
        </label>
        <p
          class="text-xs text-red-500 transit mt-3 text-center"
          :class="
            passwordError
              ? 'scale-y-100 transit animate__animated animate__shakeX'
              : 'scale-y-0 transit'
          "
        >
          {{ passwordError }}
        </p>

        <div class="w-full mt-6 mb-6">
          <button type="submit" class="w-full">
            <d-button
              type="elevated"
              :loading="loading"
              :disabled="false"
              @click="setLoading"
              class="shadow-green-400 dark:shadow-green-500 w-full bg-green-400 dark:bg-green-500 !text-slate-900 dark:!text-slate-100 active:!bg-green-300"
              >Register</d-button
            >
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
// stores
import { userflow } from "@/stores/userflow";
import { authentication } from "@/stores/authentication";

import DButton from "@/components/utils/DButton.vue";
import svgComp from "@/components/svgComp.vue";
import { computed, ref, watch } from "vue";
// import "animate.css";

const useAuthentication = authentication();

const loading = computed(() => {
  return useAuthentication.loading.auth;
});
const userflowing = userflow();

const passwordType = ref(false);

const fullName = ref("");
const fullNameError = ref("");
const userName = ref("");
const userNameError = ref("");
const email = ref("");
const emailError = ref("");
const password = ref("");
const passwordError = ref("");

function checkFullname() {
  if (fullName.value != "") {
    fullNameError.value = "";
    return true;
  } else {
    fullNameError.value = "FullName is required";
    return false;
  }
}

function checkUsername() {
  if (userName.value != "") {
    userNameError.value = "";
    return true;
  } else {
    userNameError.value = "Username is required";
    return false;
  }
}

function checkEmail() {
  if (email.value != "") {
    emailError.value = "";
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email.value)) {
      emailError.value = "Email must be valid";
      return false;
    }
    return true;
  } else {
    emailError.value = "Email is required";
    return false;
  }
}
function checkPassword() {
  if (password.value != "") {
    passwordError.value = "";
    if (password.value.length < 6) {
      passwordError.value = "Password should be at least 6 characters";
      return false;
    }
    return true;
  } else {
    passwordError.value = "Password is required";
    return false;
  }
}

function setLoading() {
  checkEmail();
  checkPassword();
  checkUsername();
  checkFullname();

  if (checkEmail() && checkPassword() && checkUsername() && checkFullname()) {
    const payload = {
      fullName: fullName.value,
      email: email.value.trim(),
      password: password.value,
      userName: userName.value.trim(),
    };
    useAuthentication.registerUser(payload);
  } else {
    console.log("Not valid");
  }
}

const props = defineProps({
  themeState: {
    default: null,
  },
});
</script>

<style></style>
