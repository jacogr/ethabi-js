import { asAddress, asBool } from './sliceAs';

describe('utils/sliceAs', () => {
  describe('asAddress', () => {
    it('correctly returns the last 40 characters', () => {
      const address = '1111111111222222222233333333334444444444';
      expect(asAddress(`000000000000000000000000${address}`)).to.equal(address);
    });
  });

  describe('asBool', () => {
    it('correctly returns true', () => {
      expect(asBool('0000000000000000000000000000000000000000000000000000000000000001')).to.be.true;
    });

    it('correctly returns false', () => {
      expect(asBool('0000000000000000000000000000000000000000000000000000000000000000')).to.be.false;
    });
  });
});
