import { basename } from "node:path";

import pc from "picocolors";

export function getPackageName() {
  return `@tager/admin-${basename(process.cwd())}`;
}

export function success(message) {
  const packageName = getPackageName();
  console.log(
    `${pc.cyan("[" + packageName + "]:")} ${pc.green("✓")} ${message}`
  );
}
