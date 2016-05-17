import { signature } from './signature';

describe('signature', () => {
  it('encodes signature baz() correctly', () => {
    expect(signature('baz', [])).to.equal('a7916fac');
  });

  it('encodes signature baz(uint32) correctly', () => {
    expect(signature('baz', [{ type: 'uint32' }])).to.equal('7d68785e');
  });

  it('encodes signature baz(uint32, bool) correctly', () => {
    expect(signature('baz', [{ type: 'uint32' }, { type: 'bool' }])).to.equal('cdcd77c0');
  });

  it('encodes no-name signature correctly as ()', () => {
    expect(signature(undefined, [])).to.equal('861731d5');
  });

  it('encodes no-params signature correctly as ()', () => {
    expect(signature(undefined, undefined)).to.equal('861731d5');
  });
});
