import { toParamType } from './paramType/format';

export default class Param {
  constructor (name, type) {
    this._name = name;
    this._kind = toParamType(type);
  }

  get name () {
    return this._name;
  }

  get kind () {
    return this._kind;
  }
}
