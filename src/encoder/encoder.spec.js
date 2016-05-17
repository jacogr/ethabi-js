import Encoder from './encoder';
import Token from '../token';
import { padU32 } from './pad';

const coder = new Encoder();

describe('encoder/encoder', () => {
  describe('encodeToken', () => {
    it('encodes address tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('address', '123'));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
    });

    it('encodes bool tokens in Mediate(raw)', () => {
      const mediate = coder.encodeToken(new Token('bool', true));

      expect(mediate.type).to.equal('raw');
      expect(mediate.value).to.be.ok;
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

      it('encodes an address', () => {
        const token = new Token('address', address1);

        expect(coder.encode([token])).to.equal(encAddress1);
      });

      it('encodes an array of addresses', () => {
        const expected = `${padU32('20')}${padU32('2')}${encAddress1}${encAddress2}`;
        const token = new Token('array', [new Token('address', address1), new Token('address', address2)]);

        expect(coder.encode([token])).to.equal(expected);
      });

      it('encodes an fixedArray of addresses', () => {
        const expected = `${encAddress1}${encAddress2}`;
        const token = new Token('fixedArray', [new Token('address', address1), new Token('address', address2)]);

        expect(coder.encode([token])).to.equal(expected);
      });

      it('encodes two addresses', () => {
        const expected = `${encAddress1}${encAddress2}`;
        const tokens = [new Token('address', address1), new Token('address', address2)];

        expect(coder.encode(tokens)).to.equal(expected);
      });

      it('encodes fixed array of dynamic array addresses', () => {
        const tokens1 = new Token('array', [new Token('address', address1), new Token('address', address2)]);
        const tokens2 = new Token('array', [new Token('address', address3), new Token('address', address4)]);
        const fixed = new Token('fixedArray', [tokens1, tokens2]);
        const expected = `${padU32('40')}${padU32('a0')}${padU32('2')}${encAddress1}${encAddress2}${padU32('2')}${encAddress3}${encAddress4}`;

        expect(coder.encode([fixed])).to.equal(expected);
      });

      it('encodes dynamic array of fixed array addresses', () => {
        const tokens1 = new Token('fixedArray', [new Token('address', address1), new Token('address', address2)]);
        const tokens2 = new Token('fixedArray', [new Token('address', address3), new Token('address', address4)]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${encAddress1}${encAddress2}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses', () => {
        const tokens1 = new Token('array', [new Token('address', address1)]);
        const tokens2 = new Token('array', [new Token('address', address2)]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${padU32('80')}${padU32('c0')}${padU32('1')}${encAddress1}${padU32('1')}${encAddress2}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes dynamic array of dynamic array addresses (2)', () => {
        const tokens1 = new Token('array', [new Token('address', address1), new Token('address', address2)]);
        const tokens2 = new Token('array', [new Token('address', address3), new Token('address', address4)]);
        const dynamic = new Token('array', [tokens1, tokens2]);
        const expected = `${padU32('20')}${padU32('2')}${padU32('80')}${padU32('e0')}${padU32('2')}${encAddress1}${encAddress2}${padU32('2')}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });

      it('encodes fixed array of fixed array addresses', () => {
        const tokens1 = new Token('fixedArray', [new Token('address', address1), new Token('address', address2)]);
        const tokens2 = new Token('fixedArray', [new Token('address', address3), new Token('address', address4)]);
        const dynamic = new Token('fixedArray', [tokens1, tokens2]);
        const expected = `${encAddress1}${encAddress2}${encAddress3}${encAddress4}`;

        expect(coder.encode([dynamic])).to.equal(expected);
      });
    });

    describe('bytes', () => {
    });
  });
});
