'use strict';

const { Map } = require('immutable');

const evaluate = require('../../src/transform/evaluate.js');
const { Element, Text } = require('../../src/parser/element.js');
const Environment = require('../../src/transform/environment.js');
const Pattern = require('../../src/transform/pattern.js');

const define = new Element('define', new Map(), [
  new Element('name', new Map(), [new Text('foo')]),
  new Element('base', new Map(), [new Text('div')]),
  new Element('html'),
]);

const emptyEnv = new Environment();

test('returns an environment with a symbol defined', () => {
  const env = evaluate(define, emptyEnv)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test("defines a symbol when it's below a root element", () => {
  const env = evaluate(new Element('root', new Map(), [define]), emptyEnv)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test('returns the parse tree', () => {
  const r = evaluate(define, emptyEnv)[0];
  expect(r).toBe(define);
});

test('replaces a defined element', () => {
  const r = evaluate(new Element('foo'), evaluate(define, emptyEnv)[1])[0];
  expect(r).toStrictEqual(new Element('div', new Map([['class', 'foo']])));
});

test('keeps any child values with the children tag', () => {
  const p = new Pattern('foo', 'div', [
    new Element('children'),
  ]);
  const e = new Element('foo', new Map(), [new Text('bar')]);
  expect(evaluate(e, new Environment().register(p))[0]).toStrictEqual(
    new Element(
      'div',
      new Map([['class', 'foo']]),
      [new Element(
        'div',
        new Map([['class', 'children']]),
        e.children,
      )],
    ),
  );
});

test('does not have children as a registered pattern', () => {
  const p = new Pattern('foo', 'div', [
    new Element('children'),
  ]);
  const e = new Element('foo', new Map(), [new Text('bar')]);
  expect(evaluate(e, new Environment().register(p))[1].lookup('children')).toBe(undefined);
});
