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
    const slices = [
      '1111111111111111222222222222222233333333333333334444444444444444',
      '2222222222222222333333333333333344444444444444445555555555555555',
      '3333333333333333444444444444444455555555555555556666666666666666',
      '4444444444444444555555555555555566666666666666667777777777777777'
    ];

    it('returns a single slice', () => {
      expect(coder.takeBytes(slices, 0, 32).bytes).to.equal(slices[0]);
    });

    it('returns multiple slices', () => {
      expect(coder.takeBytes(slices, 0, 64).bytes).to.equal(`${slices[0]}${slices[1]}`);
    });

    it('returns a single offset slice', () => {
      expect(coder.takeBytes(slices, 1, 32).bytes).to.equal(slices[1]);
    });

    it('returns multiple offset slices', () => {
      expect(coder.takeBytes(slices, 1, 64).bytes).to.equal(`${slices[1]}${slices[2]}`);
    });

    it('returns the requires length from slices', () => {
      expect(coder.takeBytes(slices, 1, 75).bytes).to.equal(`${slices[1]}${slices[2]}${slices[3]}`.substr(0, 150));
    });
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
