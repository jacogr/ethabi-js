import Token from '../token';
import BytesTaken from './bytesTaken';
import DecodeResult from './decodeResult';
import { sliceData } from '../util/slice';
import { asAddress, asBool, asU32 } from '../util/sliceAs';

export default class Decoder {
  decode (params, data) {
    const slices = sliceData(data);
    let offset = 0;

    return params.map((param) => {
      const result = this.decodeParam(param, slices, offset);
      offset = result.newOffset;
      return result.token;
    });
  }

  peek (slices, position) {
    if (!slices[position]) {
      throw new Error(`Invalid ${position} in slices peek`);
    }

    return slices[position];
  }

  takeBytes (slices, position, length) {
    const slicesLength = (length + 63) / 64;
    let bytes = '';

    for (let idx = 0; idx < slicesLength; idx++) {
      bytes = `${bytes}${this.peek(slices, position + idx)}`;
    }

    return new BytesTaken(bytes, position + slicesLength);
  }

  decodeParam (param, slices, offset) {
    let taken;

    switch (param.type) {
      case 'address':
        return new DecodeResult(
          new Token(param.type, asAddress(this.peek(slices, offset))),
          offset + 1
        );

      case 'bool':
        return new DecodeResult(
          new Token(param.type, asBool(this.peek(slices, offset))),
          offset + 1
        );

      case 'int':
      case 'uint':
        return new DecodeResult(
          new Token(param.type, this.peek(slices, offset)),
          offset + 1
        );

      case 'fixedBytes':
        taken = this.takeBytes(slices, offset, param.length);
        return new DecodeResult(
          new Token(param.type, taken),
          taken.newOffset
        );

      case 'bytes':
        const lengthOffset = asU32(this.peek(slices, offset)).div(32);
        const length = asU32(this.peek(slices, lengthOffset));
        taken = this.takeBytes(slices, lengthOffset + 1, length);
        return new DecodeResult(
          new Token(param.type, taken.bytes),
          offset + 1
        );

      default:
        throw new Error(`Invalid param type ${param.type} in decodeParam`);
    }
  }
}
