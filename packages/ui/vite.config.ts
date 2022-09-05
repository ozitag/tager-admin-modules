import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
    lib: {
      entry: resolvePath("src/main.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: external,
    },
  },
  plugins: [vue()],
});
