import Param from './param';

describe('spec/param', () => {
  describe('constructor', () => {
    const param = new Param('foo', 'uint');

    it('sets the properties', () => {
      expect(param.name).to.equal('foo');
      expect(param.kind.type).to.equal('uint');
    });
  });
});
