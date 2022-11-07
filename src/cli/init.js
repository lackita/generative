'use strict';

const fs = require('fs');

function init () {
  initGitIgnore();
  initPages();
  initComponents();
}

function initGitIgnore () {
  if (fs.existsSync('.gitignore')) {
    ensureFileEndsInNewline('.gitignore');
    console.log('adding to .gitignore');
  } else {
    console.log('creating .gitignore');
  }

  fs.appendFileSync('.gitignore', '_site\n');
}

function ensureFileEndsInNewline (file) {
  if (fs.readFileSync(file).slice(-1) !== '\n') {
    fs.appendFileSync(file, '\n');
  }
}

function initPages () {
  console.log('creating pages/index.ghtml');

  if (!fs.existsSync('pages')) {
    fs.mkdirSync('pages');
  }

  if (!fs.existsSync('pages/index.ghtml')) {
    fs.writeFileSync('pages/index.ghtml', `<introduction>
  <p>Welcome to Generative!</p>
</introduction>`);
  }
}

function initComponents () {
  console.log('creating components/introduction.ghtml');

  if (!fs.existsSync('components')) {
    fs.mkdirSync('components');
  }

  if (!fs.existsSync('components/introduction.ghtml')) {
    fs.writeFileSync('components/introduction.ghtml', `<define>
  <name>introduction</name>
  <div>
    <children />
  </div>
</define>`);
  }
}

module.exports = init;
