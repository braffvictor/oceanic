const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: "#22c55e",
    msTileColor: "#22c55e",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#22c55e",
      name: "Oceanic",
      short_name: "Oceanic",
      theme_color: "#22c55e",
    },
  },
});
