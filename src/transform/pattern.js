const {Element} = require('../parser/element.js');

class Pattern {
  constructor(name, base, html) {
    this._html = html;
    this._base = base;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get base() {
    return this._base;
  }

  get html() {
    return this._html;
  }

  build_from(parse_tree) {
    let transformed_tree = new Element(this.base, {
      'class': this.name,
    });

    this.html.forEach((e) => {
      if(e.tag == 'children') {
        parse_tree.children.forEach((c) => {
          transformed_tree.add_child(c.clone());
        });
      } else {
        transformed_tree.add_child(e.clone());
      }
    });

    return transformed_tree;
  }
}

module.exports = Pattern;
