#!/usr/bin/env sh

# skip `node_modules` directories
# print `dist` directories but skip their content
# print all other `*.tsbuildinfo` files
# remove all printed files and directories at once
find . \
  -name node_modules -prune -o \
  -name dist -prune -a -print0 -o \
  -name "*.tsbuildinfo" -print0 | \
xargs -0 rm -rf

