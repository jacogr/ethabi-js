import ParamType from './paramType';
import { fromParamType, toParamType } from './format';

describe('spec/paramType/format', () => {
  describe('fromParamType', () => {
    it('errors on invalid types', () => {
      expect(() => fromParamType({ type: 'noMatch' })).to.throw(/noMatch/);
    });

    describe('simple types', () => {
      it('converts address to address', () => {
        const pt = new ParamType('address');

        expect(fromParamType(pt)).to.equal('address');
      });

      it('converts bool to bool', () => {
        const pt = new ParamType('bool');

        expect(fromParamType(pt)).to.equal('bool');
      });

      it('converts bytes to bytes', () => {
        const pt = new ParamType('bytes');

        expect(fromParamType(pt)).to.equal('bytes');
      });

      it('converts string to string', () => {
        const pt = new ParamType('string');

        expect(fromParamType(pt)).to.equal('string');
      });
    });

    describe('length types', () => {
      it('converts int32 to int32', () => {
        const pt = new ParamType('int', null, 32);

        expect(fromParamType(pt)).to.equal('int32');
      });

      it('converts uint64 to int64', () => {
        const pt = new ParamType('uint', null, 64);

        expect(fromParamType(pt)).to.equal('uint64');
      });

      it('converts fixedBytes8 to bytes8', () => {
        const pt = new ParamType('fixedBytes', null, 8);

        expect(fromParamType(pt)).to.equal('bytes8');
      });
    });

    describe('arrays', () => {
      it('converts string[2] to string[2]', () => {
        const pt = new ParamType('fixedArray', new ParamType('string'), 2);

        expect(fromParamType(pt)).to.equal('string[2]');
      });

      it('converts bool[] to bool[]', () => {
        const pt = new ParamType('array', new ParamType('bool'));

        expect(fromParamType(pt)).to.equal('bool[]');
      });

      it('converts bool[][2] to bool[][2]', () => {
        const pt = new ParamType('fixedArray', new ParamType('array', new ParamType('bool')), 2);

        expect(fromParamType(pt)).to.equal('bool[][2]');
      });

      it('converts bool[2][] to bool[2][]', () => {
        const pt = new ParamType('array', new ParamType('fixedArray', new ParamType('bool'), 2));

        expect(fromParamType(pt)).to.equal('bool[2][]');
      });
    });
  });

  describe('toParamType', () => {
    it('errors on invalid types', () => {
      expect(() => toParamType('noMatch')).to.throw(/noMatch/);
    });

    describe('simple mapping', () => {
      it('converts address to address', () => {
        const pt = toParamType('address');

        expect(pt.type).to.equal('address');
      });

      it('converts bool to bool', () => {
        const pt = toParamType('bool');

        expect(pt.type).to.equal('bool');
      });

      it('converts bytes to bytes', () => {
        const pt = toParamType('bytes');

        expect(pt.type).to.equal('bytes');
      });

      it('converts string to string', () => {
        const pt = toParamType('string');

        expect(pt.type).to.equal('string');
      });
    });

    describe('number', () => {
      it('converts int to int256', () => {
        const pt = toParamType('int');

        expect(pt.type).to.equal('int');
        expect(pt.length).to.equal(256);
      });

      it('converts uint to uint256', () => {
        const pt = toParamType('uint');

        expect(pt.type).to.equal('uint');
        expect(pt.length).to.equal(256);
      });
    });

    describe('sized types', () => {
      it('converts int32 to int32', () => {
        const pt = toParamType('int32');

        expect(pt.type).to.equal('int');
        expect(pt.length).to.equal(32);
      });

      it('converts uint16 to uint16', () => {
        const pt = toParamType('uint32');

        expect(pt.type).to.equal('uint');
        expect(pt.length).to.equal(32);
      });

      it('converts bytes8 to fixedBytes8', () => {
        const pt = toParamType('bytes8');

        expect(pt.type).to.equal('fixedBytes');
        expect(pt.length).to.equal(8);
      });
    });

    describe('arrays', () => {
      describe('fixed arrays', () => {
        it('creates fixed array', () => {
          const pt = toParamType('bytes[8]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.value.type).to.equal('bytes');
          expect(pt.length).to.equal(8);
        });

        it('creates fixed arrays of fixed arrays', () => {
          const pt = toParamType('bytes[45][3]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.length).to.equal(3);
          expect(pt.value.type).to.equal('fixedArray');
          expect(pt.value.length).to.equal(45);
          expect(pt.value.value.type).to.equal('bytes');
        });
      });

      describe('dynamic arrays', () => {
        it('creates a dynamic array', () => {
          const pt = toParamType('bytes[]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('bytes');
        });

        it('creates a dynamic array of dynamic arrays', () => {
          const pt = toParamType('bool[][]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('array');
          expect(pt.value.value.type).to.equal('bool');
        });
      });

      describe('mixed arrays', () => {
        it('creates a fixed dynamic array', () => {
          const pt = toParamType('bool[][3]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.length).to.equal(3);
          expect(pt.value.type).to.equal('array');
          expect(pt.value.value.type).to.equal('bool');
        });

        it('creates a dynamic fixed array', () => {
          const pt = toParamType('bool[3][]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('fixedArray');
          expect(pt.value.length).to.equal(3);
          expect(pt.value.value.type).to.equal('bool');
        });
      });
    });
  });
});
