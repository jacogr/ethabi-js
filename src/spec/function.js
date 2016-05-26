export default class Func {
  constructor (name, inputs, outputs) {
    this._name = name;
    this._inputs = inputs;
    this._outputs = outputs;
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
}
