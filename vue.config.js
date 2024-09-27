const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: "#4ade80",
    msTileColor: "#4ade80",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#4ade80",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      name: "Oceanic",
      short_name: "Oceanic",
      theme_color: "#4ade80",
    },
  },
});
