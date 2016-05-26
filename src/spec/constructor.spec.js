import Constructor from './constructor';

describe('spec/Constructor', () => {
  const inputs = [{ kind: 'bool' }, { kind: 'string' }];
  const cr = new Constructor(inputs);

  describe('constructor', () => {
    it('stores the inputs as received', () => {
      expect(cr.inputs).to.deep.equal(inputs);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(cr.inputParamTypes()).to.deep.equal(['bool', 'string']);
    });
  });
});
