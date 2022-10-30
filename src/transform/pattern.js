class Pattern {
  constructor(parse_tree) {
    this.parse_tree = parse_tree;
    this._name = parse_tree.children.find((e) => e.tag == 'name').value();
  }

  get name() {
    return this._name;
  }
}

module.exports = Pattern;
