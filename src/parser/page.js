const fs = require('fs');
const path = require('path');
const Parser = require('./parser.js');
const {XMLBuilder} = require('fast-xml-parser');

const options = {
  isArray: (name) => name == 'define',
  ignoreAttributes: false,
  preserveOrder: true,
  unpairedTags: ['br'],
  alwaysCreateTextNode: true,
};

const builder = new XMLBuilder(options);
const parser = new Parser();
const ghtml_re = /^(.*)[.]ghtml$/;

class Page {
  constructor(root, path, file) {
    this.root = root;
    this.path = path;
    this.file = file;
  }

  parsed_file() {
    return parser.parse(fs.readFileSync(this.source_path()));
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
        builder.build(this.parsed_file()),
      );
    }
  }

  is_generative() {
    return this.file.match(ghtml_re);
  }
}

module.exports = Page;
