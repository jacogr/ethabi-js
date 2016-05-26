import Param from './param';

describe('spec/param', () => {
  describe('toParamType', () => {
    it('errors on invalid types', () => {
      expect(() => Param.toParamType('noMatch')).to.throw(/noMatch/);
    });

    describe('simple mapping', () => {
      it('converts address to address', () => {
        const pt = Param.toParamType('address');

        expect(pt.type).to.equal('address');
      });

      it('converts bool to bool', () => {
        const pt = Param.toParamType('bool');

        expect(pt.type).to.equal('bool');
      });

      it('converts bytes to bytes', () => {
        const pt = Param.toParamType('bytes');

        expect(pt.type).to.equal('bytes');
      });

      it('converts string to string', () => {
        const pt = Param.toParamType('string');

        expect(pt.type).to.equal('string');
      });
    });

    describe('number', () => {
      it('converts int to int256', () => {
        const pt = Param.toParamType('int');

        expect(pt.type).to.equal('int');
        expect(pt.length).to.equal(256);
      });

      it('converts uint to uint256', () => {
        const pt = Param.toParamType('uint');

        expect(pt.type).to.equal('uint');
        expect(pt.length).to.equal(256);
      });
    });

    describe('sized types', () => {
      it('converts int32 to int32', () => {
        const pt = Param.toParamType('int32');

        expect(pt.type).to.equal('int');
        expect(pt.length).to.equal(32);
      });

      it('converts uint16 to uint16', () => {
        const pt = Param.toParamType('uint32');

        expect(pt.type).to.equal('uint');
        expect(pt.length).to.equal(32);
      });

      it('converts bytes8 to fixedBytes8', () => {
        const pt = Param.toParamType('bytes8');

        expect(pt.type).to.equal('fixedBytes');
        expect(pt.length).to.equal(8);
      });
    });

    describe('arrays', () => {
      describe('fixed arrays', () => {
        it('creates fixed array', () => {
          const pt = Param.toParamType('bytes[8]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.value.type).to.equal('bytes');
          expect(pt.length).to.equal(8);
        });

        it('creates fixed arrays of fixed arrays', () => {
          const pt = Param.toParamType('bytes[45][3]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.length).to.equal(3);
          expect(pt.value.type).to.equal('fixedArray');
          expect(pt.value.length).to.equal(45);
          expect(pt.value.value.type).to.equal('bytes');
        });
      });

      describe('dynamic arrays', () => {
        it('creates a dynamic array', () => {
          const pt = Param.toParamType('bytes[]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('bytes');
        });

        it('creates a dynamic array of dynamic arrays', () => {
          const pt = Param.toParamType('bool[][]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('array');
          expect(pt.value.value.type).to.equal('bool');
        });
      });

      describe('mixed arrays', () => {
        it('creates a fixed dynamic array', () => {
          const pt = Param.toParamType('bool[][3]');

          expect(pt.type).to.equal('fixedArray');
          expect(pt.length).to.equal(3);
          expect(pt.value.type).to.equal('array');
          expect(pt.value.value.type).to.equal('bool');
        });

        it('creates a dynamic fixed array', () => {
          const pt = Param.toParamType('bool[3][]');

          expect(pt.type).to.equal('array');
          expect(pt.value.type).to.equal('fixedArray');
          expect(pt.value.length).to.equal(3);
          expect(pt.value.value.type).to.equal('bool');
        });
      });
    });
  });

  describe('constructor', () => {
    it('sets the name', () => {
      expect(new Param('foo', 'int').name).to.equal('foo');
    });

    it('sets the kind', () => {
      expect(new Param('foo', 'uint').kind.type).to.equal('uint');
    });
  });
});
