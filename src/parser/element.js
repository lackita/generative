class Element {
  constructor(tag, attributes, children) {
    this._tag = tag;
    this._children = children || [];
    this._attributes = attributes;
  }

  clone() {
    return new this.constructor(
      this.tag,
      this.children.map((e) => e.clone()),
      this.attributes,
    );
  }

  childless_clone() {
    return new this.constructor(this.tag, this.attributes, []);
  }

  add_child(child) {
    this.children.push(child);
  }

  find(tag) {
    return this.children.find((e) => e.tag == tag);
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

  value() {
    if(this.children.length != 1) throw 'More than a single child';
    if(!(this.children[0] instanceof Text)) throw "child isn't just text";
    return this.children[0].value;
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

  childless_clone() {
    return this.clone();
  }

  clone() {
    return new this.constructor(this.declaration);
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
    super('#text');
    this._value = value;
  }

  childless_clone() {
    return this.clone();
  }

  clone() {
    return new this.constructor(this.value);
  }

  get value() {
    return this._value;
  }

  fxp_element() {
    return {[this.tag]: this.value};
  }
}

module.exports = {Element, Text, Doctype};
