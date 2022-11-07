'use strict';

const tmp = require('tmp');
const process = require('process');
const fs = require('fs');

function testdir (files) {
  const dir = tmp.dirSync();
  process.chdir(dir.name);
  if (files) writeFiles(files);
}

function writeFiles (files) {
  for (const file in files) {
    if (typeof files[file] === 'string') {
      fs.writeFileSync(file, files[file]);
    } else {
      fs.mkdirSync(file);
      process.chdir(file);
      writeFiles(files[file]);
      process.chdir('..');
    }
  }
}

module.exports = testdir;
