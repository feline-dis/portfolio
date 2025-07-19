import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,

    include: ["tests/**/*.{test,spec}.{js,ts}"],
    exclude: ["node_modules", "dist", ".astro"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/", "tests/", "*.config.*", "dist/", ".astro/"],
    },
  },
  server: {
    allowedHosts: true,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});

