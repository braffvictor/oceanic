import { defineStore } from "pinia";
import { ref } from "vue";

export const userflow = defineStore("userflow", {
  state: () => ({
    cartList: JSON.parse(localStorage.getItem("watchList") || "[]")?.length,
    nfts: [],

    alert: {
      is: false,
      message: "",
      timer: null,
      type: "success",
      close: true,
    },
  }),

  //getters functions
  getters: {
    getAlert: (state) => state.alert,
    getNfts: (state) => state.nfts,
  },

  actions: {
    //local storage function
    checkLocalStorage(length) {
      this.cartList = length;
    },

    //alert function
    initAlert({ message, is, timer, type, close }) {
      this.alert.is = is;
      this.alert.message = message;
      this.alert.timer = timer || null;
      this.alert.type = type;
      this.alert.close = close;

      setTimeout(() => {
        this.alert.is = false;
        this.alert.message = message;
        this.alert.timer = timer || null;
        this.alert.type = type;
        this.alert.close = close || false;
      }, timer || 3000);
    },

    //hydrate site with blockspan nfts
    getAllNfts(chain) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
        },
      };

      fetch(
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
        })
        .catch((err) => console.error(err));
    },
  },
});

export const composeFlow = defineStore("composeflow", () => {
  const nfts = ref([]);

  function getAllNft(chain) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "u4ryqv9WRFAu5PtwzFHFIHGnyGF8xY26",
      },
    };

    fetch(
      `https://api.blockspan.com/v1/exchanges/collections?chain=${
        chain || "eth-main"
      }&exchange=opensea&page_size=100`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // console.log(response)
        nfts.value = response.results;

        nfts.value.forEach((nft) => {
          nft.action = true;
          nft.stats = {
            floor_price: (Math.random() * 0.5).toString(),
            floor_price_symbol: "ETH",
          };
        });

        nfts.value = nfts.value.filter((nft) => {
          return (
            nft.contracts[0].contract_address != null ||
            nft.contracts[0].contract_address != undefined
          );
        });
      })
      .catch((err) => console.error(err));
  }

  return { getAllNft, nfts };
});
