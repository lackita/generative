'use strict';

const fs = require('fs');
const path = require('path');

const Page = require('../parser/page.js');
const Stylesheet = require('../parser/stylesheet.js');
const { SourceFile, DestinationFile } = require('../parser/file.js');
const evaluate = require('../transform/evaluate.js');
const Environment = require('../transform/environment.js');

function build () {
  if (fs.existsSync('_site')) fs.rmSync('_site', { recursive: true });

  let env = new Environment();
  if (fs.existsSync('components')) env = parseDir('components', []);

  (new DestinationFile('_site', [], 'stylesheet.css')).write(
    (new Stylesheet(
      buildDir(env, 'pages', '_site', []),
    )).css(),
  );
}

function parseDir (root, directories) {
  return fs.readdirSync(
    path.join(root, ...directories),
  ).reduce((env, file) => {
    if (isDirectory(path.join(root, ...directories, file))) {
      return parseDir(root, directories.concat(file));
    } else {
      return evaluate(
        new SourceFile(root, directories, file).parsed(),
        env,
      )[1];
    }
  }, new Environment());
}

function buildDir (env, source, destination, directories) {
  fs.mkdirSync(path.join(destination, ...directories));
  fs.readdirSync(path.join(source, ...directories)).forEach((file) => {
    if (isDirectory(path.join(source, ...directories, file))) {
      env = buildDir(env, source, destination, directories.concat(file));
    } else {
      const s = new SourceFile(source, directories, file);
      const d = DestinationFile.fromSource(destination, s);
      if (s.isGenerative()) {
        const [html, newEnv] = new Page(s.parsed()).html(env);
        d.write(html);
        env = newEnv;
      } else {
        fs.copyFileSync(s.path(), d.path());
      }
    }
  });

  return env;
}

function isDirectory (location) {
  return fs.lstatSync(location).isDirectory();
}

module.exports = build;
