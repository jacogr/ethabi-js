import utf8 from 'utf8';

import { padBytes, padFixedBytes, padU32 } from './pad';
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
        return new Mediate('raw', padU32(token.value));

      case 'bool':
        return new Mediate('raw', padU32(token.value ? '1' : '0'));

      case 'fixedBytes':
        return new Mediate('raw', padFixedBytes(token.value));

      case 'bytes':
        return new Mediate('prefixed', padBytes(token.value));

      case 'int':
        return new Mediate('raw', padU32(token.value));

      case 'uint':
        return new Mediate('raw', padU32(token.value));

      case 'string':
        return new Mediate('prefixed', padBytes(utf8.encode(token.value)));

      case 'fixedArray':
        return new Mediate('fixedArray', token.value.map((token) => this.encodeToken(token)));

      case 'array':
        return new Mediate('array', token.value.map((token) => this.encodeToken(token)));

      default:
        throw new Error(`Invalid token type ${token.type} in encodeToken`);
    }
  }
}
