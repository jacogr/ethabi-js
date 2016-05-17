const ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';

export function padU32 (input) {
  return `${ZERO_64}${input}`.slice(-64);
}

export function padBytes (input) {
  return `${padU32((input.length / 2).toString(16))}${padFixedBytes(input)}`;
}

export function padFixedBytes (input) {
  const max = Math.floor((`${input}`.length + 63) / 64) * 64;

  return `${input}${ZERO_64}`.substr(0, max);
}
