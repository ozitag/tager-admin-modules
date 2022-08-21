import * as path from "path";

import { defineConfig } from "vite";

/**
 * Source: {@link https://github.com/formik/tsdx/blob/158ee9a69c824b71b62cf987fe943a167f47f936/src/utils.ts#L22-L23}
 */
const external = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: external,
    },
  },
});
