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
}

module.exports = Pattern;
