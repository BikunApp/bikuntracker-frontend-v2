import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
const stagingRobotsPlugin = {
  name: "staging-robots",
  transformIndexHtml() {
    if (process.env.VITE_STAGING !== "true") return [];
    return [{ tag: "meta", attrs: { name: "robots", content: "noindex, nofollow" }, injectTo: "head" as const }];
  },
};

export default defineConfig({
  plugins: [stagingRobotsPlugin, tanstackRouter({ target: "react" }), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api/eta": {
        target: "https://eta.api.bikun.ui.ac.id",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
