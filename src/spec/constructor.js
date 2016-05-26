export default class Constructor {
  constructor (inputs) {
    this._inputs = inputs;
  }

  get inputs () {
    return this._inputs;
  }

  paramTypes () {
    return this._inputs.map((input) => input.kind);
  }
}
