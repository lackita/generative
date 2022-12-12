'use strict';

const { Map } = require('immutable');

const evaluate = require('../../src/transform/evaluate.js');
const { Element, Text } = require('../../src/parser/element.js');
const Environment = require('../../src/transform/environment.js');
const Pattern = require('../../src/transform/pattern.js');

const define = new Element('define', [
  new Element('name', [new Text('foo')]),
  new Element('base', [new Text('div')]),
  new Element('body'),
]);

const emptyEnv = new Environment();

test('returns an environment with a symbol defined', () => {
  const env = evaluate(define, emptyEnv)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test("defines a symbol when it's below a root element", () => {
  const env = evaluate(new Element('root', [define]), emptyEnv)[1];
  expect(env.lookup('foo')).toBeTruthy();
});

test('returns the parse tree', () => {
  const r = evaluate(define, emptyEnv)[0];
  expect(r).toBe(define);
});

test('replaces a defined element', () => {
  const r = evaluate(new Element('foo'), evaluate(define, emptyEnv)[1])[0];
  expect(r).toStrictEqual(new Element('div', [], new Map([['class', 'foo']])));
});

test('keeps any child values with the children tag', () => {
  const p = new Pattern('foo', 'div', [
    new Element('children'),
  ]);
  const e = new Element('foo', [new Text('bar')]);
  expect(evaluate(e, new Environment().register(p))[0]).toStrictEqual(
    new Element(
      'div',
      [new Element(
        'div',
        e.children,
        new Map([['class', 'children']]),
      )],
      new Map([['class', 'foo']]),
    ),
  );
});

test('does not have children as a registered pattern', () => {
  const p = new Pattern('foo', 'div', [
    new Element('children'),
  ]);
  const e = new Element('foo', [new Text('bar')]);
  expect(evaluate(e, new Environment().register(p))[1].lookup('children')).toBe(undefined);
});
