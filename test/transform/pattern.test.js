'use strict';
const { Map } = require('immutable');

const Pattern = require('../../src/transform/pattern.js');
const { Element, Text, CSS } = require('../../src/parser/element.js');
const { Rule } = require('../../src/parser/css.js');

describe('buildFrom', () => {
  const define = new Element(
    'define',
    new Map(),
    [
      new Element('name', new Map(), [new Text('foo')]),
      new Element('base', new Map(), [new Text('div')]),
      new Element('html', new Map(), [new Element('span')]),
      new CSS([new Rule(['span'], [])]),
    ],
  );
  const pattern = Pattern.buildFrom(define);

  it('parses the css', () => {
    expect(pattern.css).toStrictEqual([new Rule(['span'], [])]);
  });
});
