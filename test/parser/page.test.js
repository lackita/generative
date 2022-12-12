'use strict';

const { Map } = require('immutable');

const Page = require('../../src/parser/page.js');
const { Element, Style } = require('../../src/parser/element.js');
const { Rule, Declaration } = require('../../src/parser/css.js');
const Environment = require('../../src/transform/environment.js');

describe('#converted_tree', () => {
  it('includes specified contents of head', () => {
    const meta = new Element(
      'meta',
      [],
      new Map({
        name: 'test',
        content: 'here',
      }),
    );
    const page = new Page(
      new Element(
        'root',
        [
          new Element('head', [meta]),
        ],
      ),
    );

    const head = page.converted_tree(
      new Environment(),
    )[0][1].find('head');
    expect(
      head.children.some((e) => {
        return e.tag === meta.tag &&
               e.children.length === 0 &&
               e.attributes === meta.attributes;
      }),
    ).toBeTruthy();
  });

  it('incorporates the style tag into the environment', () => {
    const rule = new Rule(
      ['p'],
      [new Declaration('font-size', '12px')],
    );
    const page = new Page(
      new Element(
        'root',
        [
          new Element('head', [
            new Style([rule]),
          ]),
        ],
      ),
    );

    const [tree, env] = page.converted_tree(
      new Environment(),
    );
    const head = tree[1].find('head');
    expect(
      head.children.some((e) => e.tag === 'style'),
    ).toBeFalsy();

    expect(env.css.count()).toBe(1);
  });
});
