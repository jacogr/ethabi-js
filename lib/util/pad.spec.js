import BigNumber from 'bignumber.js';
import { padAddress, padBool, padBytes, padFixedBytes, padString, padU32 } from './pad';

describe('util/pad', () => {
  const SHORT15 = '1234567890abcdef';
  const BYTES15 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef];
  const LONG15 = `${SHORT15}000000000000000000000000000000000000000000000000`;
  const PAD123 = '0000000000000000000000000000000000000000000000000000000000000123';

  describe('padAddress', () => {
    it('pads to 64 characters', () => {
      expect(padAddress('123')).to.equal(PAD123);
    });
  });

  describe('padBool', () => {
    const TRUE = '0000000000000000000000000000000000000000000000000000000000000001';
    const FALSE = '0000000000000000000000000000000000000000000000000000000000000000';

    it('pads true to 64 characters', () => {
      expect(padBool(true)).to.equal(TRUE);
    });

    it('pads false to 64 characters', () => {
      expect(padBool(false)).to.equal(FALSE);
    });
  });

  describe.only('padU32', () => {
    it('left pads length < 64 bytes to 64 bytes', () => {
      expect(padU32(1)).to.equal('0000000000000000000000000000000000000000000000000000000000000001');
    });

    it('pads hex representation', () => {
      expect(padU32(0x123)).to.equal(PAD123);
    });

    it('pads decimal representation', () => {
      expect(padU32(291)).to.equal(PAD123);
    });

    it('pads string representation', () => {
      expect(padU32('0x123')).to.equal(PAD123);
    });

    it('pads BigNumber representation', () => {
      expect(padU32(new BigNumber(0x123))).to.equal(PAD123);
    });

    it('converts negative numbers to 2s complement', () => {
      expect(padU32(-123)).to.equal('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff85');
    });
  });

  describe('padFixedBytes', () => {
    it('right pads length < 64 bytes to 64 bytes (string)', () => {
      expect(padFixedBytes(SHORT15)).to.equal(LONG15);
    });

    it('right pads length < 64 bytes to 64 bytes (array)', () => {
      expect(padFixedBytes(BYTES15)).to.equal(LONG15);
    });

    it('right pads length > 64 bytes (64 byte multiples)', () => {
      expect(padFixedBytes(`${LONG15}${SHORT15}`)).to.equal(`${LONG15}${LONG15}`);
    });
  });

  describe('padBytes', () => {
    it('right pads length < 64, adding the length (string)', () => {
      const result = padBytes(SHORT15);

      expect(result.length).to.equal(128);
      expect(result).to.equal(`${padU32(8)}${LONG15}`);
    });

    it('right pads length < 64, adding the length (array)', () => {
      const result = padBytes(BYTES15);

      expect(result.length).to.equal(128);
      expect(result).to.equal(`${padU32(8)}${LONG15}`);
    });

    it('right pads length > 64, adding the length', () => {
      const result = padBytes(`${LONG15}${SHORT15}`);

      expect(result.length).to.equal(192);
      expect(result).to.equal(`${padU32(0x28)}${LONG15}${LONG15}`);
    });
  });

  describe('padString', () => {
    it('correctly converts & pads strings', () => {
      const result = padString('gavofyork');

      expect(result.length).to.equal(128);
      expect(result).to.equal(padBytes('6761766f66796f726b'));
    });
  });
});
