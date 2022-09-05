#!/bin/sh

git status

# check if have any uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m "[skip ci] bump versions / clean changeset"
    git push
fi

