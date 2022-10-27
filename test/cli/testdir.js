const tmp = require('tmp');
const process = require('process');
const fs = require('fs');

function testdir(files) {
  let dir = tmp.dirSync();
  process.chdir(dir.name);
  if(files) write_files(files);
}

function write_files(files) {
  for(const file in files) {
    if(typeof files[file] === "string") {
      fs.writeFileSync(file, files[file]);
    } else {
      fs.mkdirSync(file);
      process.chdir(file);
      write_files(files[file]);
      process.chdir('..');
    }
  }
}

module.exports = testdir;
