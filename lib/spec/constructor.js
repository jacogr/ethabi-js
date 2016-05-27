import Encoder from '../encoder';
import Param from './param';
import { isArray, isInstanceOf } from '../util/types';

export default class Constructor {
  constructor (inputs) {
    if (inputs) {
      if (!isArray(inputs)) {
        throw new Error('inputs should be array of Param');
      } else {
        inputs.forEach((input, idx) => {
          if (!isInstanceOf(input, Param)) {
            throw new Error(`inputs[${idx}] not an instance of Param`);
          }
        });
      }
    }

    this._inputs = inputs || [];
  }

  get inputs () {
    return this._inputs;
  }

  inputParamTypes () {
    return this._inputs.map((input) => input.kind);
  }

  encodeCall (tokens) {
    return Encoder.encode(tokens);
  }
}
