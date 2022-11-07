'use strict';

const { Map } = require('immutable');

class Environment {
  constructor (values) {
    this.symbols = new Map(values);
  }

  lookup (symbol) {
    return this.symbols.get(symbol);
  }

  register (object) {
    return this.merge(new Environment(new Map([[object.name, object]])));
  }

  merge (env) {
    return new Environment(this.symbols.merge(env.symbols));
  }
}

module.exports = Environment;
