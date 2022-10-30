const fs = require('fs');
const path = require('path');
const {Parser, Builder} = require('./parser.js');
const {Element, Doctype} = require('./element.js');

const parser = new Parser();
const builder = new Builder();
const ghtml_re = /^(.*)[.]ghtml$/;

class Page {
  constructor(root, path, file) {
    this.root = root;
    this.path = path;
    this.file = file;
  }

  converted_tree() {
    return [
      new Doctype('html'),
      new Element(
        'html',
        [new Element('body', this.parsed_file().children)],
      ),
    ];
  }

  parsed_file() {
    return parser.parse(this.raw_file());
  }

  raw_file() {
    return fs.readFileSync(this.source_path(), 'utf8');
  }

  source_path() {
    return path.join(this.root, ...this.path, this.file);
  }

  destination_path(destination) {
    let match = this.is_generative();
    if (!match) throw `${this.source_path()} is not a generative file`;

    return path.join(destination, ...this.path, `${match[1]}.html`);
  }

  build(destination) {
    let match = this.is_generative();
    if(match) {
      fs.writeFileSync(
        this.destination_path(destination),
        this.html(),
      );
    }
  }

  is_generative() {
    return this.file.match(ghtml_re);
  }

  html() {
    return builder.build(this.converted_tree());
  }
}

module.exports = Page;
