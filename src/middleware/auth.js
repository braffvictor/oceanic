import { computed } from "vue";
export default function guest({ next, store, to, from }) {
  console.log(store);
  const user = computed(() => {
    return store.user;
  });
  console.log(to);
  console.log(user.value);
  if (!user.value) {
    return next({
      path: "/",
    });
  }
  return next();
}
