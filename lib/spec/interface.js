import Constructor from './constructor';
import Event from './event';
import Func from './function';

export default class Interface {
  constructor (abi) {
    this._interface = Interface.parseABI(abi);
  }

  get interface () {
    return this._interface;
  }

  get constructors () {
    return this._interface.filter((item) => item instanceof Constructor);
  }

  get events () {
    return this._interface.filter((item) => item instanceof Event);
  }

  get functions () {
    return this._interface.filter((item) => item instanceof Func);
  }

  static parseABI (abi) {
    return abi.map((item) => {
      switch (item.type) {
        case 'constructor':
          return new Constructor(item);

        case 'event':
          return new Event(item);

        case 'function':
          return new Func(item);

        default:
          throw new Error(`Unknown ABI type ${item.type}`);
      }
    });
  }
}
