#!/bin/bash

set -o errexit

if [[ ("$TRAVIS_PULL_REQUEST" != "false") || ("$TRAVIS_BRANCH" != "master") ]]; then
  exit 0
fi

npm run build

git config --global user.email "admin@travis-ci.org"
git config --global user.name "Travis CI"
git config --global push.default simple
git config credential.helper "store --file=.git/credentials"
echo "https://${GITHUB_TOKEN}:@github.com" > .git/credentials

git checkout master
git add --force ./index.js

echo -e "$NPM_USERNAME\n$NPM_PASSWORD\n$NPM_EMAIL" | npm login
echo -e "" | node_modules/.bin/release-it
