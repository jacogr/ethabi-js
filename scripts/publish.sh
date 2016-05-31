#!/bin/bash

set -o errexit

if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "master") ]]; then
  exit 0
fi

npm run build

git config --global user.email "admin@travis-ci.org"
git config --global user.name "Travis CI"
git config --global push.default simple
git add --force ./index.js

echo $GITHUB_TOKEN
node_modules/.bin/release-it
