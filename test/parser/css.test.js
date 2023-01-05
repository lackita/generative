'use strict';

const Environment = require('../../src/transform/environment.js');
const { Rule } = require('../../src/parser/css.js');

describe('Rule', () => {
  it('keeps rule the same in an empty environment', () => {
    const rule = new Rule(['p'], []);
    expect(rule.convertUsing(new Environment())).toStrictEqual(rule);
  });
});
