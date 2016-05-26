import EventParam from './eventParam';

describe('spec/eventParam', () => {
  describe('constructor', () => {
    const param = new EventParam('foo', 'uint', true);

    it('sets the properties', () => {
      expect(param.name).to.equal('foo');
      expect(param.kind.type).to.equal('uint');
      expect(param.indexed).to.be.true;
    });
  });
});
