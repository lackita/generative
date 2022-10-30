const evaluate = require('../../src/transform/evaluate.js');
const {Element, Text} = require('../../src/parser/element.js');
const testdir = require('../cli/testdir.js');

const define = new Element('define', [
  new Element('name', [new Text('foo')]),
]);

test('returns an environment with a symbol defined', () => {
  let env = evaluate(define);
  expect(env.lookup('foo')).toBeTruthy();
});

test("defines a symbol when it's below a root element", () => {
  let env = evaluate(new Element('root', [define]), true);
  expect(env.lookup('foo')).toBeTruthy();
});
