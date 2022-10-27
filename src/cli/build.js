const fs = require('fs');
const path = require('path');
const Page = require('../parser/page.js');

function build() {
  if(fs.existsSync('_site')) fs.rmSync('_site', {recursive: true});
  build_dir('pages', '_site', []);
}

function build_dir(source, destination, directories) {
  fs.mkdirSync(path.join(destination, ...directories));
  fs.readdirSync(path.join(source, ...directories)).forEach((f) => {
    if(fs.lstatSync(path.join(source, ...directories, f)).isDirectory()) {
      build_dir(source, destination, directories.concat(f));
    } else {
      let page = new Page(source, directories, f);
      page.build(destination);
    }
  });
}

module.exports = build;
