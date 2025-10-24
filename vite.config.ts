/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dts from "unplugin-dts/vite";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readdirSync, rmSync } from 'node:fs'


const currentDir = dirname(fileURLToPath(import.meta.url));

function emptyDir(dir: string) {
  if (!existsSync(dir)) {
    return
  }

  for (const file of readdirSync(dir)) {
    rmSync(resolve(dir, file), { recursive: true, force: true })
  }
}

emptyDir(resolve(__dirname, 'dist'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["lib"],
      exclude: ["src"],
      tsconfigPath: "./tsconfig.lib.json",
      copyDtsFiles: true,
    }),
  ],

  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(currentDir, "lib/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },

  /*
  css: {
    preprocessorOptions: {
      scss: {
        // Tell dart‑sass where to look for “@/…”
        loadPaths: [resolve(currentDir, "./lib")],
      },
    },
    modules: {
      // default pattern – you can customise
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  */

  resolve: {
    alias: [
      {
        // SASS TILDE ALIAS
        find: /^~(.*)$/,
        replacement: "$1",
      },
      {
        find: /^@\/lib\//,
        replacement: resolve(currentDir, "./lib/"),
      },
      {
        find: /^@\/(?!lib\/)/,
        replacement: resolve(currentDir, "./src/"),
      },
    ],
  },
  test: {
    globals: true, // Enables global test functions like describe, it, etc.
    environment: "jsdom", // Use jsdom for testing React components
  },
});
