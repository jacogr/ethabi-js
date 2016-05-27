import Decoder from '../../decoder';
import DecodedLog from './decodedLog';
import DecodedLogParam from './decodedLogParam';
import EventParam from './eventParam';
import { asAddress } from '../../util/sliceAs';
import { isArray, isInstanceOf } from '../../util/types';

export default class Event {
  constructor (name, inputs, anonymous) {
    if (!isArray(inputs)) {
      throw new Error('inputs should be array of EventParam');
    } else {
      inputs.forEach((input, idx) => {
        if (!isInstanceOf(input, EventParam)) {
          throw new Error(`inputs[${idx}] not an instance of EventParam`);
        }
      });
    }

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

  decodeLog (topics, data) {
    const topicParams = this.indexedParams(true);
    const dataParams = this.indexedParams(false);

    let address;
    let toSkip;

    if (!this.anonymous) {
      address = asAddress(topics[0]);
      toSkip = 1;
    } else {
      toSkip = 0;
    }

    const topicTypes = topicParams.map((param) => param.kind);
    const flatTopics = topics.filter((topic, idx) => idx >= toSkip).join('');
    const topicTokens = Decoder.decode(topicTypes, flatTopics);

    if (topicTokens.length !== (topics.length - toSkip)) {
      throw new Error('Invalid topic data');
    }

    const dataTypes = dataParams.map((param) => param.kind);
    const dataTokens = Decoder.decode(dataTypes, data);

    const namedTokens = {};

    topicParams.forEach((param, idx) => {
      namedTokens[param.name] = topicTokens[idx];
    });
    dataParams.forEach((param, idx) => {
      namedTokens[param.name] = dataTokens[idx];
    });

    const inputParamTypes = this.inputParamTypes();
    const decodedParams = this.inputParamNames()
      .map((name, idx) => new DecodedLogParam(name, inputParamTypes[idx], namedTokens[name]));

    return new DecodedLog(decodedParams, address);
  }
}
