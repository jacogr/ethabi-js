import Token from '../token';
import DecodeResult from './decodeResult';
import { sliceData } from '../util/slice';
import { asAddress, asBool } from '../util/sliceAs';

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

  decodeParam (param, slices, offset) {
    let token;

    switch (param.type) {
      case 'address':
        token = new Token('address', asAddress(this.peek(slices, offset)));
        return new DecodeResult(token, offset + 1);

      case 'bool':
        token = new Token('bool', asBool(this.peek(slices, offset)));
        return new DecodeResult(token, offset + 1);

      case 'int':
      case 'uint':
        token = new Token(param.type, this.peek(slices, offset));
        return new DecodeResult(token, offset + 1);

      default:
        throw new Error(`Invalid param type ${param.type} in decodeParam`);
    }
  }
}
