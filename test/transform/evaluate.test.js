const evaluate = require('../../src/transform/evaluate.js');
const {Element, Text} = require('../../src/parser/element.js');
const Environment = require('../../src/transform/environment.js');
const testdir = require('../cli/testdir.js');

const define = new Element('define', {}, [
  new Element('name', {}, [new Text('foo')]),
  new Element('base', {}, [new Text('div')]),
  new Element('html'),
]);

const empty_env = new Environment();

test('returns an environment with a symbol defined', () => {
  let env = evaluate(define, empty_env)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test("defines a symbol when it's below a root element", () => {
  let env = evaluate(new Element('root', {}, [define]), empty_env)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test('returns the parse tree', () => {
  let r = evaluate(define, empty_env)[0];
  expect(r).toBe(define);
});

test('replaces a defined element', () => {
  let r = evaluate(new Element('foo'), evaluate(define, empty_env)[1])[0];
  expect(r).toStrictEqual(new Element('div', {'class': 'foo'}));
});
