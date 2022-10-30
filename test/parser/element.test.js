const {Element, Text} = require('../../src/parser/element.js');

describe('Element', () => {
  describe('fxp_tree', () => {
    test('root element', () => {
      let e = new Element('root', [], {});
      expect(e.fxp_element()).toStrictEqual({root: []});
    });

    test('root with text child', () => {
      let e = new Element('root', [new Text('foo')], {});
      expect(e.fxp_element()).toStrictEqual({root: [{ '#text': 'foo' }]});
    });
  });
});

describe('Text', () => {
  test('fxp_tree', () => {
    let e = new Text('foo');
    expect(e.fxp_element()).toStrictEqual({'#text': 'foo'});
  });
});
