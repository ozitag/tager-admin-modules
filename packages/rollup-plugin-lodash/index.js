import { createFilter } from "@rollup/pluginutils";

import { transform } from "./transform.js";

const UNCHANGED = null;

/**
 * @typedef {import("@rollup/pluginutils").FilterPattern} FilterPattern
 * @typedef {import("rollup").TransformHook} TransformHook
 * @typedef {{name: string; transform: TransformHook}} TransformPlugin
 */

/**
 * Converts lodash imports to be specific, enabling better tree-shaking:
 *
 * `import { get } from "lodash-es";` -> `import get from "lodash-es/get";`
 *
 * @return {TransformPlugin} plugin
 */
export function optimizeLodashImports() {
  const filter = createFilter("**/*.ts");

  return {
    name: "optimize-lodash-imports",
    transform(code, id) {
      const parse = this.parse.bind(this);

      if (!filter(id)) {
        return UNCHANGED;
      }

      const transformedCode = transform(code, {
        id,
        parse,
      });

      return { code: transformedCode };
    },
  };
}
