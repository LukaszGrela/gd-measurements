/// <reference types="vitest" />
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
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

emptyDir(resolve(__dirname, "dist-example"));

// https://vite.dev/config/
export default defineConfig(
  (): UserConfig => ({
    plugins: [react()],

    build: {
      outDir: resolve(currentDir, "dist-examples"),
      emptyOutDir: true,
      copyPublicDir: true,
      rollupOptions: {
        input: resolve(currentDir, "index.html"),
      },
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
