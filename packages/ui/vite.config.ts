import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { optimizeLodashImports as lodash } from "@tager/rollup-plugin-lodash";

const dirname = path.dirname(fileURLToPath(import.meta.url));

function resolvePath(filePath: string) {
  return path.resolve(dirname, filePath);
}

/**
 * Source: {@link https://github.com/formik/tsdx/blob/158ee9a69c824b71b62cf987fe943a167f47f936/src/utils.ts#L22-L23}
 * {@link https://github.com/vitejs/vite/blob/v2.9.5/packages/plugin-vue/src/helper.ts#L1}
 */
const external = (id: string) =>
  !id.startsWith(".") && !path.isAbsolute(id) && !id.startsWith("plugin-vue:");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    /**
     * Pinned explicitly: Vite's default target changed between majors
     * (v3 "modules" ~Safari 13 -> v5+ "baseline-widely-available" ~Safari 16),
     * which would silently move the published bundle's browser floor.
     */
    target: "es2020",
    /**
     * Published source maps: consumers debugging an admin panel otherwise
     * land in minified output with nothing to map it back to.
     */
    sourcemap: true,
    lib: {
      entry: resolvePath("src/main.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
      /**
       * Vite >=5 names lib-mode CSS after the package ("admin-ui.css").
       * Pinned back to "style.css" to keep the published
       * `@tager/admin-ui/css` export path stable.
       */
      cssFileName: "style",
    },
    rollupOptions: {
      external: external,
    },
  },
  plugins: [vue(), lodash()],
});
