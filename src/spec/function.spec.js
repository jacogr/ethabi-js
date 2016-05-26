import Func from './function';

describe('spec/Function', () => {
  const inputs = [{ kind: 'bool' }, { kind: 'string' }];
  const outputs = [{ kind: 'uint' }];
  const func = new Func('test', inputs, outputs);

  describe('constructor', () => {
    it('stores the parameters as received', () => {
      expect(func.name).to.equal('test');
      expect(func.inputs).to.deep.equal(inputs);
      expect(func.outputs).to.deep.equal(outputs);
    });
  });

  describe('inputParamTypes', () => {
    it('retrieves the input types as received', () => {
      expect(func.inputParamTypes()).to.deep.equal(['bool', 'string']);
    });
  });

  describe('outputParamTypes', () => {
    it('retrieves the output types as received', () => {
      expect(func.outputParamTypes()).to.deep.equal(['uint']);
    });
  });
});
