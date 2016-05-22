import BigNumber from 'bignumber.js';

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
