const tmp = require('tmp');
const process = require('process');
const fs = require('fs');
const init = require('./init.js');

test('creates a .gitignore file', () => {
  setUpTestDir();
  init();
  expectFileToContain('.gitignore', /_site\n/);
});

test('appends to an existing .gitignore file', () => {
  setUpTestDir();
  fs.writeFileSync('.gitignore', '.foo')
  init();
  expectFileToContain('.gitignore', /_site\n/);
  expectFileToContain('.gitignore', /.foo\n/);
});

test('creates pages/index.ghtml', () => {
  setUpTestDir();
  init();
  expectFileToContain('pages/index.ghtml', /<introduction>/);
});

test('uses existing pages directory', () => {
  setUpTestDir();
  fs.mkdirSync('pages');
  init();
  expectFileToContain('pages/index.ghtml', /<introduction>/);
});

test('leaves existing pages/index.ghtml alone', () => {
  setUpTestDir();
  fs.mkdirSync('pages');
  fs.writeFileSync('pages/index.ghtml', '<p>foo</p>')
  init();
  expectFileToContain('pages/index.ghtml', /foo/);
});

test('creates components/introduction.ghtml', () => {
  setUpTestDir();
  init();
  expectFileToContain('components/introduction.ghtml', /<define>/);
});

function setUpTestDir() {
  let dir = tmp.dirSync();
  process.chdir(dir.name);
}

function expectFileToContain(file, pattern) {
  fs.readFile(file, 'utf8', (err, data) => {
    if(err) {
      throw err;
    }

    expect(data).toMatch(pattern);
  });
}
