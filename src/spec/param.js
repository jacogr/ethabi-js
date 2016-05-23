export default class Param {
  constructor (name, kind) {
    this._name = name;
    this._kind = kind;
  }

  get name () {
    return this._name;
  }

  get kind () {
    return this._kind;
  }
}
