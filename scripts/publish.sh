#!/bin/bash

set -o errexit

if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "master") ]]; then
  exit 0
fi

npm run build

git config --global user.email "admin@travis-ci.org"
git config --global user.name "Travis CI"
git config --global push.default simple

git checkout master
git add --force ./index.js

node_modules/.bin/release-it
