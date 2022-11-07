'use strict';

const fs = require('fs');
const path = require('path');
const { Map } = require('immutable');

const { Builder } = require('./parser.js');
const { Element, Doctype } = require('./element.js');
const File = require('./file.js');
const evaluate = require('../transform/evaluate.js');

const builder = new Builder();

class Page extends File {
  html (env) {
    return builder.build(this.converted_tree(env));
  }

  converted_tree (env) {
    return [
      new Doctype('html'),
      new Element(
        'html',
        new Map(),
        [new Element(
          'body',
          new Map(),
          evaluate(this.parsed_file(), env)[0].children,
        )],
      ),
    ];
  }

  build (env, destination) {
    const match = this.is_generative();
    if (match) {
      fs.writeFileSync(
        this.destination_path(destination),
        this.html(env),
      );
    }
  }

  destination_path (destination) {
    const match = this.is_generative();
    if (!match) throw new Error(`${this.source_path()} is not a generative file`);

    return path.join(destination, ...this.path, `${match[1]}.html`);
  }
}

module.exports = Page;
