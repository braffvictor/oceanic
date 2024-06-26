<template>
  <swiper
    :slides-per-view="screenSize > 768 ? 5 : 2"
    :space-between="screenSize > 768 ? 50 : 120"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    @reach-end="ending"
    :allow-slide-next="true"
    :allow-touch-move="true"
    :autoplay="true"
    :grab-cursor="true"
    :free-mode="true"
    :loop="true"
    :mousewheel="true"
    :allow-slide-prev="true"
    @breakpoint="screenSizing"
  >
    <slot name="cards" class="cursor-grab"></slot>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "/tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

// console.log(fullConfig.theme.screens);
import { ref, watch } from "vue";
// Import Swiper styles
import "swiper/css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const screenSize = ref(window.screen.width);
    watch(screenSize, () => {
      // console.log(screenSize.value);
    });

    console.log(screenSize.value);
    const onSwiper = (swiper) => {
      //   console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log("slide change");
    };
    const ending = () => {
      // console.log("ended");
    };

    const screenSizing = (swiper, options) => {
      // console.log(swiper);
      // console.log(options);
    };
    return {
      onSwiper,
      onSlideChange,
      screenSize,
      ending,
      screenSizing,
    };
  },
};
</script>
