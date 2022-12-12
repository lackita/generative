'use strict';

const Pattern = require('../../src/transform/pattern.js');
const { Element, Text, Style } = require('../../src/parser/element.js');
const { Rule } = require('../../src/parser/css.js');

describe('buildFrom', () => {
  const define = new Element(
    'define',
    [
      new Element('name', [new Text('foo')]),
      new Element('base', [new Text('div')]),
      new Element('head', [
        new Style([new Rule(['foo'], []), new Rule(['span'], [])]),
      ]),
      new Element('body', [new Element('span')]),
    ],
  );
  const pattern = Pattern.buildFrom(define);

  it('parses the css', () => {
    expect(pattern.css).toStrictEqual([
      new Rule(['foo'], []),
      new Rule(['span'], []),
    ]);
  });

  it('scopes the css', () => {
    expect(pattern.scopedCSS()).toStrictEqual([
      new Rule(['div.foo'], []),
      new Rule(['div.foo span'], []),
    ]);
  });
});
