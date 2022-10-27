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

describe('Frame', () => {
  test('placeholder', () => {
    expect(1 + 1).toBe(2);
  });
});
