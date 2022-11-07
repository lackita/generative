'use strict';

const { Map } = require('immutable');

class Element {
  constructor (tag, attributes, children) {
    this._tag = tag;
    this._attributes = Object.freeze(attributes || new Map());
    this._children = Object.freeze(children || []);
  }

  clone (replace) {
    let children;
    let attributes;
    if (replace && replace.children) {
      children = replace.children;
    } else {
      children = this.children.map((e) => e.clone());
    }

    if (replace && replace.attributes) {
      attributes = replace.attributes;
    } else {
      attributes = this.attributes;
    }

    return new this.constructor(
      this.tag,
      attributes,
      children,
    );
  }

  find (tag) {
    return this.children.find((e) => e.tag === tag);
  }

  get tag () {
    return this._tag;
  }

  get attributes () {
    return this._attributes;
  }

  get children () {
    return this._children;
  }

  value () {
    if (this.children.length !== 1) throw new Error('Not a single child');
    if (!(this.children[0] instanceof Text)) throw new Error("child isn't just text");
    return this.children[0].value;
  }

  fxp_element () {
    const attributes = {};
    this.attributes.forEach((v, k) => {
      attributes['@_' + k] = v;
    }, []);
    return {
      [this.tag]: this.children.map((e) => e.fxp_element()),
      ':@': attributes,
    };
  }
}

class Doctype extends Element {
  constructor (declaration) {
    super('!DOCTYPE');
    this._declaration = declaration;
  }

  clone () {
    return new this.constructor(this.declaration);
  }

  get declaration () {
    return this._declaration;
  }

  fxp_element () {
    return { [`${this.tag} ${this.declaration}`]: [] };
  }
}

class Text extends Element {
  constructor (value) {
    super('#text');
    this._value = value;
  }

  clone () {
    return new this.constructor(this.value);
  }

  get value () {
    return this._value;
  }

  fxp_element () {
    return { [this.tag]: this.value };
  }
}

module.exports = { Element, Text, Doctype };
