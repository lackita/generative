class Environment {
  constructor() {
    this.symbols = new Map();
  }

  lookup(symbol) {
    return this.symbols.get(symbol);
  }

  register(object) {
    this.symbols.set(object.name, object);
  }

  merge(env) {
    let new_env = env.clone();
    this.symbols.forEach((v) => new_env.register(v));
    return new_env;
  }

  clone() {
    let env = new Environment();
    this.symbols.forEach((v) => env.register(v));
    return env;
  }
}

module.exports = Environment;
