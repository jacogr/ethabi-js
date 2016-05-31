import Decoder from '../decoder/decoder';
import Encoder from '../encoder/encoder';
import Param from './param';
import { signature } from '../util/signature';

export default class Func {
  constructor (abi) {
    this._name = abi.name;
    this._inputs = Param.toParams(abi.inputs || []);
    this._outputs = Param.toParams(abi.outputs || []);
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
