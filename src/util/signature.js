import { keccak_256 } from 'js-sha3'; // eslint-disable-line camelcase

export function signature (name, params) {
  const types = (params || []).map((input) => input.type).join(',');
  const id = `${name || ''}(${types})`;

  return keccak_256(id).substr(0, 8);
}
