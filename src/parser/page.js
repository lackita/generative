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
    const [evaluated, new_env] = this.converted_tree(env);
    return [builder.build(evaluated), new_env];
  }

  converted_tree (env) {
    const [evaluated, new_env] = evaluate(this.parsedFile, env);
    return [
      [
        new Doctype('html'),
        new Element(
          'html',
          new Map(),
          [
            new Element(
              'head',
              new Map(),
              [
                new Element(
                  'link',
                  new Map({
                    rel: 'stylesheet',
                    href: 'stylesheet.css',
                  }),
                ),
              ],
            ),
            new Element(
              'body',
              new Map(),
              evaluated.children,
            ),
          ],
        ),
      ],
      new_env,
    ];
  }
}

module.exports = Page;
