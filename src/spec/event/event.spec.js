import BigNumber from 'bignumber.js';

import Event from './event';
import EventParam from './eventParam';
import DecodedLogParam from './decodedLogParam';
import ParamType from '../paramType';
import Token from '../../token';

describe('spec/event/Event', () => {
  const inputs = [new EventParam('a', 'bool', false), new EventParam('b', 'uint', true)];
  const event = new Event('test', inputs, true);

  describe('constructor', () => {
    it('requires inputs array', () => {
      expect(() => new Event('test', null, true)).to.throw(/array/);
    });

    it('requires inputs items to be EventParam', () => {
      expect(() => new Event('test', [1], true)).to.throw(/instance/);
    });

    it('stores the parameters as received', () => {
      expect(event.name).to.equal('test');
      expect(event.inputs).to.deep.equal(inputs);
      expect(event.anonymous).to.be.true;
    });
  });

  describe('inputParamTypes', () => {
    it('returns all the types', () => {
      expect(event.inputParamTypes()).to.deep.equal([new ParamType('bool'), new ParamType('uint', null, 256)]);
    });
  });

  describe('inputParamNames', () => {
    it('returns all the names', () => {
      expect(event.inputParamNames()).to.deep.equal(['a', 'b']);
    });
  });

  describe('indexedParams', () => {
    it('returns all indexed parameters (indexed)', () => {
      expect(event.indexedParams(true)).to.deep.equal([inputs[1]]);
    });

    it('returns all indexed parameters (non-indexed)', () => {
      expect(event.indexedParams(false)).to.deep.equal([inputs[0]]);
    });
  });

  describe('decodeLog', () => {
    it('decodes an event', () => {
      const event = new Event('foo', [
        new EventParam('a', 'int', false),
        new EventParam('b', 'int', true),
        new EventParam('c', 'address', false),
        new EventParam('d', 'address', true) ], false);
      const decoded = event.decodeLog([
        '0000000000000000000000004444444444444444444444444444444444444444',
        '0000000000000000000000000000000000000000000000000000000000000002',
        '0000000000000000000000001111111111111111111111111111111111111111' ],
        '00000000000000000000000000000000000000000000000000000000000000030000000000000000000000002222222222222222222222222222222222222222');

      expect(decoded.address).to.equal('4444444444444444444444444444444444444444');
      expect(decoded.params).to.deep.equal([
        new DecodedLogParam('a', new ParamType('int', null, 256), new Token('int', new BigNumber(3))),
        new DecodedLogParam('b', new ParamType('int', null, 256), new Token('int', new BigNumber(2))),
        new DecodedLogParam('c', new ParamType('address'), new Token('address', '2222222222222222222222222222222222222222')),
        new DecodedLogParam('d', new ParamType('address'), new Token('address', '1111111111111111111111111111111111111111'))
      ]);
    });

    it('decodes an anonymous event', () => {
      const event = new Event('foo', [new EventParam('a', 'int', false)], true);
      const decoded = event.decodeLog([], '0000000000000000000000000000000000000000000000000000000000000003');

      expect(decoded.address).to.not.be.ok;
      expect(decoded.params).to.deep.equal([
        new DecodedLogParam('a', new ParamType('int', null, 256), new Token('int', new BigNumber(3)))
      ]);
    });

    it('throws on invalid topics', () => {
      const event = new Event('foo', [new EventParam('a', 'int', false)], true);

      expect(() => event.decodeLog(['0000000000000000000000004444444444444444444444444444444444444444'], '0000000000000000000000000000000000000000000000000000000000000003')).to.throw(/Invalid/);
    });
  });
});
