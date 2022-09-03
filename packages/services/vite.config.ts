import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

function resolvePath(relativePath: string) {
  const currentDirectory = dirname(fileURLToPath(import.meta.url));
  return resolve(currentDirectory, relativePath);
}

interface PackageJson {
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
}

function getExternalDependencies() {
  const json = readFileSync(resolvePath("./package.json"), {
    encoding: "utf8",
  });
  const config = JSON.parse(json) as PackageJson;
  return Object.keys({
    ...config.dependencies,
    ...config.peerDependencies,
  });
}

export default defineConfig({
  build: {
    lib: {
      entry: resolvePath("./src/index.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: getExternalDependencies(),
    },
  },
});
