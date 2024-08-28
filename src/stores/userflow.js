import { str, db, auth } from "@/services/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defineStore } from "pinia";

import { getDate } from "@/composables/getDate";
const { getCurrentTimeAndDate } = getDate();

import { authentication } from "./authentication";

export const userflow = defineStore("userflow", {
  state: () => ({
    themeState: localStorage.getItem("theme"),
    cartList: JSON.parse(localStorage.getItem("watchList") || "[]")?.length,
    nfts: [],
    randomNfts: [],

    notifications: [],

    alert: {
      is: false,
      message: "",
      timer: null,
      type: "success",
      close: true,
    },

    loading: {
      upload: false,
      buy: false,
    },
  }),

  //getters functions
  getters: {
    getThemeState: (state) => state.theme,
    getAlert: (state) => state.alert,
    getNfts: (state) => state.nfts,
    getRandoms: (state) => state.randomNfts,
  },

  actions: {
    //local storage function
    checkLocalStorage(length) {
      this.cartList = length;
    },
    changeTheme(theme) {
      localStorage.setItem("theme", theme);
      this.themeState = localStorage.getItem("theme");
    },

    //alert function
    initAlert({ message, is, timer, type, close }) {
      this.alert.is = is;
      this.alert.message = message;
      this.alert.timer = timer || null;
      this.alert.type = type;
      this.alert.close = close;

      setTimeout(() => {
        this.alert.message = message;
        this.alert.timer = timer || null;
        this.alert.type = type;
        this.alert.close = close || false;
        this.alert.is = false;
      }, timer || 3000);
    },

    async deduction({ amount }) {
      const colref = collection(db, "users");

      const useAuthentication = authentication();
      const userID = useAuthentication.user.userID
        ? useAuthentication.user.userID
        : auth.currentUser.uid;

      const currentUser = doc(colref, userID);

      await getDoc(currentUser)
        .then((docRef) => {
          let newAmount;

          let oldAmount = docRef.data().wallet.balance;
          if (amount > oldAmount) newAmount = 0;
          newAmount = oldAmount - amount;

          updateDoc(currentUser, {
            wallet: {
              balance: newAmount,
            },
          });
        })
        .catch((error) => {
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
          });
        });
    },

    //hydrate site with blockspan nfts
    async initAllNfts(chain) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
        },
      };

      await fetch(
        `https://api.blockspan.com/v1/exchanges/collections?chain=${
          chain || "eth-main"
        }&exchange=opensea&page_size=100`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          // console.log(response)
          this.nfts = response.results;

          this.nfts.forEach((nft) => {
            nft.action = true;
            nft.stats = {
              floor_price: (Math.random() * 0.5).toString(),
              floor_price_symbol: "ETH",
            };
          });

          this.nfts = this.nfts.filter((nft) => {
            return (
              nft.contracts[0].contract_address != null ||
              nft.contracts[0].contract_address != undefined
            );
          });

          console.log(this.nfts[0]);
        })
        .then(async () => {
          setTimeout(async () => {
            await this.initRandomNfts();
          }, 2000);
        })
        .catch((err) => {
          this.initAlert({
            is: true,
            message: "Poor Connection, Please Refresh.",
            type: "error",
            timer: 4000,
          });
        });
    },

    async initRandomNfts() {
      // console.log("getting randoms");
      const specificCollectionNfts = async (nftkey) => {
        let arr = [];
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": "6db12e6a6438461e9e3755c8b8930c21",
          },
        };

        await fetch(
          `https://api.opensea.io/api/v2/collection/${nftkey}/nfts?limit=1`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            arr = response.nfts;

            arr.forEach((nft) => {
              nft.key = nftkey;
              nft.contract_address = generateContractAddressWithSeed(
                nft.identifier || 1500
              );
              nft.action = true;
              //todo generate a random name here instead of ####
              nft.name = nft.name ? nft.name : "####";
              nft.stats = {
                floor_price:
                  (Number(nft.identifier.slice(0, 4) || 1500) / 4000) * 3037.97,
                floor_eth: Number(nft.identifier.slice(0, 4) || 1500) / 4000,
                floor_price_symbol: "ETH",
              };
            });

            arr.forEach((nft) => {
              if (
                nft.name &&
                nft.image_url &&
                nft.collection &&
                nft.identifier
              ) {
                this.randomNfts.push(nft);
              }
            });
          })
          .catch((err) => {
            this.initAlert({
              is: false,
              message: "Poor Connection, Please Refresh.",
              type: "error",
              timer: 4000,
            });
          });
      };

      setTimeout(() => {
        console.log(this.randomNfts[0]);
      }, 2000);

      const keys = [];
      if (this.getNfts.length > 0) {
        this.getNfts.map((nft) => {
          return keys.push(nft.key);
        });

        // console.log(keys);
        for (let index = 0; index < 100; index++) {
          const rando = Math.abs(Math.round(Math.random() * 90));
          // console.log(rando);
          specificCollectionNfts(keys[index]);
        }
      }
    },

    async photoFN({ photo, uid, path }) {
      const sliceExt = photo.name.slice(photo.name.lastIndexOf("."));
      const sliceName = photo.name.slice(0, photo.name.lastIndexOf("."));

      const photoRef = ref(str, `${path}/${sliceName}-${uid}${sliceExt}`);
      let URL = {};
      await uploadBytes(photoRef, photo)
        .then(async () => {
          await getDownloadURL(photoRef)
            .then((photoUrl) => {
              URL.name = photoUrl;
            })
            .catch((error) => {
              this.initAlert({
                is: true,
                message: error.message,
                type: "error",
                close: false,
              });
            });
        })
        .catch((error) => {
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
            close: false,
          });
        });
      return URL.name;
    },

    async buyFN(payload) {
      this.loading.buy = true;
      const colref = collection(db, "nfts");

      await addDoc(colref, payload)
        .then(async (docRef) => {
          const currentUserDoc = doc(colref, docRef.id);

          updateDoc(currentUserDoc, {
            id: docRef.id,
          });

          //deduct from balance
          await this.deduction({ amount: payload.stats.floor_eth });

          //to ask on writeup in notification in firebase and popup alert
          this.initAlert({
            is: true,
            message: `${
              payload.name || "####"
            } Purchase Successful, Now Added As One of Your Collection.`,
            type: "success",
            timer: 4000,
          });

          await this.notificationFN({
            type: "success",
            message: `${payload.name || "####"} Was Purchased`,
            uid: payload.userID,
            open: false,
            fullName: payload.fullName,
            email: payload.email,
          });
          this.loading.buy = false;
        })
        .catch((error) => {
          this.loading.buy = false;
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
            close: false,
          });
        });
    },

    async uploadFN(payload) {
      this.loading.upload = true;
      const colref = collection(db, "nfts");

      const image_url = await this.photoFN({
        path: "nfts",
        uid: payload.userID,
        photo: payload.image_url,
      });

      payload.image_url = await image_url;

      console.log(payload);

      await addDoc(colref, payload)
        .then((docRef) => {
          const currentUserDoc = doc(colref, docRef.id);

          updateDoc(currentUserDoc, {
            id: docRef.id,
          });
        })
        .then(() => {
          this.initAlert({
            is: true,
            message: `${payload.name} Successfully Uploaded, Awaiting Approval.`,
            type: "success",
            close: true,
            timer: 4500,
          });

          this.notificationFN({
            type: "info",
            message: `You Just Uploaded ${payload.name} NFT, Contact support For More Enquires.`,
            open: false,
            fullName: payload.fullName,
            email: payload.email,
            uid: payload.userID,
          });
          this.loading.upload = false;
        })
        .catch((error) => {
          this.loading.upload = false;
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
            close: false,
          });
        });
    },

    async notificationFN({ type, message, uid, open, fullName, email }) {
      const colref = collection(db, "notifications");

      await addDoc(colref, {
        category: "notifications",
        type: type,
        message: message,
        userID: uid,
        open: open,
        fullName: fullName,
        email: email,
        date: getCurrentTimeAndDate(),
        formattedDate: getCurrentTimeAndDate("format"),
      })
        .then((docRef) => {
          const currentUserDoc = doc(colref, docRef.id);

          updateDoc(currentUserDoc, {
            id: docRef.id,
          });
        })
        .catch((error) => {
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
            close: false,
          });
        });
    },

    async initUserNotifications() {
      const useAuthentication = authentication();
      const colref = collection(db, "notifications");

      const userID = (await useAuthentication.user?.userID)
        ? useAuthentication.user?.userID
        : auth.currentUser.uid;
      const queryCollection = query(
        colref,
        where("userID", "==", auth.currentUser.uid)
      );

      let arr = [];
      let sorting;

      await getDocs(queryCollection)
        .then((docRefs) => {
          if (!docRefs.empty) {
            docRefs.forEach((docs) => {
              arr.push(docs.data());

              sorting = arr.sort((a, b) => {
                return b.formattedDate - a.formattedDate;
              });
            });
            console.log(sorting);
            this.notifications = sorting;
          } else {
            this.notifications = [];
          }
        })
        .catch((error) => {
          this.initAlert({
            is: true,
            message: error.message,
            type: "error",
            close: false,
          });
        });
    },
  },
});

function generateContractAddressWithSeed(seed) {
  const hexChars = "0123456789abcdef";
  let address = "0x";

  // Simple seed-based random number generator
  function seededRandom() {
    seed = parseInt(seed);

    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Generate the address using the seeded random number generator
  for (let i = 0; i < 40; i++) {
    address += hexChars[Math.floor(seededRandom() * 16)];
  }

  return address;
}
