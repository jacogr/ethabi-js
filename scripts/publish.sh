#!/bin/bash

set -o errexit

if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "master") ]]; then
  exit 0
fi

git config --global user.email "admin@travis-ci.org"
git config --global user.name "Travis CI"
git config --global push.default simple
git config credential.helper "store --file=.git/credentials"
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials
git checkout master

npm run build
ls -al ./index.js
git add --force ./index.js

node_modules/.bin/release-it
