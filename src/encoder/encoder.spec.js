import Encoder from './encoder';
import Token from '../token';
import { padFixedBytes, padU32 } from '../util/pad';

const coder = new Encoder();

describe('encoder/encoder', () => {
  describe('encodeToken', () => {
    it('encodes address tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('address', '123'));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
    });

    it('encodes bool tokens in Mediate(raw)', () => {
      const mediatet = coder.encodeToken(new Token('bool', true));
      const mediatef = coder.encodeToken(new Token('bool', false));

      expect(mediatet.type).to.equal('raw');
      expect(mediatet.value).to.be.ok;

      expect(mediatef.type).to.equal('raw');
      expect(mediatef.value).to.be.ok;
    });

    it('encodes int tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('int', '123'));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
    });

    it('encodes uint tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('uint', '123'));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
    });

    it('encodes fixedBytes tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('fixedBytes', '123'));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
    });

    it('encodes bytes tokens in Mediate(prefixed)', () => {
      const mediate = coder.encodeToken(new Token('bytes', '123'));

      expect(mediate.type).to.equal('prefixed');
      expect(mediate.value).to.be.ok;
    });

    it('encodes string tokens in Mediate(prefixed)', () => {
      const mediate = coder.encodeToken(new Token('string', '123'));

      expect(mediate.type).to.equal('prefixed');
      expect(mediate.value).to.be.ok;
    });

    it('encodes fixedArray tokens in Mediate(fixedArray)', () => {
      const mediate = coder.encodeToken(new Token('fixedArray', [new Token('uint', '123')]));

      expect(mediate.type).to.equal('fixedArray');
      expect(mediate.value).to.be.ok;
    });

    it('encodes array tokens in Mediate(array)', () => {
      const mediate = coder.encodeToken(new Token('array', [new Token('uint', '123')]));

      expect(mediate.type).to.equal('array');
      expect(mediate.value).to.be.ok;
    });

    it('throws an Error on invalid tokens', () => {
      expect(() => coder.encodeToken({ type: 'noMatch' })).to.throw(/noMatch/);
    });
  });

  describe('encode', () => {
    describe('addresses', () => {
      const address1 = '1111111111111111111111111111111111111111';
      const address2 = '2222222222222222222222222222222222222222';
      const address3 = '3333333333333333333333333333333333333333';
      const address4 = '4444444444444444444444444444444444444444';
      const encAddress1 = padU32(address1);
      const encAddress2 = padU32(address2);
      const encAddress3 = padU32(address3);
      const encAddress4 = padU32(address4);
      const tokenAddress1 = new Token('address', address1);
      const tokenAddress2 = new Token('address', address2);
      const tokenAddress3 = new Token('address', address3);
      const tokenAddress4 = new Token('address', address4);

      it('encodes an address', () => {
        const token = tokenAddress1;

        expect(coder.encode([token])).to.equal(encAddress1);
      });

      it('encodes an array of addresses', () => {
        const expected = `${padU32('20')}${padU32('2')}${encAddress1}${encAddress2}`;
        const token = new Token('array', [tokenAddress1, tokenAddress2]);

        expect(coder.encode([token])).to.equal(expected);
      });

      it('encodes an fixedArray of addresses', () => {
        const expected = `${encAddress1}${encAddress2}`;
        const token = new Token('fixedArray', [tokenAddress1, tokenAddress2]);

        expect(coder.encode([token])).to.equal(expected);
      });

      it('encodes two addresses', () => {
        const expected = `${encAddress1}${encAddress2}`;
        const tokens = [tokenAddress1, tokenAddress2];

        expect(coder.encode(tokens)).to.equal(expected);
      });

      it('encodes fixed array of dynamic array addresses', () => {
        const tokens1 = new Token('array', [tokenAddress1, tokenAddress2]);
        const tokens2 = new Token('array', [tokenAddress3, tokenAddress4]);
        const fixed = new Token('fixedArray', [tokens1, tokens2]);
        const expected = `${padU32('40')}${padU32('a0')}${padU32('2')}${encAddress1}${encAddress2}${padU32('2')}${encAddress3}${encAddress4}`;

        expect(coder.encode([fixed])).to.equal(expected);
      });

      it('encodes dynamic array of fixed array addresses', () => {
        const tokens1 = new Token('fixedArray', [tokenAddress1, tokenAddress2]);
        const tokens2 = new Token('fixedArray', [tokenAddress3, tokenAddress4]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${encAddress1}${encAddress2}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses', () => {
        const tokens1 = new Token('array', [tokenAddress1]);
        const tokens2 = new Token('array', [tokenAddress2]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${padU32('80')}${padU32('c0')}${padU32('1')}${encAddress1}${padU32('1')}${encAddress2}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses (2)', () => {
        const tokens1 = new Token('array', [tokenAddress1, tokenAddress2]);
        const tokens2 = new Token('array', [tokenAddress3, tokenAddress4]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${padU32('80')}${padU32('e0')}${padU32('2')}${encAddress1}${encAddress2}${padU32('2')}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes fixed array of fixed array addresses', () => {
        const tokens1 = new Token('fixedArray', [tokenAddress1, tokenAddress2]);
        const tokens2 = new Token('fixedArray', [tokenAddress3, tokenAddress4]);
        const dynamic = new Token('fixedArray', [tokens1, tokens2]);
        const expected = `${encAddress1}${encAddress2}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });
    });

    describe('bytes', () => {
      const bytes1 = '1234';
      const bytes2 = '10000000000000000000000000000000000000000000000000000000000002';
      const bytes3 = '1000000000000000000000000000000000000000000000000000000000000000';

      it('encodes fixed bytes', () => {
        const token = new Token('fixedBytes', bytes1);

        expect(coder.encode([token])).to.equal(padFixedBytes(bytes1));
      });

      it('encodes bytes', () => {
        const token = new Token('bytes', bytes1);

        expect(coder.encode([token])).to.equal(`${padU32(20)}${padU32(2)}${padFixedBytes(bytes1)}`);
      });

      it('encodes bytes (short of boundary)', () => {
        const token = new Token('bytes', bytes2);

        expect(coder.encode([token])).to.equal(`${padU32(20)}${padU32('1f')}${padFixedBytes(bytes2)}`);
      });

      it('encodes bytes (two blocks)', () => {
        const input = `${bytes3}${bytes3}`;
        const token = new Token('bytes', input);

        expect(coder.encode([token])).to.equal(`${padU32(20)}${padU32('40')}${padFixedBytes(input)}`);
      });

      it('encodes two consecutive bytes', () => {
        const in1 = '10000000000000000000000000000000000000000000000000000000000002';
        const in2 = '0010000000000000000000000000000000000000000000000000000000000002';
        const tokens = [new Token('bytes', in1), new Token('bytes', in2)];

        // 0000000000000000000000000000000000000000000000000000000000000040
        // 00000000000000000000000000000000000000000000000000000000000000a0
        // 000000000000000000000000000000000000000000000000000000000000001f
        // 1000000000000000000000000000000000000000000000000000000000000200
        // 0000000000000000000000000000000000000000000000000000000000000020
        // 0010000000000000000000000000000000000000000000000000000000000002

        // 0000000000000000000000000000000000000000000000000000000000000040
        // 0000000000000000000000000000000000000000000000000000000000000080
        // 000000000000000000000000000000000000000000000000000000000000001f
        // 1000000000000000000000000000000000000000000000000000000000000200
        // 0000000000000000000000000000000000000000000000000000000000000020
        // 0010000000000000000000000000000000000000000000000000000000000002

        expect(coder.encode(tokens)).to.equal(`${padU32('40')}${padU32('80')}${padU32('1f')}${padFixedBytes(in1)}${padU32('20')}${padFixedBytes(in2)}`);
      });
    });

    describe('string', () => {
      it('encodes a string', () => {
        const string = 'gavofyork';
        const stringEnc = padFixedBytes('6761766f66796f726b');
        const token = new Token('string', string);

        expect(coder.encode([token])).to.equal(`${padU32('20')}${padU32(string.length.toString(16))}${stringEnc}`);
      });
    });

    describe('uint', () => {
      it('encodes a uint', () => {
        const token = new Token('uint', 4);

        expect(coder.encode([token])).to.equal(padU32(4));
      });
    });

    describe('int', () => {
      it('encodes a int', () => {
        const token = new Token('int', 4);

        expect(coder.encode([token])).to.equal(padU32(4));
      });
    });

    describe('bool', () => {
      it('encodes a bool (true)', () => {
        const token = new Token('bool', true);

        expect(coder.encode([token])).to.equal(padU32(1));
      });

      it('encodes a bool (false)', () => {
        const token = new Token('bool', false);

        expect(coder.encode([token])).to.equal(padU32(0));
      });
    });

    describe('comprehensive test', () => {
      it('encodes a complex sequence', () => {
        const bytes = '131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b131a3afc00d1b1e3461b955e53fc866dcf303b3eb9f4c16f89e388930f48134b';
        const tokens = [new Token('int', 5), new Token('bytes', bytes), new Token('int', 3), new Token('bytes', bytes)];

        expect(coder.encode(tokens)).to.equal(`${padU32(5)}${padU32('80')}${padU32(3)}${padU32('e0')}${padU32(40)}${bytes}${padU32('40')}${bytes}`);
      });

      it('encodes a complex sequence (nested)', () => {
        const array = [new Token('int', 5), new Token('int', 6), new Token('int', 7)];
        const tokens = [new Token('int', 1), new Token('string', 'gavofyork'), new Token('int', 2), new Token('int', 3), new Token('int', 4), new Token('array', array)];
        const stringEnc = padFixedBytes('6761766f66796f726b');

        expect(coder.encode(tokens)).to.equal(`${padU32(1)}${padU32('c0')}${padU32(2)}${padU32(3)}${padU32(4)}${padU32('100')}${padU32(9)}${stringEnc}${padU32(3)}${padU32(5)}${padU32(6)}${padU32(7)}`);
      });
    });
  });
});
