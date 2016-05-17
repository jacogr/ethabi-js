import { padBytes, padFixedBytes, padU32 } from './pad';

describe('encoder/pad', () => {
  const SHORT15 = '1234567890abcdef';
  const LONG15 = `${SHORT15}000000000000000000000000000000000000000000000000`;

  describe('padU32', () => {
    it('left pads length < 64 bytes to 64 bytes', () => {
      expect(padU32('1')).to.equal('0000000000000000000000000000000000000000000000000000000000000001');
      expect(padU32('123')).to.equal('0000000000000000000000000000000000000000000000000000000000000123');
    });
  });

  describe('padFixedBytes', () => {
    it('right pads length < 64 bytes to 64 bytes', () => {
      expect(padFixedBytes(SHORT15)).to.equal(LONG15);
    });

    it('right pads length > 64 bytes (64 byte multiples)', () => {
      expect(padFixedBytes(`${LONG15}${SHORT15}`)).to.equal(`${LONG15}${LONG15}`);
    });
  });

  describe('padBytes', () => {
    it('right pads length < 64, adding the length', () => {
      const result = padBytes(SHORT15);

      expect(result.length).to.equal(128);
      expect(result).to.equal(`${padU32(8)}${LONG15}`);
    });

    it('right pads length > 64, adding the length', () => {
      const result = padBytes(`${LONG15}${SHORT15}`);

      expect(result.length).to.equal(192);
      expect(result).to.equal(`${padU32((40).toString(16))}${LONG15}${LONG15}`);
    });
  });
});
