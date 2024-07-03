const themeState = localStorage.getItem("theme");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    themeColor:
      themeState == "light" || themeState == null ? "#4ADE80" : "#1ED661",
    msTileColor:
      themeState == "light" || themeState == null ? "#4ADE80" : "#1ED661",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color:
        themeState == "light" || themeState == null ? "#4ADE80" : "#1ED661",
      name: "Oceanic",
      short_name: "Oceanic",
      theme_color:
        themeState == "light" || themeState == null ? "#4ADE80" : "#1ED661",
    },
  },
});
