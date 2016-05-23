import Param from './param';

describe('spec/param', () => {
  describe('constructor', () => {
    it('sets the name', () => {
      expect(new Param('foo', 'bar').name).to.equal('foo');
    });

    it('sets the kind', () => {
      expect(new Param('foo', 'bar').kind).to.equal('bar');
    });
  });
});
