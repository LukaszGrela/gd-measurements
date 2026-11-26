import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const currentDir = dirname(fileURLToPath(import.meta.url));

// `vitest` only auto-loads `vitest.config.*` / `vite.config.*` from the project
// root, so the test setup lives here instead of in `vite.lib.config.ts`.
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
    globals: true,
    environment: "jsdom",
    include: ["lib/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["lib/**/*.{ts,tsx}"],
      exclude: ["lib/**/*.test.{ts,tsx}", "lib/**/types.ts", "lib/index.ts"],
      reporter: ["text", "html"],
    },
  },
});
