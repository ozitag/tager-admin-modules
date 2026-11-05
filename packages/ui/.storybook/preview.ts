import type { Preview } from "@storybook/vue3-vite";
import { setup } from "@storybook/vue3-vite";
import { mswLoader } from "msw-storybook-addon/csf3";
import { isCommonAssetRequest } from "msw";
import { setupWorker } from "msw/browser";
import { createPinia } from "pinia";
import { vueRouter } from "storybook-vue3-router";

import {
  configStore,
  i18n,
  i18nPlugin,
  initializeEnvironment,
  LOCAL_ENV,
} from "@tager/admin-services";

import config from "../src/constants/config.json";
import "../src/assets/css/index.css";
import { mswHandlers } from "../src/msw/handlers";
import EN from "../src/locales/en";
import RU from "../src/locales/ru";

/**
 * The Vite builder has no `process` shim like the old webpack one.
 * It exposes `STORYBOOK_`-prefixed variables through `import.meta.env`
 * (builder-vite sets `envPrefix: ["VITE_", "STORYBOOK_"]`).
 */
initializeEnvironment({
  accessToken: import.meta.env["STORYBOOK_ACCESS_TOKEN"],
  apiUrl: import.meta.env["STORYBOOK_API_URL"],
  appEnv: LOCAL_ENV,
});

i18n.addTranslations("en", "ui", EN);
i18n.addTranslations("ru", "ui", RU);

/**
 * Storybook 7 removed the `app` export from the renderer:
 * plugins are now registered through `setup()`.
 */
setup((app) => {
  app.use(i18nPlugin);
  app.use(createPinia());
});

configStore.setConfig(config);

i18n.init({ debug: false, lng: "ru" });

/**
 * Vite serves every module over HTTP in dev, so msw's default
 * `onUnhandledRequest` warns about each `.vue`/`.scss` request.
 * Stay silent for anything the dev server serves, but keep warning
 * for genuinely unmocked API calls.
 */
const DEV_SERVER_PATH = /^\/(src|node_modules|@|sb-|virtual:)/;

async function startWorker() {
  const worker = setupWorker();

  await worker.start({
    quiet: true,
    onUnhandledRequest(request, print) {
      const { pathname, origin } = new URL(request.url);

      if (origin === location.origin && DEV_SERVER_PATH.test(pathname)) {
        return;
      }

      // Fonts, images and other static assets (msw's own helper).
      if (isCommonAssetRequest(request)) {
        return;
      }

      print.warning();
    },
  });

  return worker;
}

const preview: Preview = {
  decorators: [vueRouter()],
  /**
   * msw-storybook-addon v3 turned `mswLoader` into a factory and dropped
   * `initialize()` -- the loader starts the worker itself.
   * The `/csf3` entry point is the one that still applies
   * `parameters.msw.handlers`.
   */
  loaders: [mswLoader(startWorker)],
  parameters: {
    /**
     * Hide `Docs` tab
     * Reference: {@link https://github.com/storybookjs/storybook/issues/13111#issuecomment-730741560}
     */
    previewTabs: {
      "storybook/docs/panel": { hidden: true },
    },
    msw: {
      handlers: mswHandlers,
    },
  },
};

export default preview;
