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
DATE=`date`
echo "/* ${DATE} */" >> ./index.js
git add --force index.js
git commit --message "[CI skip] ${VERSION}"

npm version patch --message "[CI skip] %s"
git push
git push --tags
