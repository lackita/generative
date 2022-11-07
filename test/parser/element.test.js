'use strict';

const { Map } = require('immutable');

const { Element, Text } = require('../../src/parser/element.js');

describe('Element', () => {
  describe('fxp_tree', () => {
    test('root element', () => {
      const e = new Element('root', new Map(), []);
      expect(e.fxp_element()).toStrictEqual({ root: [], ':@': {} });
    });

    test('root with text child', () => {
      const e = new Element('root', new Map(), [new Text('foo')]);
      expect(e.fxp_element()).toStrictEqual({ root: [{ '#text': 'foo' }], ':@': {} });
    });

    test('attribute', () => {
      const e = new Element('div', new Map([['class', 'foo']]), []);
      expect(e.fxp_element()).toStrictEqual({ div: [], ':@': { '@_class': 'foo' } });
    });
  });
});

describe('Text', () => {
  test('fxp_tree', () => {
    const e = new Text('foo');
    expect(e.fxp_element()).toStrictEqual({ '#text': 'foo' });
  });
});
