import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      {
        // SASS TILDE ALIAS
        find: /^~(.*)$/,
        replacement: "$1",
      },
      {
        find: "@",
        replacement: resolve(__dirname, "./src/"),
      },
    ],
  },
});
