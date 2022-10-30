const fs = require('fs');
const build = require('../../src/cli/build.js');
const testdir = require('./testdir.js');

test('empty director', () => {
  testdir({'pages': []});
  build();
});

test('parses pages', () => {
  testdir({'pages': {'foo.ghtml': '<div>foo</div>'}});
  build();
  expect(fs.existsSync('_site/foo.html')).toBeTruthy();
});

test('clears existing directory', () => {
  testdir({
    'pages': {'foo.ghtml': '<div>foo</div>'},
    '_site': {'bar.html': 'bad'},
  });
  build();
  expect(fs.existsSync('_site/bar.html')).toBeFalsy();
});

test('does not create files which are not ghtml', () => {
  testdir({'pages': {'foo.html': 'hi'}});
  build();
  expect(fs.existsSync('_site/foo.html')).toBeFalsy();
});

test('creates a subdirectory with a file', () => {
  testdir({'pages': {'foo': {'bar.ghtml': 'hi'}}});
  build();
  expect(fs.existsSync('_site/foo/bar.html')).toBeTruthy();
});
