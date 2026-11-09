#!/usr/bin/env node

/*
 * Releases here are patch-only: no `minor`, no `major`, whatever the change is.
 *
 * Consumers pin these packages with a caret and update them without reading a
 * changelog, so a version that claims "new feature" or "breaking" buys nothing
 * and a bumped middle number quietly leaves everyone a release behind. The
 * decision is deliberate -- this script is what keeps a stray `yarn changeset`
 * answer from undoing it, because `changeset version` itself has no setting
 * that caps the bump type.
 *
 * Takes the files to check as arguments (that is how lint-staged calls it) and
 * reads every changeset when given none.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CHANGESET_DIR = ".changeset";
const ALLOWED_BUMP = "patch";

/** `"@tager/admin-ui": minor`, with or without quotes. */
const BUMP_LINE =
  /^\s*(?:"([^"]+)"|'([^']+)'|([\w@/-]+))\s*:\s*(major|minor|patch)\s*$/;

function isChangeset(path) {
  return path.endsWith(".md") && !path.endsWith("README.md");
}

const fromArguments = process.argv.slice(2).filter(isChangeset);

if (fromArguments.length === 0 && !existsSync(CHANGESET_DIR)) {
  process.exit(0);
}

const files =
  fromArguments.length > 0
    ? fromArguments
    : readdirSync(CHANGESET_DIR)
        .map((name) => join(CHANGESET_DIR, name))
        .filter(isChangeset);

const offenders = [];

for (const file of files) {
  /* Everything between the first two `---` fences; a changeset without
     frontmatter is malformed and changesets itself will say so. */
  const frontmatter = readFileSync(file, "utf8").split(/^---\s*$/m)[1];

  if (frontmatter === undefined) {
    continue;
  }

  for (const line of frontmatter.split("\n")) {
    const match = line.match(BUMP_LINE);

    if (match && match[4] !== ALLOWED_BUMP) {
      offenders.push({
        file,
        package: match[1] ?? match[2] ?? match[3],
        bump: match[4],
      });
    }
  }
}

if (offenders.length > 0) {
  console.error("Only patch releases are allowed in this repository.\n");

  for (const offender of offenders) {
    console.error(
      `  ${offender.file}: "${offender.package}": ${offender.bump}`
    );
  }

  console.error('\nChange the bump type to "patch" and commit again.');
  process.exit(1);
}
