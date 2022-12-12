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
    const head = parseTree.find('head');
    const css = head && head.find('style');
    return new Pattern(
      parseTree.find('name').value(),
      parseTree.find('base').value(),
      parseTree.find('body').children,
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
    return this.css.map((rule) => rule.scopedTo(this.base, this.name));
  }

  get css () {
    return this._css;
  }

  mutate (parseTree, env) {
    const children = [];
    this.html.forEach((e) => children.push(e.clone()));

    const transformedTree = new Element(
      this.base,
      children,
      new Map([['class', this.name]]),
    );

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
