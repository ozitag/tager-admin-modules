/**
 * @typedef  {import("estree").ImportDeclaration} ImportDeclaration
 */

/**
 *
 * @param {object} params
 * @param {string} params.source
 * @param {string} params.code
 * @param {object} params.range
 * @param {number} params.range.start
 * @param {number} params.range.end
 * @return {string}
 */
export function replaceRangeInSource(params) {
  const { source, range, code } = params;

  return source.slice(0, range.start) + code + source.slice(range.end);
}

/**
 *
 * @param {ImportDeclaration} node
 * @return {string}
 */
export function convertImportDeclarationToCode(node) {
  return node.specifiers
    .map(({ imported, local }) => {
      const func = imported.name !== local.name ? local.name : imported.name;
      return `import ${func} from "${node.source.value}/${imported.name}.js";`;
    })
    .join("\n");
}
