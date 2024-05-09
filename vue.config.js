const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    manifestOptions: {
      name: "Oceanic",
      short_name: "Oceans",
      display: "standalone",
      theme_color: "#4ade80",
    },
  },
});
