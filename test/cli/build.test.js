'use strict';

const fs = require('fs');
const build = require('../../src/cli/build.js');
const testdir = require('./testdir.js');

test('empty directories', () => {
  testdir({ components: [], pages: [] });
  build();
});

test('parses pages', () => {
  testdir({
    components: [],
    pages: { 'foo.ghtml': '<div>foo</div>' },
  });
  build();
  expect(fs.existsSync('_site/foo.html')).toBeTruthy();
});

test('clears existing directory', () => {
  testdir({
    components: [],
    pages: { 'foo.ghtml': '<div>foo</div>' },
    _site: { 'bar.html': 'bad' },
  });
  build();
  expect(fs.existsSync('_site/bar.html')).toBeFalsy();
});

test('does not create files which are not ghtml', () => {
  testdir({ components: [], pages: { 'foo.html': 'hi' } });
  build();
  expect(fs.existsSync('_site/foo.html')).toBeFalsy();
});

test('creates a subdirectory with a file', () => {
  testdir({
    components: [],
    pages: { foo: { 'bar.ghtml': 'hi' } },
  });
  build();
  expect(fs.existsSync('_site/foo/bar.html')).toBeTruthy();
});

test('builds a component', () => {
  testdir({
    components: {
      'foo.ghtml': '<define><name>foo</name><base>div</base><html>bar</html></define>',
    },
    pages: { 'index.ghtml': '<foo />' },
  });
  build();
  expect(fs.readFileSync('_site/index.html', 'utf8')).toBe('<!DOCTYPE html><html><head><link rel="stylesheet" href="stylesheet.css"></head><body><div class="foo">bar</div></body></html>');
});

it('creates a stylesheet if any component rules exist', () => {
  testdir({
    components: { 'foo.ghtml': '<define><name>foo</name><base>div</base><css>span {font-size: 12px;}</css><html><span>foo</span></html></define>' },
    pages: { 'index.ghtml': '<foo />' },
  });

  process.env.debug = true;
  build();
  expect(fs.readFileSync('_site/stylesheet.css', 'utf8')).toBe('div.foo span{font-size:12px;}');
});
