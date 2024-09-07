const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: "#4ade80",
    msTileColor: "#4ade80",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#4ade80",
      name: "Oceanic",
      short_name: "Oceanic",
      theme_color: "#4ade80",
    },
  },
});
