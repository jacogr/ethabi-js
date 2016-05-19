const TYPES = ['address', 'bytes', 'int', 'uint', 'bool', 'string', 'array', 'fixedBytes', 'fixedArray'];

export default class ParamType {
  constructor (type, value, length) {
    ParamType.validateType(type);

    this._type = type;
    this._value = value;
    this._size = length;
  }

  get type () {
    return this._type;
  }

  get value () {
    return this._value;
  }

  get length () {
    return this._length;
  }

  static validateType (type) {
    if (TYPES.filter((_type) => type === _type).length) {
      return true;
    }

    throw new Error(`Invalid type ${type} received for ParamType`);
  }
}
