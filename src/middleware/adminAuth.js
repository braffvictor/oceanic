import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { authentication } from "@/stores/authentication";
import { computed } from "vue";

export default async function guest({ next, user, to, from, store }) {
  const useAuthentication = authentication();
  const storeUser = computed(() => {
    return useAuthentication.user;
  });
  // console.log(currentUser);
  // console.log(store);

  const currentUser = doc(db, "users", user.uid);

  // console.log(currentUser);
  if (!storeUser.value) {
    // console.log("using cloud");
    //uses firebase document reference to check user auth and blocked status at first load or refresh
    await getDoc(currentUser)
      .then((docRef) => {
        if (
          !docRef.exists() ||
          docRef.data().blocked ||
          docRef.data().role != "admin"
        ) {
          next({
            path: "/",
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        next({
          path: "/",
        });
      });
  } else {
    // console.log("using store");
    //uses store reference of the user object after being hydrated by firebase....to nav without fetching data from firebase at every route after first load
    if (
      !storeUser.value ||
      storeUser.value?.blocked ||
      storeUser.value.role != "admin"
    ) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
}
