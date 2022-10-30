const fs = require('fs');
const path = require('path');
const {Parser, Builder} = require('./parser.js');

const parser = new Parser();
const ghtml_re = /^(.*)[.]ghtml$/;

class File {
  constructor(root, path, file) {
    this.root = root;
    this.path = path;
    this.file = file;
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

  is_generative() {
    return this.file.match(ghtml_re);
  }
}

module.exports = File;
