import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      /**
       * `vue-docgen-api` is the default engine but is deprecated and goes away
       * in Storybook 11. `tsconfig` has to be spelled out because this
       * package's root `tsconfig.json` only holds project references,
       * which would leave docgen unable to resolve imports.
       */
      docgen: {
        plugin: "vue-component-meta",
        tsconfig: "tsconfig.app.json",
      },
    },
  },
  stories: ["../src/**/*.stories.@(ts|js)"],
  /**
   * `@storybook/addon-essentials` was folded into Storybook core in v9,
   * so only the docs addon has to be listed explicitly.
   * SCSS needs no preset either -- Vite compiles it through `sass`.
   */
  addons: ["@storybook/addon-docs"],
  staticDirs: ["./public"],
};

export default config;
