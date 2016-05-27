import Constructor from './constructor';
import Event from './event';
import EventParam from './event/eventParam';
import Func from './function';
import Param from './param';

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
          return new Constructor(Param.toParams(item.inputs));

        case 'event':
          return new Event(item.name, EventParam.toEventParams(item.inputs), item.anonymous);

        case 'function':
          return new Func(item.name, Param.toParams(item.inputs), Param.toParams(item.outputs));

        default:
          throw new Error(`Unknown ABI type ${item.type}`);
      }
    });
  }
}
