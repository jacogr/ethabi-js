'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var BigNumber = _interopDefault(require('bignumber.js'));
var utf8 = _interopDefault(require('utf8'));
var jsSha3 = require('js-sha3');

var babelHelpers = {};

babelHelpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

babelHelpers.createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

babelHelpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

babelHelpers.possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

babelHelpers;

function isArray(test) {
  return Object.prototype.toString.call(test) === '[object Array]';}


function isInstanceOf(test, clazz) {
  return test instanceof clazz;}

var ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';

function padAddress(input) {
  return ('' + ZERO_64 + input).slice(-64);}


function padBool(input) {
  return ('' + ZERO_64 + (input ? '1' : '0')).slice(-64);}


function padU32(input) {
  var bn = new BigNumber(input);

  if (bn.lessThan(0)) {
    bn = new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).
    plus(bn).plus(1);}


  return ('' + ZERO_64 + bn.toString(16)).slice(-64);}


function padBytes(input) {
  var length = isArray(input) ? input.length : ('' + input).length / 2;

  return '' + padU32(length) + padFixedBytes(input);}


function padFixedBytes(input) {
  var sinput = void 0;

  if (isArray(input)) {
    sinput = input.map(function (code) {return code.toString(16);}).join('');} else 
  {
    sinput = '' + input;}


  var max = Math.floor((sinput.length + 63) / 64) * 64;

  return ('' + sinput + ZERO_64).substr(0, max);}


function padString(input) {
  var encoded = utf8.encode(input).
  split('').
  map(function (char) {return char.charCodeAt(0).toString(16);}).
  join('');

  return padBytes(encoded);}

var TYPES = ['raw', 'prefixed', 'fixedArray', 'array'];

var 

Mediate = function () {
  function Mediate(type, value) {babelHelpers.classCallCheck(this, Mediate);
    Mediate.validateType(type);

    this._type = type;
    this._value = value;}babelHelpers.createClass(Mediate, [{ key: 'initLength', value: function initLength() 


    {
      switch (this._type) {
        case 'raw':
          return this._value.length / 2;

        case 'array':
        case 'prefixed':
          return 32;

        case 'fixedArray':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength();}, 
          0);}} }, { key: 'closingLength', value: function closingLength() 



    {
      switch (this._type) {
        case 'raw':
          return 0;

        case 'prefixed':
          return this._value.length / 2;

        case 'array':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength();}, 
          32);

        case 'fixedArray':
          return this._value.
          reduce(function (total, mediate) {
            return total + mediate.initLength() + mediate.closingLength();}, 
          0);}} }, { key: 'init', value: function init(



    suffixOffset) {var _this = this;
      switch (this._type) {
        case 'raw':
          return this._value;

        case 'fixedArray':
          return this._value.
          map(function (mediate, idx) {return mediate.init(Mediate.offsetFor(_this._value, idx)).toString(16);}).
          join('');

        case 'prefixed':
        case 'array':
          return padU32(suffixOffset);}} }, { key: 'closing', value: function closing(



    offset) {var _this2 = this;
      switch (this._type) {
        case 'raw':
          return '';

        case 'prefixed':
          return this._value;

        case 'fixedArray':
          return this._value.
          map(function (mediate, idx) {return mediate.closing(Mediate.offsetFor(_this2._value, idx)).toString(16);}).
          join('');

        case 'array':
          var prefix = padU32(this._value.length);
          var inits = this._value.
          map(function (mediate, idx) {return mediate.init(offset + Mediate.offsetFor(_this2._value, idx) + 32).toString(16);}).
          join('');
          var closings = this._value.
          map(function (mediate, idx) {return mediate.closing(offset + Mediate.offsetFor(_this2._value, idx)).toString(16);}).
          join('');

          return '' + prefix + inits + closings;}} }, { key: 'type', get: function get() 



    {
      return this._type;} }, { key: 'value', get: function get() 


    {
      return this._value;} }], [{ key: 'offsetFor', value: function offsetFor(


    mediates, position) {
      if (position < 0 || position >= mediates.length) {
        throw new Error('Invalid position ' + position + ' specified for Mediate.offsetFor');}


      var initLength = mediates.
      reduce(function (total, mediate) {
        return total + mediate.initLength();}, 
      0);

      return mediates.
      slice(0, position).
      reduce(function (total, mediate) {
        return total + mediate.closingLength();}, 
      initLength);} }, { key: 'validateType', value: function validateType(


    type) {
      if (TYPES.filter(function (_type) {return type === _type;}).length) {
        return true;}


      throw new Error('Invalid type ' + type + ' received for Mediate.validateType');} }]);return Mediate;}();

var TYPES$1 = ['address', 'fixedArray', 'array', 'fixedBytes', 'bytes', 'bool', 'int', 'uint', 'string'];var 

Token = function () {
  function Token(type, value) {babelHelpers.classCallCheck(this, Token);
    Token.validateType(type);

    this._type = type;
    this._value = value;}babelHelpers.createClass(Token, [{ key: 'type', get: function get() 


    {
      return this._type;} }, { key: 'value', get: function get() 


    {
      return this._value;} }], [{ key: 'validateType', value: function validateType(


    type) {
      if (TYPES$1.filter(function (_type) {return type === _type;}).length) {
        return true;}


      throw new Error('Invalid type ' + type + ' received for Token');} }]);return Token;}();

var 

Encoder = function () {function Encoder() {babelHelpers.classCallCheck(this, Encoder);}babelHelpers.createClass(Encoder, null, [{ key: 'encode', value: function encode(
    tokens) {
      if (!isArray(tokens)) {
        throw new Error('tokens should be array of Token');}


      var mediates = tokens.map(function (token) {return Encoder.encodeToken(token);});
      var inits = mediates.
      map(function (mediate, idx) {return mediate.init(Mediate.offsetFor(mediates, idx));}).
      join('');
      var closings = mediates.
      map(function (mediate, idx) {return mediate.closing(Mediate.offsetFor(mediates, idx));}).
      join('');

      return '' + inits + closings;} }, { key: 'encodeToken', value: function encodeToken(


    token) {
      if (!isInstanceOf(token, Token)) {
        throw new Error('token should be instanceof Token');}


      switch (token.type) {
        case 'address':
          return new Mediate('raw', padAddress(token.value));

        case 'int':
        case 'uint':
          return new Mediate('raw', padU32(token.value));

        case 'bool':
          return new Mediate('raw', padBool(token.value));

        case 'fixedBytes':
          return new Mediate('raw', padFixedBytes(token.value));

        case 'bytes':
          return new Mediate('prefixed', padBytes(token.value));

        case 'string':
          return new Mediate('prefixed', padString(token.value));

        case 'fixedArray':
        case 'array':
          return new Mediate(token.type, token.value.map(function (token) {return Encoder.encodeToken(token);}));

        default:
          throw new Error('Invalid token type ' + token.type + ' in encodeToken');}} }]);return Encoder;}();

var TYPES$2 = ['address', 'bytes', 'int', 'uint', 'bool', 'string', 'array', 'fixedBytes', 'fixedArray'];var 

ParamType = function () {
  function ParamType(type, subtype, length) {babelHelpers.classCallCheck(this, ParamType);
    ParamType.validateType(type);

    this._type = type;
    this._subtype = subtype;
    this._length = length;}babelHelpers.createClass(ParamType, [{ key: 'type', get: function get() 


    {
      return this._type;} }, { key: 'subtype', get: function get() 


    {
      return this._subtype;} }, { key: 'length', get: function get() 


    {
      return this._length;} }], [{ key: 'validateType', value: function validateType(


    type) {
      if (TYPES$2.filter(function (_type) {return type === _type;}).length) {
        return true;}


      throw new Error('Invalid type ' + type + ' received for ParamType');} }]);return ParamType;}();

function toParamType(type) {
  if (type[type.length - 1] === ']') {
    var last = type.lastIndexOf('[');
    var length = type.substr(last + 1, type.length - last - 2);
    var subtype = toParamType(type.substr(0, last));

    if (length.length === 0) {
      return new ParamType('array', subtype);}


    return new ParamType('fixedArray', subtype, parseInt(length, 10));}


  switch (type) {
    case 'address':
    case 'bool':
    case 'bytes':
    case 'string':
      return new ParamType(type);

    case 'int':
    case 'uint':
      return new ParamType(type, null, 256);

    default:
      if (type.indexOf('uint') === 0) {
        return new ParamType('uint', null, parseInt(type.substr(4), 10));} else 
      if (type.indexOf('int') === 0) {
        return new ParamType('int', null, parseInt(type.substr(3), 10));} else 
      if (type.indexOf('bytes') === 0) {
        return new ParamType('fixedBytes', null, parseInt(type.substr(5), 10));}


      throw new Error('Cannot convert ' + type + ' to valid ParamType');}}

var 

Param = function () {
  function Param(name, type) {babelHelpers.classCallCheck(this, Param);
    this._name = name;
    this._kind = toParamType(type);}babelHelpers.createClass(Param, [{ key: 'name', get: function get() 


    {
      return this._name;} }, { key: 'kind', get: function get() 


    {
      return this._kind;} }], [{ key: 'toParams', value: function toParams(


    params) {
      return params.map(function (param) {return new Param(param.name, param.type);});} }]);return Param;}();

var 

Constructor = function () {
  function Constructor(abi) {babelHelpers.classCallCheck(this, Constructor);
    this._inputs = Param.toParams(abi.inputs || []);}babelHelpers.createClass(Constructor, [{ key: 'inputParamTypes', value: function inputParamTypes() 






    {
      return this._inputs.map(function (input) {return input.kind;});} }, { key: 'encodeCall', value: function encodeCall(


    tokens) {
      return Encoder.encode(tokens);} }, { key: 'inputs', get: function get() {return this._inputs;} }]);return Constructor;}();

var BytesTaken = function () {
  function BytesTaken(bytes, newOffset) {babelHelpers.classCallCheck(this, BytesTaken);
    this._bytes = bytes;
    this._newOffset = newOffset;}babelHelpers.createClass(BytesTaken, [{ key: "bytes", get: function get() 


    {
      return this._bytes;} }, { key: "newOffset", get: function get() 


    {
      return this._newOffset;} }]);return BytesTaken;}();

var DecodeResult = function () {
  function DecodeResult(token, newOffset) {babelHelpers.classCallCheck(this, DecodeResult);
    this._token = token;
    this._newOffset = newOffset;}babelHelpers.createClass(DecodeResult, [{ key: "token", get: function get() 


    {
      return this._token;} }, { key: "newOffset", get: function get() 


    {
      return this._newOffset;} }]);return DecodeResult;}();

function sliceData(data) {
  if (data.length % 64) {
    throw new Error('Invalid data length (not mod 64) passed to sliceData');}


  return data.match(/.{1,64}/g) || [];}

function asU32(slice) {
  // TODO: validation

  return new BigNumber(slice, 16);}


function asI32(slice) {
  if (new BigNumber(slice.substr(0, 1), 16).toString(2)[0] === '1') {
    return new BigNumber(slice, 16).
    minus(new BigNumber('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)).
    minus(1);}


  return new BigNumber(slice, 16);}


function asAddress(slice) {
  // TODO: address validation?

  return slice.slice(-40);}


function asBool(slice) {
  // TODO: everything else should be 0

  return new BigNumber(slice[63]).eq(1);}

var 

Decoder = function () {function Decoder() {babelHelpers.classCallCheck(this, Decoder);}babelHelpers.createClass(Decoder, null, [{ key: 'decode', value: function decode(
    params, data) {
      if (!isArray(params)) {
        throw new Error('Parameters should be array of ParamType');}


      var slices = sliceData(data);
      var offset = 0;

      return params.map(function (param) {
        var result = Decoder.decodeParam(param, slices, offset);
        offset = result.newOffset;
        return result.token;});} }, { key: 'peek', value: function peek(



    slices, position) {
      if (!slices || !slices[position]) {
        throw new Error('Invalid position ' + position + ' in slices peek');}


      return slices[position];} }, { key: 'takeBytes', value: function takeBytes(


    slices, position, length) {
      var slicesLength = Math.floor((length + 31) / 32);
      var bytesStr = '';

      for (var idx = 0; idx < slicesLength; idx++) {
        bytesStr = '' + bytesStr + Decoder.peek(slices, position + idx);}


      var bytes = bytesStr.substr(0, length * 2).match(/.{1,2}/g).map(function (code) {return parseInt(code, 16);});

      return new BytesTaken(bytes, position + slicesLength);} }, { key: 'decodeParam', value: function decodeParam(


    param, slices, offset) {
      if (!isInstanceOf(param, ParamType)) {
        throw new Error('param should be instanceof ParamType');}


      var tokens = [];
      var taken = void 0;
      var lengthOffset = void 0;
      var length = void 0;
      var newOffset = void 0;

      switch (param.type) {
        case 'address':
          return new DecodeResult(new Token(param.type, asAddress(Decoder.peek(slices, offset))), offset + 1);

        case 'bool':
          return new DecodeResult(new Token(param.type, asBool(Decoder.peek(slices, offset))), offset + 1);

        case 'int':
          return new DecodeResult(new Token(param.type, asI32(Decoder.peek(slices, offset))), offset + 1);

        case 'uint':
          return new DecodeResult(new Token(param.type, asU32(Decoder.peek(slices, offset))), offset + 1);

        case 'fixedBytes':
          taken = Decoder.takeBytes(slices, offset, param.length);

          return new DecodeResult(new Token(param.type, taken.bytes), taken.newOffset);

        case 'bytes':
          lengthOffset = asU32(Decoder.peek(slices, offset)).div(32).toNumber();
          length = asU32(Decoder.peek(slices, lengthOffset)).toNumber();
          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);

          return new DecodeResult(new Token(param.type, taken.bytes), offset + 1);

        case 'string':
          lengthOffset = asU32(Decoder.peek(slices, offset)).div(32).toNumber();
          length = asU32(Decoder.peek(slices, lengthOffset)).toNumber();
          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);

          var str = taken.bytes.map(function (code) {return String.fromCharCode(code);}).join('');

          return new DecodeResult(new Token(param.type, utf8.decode(str)), offset + 1);

        case 'array':
          lengthOffset = asU32(Decoder.peek(slices, offset)).div(32).toNumber();
          length = asU32(Decoder.peek(slices, lengthOffset)).toNumber();
          newOffset = lengthOffset + 1;

          for (var idx = 0; idx < length; idx++) {
            var result = Decoder.decodeParam(param.subtype, slices, newOffset);
            newOffset = result.newOffset;
            tokens.push(result.token);}


          return new DecodeResult(new Token(param.type, tokens), offset + 1);

        case 'fixedArray':
          newOffset = offset;

          for (var _idx = 0; _idx < param.length; _idx++) {
            var _result = Decoder.decodeParam(param.subtype, slices, newOffset);
            newOffset = _result.newOffset;
            tokens.push(_result.token);}


          return new DecodeResult(new Token(param.type, tokens), newOffset);

        default:
          throw new Error('Invalid param type ' + param.type + ' in decodeParam');}} }]);return Decoder;}();

var DecodedLog = function () {
  function DecodedLog(params, address) {babelHelpers.classCallCheck(this, DecodedLog);
    this._params = params;
    this._address = address;}babelHelpers.createClass(DecodedLog, [{ key: "address", get: function get() 


    {
      return this._address;} }, { key: "params", get: function get() 


    {
      return this._params;} }]);return DecodedLog;}();

var 

DecodedLogParam = function () {
  function DecodedLogParam(name, kind, token) {babelHelpers.classCallCheck(this, DecodedLogParam);
    if (!isInstanceOf(kind, ParamType)) {
      throw new Error('kind not instanceof ParamType');} else 
    if (!isInstanceOf(token, Token)) {
      throw new Error('token not instanceof Token');}


    this._name = name;
    this._kind = kind;
    this._token = token;}babelHelpers.createClass(DecodedLogParam, [{ key: 'name', get: function get() 


    {
      return this._name;} }, { key: 'kind', get: function get() 


    {
      return this._kind;} }, { key: 'token', get: function get() 


    {
      return this._token;} }]);return DecodedLogParam;}();

var 

EventParam = function () {
  function EventParam(name, type, indexed) {babelHelpers.classCallCheck(this, EventParam);
    this._name = name;
    this._kind = toParamType(type);
    this._indexed = !!indexed;}babelHelpers.createClass(EventParam, [{ key: 'name', get: function get() 


    {
      return this._name;} }, { key: 'kind', get: function get() 


    {
      return this._kind;} }, { key: 'indexed', get: function get() 


    {
      return this._indexed;} }], [{ key: 'toEventParams', value: function toEventParams(


    params) {
      return params.map(function (param) {return new EventParam(param.name, param.type, param.indexed);});} }]);return EventParam;}();

var 

Event = function () {
  function Event(abi) {babelHelpers.classCallCheck(this, Event);
    this._name = abi.name;
    this._inputs = EventParam.toEventParams(abi.inputs || []);
    this._anonymous = !!abi.anonymous;}babelHelpers.createClass(Event, [{ key: 'inputParamTypes', value: function inputParamTypes() 














    {
      return this._inputs.map(function (input) {return input.kind;});} }, { key: 'inputParamNames', value: function inputParamNames() 


    {
      return this._inputs.map(function (input) {return input.name;});} }, { key: 'indexedParams', value: function indexedParams(


    indexed) {
      return this._inputs.filter(function (input) {return input.indexed === indexed;});} }, { key: 'decodeLog', value: function decodeLog(


    topics, data) {
      var topicParams = this.indexedParams(true);
      var dataParams = this.indexedParams(false);

      var address = void 0;
      var toSkip = void 0;

      if (!this.anonymous) {
        address = asAddress(topics[0]);
        toSkip = 1;} else 
      {
        toSkip = 0;}


      var topicTypes = topicParams.map(function (param) {return param.kind;});
      var flatTopics = topics.filter(function (topic, idx) {return idx >= toSkip;}).join('');
      var topicTokens = Decoder.decode(topicTypes, flatTopics);

      if (topicTokens.length !== topics.length - toSkip) {
        throw new Error('Invalid topic data');}


      var dataTypes = dataParams.map(function (param) {return param.kind;});
      var dataTokens = Decoder.decode(dataTypes, data);

      var namedTokens = {};

      topicParams.forEach(function (param, idx) {
        namedTokens[param.name] = topicTokens[idx];});

      dataParams.forEach(function (param, idx) {
        namedTokens[param.name] = dataTokens[idx];});


      var inputParamTypes = this.inputParamTypes();
      var decodedParams = this.inputParamNames().
      map(function (name, idx) {return new DecodedLogParam(name, inputParamTypes[idx], namedTokens[name]);});

      return new DecodedLog(decodedParams, address);} }, { key: 'name', get: function get() {return this._name;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'anonymous', get: function get() {return this._anonymous;} }]);return Event;}();

// eslint-disable-line camelcase

function signature(name, params) {
  var types = (params || []).map(function (input) {return input.type;}).join(',');
  var id = (name || '') + '(' + types + ')';

  return jsSha3.keccak_256(id).substr(0, 8);}

var 

Func = function () {
  function Func(abi) {babelHelpers.classCallCheck(this, Func);
    this._name = abi.name;
    this._inputs = Param.toParams(abi.inputs || []);
    this._outputs = Param.toParams(abi.outputs || []);}babelHelpers.createClass(Func, [{ key: 'inputParamTypes', value: function inputParamTypes() 














    {
      return this._inputs.map(function (input) {return input.kind;});} }, { key: 'outputParamTypes', value: function outputParamTypes() 


    {
      return this._outputs.map(function (output) {return output.kind;});} }, { key: 'encodeCall', value: function encodeCall(


    tokens) {
      var signed = signature(this.name, this.inputParamTypes());
      var encoded = Encoder.encode(tokens);

      return '' + signed + encoded;} }, { key: 'decodeOutput', value: function decodeOutput(


    data) {
      return Decoder.decode(this.outputParamTypes(), data);} }, { key: 'name', get: function get() {return this._name;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'outputs', get: function get() {return this._outputs;} }]);return Func;}();

var 

Interface = function () {
  function Interface(abi) {babelHelpers.classCallCheck(this, Interface);
    this._interface = Interface.parseABI(abi);}babelHelpers.createClass(Interface, [{ key: 'interface', get: function get() 


    {
      return this._interface;} }, { key: 'constructors', get: function get() 


    {
      return this._interface.filter(function (item) {return item instanceof Constructor;});} }, { key: 'events', get: function get() 


    {
      return this._interface.filter(function (item) {return item instanceof Event;});} }, { key: 'functions', get: function get() 


    {
      return this._interface.filter(function (item) {return item instanceof Func;});} }], [{ key: 'parseABI', value: function parseABI(


    abi) {
      return abi.map(function (item) {
        switch (item.type) {
          case 'constructor':
            return new Constructor(item);

          case 'event':
            return new Event(item);

          case 'function':
            return new Func(item);

          default:
            throw new Error('Unknown ABI type ' + item.type);}});} }]);return Interface;}();

var 

EthAbi = function (_Interface) {babelHelpers.inherits(EthAbi, _Interface);function EthAbi() {babelHelpers.classCallCheck(this, EthAbi);return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(EthAbi).apply(this, arguments));}return EthAbi;}(Interface);

module.exports = EthAbi;/* Tue May 31 10:46:38 UTC 2016 */
