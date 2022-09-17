import { join } from "node:path";
import { readFileSync, writeFileSync, rmSync } from "node:fs";

import { success } from "./helpers.js";

const packageJsonPath = join(process.cwd(), "./package.json");
const packageJsonBackupPath = join(process.cwd(), "./package.json.bac");

const packageJsonBackup = readFileSync(packageJsonBackupPath, {
  encoding: "utf8",
});
writeFileSync(packageJsonPath, packageJsonBackup);
rmSync(packageJsonBackupPath);

success(`'package.json' has been restored!`);
