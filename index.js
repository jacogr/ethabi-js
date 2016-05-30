exports["EthAbi"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _spec = __webpack_require__(1);var _spec2 = _interopRequireDefault(_spec);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _spec2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _interface = __webpack_require__(2);var _interface2 = _interopRequireDefault(_interface);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _interface2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _constructor = __webpack_require__(5);var _constructor2 = _interopRequireDefault(_constructor);
	var _event = __webpack_require__(18);var _event2 = _interopRequireDefault(_event);
	var _function = __webpack_require__(30);var _function2 = _interopRequireDefault(_function);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Interface = function () {
	  function Interface(abi) {(0, _classCallCheck3.default)(this, Interface);
	    this._interface = Interface.parseABI(abi);}(0, _createClass3.default)(Interface, [{ key: 'interface', get: function get() 
	
	
	    {
	      return this._interface;} }, { key: 'constructors', get: function get() 
	
	
	    {
	      return this._interface.filter(function (item) {return item instanceof _constructor2.default;});} }, { key: 'events', get: function get() 
	
	
	    {
	      return this._interface.filter(function (item) {return item instanceof _event2.default;});} }, { key: 'functions', get: function get() 
	
	
	    {
	      return this._interface.filter(function (item) {return item instanceof _function2.default;});} }], [{ key: 'parseABI', value: function parseABI(
	
	
	    abi) {
	      return abi.map(function (item) {
	        switch (item.type) {
	          case 'constructor':
	            return new _constructor2.default(item);
	
	          case 'event':
	            return new _event2.default(item);
	
	          case 'function':
	            return new _function2.default(item);
	
	          default:
	            throw new Error('Unknown ABI type ' + item.type);}});} }]);return Interface;}();exports.default = Interface;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _encoder = __webpack_require__(6);var _encoder2 = _interopRequireDefault(_encoder);
	var _param = __webpack_require__(15);var _param2 = _interopRequireDefault(_param);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Constructor = function () {
	  function Constructor(abi) {(0, _classCallCheck3.default)(this, Constructor);
	    this._inputs = _param2.default.toParams(abi.inputs || []);}(0, _createClass3.default)(Constructor, [{ key: 'inputParamTypes', value: function inputParamTypes() 
	
	
	
	
	
	
	    {
	      return this._inputs.map(function (input) {return input.kind;});} }, { key: 'encodeCall', value: function encodeCall(
	
	
	    tokens) {
	      return _encoder2.default.encode(tokens);} }, { key: 'inputs', get: function get() {return this._inputs;} }]);return Constructor;}();exports.default = Constructor;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _encoder = __webpack_require__(7);var _encoder2 = _interopRequireDefault(_encoder);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _encoder2.default;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _pad = __webpack_require__(8);
	var _mediate = __webpack_require__(12);var _mediate2 = _interopRequireDefault(_mediate);
	var _token = __webpack_require__(13);var _token2 = _interopRequireDefault(_token);
	var _types = __webpack_require__(11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Encoder = function () {function Encoder() {(0, _classCallCheck3.default)(this, Encoder);}(0, _createClass3.default)(Encoder, null, [{ key: 'encode', value: function encode(
	    tokens) {
	      if (!(0, _types.isArray)(tokens)) {
	        throw new Error('tokens should be array of Token');}
	
	
	      var mediates = tokens.map(function (token) {return Encoder.encodeToken(token);});
	      var inits = mediates.
	      map(function (mediate, idx) {return mediate.init(_mediate2.default.offsetFor(mediates, idx));}).
	      join('');
	      var closings = mediates.
	      map(function (mediate, idx) {return mediate.closing(_mediate2.default.offsetFor(mediates, idx));}).
	      join('');
	
	      return '' + inits + closings;} }, { key: 'encodeToken', value: function encodeToken(
	
	
	    token) {
	      if (!(0, _types.isInstanceOf)(token, _token2.default)) {
	        throw new Error('token should be instanceof Token');}
	
	
	      switch (token.type) {
	        case 'address':
	          return new _mediate2.default('raw', (0, _pad.padAddress)(token.value));
	
	        case 'int':
	        case 'uint':
	          return new _mediate2.default('raw', (0, _pad.padU32)(token.value));
	
	        case 'bool':
	          return new _mediate2.default('raw', (0, _pad.padBool)(token.value));
	
	        case 'fixedBytes':
	          return new _mediate2.default('raw', (0, _pad.padFixedBytes)(token.value));
	
	        case 'bytes':
	          return new _mediate2.default('prefixed', (0, _pad.padBytes)(token.value));
	
	        case 'string':
	          return new _mediate2.default('prefixed', (0, _pad.padString)(token.value));
	
	        case 'fixedArray':
	        case 'array':
	          return new _mediate2.default(token.type, token.value.map(function (token) {return Encoder.encodeToken(token);}));
	
	        default:
	          throw new Error('Invalid token type ' + token.type + ' in encodeToken');}} }]);return Encoder;}();exports.default = Encoder;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
	
	
	
	
	
	
	padAddress = padAddress;exports.
	
	
	
	padBool = padBool;exports.
	
	
	
	padU32 = padU32;exports.
	
	
	
	
	
	
	
	
	
	
	padBytes = padBytes;exports.
	
	
	
	
	
	padFixedBytes = padFixedBytes;exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	padString = padString;var _bignumber = __webpack_require__(9);var _bignumber2 = _interopRequireDefault(_bignumber);var _utf = __webpack_require__(10);var _utf2 = _interopRequireDefault(_utf);var _types = __webpack_require__(11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var ZERO_64 = '0000000000000000000000000000000000000000000000000000000000000000';function padAddress(input) {return ('' + ZERO_64 + input).slice(-64);}function padBool(input) {return ('' + ZERO_64 + (input ? '1' : '0')).slice(-64);}function padU32(input) {var bn = new _bignumber2.default(input);if (bn.lessThan(0)) {bn = new _bignumber2.default('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16).plus(bn).plus(1);}return ('' + ZERO_64 + bn.toString(16)).slice(-64);}function padBytes(input) {var length = (0, _types.isArray)(input) ? input.length : ('' + input).length / 2;return '' + padU32(length) + padFixedBytes(input);}function padFixedBytes(input) {var sinput = void 0;if ((0, _types.isArray)(input)) {sinput = input.map(function (code) {return code.toString(16);}).join('');} else {sinput = '' + input;}var max = Math.floor((sinput.length + 63) / 64) * 64;return ('' + sinput + ZERO_64).substr(0, max);}function padString(input) {
	  var encoded = _utf2.default.encode(input).
	  split('').
	  map(function (char) {return char.charCodeAt(0).toString(16);}).
	  join('');
	
	  return padBytes(encoded);}

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("bignumber.js");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("utf8");

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.
	
	
	
	isString = isString;exports.
	
	
	
	isInstanceOf = isInstanceOf;function isArray(test) {return Object.prototype.toString.call(test) === '[object Array]';}function isString(test) {return Object.prototype.toString.call(test) === '[object String]';}function isInstanceOf(test, clazz) {
	  return test instanceof clazz;}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _pad = __webpack_require__(8);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var TYPES = ['raw', 'prefixed', 'fixedArray', 'array'];var 
	
	Mediate = function () {
	  function Mediate(type, value) {(0, _classCallCheck3.default)(this, Mediate);
	    Mediate.validateType(type);
	
	    this._type = type;
	    this._value = value;}(0, _createClass3.default)(Mediate, [{ key: 'initLength', value: function initLength() 
	
	
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
	          return (0, _pad.padU32)(suffixOffset);}} }, { key: 'closing', value: function closing(
	
	
	
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
	          var prefix = (0, _pad.padU32)(this._value.length);
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
	
	
	      throw new Error('Invalid type ' + type + ' received for Mediate.validateType');} }]);return Mediate;}();exports.default = Mediate;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _token = __webpack_require__(14);var _token2 = _interopRequireDefault(_token);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _token2.default;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var TYPES = ['address', 'fixedArray', 'array', 'fixedBytes', 'bytes', 'bool', 'int', 'uint', 'string'];var 
	
	Token = function () {
	  function Token(type, value) {(0, _classCallCheck3.default)(this, Token);
	    Token.validateType(type);
	
	    this._type = type;
	    this._value = value;}(0, _createClass3.default)(Token, [{ key: 'type', get: function get() 
	
	
	    {
	      return this._type;} }, { key: 'value', get: function get() 
	
	
	    {
	      return this._value;} }], [{ key: 'validateType', value: function validateType(
	
	
	    type) {
	      if (TYPES.filter(function (_type) {return type === _type;}).length) {
	        return true;}
	
	
	      throw new Error('Invalid type ' + type + ' received for Token');} }]);return Token;}();exports.default = Token;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _format = __webpack_require__(16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Param = function () {
	  function Param(name, type) {(0, _classCallCheck3.default)(this, Param);
	    this._name = name;
	    this._kind = (0, _format.toParamType)(type);}(0, _createClass3.default)(Param, [{ key: 'name', get: function get() 
	
	
	    {
	      return this._name;} }, { key: 'kind', get: function get() 
	
	
	    {
	      return this._kind;} }], [{ key: 'toParams', value: function toParams(
	
	
	    params) {
	      return params.map(function (param) {return new Param(param.name, param.type);});} }]);return Param;}();exports.default = Param;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
	
	toParamType = toParamType;exports.
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	fromParamType = fromParamType;var _paramType = __webpack_require__(17);var _paramType2 = _interopRequireDefault(_paramType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function toParamType(type) {if (type[type.length - 1] === ']') {var last = type.lastIndexOf('[');var length = type.substr(last + 1, type.length - last - 2);var subtype = toParamType(type.substr(0, last));if (length.length === 0) {return new _paramType2.default('array', subtype);}return new _paramType2.default('fixedArray', subtype, parseInt(length, 10));}switch (type) {case 'address':case 'bool':case 'bytes':case 'string':return new _paramType2.default(type);case 'int':case 'uint':return new _paramType2.default(type, null, 256);default:if (type.indexOf('uint') === 0) {return new _paramType2.default('uint', null, parseInt(type.substr(4), 10));} else if (type.indexOf('int') === 0) {return new _paramType2.default('int', null, parseInt(type.substr(3), 10));} else if (type.indexOf('bytes') === 0) {return new _paramType2.default('fixedBytes', null, parseInt(type.substr(5), 10));}throw new Error('Cannot convert ' + type + ' to valid ParamType');}}function fromParamType(paramType) {
	  switch (paramType.type) {
	    case 'address':
	    case 'bool':
	    case 'bytes':
	    case 'string':
	      return paramType.type;
	
	    case 'int':
	    case 'uint':
	      return '' + paramType.type + paramType.length;
	
	    case 'fixedBytes':
	      return 'bytes' + paramType.length;
	
	    case 'fixedArray':
	      return fromParamType(paramType.subtype) + '[' + paramType.length + ']';
	
	    case 'array':
	      return fromParamType(paramType.subtype) + '[]';
	
	    default:
	      throw new Error('Cannot convert from ParamType ' + paramType.type);}}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var TYPES = ['address', 'bytes', 'int', 'uint', 'bool', 'string', 'array', 'fixedBytes', 'fixedArray'];var 
	
	ParamType = function () {
	  function ParamType(type, subtype, length) {(0, _classCallCheck3.default)(this, ParamType);
	    ParamType.validateType(type);
	
	    this._type = type;
	    this._subtype = subtype;
	    this._length = length;}(0, _createClass3.default)(ParamType, [{ key: 'type', get: function get() 
	
	
	    {
	      return this._type;} }, { key: 'subtype', get: function get() 
	
	
	    {
	      return this._subtype;} }, { key: 'length', get: function get() 
	
	
	    {
	      return this._length;} }], [{ key: 'validateType', value: function validateType(
	
	
	    type) {
	      if (TYPES.filter(function (_type) {return type === _type;}).length) {
	        return true;}
	
	
	      throw new Error('Invalid type ' + type + ' received for ParamType');} }]);return ParamType;}();exports.default = ParamType;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _event = __webpack_require__(19);var _event2 = _interopRequireDefault(_event);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _event2.default;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _decoder = __webpack_require__(20);var _decoder2 = _interopRequireDefault(_decoder);
	var _decodedLog = __webpack_require__(27);var _decodedLog2 = _interopRequireDefault(_decodedLog);
	var _decodedLogParam = __webpack_require__(28);var _decodedLogParam2 = _interopRequireDefault(_decodedLogParam);
	var _eventParam = __webpack_require__(29);var _eventParam2 = _interopRequireDefault(_eventParam);
	var _sliceAs = __webpack_require__(26);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Event = function () {
	  function Event(abi) {(0, _classCallCheck3.default)(this, Event);
	    this._name = abi.name;
	    this._inputs = _eventParam2.default.toEventParams(abi.inputs || []);
	    this._anonymous = !!abi.anonymous;}(0, _createClass3.default)(Event, [{ key: 'inputParamTypes', value: function inputParamTypes() 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
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
	        address = (0, _sliceAs.asAddress)(topics[0]);
	        toSkip = 1;} else 
	      {
	        toSkip = 0;}
	
	
	      var topicTypes = topicParams.map(function (param) {return param.kind;});
	      var flatTopics = topics.filter(function (topic, idx) {return idx >= toSkip;}).join('');
	      var topicTokens = _decoder2.default.decode(topicTypes, flatTopics);
	
	      if (topicTokens.length !== topics.length - toSkip) {
	        throw new Error('Invalid topic data');}
	
	
	      var dataTypes = dataParams.map(function (param) {return param.kind;});
	      var dataTokens = _decoder2.default.decode(dataTypes, data);
	
	      var namedTokens = {};
	
	      topicParams.forEach(function (param, idx) {
	        namedTokens[param.name] = topicTokens[idx];});
	
	      dataParams.forEach(function (param, idx) {
	        namedTokens[param.name] = dataTokens[idx];});
	
	
	      var inputParamTypes = this.inputParamTypes();
	      var decodedParams = this.inputParamNames().
	      map(function (name, idx) {return new _decodedLogParam2.default(name, inputParamTypes[idx], namedTokens[name]);});
	
	      return new _decodedLog2.default(decodedParams, address);} }, { key: 'name', get: function get() {return this._name;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'anonymous', get: function get() {return this._anonymous;} }]);return Event;}();exports.default = Event;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _decoder = __webpack_require__(21);var _decoder2 = _interopRequireDefault(_decoder);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _decoder2.default;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _utf = __webpack_require__(10);var _utf2 = _interopRequireDefault(_utf);
	
	var _token = __webpack_require__(13);var _token2 = _interopRequireDefault(_token);
	var _bytesTaken = __webpack_require__(22);var _bytesTaken2 = _interopRequireDefault(_bytesTaken);
	var _decodeResult = __webpack_require__(23);var _decodeResult2 = _interopRequireDefault(_decodeResult);
	var _paramType = __webpack_require__(24);var _paramType2 = _interopRequireDefault(_paramType);
	var _slice = __webpack_require__(25);
	var _sliceAs = __webpack_require__(26);
	var _types = __webpack_require__(11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Decoder = function () {function Decoder() {(0, _classCallCheck3.default)(this, Decoder);}(0, _createClass3.default)(Decoder, null, [{ key: 'decode', value: function decode(
	    params, data) {
	      if (!(0, _types.isArray)(params)) {
	        throw new Error('Parameters should be array of ParamType');}
	
	
	      var slices = (0, _slice.sliceData)(data);
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
	
	      return new _bytesTaken2.default(bytes, position + slicesLength);} }, { key: 'decodeParam', value: function decodeParam(
	
	
	    param, slices, offset) {
	      if (!(0, _types.isInstanceOf)(param, _paramType2.default)) {
	        throw new Error('param should be instanceof ParamType');}
	
	
	      var tokens = [];
	      var taken = void 0;
	      var lengthOffset = void 0;
	      var length = void 0;
	      var newOffset = void 0;
	
	      switch (param.type) {
	        case 'address':
	          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asAddress)(Decoder.peek(slices, offset))), offset + 1);
	
	        case 'bool':
	          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asBool)(Decoder.peek(slices, offset))), offset + 1);
	
	        case 'int':
	          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asI32)(Decoder.peek(slices, offset))), offset + 1);
	
	        case 'uint':
	          return new _decodeResult2.default(new _token2.default(param.type, (0, _sliceAs.asU32)(Decoder.peek(slices, offset))), offset + 1);
	
	        case 'fixedBytes':
	          taken = Decoder.takeBytes(slices, offset, param.length);
	
	          return new _decodeResult2.default(new _token2.default(param.type, taken.bytes), taken.newOffset);
	
	        case 'bytes':
	          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
	          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
	          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);
	
	          return new _decodeResult2.default(new _token2.default(param.type, taken.bytes), offset + 1);
	
	        case 'string':
	          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
	          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
	          taken = Decoder.takeBytes(slices, lengthOffset + 1, length);
	
	          var str = taken.bytes.map(function (code) {return String.fromCharCode(code);}).join('');
	
	          return new _decodeResult2.default(new _token2.default(param.type, _utf2.default.decode(str)), offset + 1);
	
	        case 'array':
	          lengthOffset = (0, _sliceAs.asU32)(Decoder.peek(slices, offset)).div(32).toNumber();
	          length = (0, _sliceAs.asU32)(Decoder.peek(slices, lengthOffset)).toNumber();
	          newOffset = lengthOffset + 1;
	
	          for (var idx = 0; idx < length; idx++) {
	            var result = Decoder.decodeParam(param.subtype, slices, newOffset);
	            newOffset = result.newOffset;
	            tokens.push(result.token);}
	
	
	          return new _decodeResult2.default(new _token2.default(param.type, tokens), offset + 1);
	
	        case 'fixedArray':
	          newOffset = offset;
	
	          for (var _idx = 0; _idx < param.length; _idx++) {
	            var _result = Decoder.decodeParam(param.subtype, slices, newOffset);
	            newOffset = _result.newOffset;
	            tokens.push(_result.token);}
	
	
	          return new _decodeResult2.default(new _token2.default(param.type, tokens), newOffset);
	
	        default:
	          throw new Error('Invalid param type ' + param.type + ' in decodeParam');}} }]);return Decoder;}();exports.default = Decoder;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var BytesTaken = function () {
	  function BytesTaken(bytes, newOffset) {(0, _classCallCheck3.default)(this, BytesTaken);
	    this._bytes = bytes;
	    this._newOffset = newOffset;}(0, _createClass3.default)(BytesTaken, [{ key: "bytes", get: function get() 
	
	
	    {
	      return this._bytes;} }, { key: "newOffset", get: function get() 
	
	
	    {
	      return this._newOffset;} }]);return BytesTaken;}();exports.default = BytesTaken;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var DecodeResult = function () {
	  function DecodeResult(token, newOffset) {(0, _classCallCheck3.default)(this, DecodeResult);
	    this._token = token;
	    this._newOffset = newOffset;}(0, _createClass3.default)(DecodeResult, [{ key: "token", get: function get() 
	
	
	    {
	      return this._token;} }, { key: "newOffset", get: function get() 
	
	
	    {
	      return this._newOffset;} }]);return DecodeResult;}();exports.default = DecodeResult;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = undefined;var _paramType = __webpack_require__(17);var _paramType2 = _interopRequireDefault(_paramType);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default = _paramType2.default;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.sliceData = sliceData;function sliceData(data) {
	  if (data.length % 64) {
	    throw new Error('Invalid data length (not mod 64) passed to sliceData');}
	
	
	  return data.match(/.{1,64}/g) || [];}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
	
	asU32 = asU32;exports.
	
	
	
	
	
	asI32 = asI32;exports.
	
	
	
	
	
	
	
	
	
	asAddress = asAddress;exports.
	
	
	
	
	
	asBool = asBool;var _bignumber = __webpack_require__(9);var _bignumber2 = _interopRequireDefault(_bignumber);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asU32(slice) {// TODO: validation
	  return new _bignumber2.default(slice, 16);}function asI32(slice) {if (new _bignumber2.default(slice.substr(0, 1), 16).toString(2)[0] === '1') {return new _bignumber2.default(slice, 16).minus(new _bignumber2.default('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)).minus(1);}return new _bignumber2.default(slice, 16);}function asAddress(slice) {// TODO: address validation?
	  return slice.slice(-40);}function asBool(slice) {// TODO: everything else should be 0
	  return new _bignumber2.default(slice[63]).eq(1);}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var DecodedLog = function () {
	  function DecodedLog(params, address) {(0, _classCallCheck3.default)(this, DecodedLog);
	    this._params = params;
	    this._address = address;}(0, _createClass3.default)(DecodedLog, [{ key: "address", get: function get() 
	
	
	    {
	      return this._address;} }, { key: "params", get: function get() 
	
	
	    {
	      return this._params;} }]);return DecodedLog;}();exports.default = DecodedLog;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _paramType = __webpack_require__(24);var _paramType2 = _interopRequireDefault(_paramType);
	var _token = __webpack_require__(13);var _token2 = _interopRequireDefault(_token);
	var _types = __webpack_require__(11);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	DecodedLogParam = function () {
	  function DecodedLogParam(name, kind, token) {(0, _classCallCheck3.default)(this, DecodedLogParam);
	    if (!(0, _types.isInstanceOf)(kind, _paramType2.default)) {
	      throw new Error('kind not instanceof ParamType');} else 
	    if (!(0, _types.isInstanceOf)(token, _token2.default)) {
	      throw new Error('token not instanceof Token');}
	
	
	    this._name = name;
	    this._kind = kind;
	    this._token = token;}(0, _createClass3.default)(DecodedLogParam, [{ key: 'name', get: function get() 
	
	
	    {
	      return this._name;} }, { key: 'kind', get: function get() 
	
	
	    {
	      return this._kind;} }, { key: 'token', get: function get() 
	
	
	    {
	      return this._token;} }]);return DecodedLogParam;}();exports.default = DecodedLogParam;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _format = __webpack_require__(16);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	EventParam = function () {
	  function EventParam(name, type, indexed) {(0, _classCallCheck3.default)(this, EventParam);
	    this._name = name;
	    this._kind = (0, _format.toParamType)(type);
	    this._indexed = !!indexed;}(0, _createClass3.default)(EventParam, [{ key: 'name', get: function get() 
	
	
	    {
	      return this._name;} }, { key: 'kind', get: function get() 
	
	
	    {
	      return this._kind;} }, { key: 'indexed', get: function get() 
	
	
	    {
	      return this._indexed;} }], [{ key: 'toEventParams', value: function toEventParams(
	
	
	    params) {
	      return params.map(function (param) {return new EventParam(param.name, param.type, param.indexed);});} }]);return EventParam;}();exports.default = EventParam;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _classCallCheck2 = __webpack_require__(3);var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = __webpack_require__(4);var _createClass3 = _interopRequireDefault(_createClass2);var _decoder = __webpack_require__(20);var _decoder2 = _interopRequireDefault(_decoder);
	var _encoder = __webpack_require__(6);var _encoder2 = _interopRequireDefault(_encoder);
	var _param = __webpack_require__(15);var _param2 = _interopRequireDefault(_param);
	var _signature = __webpack_require__(31);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var 
	
	Func = function () {
	  function Func(abi) {(0, _classCallCheck3.default)(this, Func);
	    this._name = abi.name;
	    this._inputs = _param2.default.toParams(abi.inputs || []);
	    this._outputs = _param2.default.toParams(abi.outputs || []);}(0, _createClass3.default)(Func, [{ key: 'inputParamTypes', value: function inputParamTypes() 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	    {
	      return this._inputs.map(function (input) {return input.kind;});} }, { key: 'outputParamTypes', value: function outputParamTypes() 
	
	
	    {
	      return this._outputs.map(function (output) {return output.kind;});} }, { key: 'encodeCall', value: function encodeCall(
	
	
	    tokens) {
	      var signed = (0, _signature.signature)(this.name, this.inputParamTypes());
	      var encoded = _encoder2.default.encode(tokens);
	
	      return '' + signed + encoded;} }, { key: 'decodeOutput', value: function decodeOutput(
	
	
	    data) {
	      return _decoder2.default.decode(this.outputParamTypes(), data);} }, { key: 'name', get: function get() {return this._name;} }, { key: 'inputs', get: function get() {return this._inputs;} }, { key: 'outputs', get: function get() {return this._outputs;} }]);return Func;}();exports.default = Func;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.
	
	signature = signature;var _jsSha = __webpack_require__(32); // eslint-disable-line camelcase
	function signature(name, params) {var types = (params || []).map(function (input) {return input.type;}).join(',');
	  var id = (name || '') + '(' + types + ')';
	
	  return (0, _jsSha.keccak_256)(id).substr(0, 8);}

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = require("js-sha3");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map