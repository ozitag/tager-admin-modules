# @tager/rollup-plugin-lodash

Rewrites `lodash-es` imports so a bundler can drop what you do not use — the
Rollup counterpart of `babel-plugin-lodash`.

```js
import { get } from "lodash-es";
// becomes
import get from "lodash-es/get.js";
```

Part of the [tager-admin-modules](../../README.md) monorepo.

## Usage

```js
import { optimizeLodashImports } from "@tager/rollup-plugin-lodash";

export default {
  plugins: [optimizeLodashImports()],
};
```

The plugin only touches `.ts` files, and only those that mention `lodash-es`;
everything else passes through untouched.

## How it works

The `transform` hook parses each matching file with the bundler's own parser,
walks it with `acorn-walk`, and rewrites every `ImportDeclaration` whose source
is `lodash-es` into one default import per specifier.

Note that a hook returning `{ code: null }` makes Vite call `String.includes` on
`null`, so the plugin returns the sentinel unchanged when there is nothing to do.
