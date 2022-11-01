const {Parser} = require('../../src/parser/parser.js');

let p = new Parser();

describe('Parser', () => {
  test('starts with a root', () => {
    let elt = p.parse('');
    expect(elt.tag).toBe('root');
  });

  test('contains a div', () => {
    let div = p.parse('<div></div>').children[0];
    expect(div.tag).toBe('div');
  });

  test('parses attributes', () => {
    let a = p.parse('<a href="https://example.com"></a>').children[0];
    expect(a.attributes).toStrictEqual({ "href": "https://example.com" });
  });

  test('parses a text attribute', () => {
    let t = p.parse('foo', true).children[0];
    expect(t.value).toBe('foo');
  });
});
