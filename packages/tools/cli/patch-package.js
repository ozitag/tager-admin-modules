import { $, fs } from "zx";

import { success as log } from "./helpers.js";
import { PACKAGE_JSON, PACKAGE_JSON_BACKUP } from "./contants.js";

async function updatePackageJson(updateFunc) {
  const packageConfig = await fs.readJson(PACKAGE_JSON);
  await updateFunc(packageConfig);
  await fs.writeJson(PACKAGE_JSON, packageConfig, { spaces: 2 });
}

log(`'package.json' patching is starting...`);

const PACKAGE_FOLDER = "package";
const PACKAGE_ARCHIVE = PACKAGE_FOLDER + ".tgz";

/**
 * Create backup of `package.json` -> `package.json.bac`
 * We will need it to restore original `package.json`
 */
await fs.copy(PACKAGE_JSON, PACKAGE_JSON_BACKUP);

/**
 * Remove `prepack/postpack` scripts from `package.json`,
 * to prevent calling them during `yarn pack`
 */
await updatePackageJson(async (config) => {
  delete config.scripts.prepack;
  delete config.scripts.postpack;
});

/**
 * Run `yarn pack`
 * - to replace `workspace:*` versions of packages
 * - to apply changes from `publishConfig` field
 *
 * Result: `package.tgz` file created in the same folder
 */
await $`yarn pack`;

/**
 * Unzip `package.tgz`
 *
 * Result: `package` folder
 */
await $`tar zxvf ${PACKAGE_ARCHIVE}`;

/**
 * Replace current `package.json` with packed one.
 */
await fs.copy(`${PACKAGE_FOLDER}/${PACKAGE_JSON}`, PACKAGE_JSON);

/**
 * Remove `package.tgz` file and `package` folder
 */
await fs.remove(PACKAGE_FOLDER);
await fs.remove(PACKAGE_ARCHIVE);

await updatePackageJson(async (config) => {
  /**
   * Remove `publishConfig` field in final `package.json`
   * to not pollute `package.json`
   */
  delete config.publishConfig;

  /**
   * Add `postpack` script from original `package.json`
   * to restore it after running `npm publish` command
   */
  const originalConfig = await fs.readJson(PACKAGE_JSON_BACKUP);
  config.scripts.postpack = originalConfig.scripts.postpack;
});

log(`'package.json' has been patched!`);
