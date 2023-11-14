// vite.config.js
import legacy from "@vitejs/plugin-legacy";

export default {
  base: '/threejs-flappybird/',
  build: {
    outDir: 'build'
  },
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
};
