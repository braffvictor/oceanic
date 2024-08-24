import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

import { authentication } from "@/stores/authentication";
import { computed, watch } from "vue";
export default async function guest({ next, user, to, from, store }) {
  const useAuthentication = authentication();
  const currentUserDoc = computed(() => {
    return useAuthentication.user;
  });
  // console.log(currentUser);
  // console.log(store);

  const currentUser = doc(db, "users", user.uid);

  // console.log(currentUser);
  if (!currentUserDoc.value) {
    console.log("using cloud");
    await getDoc(currentUser)
      .then((docRef) => {
        if (!docRef.exists() || docRef.data().blocked) {
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
    console.log("using store");
    if (!currentUserDoc.value || currentUserDoc.value?.blocked) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  }
}
