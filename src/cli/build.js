const fs = require('fs');
const path = require('path');
const Page = require('../parser/page.js');
const File = require('../parser/file.js');
const evaluate = require('../transform/evaluate.js');
const Environment = require('../transform/environment.js');

function build() {
  if(fs.existsSync('_site')) fs.rmSync('_site', {recursive: true});
  let env = parse_dir('components', []);
  build_dir(env, 'pages', '_site', []);
}

function parse_dir(root, directories) {
  return fs.readdirSync(
    path.join(root, ...directories),
  ).reduce((env, file) => {
    if(is_directory(path.join(root, ...directories, file))) {
      return parse_dir(root, directories.concat(file));
    } else {
      return env.merge(evaluate(new File(root, directories, file)));
    }
  }, new Environment());
}

function build_dir(env, source, destination, directories) {
  fs.mkdirSync(path.join(destination, ...directories));
  fs.readdirSync(path.join(source, ...directories)).forEach((file) => {
    if(is_directory(path.join(source, ...directories, file))) {
      build_dir(env, source, destination, directories.concat(file));
    } else {
      let page = new Page(source, directories, file);
      page.build(env, destination);
    }
  });
}

function is_directory(location) {
  return fs.lstatSync(location).isDirectory();
}

module.exports = build;
