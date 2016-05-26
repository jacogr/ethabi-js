import Constructor from './constructor';
import Param from './param';
import Token from '../token';

describe('spec/Constructor', () => {
  const bool = new Param('boolin', 'bool');
  const string = new Param('stringin', 'string');

  const inputs = [bool, string];
  const cr = new Constructor(inputs);

  describe('constructor', () => {
    it('stores the inputs as received', () => {
      expect(cr.inputs).to.deep.equal(inputs);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(cr.inputParamTypes()).to.deep.equal([bool.kind, string.kind]);
    });
  });

  describe('encodeCall', () => {
    it('encodes correctly', () => {
      const result = cr.encodeCall([new Token('bool', true), new Token('string', 'jacogr')]);

      expect(result).to.equal('0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });
});
