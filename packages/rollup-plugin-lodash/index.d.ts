import type { TransformHook } from "rollup";

interface TransformPlugin {
  name: string;
  transform: TransformHook;
}

export function optimizeLodashImports(): TransformPlugin;
