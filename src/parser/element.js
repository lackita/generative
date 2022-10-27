class Element {
  constructor(tag, children, attributes) {
    this._tag = tag;
    this._children = children;
    this._attributes = attributes;
  }

  find(tag) {
    if(this.tag == tag) return this;

    return this.children.reduce((found, c) => found || c.find(tag), null);
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
}

class TextElement extends Element {
  constructor(value) {
    super('#text', []);
    this._value = value;
  }

  children() {
    return [];
  }

  get value() {
    return this._value;
  }
}

module.exports = {Element, TextElement};
