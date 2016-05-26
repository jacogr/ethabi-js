import { isArray } from './types';

describe('util/types', () => {
  describe('isArray', () => {
    it('correctly identifies empty arrays as Array', () => {
      expect(isArray([])).to.be.true;
    });

    it('correctly identifies non-empty arrays as Array', () => {
      expect(isArray([1, 2, 3])).to.be.true;
    });

    it('correctly identifies strings as non-Array', () => {
      expect(isArray('not an array')).to.be.false;
    });

    it('correctly identifies objects as non-Array', () => {
      expect(isArray({})).to.be.false;
    });
  });
});
