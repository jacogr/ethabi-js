import BigNumber from 'bignumber.js';
import utf8 from 'utf8';

const ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';

export function padAddress (input) {
  return `${ZERO_64}${input}`.slice(-64);
}

export function padBool (input) {
  return `${ZERO_64}${input ? '1' : '0'}`.slice(-64);
}

export function padU32 (input) {
  return `${ZERO_64}${new BigNumber(input).toString(16)}`.slice(-64);
}

export function padBytes (input) {
  return `${padU32(input.length / 2)}${padFixedBytes(input)}`;
}

export function padFixedBytes (input) {
  const max = Math.floor((`${input}`.length + 63) / 64) * 64;

  return `${input}${ZERO_64}`.substr(0, max);
}

export function padString (input) {
  const encoded = utf8.encode(input)
    .split('')
    .map((char) => char.charCodeAt(0).toString(16))
    .join('');

  return padBytes(encoded);
}
