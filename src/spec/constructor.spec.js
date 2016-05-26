import Constructor from './constructor';

describe('spec/Constructor', () => {
  const inputs = [{ kind: 'bool' }, { kind: 'string' }];

  describe('constructor', () => {
    it('store the inputs as received', () => {
      const cr = new Constructor(inputs);

      expect(cr.inputs).to.deep.equal(inputs);
    });
  });

  describe('paramTypes', () => {
    it('retries the input types as received', () => {
      const cr = new Constructor(inputs);

      expect(cr.paramTypes()).to.deep.equal(['bool', 'string']);
    });
  });
});
