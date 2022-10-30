class Element {
  constructor(tag, children, attributes) {
    this._tag = tag;
    this._children = children || [];
    this._attributes = attributes;
  }

  find(tag) {
    if(this.tag == tag) return this;

    return this.children.reduce(
      (found, c) => found || c.find(tag),
      null,
    );
  }

  get tag() {
    return this._tag;
  }

  get attributes() {
    return this._attributes;
  }

  get children() {
    return this._children;
  }

  fxp_element() {
    return {[this.tag]: this.children.map((e) => e.fxp_element())};
  }
}

class Doctype extends Element {
  constructor(declaration) {
    super('!DOCTYPE');
    this._declaration = declaration;
  }

  get declaration() {
    return this._declaration;
  }

  fxp_element() {
    return {[`${this.tag} ${this.declaration}`]: []};
  }
}

class Text extends Element {
  constructor(value) {
    super('#text', []);
    this._value = value;
  }

  get value() {
    return this._value;
  }

  fxp_element() {
    return {[this.tag]: this.value};
  }
}

module.exports = {Element, Text, Doctype};
