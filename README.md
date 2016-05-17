# ethabi-js

A very early, very POC-type port of (https://github.com/ethcore/ethabi)[https://github.com/ethcore/ethabi] to JavaScript

## implementation

- this version tries to stay as close to the original Rust version in intent, function names & purpose
- it is a basic port of the Rust version, relying on effectively the same test-suite (expanded where deemed appropriate)
- it is meant as a library to be used in other projects, however the same cli is implemented for full 1-to-1 compatibility

## differences to original Rust version

- internally the library operates on string binary representations as opposed to Vector bytes, lengths are therefore 64 bytes as opposed to 32 bytes
- function names are adapted from the Rust standard snake_case to the JavaScript standard camelCase
