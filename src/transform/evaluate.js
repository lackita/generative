const Environment = require('./environment.js');
const Pattern = require('./pattern.js');

function evaluate(parse_tree, debug) {
  let env = new Environment();

  if(parse_tree.tag == 'define')
    define(env, parse_tree, debug);
  else
    env = parse_tree.children.reduce((env, c) => {
      return env.merge(evaluate(c, debug + 1));
    }, env);

  return env;
}

function define(env, parse_tree, debug) {
  let pattern = new Pattern(parse_tree);
  env.register(pattern.name, pattern);
}

module.exports = evaluate;
