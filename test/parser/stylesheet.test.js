'use strict';

const Environment = require('../../src/transform/environment.js');
const Stylesheet = require('../../src/parser/stylesheet.js');
const { Rule, Declaration } = require('../../src/parser/css.js');

it('returns an empty string with nothing', () => {
  const s = new Stylesheet(new Environment());
  expect(s.css()).toBe('');
});

it('returns a rule with a declaration', () => {
  const s = new Stylesheet(new Environment({}, [[
    'div.foo',
    new Rule(
      ['div.foo'],
      [new Declaration('font-size', '12px')],
    ),
  ]]));
  expect(s.css()).toBe('div.foo{font-size:12px;}');
});
