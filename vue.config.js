const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor: "#4ADE80",
    msTileColor: "#4ADE80",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#4ADE80",
      name: "Parcelling",
      short_name: "Parcling",
      theme_color: "#4ADE80",
    },
  },
});
