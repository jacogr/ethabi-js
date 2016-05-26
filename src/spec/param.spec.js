import Param from './param';

describe('spec/param', () => {
  describe('constructor', () => {
    it('sets the name', () => {
      expect(new Param('foo', 'int').name).to.equal('foo');
    });

    it('sets the kind', () => {
      expect(new Param('foo', 'uint').kind.type).to.equal('uint');
    });
  });
});
