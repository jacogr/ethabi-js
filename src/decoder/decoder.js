import utf8 from 'utf8';

import Token from '../token';
import BytesTaken from './bytesTaken';
import DecodeResult from './decodeResult';
import { sliceData } from '../util/slice';
import { asAddress, asBool, asU32 } from '../util/sliceAs';

export default class Decoder {
  decode (params, data) {
    if (!params || !data) {
      throw new Error('Invalid inputs to decode');
    }

    const slices = sliceData(data);
    let offset = 0;

    return params.map((param) => {
      const result = this.decodeParam(param, slices, offset);
      offset = result.newOffset;
      return result.token;
    });
  }

  peek (slices, position) {
    if (!slices || !slices[position]) {
      throw new Error(`Invalid position ${position} in slices peek`);
    }

    return slices[position];
  }

  takeBytes (slices, position, length) {
    const slicesLength = Math.floor((length + 31) / 32);
    let bytesStr = '';

    for (let idx = 0; idx < slicesLength; idx++) {
      bytesStr = `${bytesStr}${this.peek(slices, position + idx)}`;
    }

    const bytes = bytesStr.substr(0, length * 2).match(/.{1,2}/g).map((code) => parseInt(code, 16));

    return new BytesTaken(bytes, position + slicesLength);
  }

  decodeParam (param, slices, offset) {
    const tokens = [];
    let taken;
    let lengthOffset;
    let length;
    let newOffset;

    switch (param.type) {
      case 'address':
        return new DecodeResult(new Token(param.type, asAddress(this.peek(slices, offset))), offset + 1);

      case 'bool':
        return new DecodeResult(new Token(param.type, asBool(this.peek(slices, offset))), offset + 1);

      case 'int':
      case 'uint':
        return new DecodeResult(new Token(param.type, asU32(this.peek(slices, offset))), offset + 1);

      case 'fixedBytes':
        taken = this.takeBytes(slices, offset, param.length);

        return new DecodeResult(new Token(param.type, taken.bytes), taken.newOffset);

      case 'bytes':
        lengthOffset = asU32(this.peek(slices, offset)).div(32).toNumber();
        length = asU32(this.peek(slices, lengthOffset)).toNumber();
        taken = this.takeBytes(slices, lengthOffset + 1, length);

        return new DecodeResult(new Token(param.type, taken.bytes), offset + 1);

      case 'string':
        lengthOffset = asU32(this.peek(slices, offset)).div(32).toNumber();
        length = asU32(this.peek(slices, lengthOffset)).toNumber();
        taken = this.takeBytes(slices, lengthOffset + 1, length);

        const str = taken.bytes.map((code) => String.fromCharCode(code)).join('');

        return new DecodeResult(new Token(param.type, utf8.decode(str)), offset + 1);

      case 'array':
        lengthOffset = asU32(this.peek(slices, offset)).div(32).toNumber();
        length = asU32(this.peek(slices, lengthOffset)).toNumber();
        newOffset = lengthOffset + 1;

        for (let idx = 0; idx < length; idx++) {
          const result = this.decodeParam(param.subtype, slices, newOffset);
          newOffset = result.newOffset;
          tokens.push(result.token);
        }

        return new DecodeResult(new Token(param.type, tokens), offset + 1);

      case 'fixedArray':
        newOffset = offset;

        for (let idx = 0; idx < param.length; idx++) {
          const result = this.decodeParam(param.subtype, slices, newOffset);
          newOffset = result.newOffset;
          tokens.push(result.token);
        }

        return new DecodeResult(new Token(param.type, tokens), newOffset);

      default:
        throw new Error(`Invalid param type ${param.type} in decodeParam`);
    }
  }
}
