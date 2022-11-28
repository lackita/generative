'use strict';

const Pattern = require('./pattern.js');

function evaluate (parseTree, env) {
  let transformedTree;
  const pattern = env.lookup(parseTree.tag);
  if (pattern) {
    [transformedTree] = evaluate(
      ...pattern.mutate(parseTree, env),
    );
    env = env.addAllCSS(pattern.scopedCSS());
  } else {
    const children = [];
    if (parseTree.tag === 'define') {
      env = define(env, parseTree);
      transformedTree = parseTree;
    } else {
      parseTree.children.forEach((e) => {
        const r = evaluate(e, env);
        children.push(r[0]);
        env = env.merge(r[1]);
      });
      transformedTree = parseTree.clone({ children });
    }
  }

  return [transformedTree, env];
}

function define (env, parseTree) {
  return env.register(Pattern.buildFrom(parseTree));
}

module.exports = evaluate;
