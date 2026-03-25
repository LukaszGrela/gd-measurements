/// <reference types="vitest" />
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
// import dts from "unplugin-dts/vite";
import dts from "vite-plugin-dts";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync, readdirSync, rmSync } from "node:fs";

const currentDir = dirname(fileURLToPath(import.meta.url));

function emptyDir(dir: string) {
  if (!existsSync(dir)) {
    return;
  }

  for (const file of readdirSync(dir)) {
    rmSync(resolve(dir, file), { recursive: true, force: true });
  }
}

emptyDir(resolve(__dirname, "dist"));

// https://vite.dev/config/
export default defineConfig(
  (): UserConfig => ({
    plugins: [
      react(),
      dts({
        include: ["lib"],
        exclude: ["src", "**/*.test.*"],
        tsconfigPath: "./tsconfig.lib.json",
      }),
    ],

    build: {
      copyPublicDir: false,
      lib: {
        entry: resolve(currentDir, "lib/index.ts"),
        formats: ["es"],
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react-dom/client",
          "react/jsx-runtime",
        ],
      },
      minify: false,
    },

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
  }),
);
