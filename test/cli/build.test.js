const fs = require('fs');
const build = require('../../src/cli/build.js');
const testdir = require('./testdir.js');

test('empty directories', () => {
  testdir({'components': [], 'pages': []});
  build();
});

test('parses pages', () => {
  testdir({
    'components': [],
    'pages': {'foo.ghtml': '<div>foo</div>'},
  });
  build();
  expect(fs.existsSync('_site/foo.html')).toBeTruthy();
});

test('clears existing directory', () => {
  testdir({
    'components': [],
    'pages': {'foo.ghtml': '<div>foo</div>'},
    '_site': {'bar.html': 'bad'},
  });
  build();
  expect(fs.existsSync('_site/bar.html')).toBeFalsy();
});

test('does not create files which are not ghtml', () => {
  testdir({'components': [], 'pages': {'foo.html': 'hi'}});
  build();
  expect(fs.existsSync('_site/foo.html')).toBeFalsy();
});

test('creates a subdirectory with a file', () => {
  testdir({
    'components': [],
    'pages': {'foo': {'bar.ghtml': 'hi'}},
  });
  build();
  expect(fs.existsSync('_site/foo/bar.html')).toBeTruthy();
});
