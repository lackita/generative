'use strict';

const { Map } = require('immutable');
const { Parser, Builder } = require('../../src/parser/parser.js');
const { Text } = require('../../src/parser/element.js');

const p = new Parser();
const b = new Builder();

describe('Parser', () => {
  test('starts with a root', () => {
    const elt = p.parse('');
    expect(elt.tag).toBe('root');
  });

  test('contains a div', () => {
    const div = p.parse('<div></div>').children[0];
    expect(div.tag).toBe('div');
  });

  test('parses attributes', () => {
    const a = p.parse('<a href="https://example.com"></a>').children[0];
    expect(a.attributes).toStrictEqual(new Map([['href', 'https://example.com']]));
  });

  test('parses a text attribute', () => {
    const t = p.parse('foo', true).children[0];
    expect(t.value).toBe('foo');
  });

  test('preserves html entities', () => {
    expect(p.parse('&check;').value()).toBe('&check;');
  });
});

describe('Builder', () => {
  test('preserves html entities', () => {
    expect(b.build([new Text('&check;')])).toBe('&check;');
  });
});
