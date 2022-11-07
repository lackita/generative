'use strict';

const { Map } = require('immutable');
const { Element } = require('../parser/element.js');

class Pattern {
  constructor (name, base, html) {
    this._html = html;
    this._base = base;
    this._name = name;
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

  buildFrom (parseTree) {
    const children = [];
    this.html.forEach((e) => children.push(e.clone()));

    const transformedTree = new Element(this.base, new Map([['class', this.name]]), children);
    return transformedTree;
  }
}

module.exports = Pattern;
