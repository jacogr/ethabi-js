import Constructor from './constructor';
import ParamType from './paramType';
import Token from '../token';

describe('spec/Constructor', () => {
  const bool = new ParamType('bool');
  const string = new ParamType('string');

  const inputs = [{ kind: bool }, { kind: string }];
  const cr = new Constructor(inputs);

  describe('constructor', () => {
    it('stores the inputs as received', () => {
      expect(cr.inputs).to.deep.equal(inputs);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(cr.inputParamTypes()).to.deep.equal([bool, string]);
    });
  });

  describe('encodeCall', () => {
    it('encodes correctly', () => {
      const result = cr.encodeCall([new Token('bool', true), new Token('string', 'jacogr')]);

      expect(result).to.equal('0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });
});
