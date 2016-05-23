import { padAddress, padBool, padBytes, padFixedBytes, padU32, padString } from '../util/pad';
import Mediate from './mediate';

export default class Encoder {
  encode (tokens) {
    const mediates = tokens.map((token) => this.encodeToken(token));
    const inits = mediates
      .map((mediate, idx) => mediate.init(Mediate.offsetFor(mediates, idx)))
      .join('');
    const closings = mediates
      .map((mediate, idx) => mediate.closing(Mediate.offsetFor(mediates, idx)))
      .join('');

    return `${inits}${closings}`;
  }

  encodeToken (token) {
    switch (token.type) {
      case 'address':
        return new Mediate('raw', padAddress(token.value));

      case 'int':
      case 'uint':
        return new Mediate('raw', padU32(token.value));

      case 'bool':
        return new Mediate('raw', padBool(token.value));

      case 'fixedBytes':
        return new Mediate('raw', padFixedBytes(token.value));

      case 'bytes':
        return new Mediate('prefixed', padBytes(token.value));

      case 'string':
        return new Mediate('prefixed', padString(token.value));

      case 'fixedArray':
      case 'array':
        return new Mediate(token.type, token.value.map((token) => this.encodeToken(token)));

      default:
        throw new Error(`Invalid token type ${token.type} in encodeToken`);
    }
  }
}
