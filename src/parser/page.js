'use strict';

const { Map } = require('immutable');

const { Builder } = require('./parser.js');
const { Element, Doctype } = require('./element.js');
const evaluate = require('../transform/evaluate.js');

const builder = new Builder();

class Page {
  constructor (parsedFile) {
    this._parsedFile = parsedFile;
  }

  get parsedFile () {
    return this._parsedFile;
  }

  html (env) {
    const [evaluated, newEnv] = this.converted_tree(env);
    return [builder.build(evaluated), newEnv];
  }

  converted_tree (env) {
    let [evaluated, newEnv] = evaluate(this.parsedFile, env);
    const head = evaluated.find('head');
    const style = head && head.find('style');
    if (style) {
      newEnv = newEnv.addAllCSS(style.rules);
    }

    const body = evaluated.find('body');
    return [
      [
        new Doctype('html'),
        new Element(
          'html',
          [
            new Element(
              'head',
              (head ? head.children.filter((e) => e.tag !== 'style') : []).concat([
                new Element(
                  'link',
                  [],
                  new Map({
                    rel: 'stylesheet',
                    href: 'stylesheet.css',
                  }),
                ),
              ]),
            ),
            new Element(
              'body',
              body ? body.children : [],
            ),
          ],
        ),
      ],
      newEnv,
    ];
  }
}

module.exports = Page;
