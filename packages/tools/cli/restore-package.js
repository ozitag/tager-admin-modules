import { fs } from "zx";

import { success as log } from "./helpers.js";
import { PACKAGE_JSON, PACKAGE_JSON_BACKUP } from "./contants.js";

log(`'package.json' restoring is starting...`);

await fs.move(PACKAGE_JSON_BACKUP, PACKAGE_JSON, { overwrite: true });

log(`'package.json' has been restored!`);
