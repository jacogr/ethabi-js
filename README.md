# ethabi-js

A very early, very POC-type port of [https://github.com/ethcore/ethabi](https://github.com/ethcore/ethabi) to JavaScript

[![Build Status](https://travis-ci.org/jacogr/ethabi-js.svg?branch=master)](https://travis-ci.org/jacogr/ethabi-js)
[![Coverage Status](https://coveralls.io/repos/github/jacogr/ethabi-js/badge.svg?branch=master)](https://coveralls.io/github/jacogr/ethabi-js?branch=master)
[![Dependency Status](https://david-dm.org/jacogr/ethabi-js.svg)](https://david-dm.org/jacogr/ethabi-js)
[![devDependency Status](https://david-dm.org/jacogr/ethabi-js/dev-status.svg)](https://david-dm.org/jacogr/ethabi-js#info=devDependencies)

## getting going

- clone
- `npm install`
- `npm run testOnce`


## implementation
### approach

- this version tries to stay as close to the original Rust version in intent, function names & purpose
- it is a basic port of the Rust version, relying on effectively the same test-suite (expanded where deemed appropriate)
- it is meant as a library to be used in other projects

### differences to original Rust version

- internally the library operates on string binary representations as opposed to Vector bytes, lengths are therefore 64 bytes as opposed to 32 bytes
- function names are adapted from the Rust standard snake_case to the JavaScript standard camelCase


## todos

Yes, these should be moved to issues :)

### encoder

- be liberal in what you accept, i.e. numbers should allow decimal, hex & strings while bytes should do strings & arrays (only string supported in all cases currently)

### decoder

- do & complete :)

### cli

- complete for full 1-to-1 compatibility with original
