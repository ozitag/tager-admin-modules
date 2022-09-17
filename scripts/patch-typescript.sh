#!/usr/bin/env sh

# Run `yarn patch typescript@npm:x.y.z`, e.g. `yarn patch typescript@npm:4.8.2`
# Copy path to typescript repo to `REPOSITORY_DIRECTORY` variable
REPOSITORY_DIRECTORY=

# Make some changes there
# When source code is updated - close IDE and run the following commands

rm -rf "$REPOSITORY_DIRECTORY/.idea"
yarn patch-commit -s "$REPOSITORY_DIRECTORY"
rm -rf node_modules/typescript
yarn install
