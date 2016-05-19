const TYPES = ['address', 'bytes', 'int', 'uint', 'bool', 'string', 'array', 'fixedBytes', 'fixedArray'];

export default class ParamType {
  constructor (type, value, size) {
    ParamType.validateType(type);

    this._type = type;
    this._value = value;
    this._size = size;
  }

  get type () {
    return this._type;
  }

  get value () {
    return this._value;
  }

  get size () {
    return this._size;
  }

  static validateType (type) {
    if (TYPES.filter((_type) => type === _type).length) {
      return true;
    }

    throw new Error(`Invalid type ${type} received for ParamType`);
  }
}
