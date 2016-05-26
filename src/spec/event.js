export default class Event {
  constructor (name, inputs, anonymous) {
    this._name = name;
    this._inputs = inputs;
    this._anonymous = anonymous;
  }

  get name () {
    return this._name;
  }

  get inputs () {
    return this._inputs;
  }

  get anonymous () {
    return this._anonymous;
  }

  inputParamTypes () {
    return this._inputs.map((input) => input.kind);
  }

  inputParamNames () {
    return this._inputs.map((input) => input.name);
  }

  indexedParams (indexed) {
    return this._inputs.filter((input) => input.indexed === indexed);
  }
}
