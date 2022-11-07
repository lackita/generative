'use strict';

const Pattern = require('./pattern.js');

function evaluate (parseTree, env) {
  let transformedTree;
  const pattern = env.lookup(parseTree.tag);
  if (pattern) {
    transformedTree = evaluate(
      pattern.buildFrom(parseTree, env),
      env.register(new Pattern(
        'children',
        'div',
        parseTree.children,
      )),
    )[0];
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
  const pattern = new Pattern(
    parseTree.find('name').value(),
    parseTree.find('base').value(),
    parseTree.find('html').children,
  );
  return env.register(pattern);
}

module.exports = evaluate;
