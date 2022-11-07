'use strict';

const fs = require('fs');
const init = require('../../src/cli/init.js');
const testdir = require('./testdir.js');

test('creates a .gitignore file', () => {
  testdir();
  init();
  expectFileToContain('.gitignore', /_site\n/);
});

test('appends to an existing .gitignore file', () => {
  testdir({ '.gitignore': '.foo' });
  init();
  expectFileToContain('.gitignore', /_site\n/);
  expectFileToContain('.gitignore', /.foo\n/);
});

test('creates pages/index.ghtml', () => {
  testdir();
  init();
  expectFileToContain('pages/index.ghtml', /<introduction>/);
});

test('uses existing pages directory', () => {
  testdir({ pages: {} });
  init();
  expectFileToContain('pages/index.ghtml', /<introduction>/);
});

test('leaves existing pages/index.ghtml alone', () => {
  testdir({ pages: { 'index.ghtml': '<p>foo</p>' } });
  init();
  expectFileToContain('pages/index.ghtml', /foo/);
});

test('creates components/introduction.ghtml', () => {
  testdir();
  init();
  expectFileToContain('components/introduction.ghtml', /<define>/);
});

function expectFileToContain (file, pattern) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    expect(data).toMatch(pattern);
  });
}
