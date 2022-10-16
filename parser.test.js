const {Parser, Expander, builder, Element} = require('./parser.js');

let p = new Parser();
// let parsed = p.tree_for(`<define><name>foo</name><html><br></html></define>`);

/* describe('functions', () => {
 *   let f = p.functions()['foo'];
 *
 *   test('parses names', () => {
 *     expect(f.name()).toBe('foo')
 *   });
 *
 *   test('provides html', () => {
 *     expect(builder.build(f.html())).toBe('<div class="foo"><br></div>');
 *   });
 * }); */

/* describe('expansion', () => {
 *   test('expands some html', () => {
 *     let e = new Expander(p.functions());
 *     expect(builder.build(e.expand(p.raw_tree_for('<foo>')))).toBe('<div class="foo"><br></div>');
 *   });
 * }); */

describe('Element', () => {
  test('finds a child', () => {
    let tree = p.parse('<div><p>a</p></div>');
    expect(tree.find('p').children[0].value).toBe('a');
  });

  let e = new Element({
    foo: [
      { '#text': '2' },
      { bar: [ { '#text': '3' } ] },
    ],
    ':@': { '@_x': '1' },
  });

  test('determines the tag name', () => {
    expect(e.tag).toBe('foo');
  });

  test('determines the attributes', () => {
    expect(e.attributes).toStrictEqual({ x: '1' });
  });

  test('determines a text child', () => {
    let c = e.children()[0];
    expect(c.tag).toBe('#text');
    expect(c.value).toBe('2');
  });
});
