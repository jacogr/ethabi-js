import Interface from './interface';

describe('spec/Interface', () => {
  const construct = {
    type: 'constructor',
    inputs: []
  };
  const event = {
    type: 'event',
    name: 'Event2',
    anonymous: false,
    inputs: [{ name: 'a', type: 'uint256', indexed: true }, { name: 'b', type: 'bytes32', indexed: false }]
  };
  const func = {
    type: 'function',
    name: 'foo',
    inputs: [{ name: 'a', type: 'uint256' }],
    outputs: []
  };

  describe('parseABI', () => {
    it('throws on invalid types', () => {
      expect(() => Interface.parseABI([{ type: 'noMatch' }])).to.throw(/noMatch/);
    });

    it('creates constructors', () => {
      expect(Interface.parseABI([ construct ])).to.deep.equal([{ _inputs: [] }]);
    });

    it('creates events', () => {
      expect(Interface.parseABI([ event ])[0].name).to.equal('Event2');
    });

    it('creates functions', () => {
      expect(Interface.parseABI([ func ])[0].name).to.equal('foo');
    });

    it('parse complex interfaces', () => {
      expect(Interface.parseABI([ construct, event, func ]).length).to.equal(3);
    });
  });

  describe('constructor', () => {
    const int = new Interface([ construct, event, func ]);

    it('contains the full interface', () => {
      expect(int.interface.length).to.equal(3);
    });

    it('contains the constructors', () => {
      expect(int.constructors.length).to.equal(1);
    });

    it('contains the events', () => {
      expect(int.events.length).to.equal(1);
    });

    it('contains the functions', () => {
      expect(int.functions.length).to.equal(1);
    });
  });
});
