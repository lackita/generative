const Environment = require('./environment.js');
const Pattern = require('./pattern.js');

function evaluate(parse_tree, env) {
  let transformed_tree;
  let pattern = env.lookup(parse_tree.tag);
  if(pattern) {
    transformed_tree = pattern.build_from(parse_tree);
  } else {
    transformed_tree = parse_tree.childless_clone();
    if(parse_tree.tag == 'define') {
      define(env, parse_tree);
      transformed_tree = parse_tree;
    } else {
      parse_tree.children.forEach((e) => {
        let r = evaluate(e, env);
        transformed_tree.add_child(r[0]);
        env = env.merge(r[1]);
      });
    }
  }

  return [transformed_tree, env];
}

function define(env, parse_tree) {
  let pattern = new Pattern(
    parse_tree.find('name').value(),
    parse_tree.find('base').value(),
    parse_tree.find('html').children,
  );
  env.register(pattern);
}

module.exports = evaluate;
