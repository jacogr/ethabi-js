import Decoder from '../decoder';
import Encoder from '../encoder';
import Param from './param';
import { isArray, isInstanceOf } from '../util/types';
import { signature } from '../util/signature';

export default class Func {
  constructor (name, inputs, outputs) {
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

    if (outputs) {
      if (!isArray(outputs)) {
        throw new Error('outputs should be array of Param');
      } else {
        outputs.forEach((output, idx) => {
          if (!isInstanceOf(output, Param)) {
            throw new Error(`outputs[${idx}] not an instance of Param`);
          }
        });
      }
    }

    this._name = name;
    this._inputs = inputs || [];
    this._outputs = outputs || [];
  }

  get name () {
    return this._name;
  }

  get inputs () {
    return this._inputs;
  }

  get outputs () {
    return this._outputs;
  }

  inputParamTypes () {
    return this._inputs.map((input) => input.kind);
  }

  outputParamTypes () {
    return this._outputs.map((output) => output.kind);
  }

  encodeCall (tokens) {
    const signed = signature(this.name, this.inputParamTypes());
    const encoded = Encoder.encode(tokens);

    return `${signed}${encoded}`;
  }

  decodeOutput (data) {
    return Decoder.decode(this.outputParamTypes(), data);
  }
}
