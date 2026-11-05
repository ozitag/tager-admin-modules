import js from "@eslint/js";
import { defineConfigWithVueTs, vueTsConfigs } from "@vue/eslint-config-typescript";
import importPlugin from "eslint-plugin-import";
import lodash from "eslint-plugin-lodash";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import storybook from "eslint-plugin-storybook";
import pluginVue from "eslint-plugin-vue";

const allExtensions = [".ts", ".tsx", ".js", ".jsx", ".vue"];

export default defineConfigWithVueTs(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/*.tsbuildinfo",
      ".yarn/**",
      // Hand-written ambient declarations, not part of any TS project.
      "packages/rollup-plugin-lodash/**",
      // Root-level build configs: outside every tsconfig project, and outside
      // the `yarn lint` glob, so lint-staged must skip them too.
      "*.config.{ts,mjs,js}",
    ],
  },

  js.configs.recommended,
  pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  storybook.configs["flat/recommended"],

  // Must stay last so it can switch off every stylistic rule it owns.
  prettierRecommended,

  {
    plugins: { lodash },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      "import/extensions": allExtensions,
      "import/external-module-folders": ["node_modules", "node_modules/@types"],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: { extensions: allExtensions },
        typescript: true,
      },
    },
    rules: {
      /*
       * These four resolve a module's internals to check named exports.
       * Under flat config they cannot parse `.vue` single-file components,
       * and TypeScript already reports every mistake they would catch.
       */
      "import/namespace": "off",
      "import/default": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",

      "prettier/prettier": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "import/extensions": [
        "warn",
        "ignorePackages",
        { js: "always", ts: "never", vue: "always" },
      ],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "lodash/import-scope": ["error", "member"],
      "import/order": [
        "error",
        {
          pathGroups: [
            { pattern: "@/**", group: "internal" },
            { pattern: "@tager/**", group: "external", position: "after" },
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],
    },
  },

  {
    files: ["**/*.stories.ts"],
    rules: {
      "vue/one-component-per-file": "off",
    },
  },

  {
    // Config files and tests run in Node, not in the browser bundle.
    files: ["*.config.{js,ts}", "**/.storybook/**", "**/*.test.ts"],
    languageOptions: {
      globals: { process: "readonly", console: "readonly" },
    },
  }
);
