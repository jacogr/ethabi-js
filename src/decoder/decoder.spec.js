import BigNumber from 'bignumber.js';

import Decoder from './decoder';
import ParamType from '../param';
import Token from '../token';
import { padU32 } from '../util/pad';

const coder = new Decoder();

describe('decoder/decoder', () => {
  const address1 = '0000000000000000000000001111111111111111111111111111111111111111';
  const address2 = '0000000000000000000000002222222222222222222222222222222222222222';
  const address3 = '0000000000000000000000003333333333333333333333333333333333333333';
  const address4 = '0000000000000000000000004444444444444444444444444444444444444444';
  const int1 = '1111111111111111111111111111111111111111111111111111111111111111';
  const tokenAddress1 = new Token('address', address1.slice(-40));
  const tokenAddress2 = new Token('address', address2.slice(-40));
  const tokenAddress3 = new Token('address', address3.slice(-40));
  const tokenAddress4 = new Token('address', address4.slice(-40));
  const tokenInt1 = new Token('int', new BigNumber(`0x${int1}`));
  const tokenUint1 = new Token('uint', new BigNumber(`0x${int1}`));
  const slices = [ address1, address2, address3, address4 ];

  describe('peek', () => {
    it('returns the slice at the correct position', () => {
      expect(coder.peek(slices, 1)).to.equal(slices[1]);
    });

    it('throws an error if the position is < 0', () => {
      expect(() => coder.peek(slices, -1)).to.throw(/Invalid/);
    });

    it('throws an error if the position is >= length', () => {
      expect(() => coder.peek(slices, 4)).to.throw(/Invalid/);
    });

    it('throws an error on invalid slices', () => {
      expect(() => coder.peek(null, 4)).to.throw(/Invalid/);
    });
  });

  describe('takeBytes', () => {
    it('returns a single slice', () => {
      expect(coder.takeBytes(slices, 0, 32).bytes).to.equal(slices[0]);
    });

    it('returns a single partial slice', () => {
      expect(coder.takeBytes(slices, 0, 20).bytes).to.equal(slices[0].substr(0, 40));
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

    it('decodes an address', () => {
      expect(
        coder.decodeParam(new ParamType('address'), [address1], 0).token
      ).to.deep.equal(tokenAddress1);
    });

    it('decodes an int', () => {
      expect(
        coder.decodeParam(new ParamType('int'), [int1], 0).token
      ).to.deep.equal(tokenInt1);
    });

    it('decodes an uint', () => {
      expect(
        coder.decodeParam(new ParamType('uint'), [int1], 0).token
      ).to.deep.equal(tokenUint1);
    });
  });

  describe('decode', () => {
    it('throws an error on invalid params', () => {
      expect(() => coder.decode(null, '123')).to.throw(/Invalid/);
    });

    it('throws an error on invalid data', () => {
      expect(() => coder.decode([], null)).to.throw(/Invalid/);
    });

    describe('address', () => {
      it('decodes an address', () => {
        expect(
          coder.decode(
            [new ParamType('address')],
            `${address1}`
          )
        ).to.deep.equal([tokenAddress1]);
      });

      it('decodes 2 addresses', () => {
        expect(
          coder.decode(
            [new ParamType('address'), new ParamType('address')],
            `${address1}${address2}`
          )
        ).to.deep.equal([tokenAddress1, tokenAddress2]);
      });

      it('decodes a fixedArray of addresses', () => {
        expect(
          coder.decode(
            [new ParamType('fixedArray', new ParamType('address'), 2)],
            `${address1}${address2}`
          )
        ).to.deep.equal([new Token('fixedArray', [tokenAddress1, tokenAddress2])]);
      });

      it('decodes a dynamic array of addresses', () => {
        expect(
          coder.decode(
            [new ParamType('array', new ParamType('address'))],
            `${padU32(0x20)}${padU32(2)}${address1}${address2}`
          )
        ).to.deep.equal([new Token('array', [tokenAddress1, tokenAddress2])]);
      });

      it('decodes a dynamic array of fixed arrays', () => {
        expect(
          coder.decode(
            [new ParamType('array', new ParamType('fixedArray', new ParamType('address'), 2))],
            `${padU32(0x20)}${padU32(2)}${address1}${address2}${address3}${address4}`
          )
        ).to.deep.equal([
          new Token('array', [
            new Token('fixedArray', [tokenAddress1, tokenAddress2]),
            new Token('fixedArray', [tokenAddress3, tokenAddress4])
          ])
        ]);
      });
    });
  });
});
