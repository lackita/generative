'use strict';

const { Map } = require('immutable');

class Environment {
  constructor (values, css) {
    this.symbols = new Map(values);
    this._css = new Map(css);
  }

  lookup (symbol) {
    return this.symbols.get(symbol);
  }

  register (object) {
    return this.merge(
      new Environment(new Map([[object.name, object]])),
    );
  }

  deregister (name) {
    return new Environment(
      this.symbols.delete(name),
      this._css,
    );
  }

  merge (env) {
    return new Environment(
      this.symbols.merge(env.symbols),
      this._css.merge(env.css),
    );
  }

  get css () {
    return this._css;
  }

  addAllCSS (rules) {
    if (rules.length === 0) return this;
    return this.addCSS(rules[0]).addAllCSS(rules.slice(1));
  }

  addCSS (newCSS) {
    return new Environment(
      this.symbols,
      this._css.set(newCSS.selectors, newCSS),
    );
  }
}

module.exports = Environment;
