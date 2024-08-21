import { defineStore } from "pinia";

export const userflow = defineStore("userflow", {
  state: () => ({
    themeState: localStorage.getItem("theme"),
    cartList: JSON.parse(localStorage.getItem("watchList") || "[]")?.length,
    nfts: [],
    randomNfts: [],

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
        this.alert.is = false;
        this.alert.message = message;
        this.alert.timer = timer || null;
        this.alert.type = type;
        this.alert.close = close || false;
      }, timer || 3000);
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
        })
        .then(async () => {
          setTimeout(() => {
            this.initRandomNfts();
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
              nft.action = "red";
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

            // console.log(this.randomNfts[0]);
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
