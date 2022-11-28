'use strict';

const fs = require('fs');
const path = require('path');
const { Parser } = require('./parser.js');

const parser = new Parser();
const ghtmlRegexp = /^(.*)[.]ghtml$/;

class File {
  constructor (root, directories, file) {
    this.root = root;
    this.directories = directories;
    this.file = file;
  }

  isGenerative () {
    return this.file.match(ghtmlRegexp);
  }

  path () {
    return path.join(this.root, ...this.directories, this.file);
  }
}

class SourceFile extends File {
  parsed () {
    return parser.parse(this.raw());
  }

  raw () {
    return fs.readFileSync(this.path(), 'utf8');
  }
}

class DestinationFile extends File {
  static fromSource (destination, file) {
    const match = file.isGenerative();
    if (!match) throw new Error('not generative');

    return new DestinationFile(
      destination,
      file.directories,
      `${match[1]}.html`,
    );
  }

  write (contents) {
    fs.writeFileSync(this.path(), contents);
  }
}

module.exports = { SourceFile, DestinationFile };
