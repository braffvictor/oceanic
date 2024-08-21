<template>
  <div
    class="bg-gradient-to-b from-green-100 transit via-purple-100 to-slate-50 dark:from-emerald-600 dark:to-slate-900 min-h-screen to-100%%"
  >
    <section
      class="mx-auto transit text-center md:text-left text-slate-900 dark:text-slate-50 p-2 w-11/12 md:w-7/12"
    >
      <!-- top text -->
      <div>
        <p
          class="text-slate-900 dark:text-slate-50 font-light md:text-left text-xl"
        >
          NFT
        </p>
        <p class="text-4xl md:text-6xl font-semibold">How to create an NFT</p>
        <p class="font-thin text-sm">October 7, 2022</p>
      </div>

      <!-- image -->
      <div
        class="w-full h-full rounded-3xl mt-4 md:mt-7 overflow-hidden shadow-lg shadow-blue-400"
      >
        <!-- <img
          src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe473a8ac8a0416f79c39_63d18c3e6d2cbe47c93734de_6340b9ae4ce758590ca39ae5_HowToCreate_Landing-p-1080.png"
          alt=""
        /> -->

        <v-lazy-image
          src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe473a8ac8a0416f79c39_63d18c3e6d2cbe47c93734de_6340b9ae4ce758590ca39ae5_HowToCreate_Landing-p-1080.png"
          alt=""
        />
      </div>

      <!-- writeup -->
      <div
        class="bg-gray-100 transit dark:bg-gray-600 rounded-3xl mt-8 md:mt-14 p-8 md:p-12 text-center md:text-left"
      >
        <p class="text-left">
          <span
            class="rounded-lg bg-blue-500 font-semibold text-sm text-slate-100 text-left p-2"
          >
            TDLR
          </span>
        </p>

        <p class="mt-4 text-left">
          Creating an NFT on oceanic is intuitive and easy. You just need to
          decide what the purpose and genre of your collection is, set up a
          crypto wallet, choose a blockchain, create a collection, and mint or
          drop your NFT(s).
        </p>
      </div>

      <!-- plenty text -->
      <div class="text-left mt-5">
        <p class="font-bold text-3xl">What is an NFT?</p>
        <p class="mt-2">
          Before we dive into the mechanics of creating an NFT, let’s review
          what non-fungible tokens are. An NFT (non-fungible token) is a unique
          digital item stored on a blockchain. NFTs can represent almost
          anything, from art, to memberships, to in-game items, and serve as a
          digital record of ownership.
        </p>

        <p class="mt-2">
          NFTs operate on blockchain technology. The blockchain is basically a
          large, digital, public record. The most popular blockchains are
          distributed across many nodes (read: people’s computers), which is why
          you’ll hear them described as “decentralized.”
        </p>
        <p class="mt-2">
          OpenSea is compatible with the following blockchains:
        </p>

        <p class="font-bold text-2xl mt-5">Ethereum</p>

        <p class="mt-2">
          Ethereum is a decentralized, open-source Layer 1 blockchain with smart
          contract functionality. Its native cryptocurrency is Ether (ETH), and
          it’s the largest blockchain for NFTs.
        </p>

        <p class="font-bold text-2xl mt-5">Polygon</p>

        <p class="mt-2">
          Polygon is an EVM-compatible Ethereum sidechain that uses the
          Proof-of-Stake method of validation. This means Polygon is its own
          blockchain, but it benefits from and is compatible with Ethereum in a
          few important ways. Polygon’s native token is MATIC. In 2022, Polygon
          pledged to go carbon neutral.
        </p>

        <p class="font-bold text-2xl mt-5">Arbitrum</p>

        <p class="mt-2">
          Arbitrum is an EVM-compatible Layer 2 blockchain that was designed to
          help Ethereum scale. OpenSea is compatible with the Arbitrum chain
          Arbitrum One, which features rapid and inexpensive transactions and
          uses the Ethereum base chain for security.
        </p>
        <p class="font-bold text-2xl mt-5">Optimism</p>

        <p class="mt-2">
          Optimism is a layer two blockchain designed to help Ethereum scale.
          Optimism’s EVM-equivalent architecture is designed to enable Ethereum
          apps to take advantage of the chain’s cheaper and faster transactions
          without technical barriers. The Optimism Token (OP) is used as a
          governance tool and it is not required to use Optimism or pay for gas
          fees.
        </p>
        <p class="font-bold text-2xl mt-5">Klaytn</p>

        <p class="mt-2">
          Klaytn is an open-source, public Layer 1 blockchain focused on the
          metaverse, gaming, and creator economy. Klaytn’s native token is KLAY.
          OpenSea supports Kaikas, a wallet browser extension to buy and sell
          Klaytn NFTs.
        </p>

        <!-- for newsletter -->
        <main class="mt-5">
          <div
            class="bg-gray-100 p-3 md:p-6 dark:bg-gray-700 relative p-3 rounded-3xl transit"
          >
            <!-- <img
              src="https://cdn.prod.website-files.com/65217fd9e31608b8b6814195/65217fd9e31608b8b68142ad_Group%202147210707.webp"
              alt=""
            /> -->

            <v-lazy-image
              src="https://cdn.prod.website-files.com/65217fd9e31608b8b6814195/65217fd9e31608b8b68142ad_Group%202147210707.webp"
              alt=""
            />
            <p class="text-2xl mt-7 font-semibold">
              Sign up for our newsletter
            </p>
            <p class="text-lg">
              Join our newsletter to get web3 news, updates, interviews, and
              deep dives all in one place.
            </p>
            <div class="my-3 flex">
              <input
                type="text"
                placeholder="Your Email Address"
                class="bg-gray-200 dark:text-slate-100 text-slate-900 dark:bg-slate-800 dark:caret-slate-100 md:w-9/12 w-8/12 h-12 justify-self-start inline-block align-start rounded-lg indent-5 focus:ring-green-400 focus:ring-1 outline-none transit"
              />
              <d-button
                class="w-4/12 md:w-3/12 text-center h-12 ml-3 bg-green-400 dark:bg-green-500 dark:!text-slate-900 !text-slate-100"
                type="filled"
                >Sign Up</d-button
              >
            </div>
          </div>
        </main>

        <p class="font-bold text-3xl mt-5">Who can create an NFT?</p>
        <p class="mt-2">
          Anyone can create an NFT. Your NFT can be as simple as the media
          itself, but it can also represent something more. For example, your
          NFT can simply be a piece of art, or it can be a piece of music
          represented by a GIF or a photograph.
        </p>
        <p class="mt-2">
          Some NFTs, like the Chromie Squiggle below, are intended to serve as
          artwork. According to the artist, Snowfro, each Chromie Squiggle is
          his “personal signature as an artist, developer, and tinkerer.”
        </p>

        <!--squiggle image -->
        <div class="w-full h-full rounded-3xl mt-4 md:mt-7 overflow-hidden">
          <!-- <img
            src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/65217fd9e31608b8b68144aa_15518a57.png"
            alt="Squiggle Image"
          /> -->

          <v-lazy-image
            src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/65217fd9e31608b8b68144aa_15518a57.png"
            alt="Squiggle Image"
          />
        </div>

        <p class="mt-5">
          In the latter example, the NFT is the combination of the
          representation and the digital item it represents. An example of this
          is the RTFKT x Nike Air Force 1 collection. Purchasing one of the NFTs
          in this collection grants holders access to a physical pair of
          sneakers, which is redeemable through ownership of the NFT. In this
          case, the NFT contains beautiful artwork and also serves as access to
          a physical good.
        </p>

        <!--shoe image -->
        <div class="w-full h-full rounded-3xl mt-4 md:mt-7 overflow-hidden">
          <!-- <img
            src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/65217fd9e31608b8b68144ad_c6b74766.png"
            alt="Shoe Image"
          /> -->

          <v-lazy-image
            src="https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/65217fd9e31608b8b68144ad_c6b74766.png"
            alt="Shoe Image"
          />
        </div>

        <p class="font-bold text-2xl mt-5">What do I need to create an NFT?</p>
        <p class="mt-2">
          In addition to the content for the NFT itself, you’ll need a crypto
          wallet to create and mint your NFT. “Minting” an NFT is the process of
          writing a digital item to the blockchain. This establishes its
          immutable record of authenticity and ownership.
        </p>
        <p class="mt-2">
          Profile picture NFTs come in various forms, ranging from static images
          to animated or interactive designs. They may be based on characters,
          take the form of animals, look like humans, or be abstract.
        </p>
        <p class="mt-2">
          As a creator, minting your work allows you to establish provable
          scarcity and verified ownership. For the first time, creators can
          publish limited edition digital works, whose authenticity is validated
          on the blockchain. Ownership is undisputed and public, allowing
          creators to build special communities and perks for those who hold
          their NFTs.
        </p>

        <p class="mt-2">
          Minting NFTs isn’t just for creators, however. NFT creators will often
          offer their community or the general public the opportunity to
          directly mint NFTs from their new collection. When you mint an NFT
          from a project, you’re the first ever owner of that NFT, since the
          mint is when it’s written to the blockchain.
        </p>
        <p class="mt-2">
          Crypto wallets are a foundational tool of web3. Your wallet acts as a
          private key that allows you to interact with decentralized apps, buy
          NFTs, and navigate the web3 universe. Each blockchain has specific
          wallets you can use to transact on them. For example, MetaMask is a
          wallet used to interact with the Ethereum blockchain. OpenSea is
          compatible with a wide variety of wallets.
        </p>
        <p class="mt-2">
          Next, choose a blockchain on which to mint your NFT. OpenSea is
          currently compatible with the Ethereum, Polygon, Klaytn, Arbitrum,
          Optimism, and Avalanche blockchains, and each of these blockchains has
          different gas fees associated with transactions on their networks. You
          can sign up and create a self-custodied wallet on the OpenSea website
          using Privy.
        </p>
        <p class="mt-2">
          Then, you can create your collection. This is the fun part! Decide
          what your collection of NFTs is all about. Is it artwork, a collection
          of profile pictures, sports memorabilia, membership to a group, or
          something else entirely? Once you decide, create your collection by
          naming it something unique that represents your work and describing
          it. You’ll also be prompted to choose a category and provide any
          relevant links to social media.
        </p>
        <p class="mt-2">
          Once your crypto wallet is set up, you’ve chosen a blockchain, and
          your collection has been created, you’re ready to mint your NFTs!
        </p>

        <p class="font-bold text-2xl mt-5">
          Why should I create my NFTs using OpenSea?
        </p>
        <p class="mt-2">
          Oceanic gives creators a smooth, simple, and user-friendly creation
          process that allows them to create collections that help them stand
          out. And speaking of standing out, we believe that OpenSea is the best
          place creators can list NFTs for sale because it distributes them to
          the largest audience. That’s because we’re the world's first and
          largest digital marketplace for NFTs. At OpenSea, we pride ourselves
          on making the NFT creation and minting process easy, intuitive, and
          friendly for creators because we love seeing our marketplace grow and
          diversify with each new collection.
        </p>

        <!-- questions and answers -->
        <p class="font-bold text-2xl mt-8">🧠 Q&A</p>
        <div
          class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-6 mt-2 md:mt-4 dark:bg-slate-800"
        >
          <p class="font-semibold text-lg">
            Can something be non-fungible but not an NFT?
          </p>
          <p class="text-sm font-light mt-4">
            Yes! Any completely original item that isn’t interchangeable with
            another of the same item is non-fungible. So, an original piece of
            artwork like the Mona Lisa is non-fungible. An item of clothing is
            also non-fungible because it may be more valuable than another
            similar item because of who previously owned it or the condition
            it’s in. But neither of these things is inherently an NFT because a
            non-fungible token must be recorded on the blockchain. The
            blockchain functions as a transparent, immutable, permanent online
            ledger that keeps track of transactions. Therefore, what makes
            something an NFT is that it is both non-fungible and recorded on the
            blockchain.
          </p>
        </div>

        <div
          class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-6 mt-2 md:mt-4 dark:bg-slate-800"
        >
          <p class="font-semibold text-lg">
            Will we buy things like cars as NFTs on the blockchain in the
            future?
          </p>
          <p class="text-sm font-light mt-4">
            Very likely, yes! Because NFTs are immutable (which means they’re
            unable to be changed) and offer sole ownership of an item, they’re a
            natural fit for purchases that need to be trackable like cars. For
            example, right now when buying a car, the owner received a paper
            title. In the future, we can see that being replaced by a smart
            contract on the blockchain. With a public record of ownership
            accessible to anyone, the owner can easily and clearly prove
            ownership of their car, transact with agencies like the DMV, and
            even sell their car later on.
          </p>
        </div>
        <div
          class="border-gray-300 dark:border-gray-600 border transit rounded-xl p-3 md:p-6 mt-2 md:mt-4 dark:bg-slate-800"
        >
          <p class="font-semibold text-lg">
            What makes some NFTs more expensive than others?
          </p>
          <p class="text-sm font-light mt-4">
            The value of an NFT is in the eye of the beholder, but many factors
            come into play when we talk about value. In larger collections, the
            rarity of an NFT can increase its value. Some NFTs have qualities,
            features, or aspects that make them special and therefore desirable.
            For reference, those qualities are listed on each NFT’s OpenSea
            page. NFTs with traits that are one-of-a-kind tend to drive higher
            value than their more common counterparts. An NFT made by a
            well-known creator or artist will also drive more value for the same
            reason an original Monet is worth more than your first grader’s
            macaroni necklace. No shade to your first grader, by the way. And
            finally, utility is something that can affect value. If an NFT
            grants its owner access to something exclusive or desirable, it’s
            likely to be more valuable. These are just three things that can
            make an NFT more expensive, but there are plenty of other elements
            at play that can affect the price and resale value of an NFT.
          </p>
        </div>
      </div>
    </section>
    <section class="h-auto mt-5">
      <main class="ml-4 md:mx-8">
        <p class="font-bold text-lg md:text-xl dark:text-slate-100">
          Featured NFT Articles
        </p>

        <!-- nft cards -->
        <swiping-cards class="py-5">
          <template #cards>
            <swiper-slide v-for="learn in learnNft" :key="learn.name">
              <!-- for home nft cards -->
              <nft-card :nft="learn" :learn="true" :route-name="learn.route" />
            </swiper-slide>
          </template>
        </swiping-cards>
      </main>
    </section>
  </div>
</template>

<script setup>
import DButton from "@/components/utils/DButton.vue";
import NftCard from "@/components/cards/nftCard.vue";
import vLazyImage from "v-lazy-image";
import SwipingCards from "@/components/swipingCards.vue";
import { computed, onMounted } from "vue";

onMounted(() => {
  //   to save scroll screen position
  window.scrollTo(0, 0);
  //   document.addEventListener("DOMContentLoaded", function (event) {
  //     var scrollpos = localStorage.getItem("scrollpos");
  //     if (scrollpos) window.scrollTo(0, scrollpos);
  //   });
  //   window.onbeforeunload = function (e) {
  //     localStorage.setItem("scrollpos", window.scrollY);
  //   };
  // Add additional true parameter to force reload, but without restoring the position.
  // document.location.reload(true)
});

const learnNft = computed(() => {
  return [
    {
      name: "What is an NFT",
      image_url:
        "https://opensea.io/static/images/learn-center//what-is-nft.png",
      route: "/learn/what-are-nfts",
    },

    {
      name: "What is a Blockchain",
      image_url:
        "https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe0d5ef66bd821c0c477a_63d1a70f914ea5352493efb5_637eb7b98b0e8434b165a1b1_What%252520is%252520a%252520blockchain.png",
      route: "/learn/what-is-a-blockchain",
    },
    {
      name: "What is web3",
      image_url:
        "https://cdn.prod.website-files.com/65217fd9e31608b8b68141ba/653fe0d5c538f6e7736ab8f4_63d1a70e2fe07c7f11a6b195_637bb7c970c23116e14990d1_What%252520is%252520Web3-p-1080.png",
      route: "/learn/what-is-web3",
    },
  ];
});
</script>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import NftCard from "@/components/cards/nftCard.vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<style>
.shining {
  text-align: center;
  background: linear-gradient(
    90deg,
    #d71ef9 10%,
    #1bee97 40%,
    #0057ff 60%,
    #d71ef9 90%
  );
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: shine 6s linear infinite;
  animation-duration: 6s;
  animation-timing-function: linear;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: shine;
}
@keyframes shine {
  100% {
    background-position: 200%;
    background-position-x: 200%;
    background-position-y: center;
  }
}

.v-lazy-image {
  filter: blur(10px);
  transition: all 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
