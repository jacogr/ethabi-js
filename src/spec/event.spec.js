import Event from './event';

describe('spec/Event', () => {
  const inputs = [{ name: 'a', kind: 'bool' }, { name: 'b', kind: 'uint', indexed: true }];
  const event = new Event('test', inputs, true);

  describe('constructor', () => {
    it('stores the parameters as received', () => {
      expect(event.name).to.equal('test');
      expect(event.inputs).to.deep.equal(inputs);
      expect(event.anonymous).to.be.true;
    });
  });

  describe('inputParamTypes', () => {
    it('returns all the types', () => {
      expect(event.inputParamTypes()).to.deep.equal(['bool', 'uint']);
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
});
