'use strict';

const { Map } = require('immutable');

const Environment = require('../../src/transform/environment.js');
const { Rule } = require('../../src/parser/css.js');

const env = new Environment(
  {},
  { 'div.foo': new Rule('div.foo', []) },
);

it('takes in CSS in constructor', () => {
  expect(env.css).toStrictEqual(new Map([['div.foo', new Rule('div.foo', [])]]));
});

it('adds to CSS in new environment', () => {
  expect(env.addCSS(new Rule('div.bar', [])).css).toStrictEqual(new Map([
    ['div.foo', new Rule('div.foo', [])],
    ['div.bar', new Rule('div.bar', [])],
  ]));
});

it('does not add already existing css', () => {
  expect(env.addCSS(new Rule('div.foo', []))).toStrictEqual(env);
});

it('pending merge retains css', () => {
  expect(env.merge(new Environment()).css).toStrictEqual(env.css);
});
