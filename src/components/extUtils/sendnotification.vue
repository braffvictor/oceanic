<template>
  <div>this is the send notification component {{ user && user.fullName }}</div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
  },
});
</script>

<style scoped></style>
