<template>
  <div class="darkGradienting min-h-screen flex items-center justify-center">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
.darkGradienting {
  background: linear-gradient(#4ade80, #11998e);
}

.lightGradienting {
  background: linear-gradient(
    48deg,
    #f0f0f0 47%,
    #d71ef9 63%,
    #1bee97 76%,
    #0057ff 89%,
    #d71ef9
  );
}
</style>
