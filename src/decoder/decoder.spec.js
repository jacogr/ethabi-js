import Decoder from './decoder';

const coder = new Decoder();

describe('decoder/decoder', () => {
  describe('peek', () => {
    const SLICES = ['123', '456', '789'];

    it('returns the slice at the correct position', () => {
      expect(coder.peek(SLICES, 1)).to.equal('456');
    });

    it('throws an error if the position is < 0', () => {
      expect(() => coder.peek(SLICES, -1)).to.throw(/Invalid/);
    });

    it('throws an error if the position is >= length', () => {
      expect(() => coder.peek(SLICES, 3)).to.throw(/Invalid/);
    });

    it('throws an error on invalid slices', () => {
      expect(() => coder.peek(null, 3)).to.throw(/Invalid/);
    });
  });

  describe('takeBytes', () => {
  });

  describe('decodeParam', () => {
    it('throws an error on invalid param type', () => {
      expect(() => coder.decodeParam({ type: 'noMatch' })).to.throw(/noMatch/);
    });
  });

  describe('decode', () => {
    it('throws an error on invalid params', () => {
      expect(() => coder.decode(null, '123')).to.throw(/Invalid/);
    });

    it('throws an error on invalid data', () => {
      expect(() => coder.decode([], null)).to.throw(/Invalid/);
    });
  });
});
