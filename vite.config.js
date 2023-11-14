// vite.config.js
import legacy from "@vitejs/plugin-legacy";

export default {
  build: {
    outDir: 'build'
  },
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
};
