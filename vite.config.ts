import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { localApiPlugin } from "./local-api-plugin.js";

export default defineConfig(({ mode }) => {
  const localEnvironment = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(localEnvironment)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return {
    plugins: [react(), localApiPlugin()],
    base: "/",

    server: {
      host: "0.0.0.0",
      port: 3000,
    },

    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            framer: ["framer-motion"],
            icons: ["react-icons"],
            router: ["react-router-dom"],
          },
        },
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "framer-motion",
        "react-icons",
        "react-router-dom",
        "react-markdown",
        "remark-gfm",
      ],
    },
  };
});
