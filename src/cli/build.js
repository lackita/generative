'use strict';

const fs = require('fs');
const path = require('path');
const Page = require('../parser/page.js');
const File = require('../parser/file.js');
const evaluate = require('../transform/evaluate.js');
const Environment = require('../transform/environment.js');

function build () {
  if (fs.existsSync('_site')) fs.rmSync('_site', { recursive: true });
  const env = parseDir('components', []);
  buildDir(env, 'pages', '_site', []);
}

function parseDir (root, directories) {
  return fs.readdirSync(
    path.join(root, ...directories),
  ).reduce((env, file) => {
    if (isDirectory(path.join(root, ...directories, file))) {
      return parseDir(root, directories.concat(file));
    } else {
      return evaluate(new File(root, directories, file).parsed_file(), env)[1];
    }
  }, new Environment());
}

function buildDir (env, source, destination, directories) {
  fs.mkdirSync(path.join(destination, ...directories));
  fs.readdirSync(path.join(source, ...directories)).forEach((file) => {
    if (isDirectory(path.join(source, ...directories, file))) {
      buildDir(env, source, destination, directories.concat(file));
    } else {
      const page = new Page(source, directories, file);
      page.build(env, destination);
    }
  });
}

function isDirectory (location) {
  return fs.lstatSync(location).isDirectory();
}

module.exports = build;
