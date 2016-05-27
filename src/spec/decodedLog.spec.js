import DecodedLog from './decodedLog';

const log = DecodedLog('someParams', 'someAddress');

describe('spec/DecodeLog', () => {
  describe('constructor', () => {
    it('sets internal state', () => {
      expect(log.params).to.equal('someParams');
      expect(log.address).to.equal('someAddress');
    });
  });
});
