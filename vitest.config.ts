import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  test: {
    /**
     * Several helpers reach for `window.location` / `localStorage`, and
     * component tests need a DOM, so jsdom is the default for the whole repo.
     */
    environment: "jsdom",
    include: ["packages/*/src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["packages/*/src/**/*.{ts,vue}"],
      exclude: [
        "packages/*/src/**/*.test.ts",
        "packages/ui/src/**/*.stories.ts",
        "packages/ui/src/msw/**",
      ],
    },
  },
});
