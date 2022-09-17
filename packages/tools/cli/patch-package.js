import { join } from "node:path";
import { readFileSync, writeFileSync, copyFileSync } from "node:fs";

import { success } from "./helpers.js";

const packageJsonPath = join(process.cwd(), "./package.json");
const packageJsonBackupPath = join(process.cwd(), "./package.json.bac");

copyFileSync(packageJsonPath, packageJsonBackupPath);

const packageJson = readFileSync(packageJsonPath, { encoding: "utf8" });
const config = JSON.parse(packageJson);

Object.assign(config, config.publishConfig);
delete config.publishConfig;

const patchedPackageJson = JSON.stringify(config, null, 2);
writeFileSync(packageJsonPath, patchedPackageJson);

success(`'package.json' has been patched!`);
