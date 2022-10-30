class Environment {
  constructor() {
    this.symbols = new Map();
  }

  lookup(symbol) {
    return this.symbols.get(symbol);
  }

  register(symbol, pattern) {
    this.symbols.set(symbol, pattern);
  }

  merge(env) {
    let new_env = env.clone();
    this.symbols.forEach((v, k) => new_env.register(k, v));
    return new_env;
  }

  clone() {
    let env = new Environment();
    this.symbols.forEach((v, k) => env.register(k, v));
    return env;
  }
}

module.exports = Environment;
