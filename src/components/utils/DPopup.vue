<template>
  <main
    class="mt-3 fixed md:left-10 md:right-[60%] right-[10%] left-[10%] z-50 mx-auto shadow-md rounded-xl overflow-hidden backdrop-blur-xl transit py-2"
    :class="
      show
        ? ' translate-y-0 md:bottom-5 bottom-14 '
        : ' translate-y-full bottom-0 opacity-0 '
    "
  >
    <div
      class="p-2 w-full h-auto backdrop-blur-xl border-gray-500 text-slate-100 flex items-center gap-x-3"
    >
      <div>
        <img src="@/assets/png/icon2.png" alt="" width="50" />
      </div>
      <p class="font-extralight text-sm text-slate-900 dark:text-slate-100">
        {{ users[randoName]?.name || "Andrew" }} just purchased
        {{ randomNft && randomNft?.name ? randomNft && randomNft?.name : "An" }}
        NFT for
        <span class="font-semibold text-green-400 dark:text-green-500"
          >{{ users[randoNumber]?.amount.toFixed(2) || "3.23" }}ETH</span
        >
        few seconds ago.
      </p>
    </div>
  </main>
</template>

<script setup>
//stores
import { userflow } from "@/stores/userflow";

import { computed, onMounted, ref, watch } from "vue";

const userflowing = userflow();
const show = ref(false);

const users = computed(() => {
  return [
    { name: "Bevilacqua", amount: 1.423 },
    { name: "Gracie", amount: 2.033 },
    { name: "Eno ", amount: 2.935 },
    { name: "Willette", amount: 1.271 },
    { name: "Tinder", amount: 2.93423 },
    { name: "Hertha", amount: 4.6533 },
    { name: "Tong ", amount: 1.2456 },
    { name: "Margaret", amount: 5.6789 },
    { name: "Gleeson", amount: 4.8789 },
    { name: "Jacques", amount: 3.7456 },
    { name: "Dell", amount: 5.776 },
    { name: "Criselda", amount: 9.229 },
    { name: "Oriley", amount: 4.2343 },
    { name: "Vennie", amount: 5.6345 },
    { name: "Herter", amount: 6.7768 },
    { name: "Deangelo", amount: 1.7932 },
    { name: "Whitsett", amount: 1.902 },
    { name: "Edmond", amount: 1.7093 },
    { name: "Bartolome", amount: 1.6547 },
    { name: "Dawne", amount: 2.65123 },
    { name: "Colter", amount: 2.1909 },
    { name: "Annice", amount: 5.52351 },
    { name: "Remmers", amount: 8.002 },
    { name: "Tula", amount: 2.022 },
    { name: "Lisk", amount: 2.093 },
    { name: "Kam", amount: 1.092 },
    { name: "Viggiano", amount: 5.802 },
    { name: "Ellyn", amount: 9.888 },
    { name: "Nam", amount: 4.41 },
    { name: "Jacquelin", amount: 5.6 },
    { name: "Huguley", amount: 3.99 },
    { name: "Leonardo", amount: 7.001 },
    { name: "Alper", amount: 2.6764 },
    { name: "Sheridan", amount: 2.001 },
    { name: "Benoit", amount: 2.5002 },
    { name: "Demetrius", amount: 3.2312 },
    { name: "Oathout", amount: 1.6213 },
    { name: "Numbers", amount: 1.908 },
    { name: "Deere", amount: 2.5678 },
    { name: "Billie", amount: 6.5235 },
    { name: "Dehne", amount: 1.2345 },
    { name: "Delbert", amount: 9.62342 },
    { name: "Fritze", amount: 5.678 },
    { name: "Lynn", amount: 8.122 },
    { name: "Blair", amount: 2.7523 },
    { name: "Mellisa", amount: 7.002 },
    { name: "Fifield", amount: 1.2412 },
    { name: "Traci", amount: 2.333 },
    { name: "Yedinak", amount: 1.086 },
    { name: "Nerissa", amount: 6.14234 },
    { name: "Misner", amount: 1.904 },
    { name: "Douglas", amount: 5.6412 },
    { name: "Heisler", amount: 1.021 },
    { name: "Samual", amount: 2.6632 },
    { name: "Britt", amount: 4.5161 },
    { name: "Lecia", amount: 7.005 },
    { name: "Vero", amount: 1.224 },
    { name: "Dara", amount: 1.241 },
    { name: "Kingsbury", amount: 4.3 },
    { name: "Maranda", amount: 5.6211 },
    { name: "Harvison", amount: 6.703 },
    { name: "Daniell", amount: 4.134 },

    { name: "rvin", amount: 2.998 },
    { name: "Dina", amount: 2.5678 },
    { name: "Seller", amount: 6.63264 },
    { name: "Michale", amount: 4.1426 },
    { name: "Wisener", amount: 9.5622 },
    { name: "Magan", amount: 5.678 },
    { name: "Mealing", amount: 8.122 },
    { name: "Latonia", amount: 1.7275 },
    { name: "Wingrove", amount: 1.70432 },
    { name: "Merilyn", amount: 3.1 },
    { name: "Lueck", amount: 4.5069 },
  ];
});

let randoName = ref(Math.round(Math.random() * users.value.length));
let randoNumber = ref(Math.round(Math.random() * users.value.length));

const randomNft = computed(() => {
  return (
    userflowing.randomNfts.length > 0 && userflowing.randomNfts[randoName.value]
  );
});

setInterval(() => {
  // console.log(show.value);
  show.value = true;
}, 70000);

watch(show, () => {
  if (show.value) {
    randoName.value = Math.round(Math.random() * users.value.length);
    randoNumber.value = Math.round(Math.random() * users.value.length);
    setTimeout(() => {
      show.value = false;
    }, 2600);
  }
});
</script>

<style scoped></style>
