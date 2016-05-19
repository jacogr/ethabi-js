import BigNumber from 'bignumber.js';

export function asU32 (slice) {
  // TODO: validation

  return new BigNumber(`0x${slice}`);
}

export function asAddress (slice) {
  // TODO: address validation?

  return slice.slice(-40);
}

export function asBool (slice) {
  // TODO: everything else should be 0

  return new BigNumber(slice[63]).eq(1);
}
