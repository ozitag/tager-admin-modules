import { simple as walk } from "acorn-walk";

import {
  convertImportDeclarationToCode,
  replaceRangeInSource,
} from "./helpers.js";

const UNCHANGED = null;
const LODASH = "lodash-es";

/**
 * @typedef  {import("acorn").Node} Node
 * @typedef  {import("estree").Program} Program
 */

/**
 *
 * @param {string} code
 * @param {object} options
 * @param {string} options.id
 * @param {(code: string) => Node} options.parse
 */
export function transform(code, options) {
  if (!code.includes(LODASH)) {
    return UNCHANGED;
  }

  try {
    const ast = options.parse(code);

    let result = code;

    walk(ast, {
      ImportDeclaration(node) {
        if (node.source.value === LODASH) {
          const replacement = convertImportDeclarationToCode(node);
          result = replaceRangeInSource({
            source: code,
            range: { start: node.start, end: node.end },
            code: replacement,
          });
        }
      },
    });

    return result;
  } catch (error) {
    error.message += ` in ${options.id}`;
    throw error;
  }
}
