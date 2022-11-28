'use strict';
const { Map } = require('immutable');
/* const css = require('css'); */

const { Element } = require('../parser/element.js');

class Pattern {
  constructor (name, base, html, css) {
    this._html = html;
    this._base = base;
    this._name = name;
    this._css = css || [];
  }

  static buildFrom (parseTree) {
    const css = parseTree.find('css');
    return new Pattern(
      parseTree.find('name').value(),
      parseTree.find('base').value(),
      parseTree.find('html').children,
      css && css.rules,
    );
  }

  get name () {
    return this._name;
  }

  get base () {
    return this._base;
  }

  get html () {
    return this._html;
  }

  scopedCSS () {
    return this.css.map((rule) => rule.scopedTo(`${this.base}.${this.name}`));
  }

  get css () {
    return this._css;
  }

  mutate (parseTree, env) {
    const children = [];
    this.html.forEach((e) => children.push(e.clone()));

    const transformedTree = new Element(this.base, new Map([['class', this.name]]), children);

    return [
      transformedTree,
      env.register(new Pattern(
        'children',
        'div',
        parseTree.children,
      )),
    ];
  }
}

module.exports = Pattern;
