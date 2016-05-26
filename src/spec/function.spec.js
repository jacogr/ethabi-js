import Func from './function';
import ParamType from './paramType';
import Token from '../token';

describe('spec/Function', () => {
  const uint256 = new ParamType('uint', null, 256);
  const bool = new ParamType('bool');
  const string = new ParamType('string');

  const inputs = [{ kind: bool }, { kind: string }];
  const outputs = [{ kind: uint256 }];
  const func = new Func('test', inputs, outputs);

  describe('constructor', () => {
    it('stores the parameters as received', () => {
      expect(func.name).to.equal('test');
      expect(func.inputs).to.deep.equal(inputs);
      expect(func.outputs).to.deep.equal(outputs);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(func.inputParamTypes()).to.deep.equal([bool, string]);
    });
  });

  describe('outputParamTypes', () => {
    it('retrieves the output types as received', () => {
      expect(func.outputParamTypes()).to.deep.equal([uint256]);
    });
  });

  describe('encodeCall', () => {
    it('encodes the call correctly', () => {
      const result = func.encodeCall([new Token('bool', true), new Token('string', 'jacogr')]);

      expect(result).to.equal('023562050000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000066a61636f67720000000000000000000000000000000000000000000000000000');
    });
  });

  describe('decodeOutput', () => {
    it('decodes the result correctly', () => {
      const result = func.decodeOutput('1111111111111111111111111111111111111111111111111111111111111111');

      expect(result[0].value.toString(16)).to.equal('1111111111111111111111111111111111111111111111111111111111111111');
    });
  });
});
