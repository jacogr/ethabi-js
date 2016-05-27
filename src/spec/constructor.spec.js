import Constructor from './constructor';
import Param from './param';
import Token from '../token';

describe('spec/Constructor', () => {
  const bool = new Param('boolin', 'bool');
  const string = new Param('stringin', 'string');

  const inputs = [bool, string];
  const cr = new Constructor(inputs);

  describe('constructor', () => {
    it('requires inputs array', () => {
      expect(() => new Constructor('blah')).to.throw(/array/);
    });

    it('requires inputs items to be EventParam', () => {
      expect(() => new Constructor([1])).to.throw(/instance/);
    });

    it('stores the inputs as received', () => {
      expect(cr.inputs).to.deep.equal(inputs);
    });

    it('matches empty inputs with []', () => {
      expect(new Constructor().inputs).to.deep.equal([]);
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
