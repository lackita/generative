const Pattern = require('../../src/transform/pattern.js');
const {Element, Text} = require('../../src/parser/element.js');

it('keeps any child values with the children tag', () => {
  let p = new Pattern('foo', 'div', [
    new Element('children'),
  ]);
  let e = new Element('foo', {}, [new Text('bar')]);
  expect(p.build_from(e)).toStrictEqual(new Element('div', {'class': 'foo'}, e.children));
});
