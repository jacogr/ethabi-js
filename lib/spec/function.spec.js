import Func from './function';
import Param from './param';
import Token from '../token';

describe('spec/Function', () => {
  const uint = new Param('output', 'uint');
  const bool = new Param('boolin', 'bool');
  const string = new Param('stringin', 'string');

  const inputs = [bool, string];
  const outputs = [uint];
  const func = new Func('test', inputs, outputs);

  describe('constructor', () => {
    it('requires inputs array', () => {
      expect(() => new Func('test', 'blah')).to.throw(/array/);
    });

    it('requires inputs items to be EventParam', () => {
      expect(() => new Func('test', [1])).to.throw(/instance/);
    });

    it('requires outputs array', () => {
      expect(() => new Func('test', inputs, 'blah')).to.throw(/array/);
    });

    it('requires output items to be EventParam', () => {
      expect(() => new Func('test', inputs, [1])).to.throw(/instance/);
    });

    it('stores the parameters as received', () => {
      expect(func.name).to.equal('test');
      expect(func.inputs).to.deep.equal(inputs);
      expect(func.outputs).to.deep.equal(outputs);
    });

    it('matches empty inputs with []', () => {
      expect(new Func('test', null, outputs).inputs).to.deep.equal([]);
    });

    it('matches empty outputs with []', () => {
      expect(new Func('test', inputs).outputs).to.deep.equal([]);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(func.inputParamTypes()).to.deep.equal([bool.kind, string.kind]);
    });
  });

  describe('outputParamTypes', () => {
    it('retrieves the output types as received', () => {
      expect(func.outputParamTypes()).to.deep.equal([uint.kind]);
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
