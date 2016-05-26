import Interface from './spec';

export default class Contract {
  constructor (abi) {
    this._interface = new Interface(abi);
  }

  get interface () {
    return this._interface;
  }
}
