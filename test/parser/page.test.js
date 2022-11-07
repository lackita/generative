'use strict';

const fs = require('fs');
const path = require('path');
const Page = require('../../src/parser/page.js');
const Environment = require('../../src/transform/environment.js');
const testdir = require('../cli/testdir.js');

describe('build', () => {
  test('creates the file', () => {
    testdir({
      pages: { 'foo.ghtml': '<div>foo</div>' },
      _site: [],
    });
    const page = new Page('pages', [], 'foo.ghtml');
    page.build(new Environment(), '_site');
    expect(fs.existsSync(path.join('_site', 'foo.html'))).toBeTruthy();
  });
});

test('generates basic text', () => {
  const page = buildPage('foo.ghtml', 'bar');
  expect(page.html(new Environment())).toBe('<!DOCTYPE html><html><body>bar</body></html>');
});

function buildPage (filename, ghtml) {
  testdir({
    pages: { [filename]: ghtml },
    _site: [],
  });
  return new Page('pages', [], filename);
}
