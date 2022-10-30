const fs = require('fs');
const path = require('path');
const Page = require("../../src/parser/page.js");
const testdir = require("../cli/testdir.js");

describe('build', () => {
  test('creates the file', () => {
    testdir({
      'pages': {'foo.ghtml': '<div>foo</div>'},
      '_site': [],
    });
    let page = new Page('pages', [], 'foo.ghtml');
    page.build('_site');
    expect(fs.existsSync(path.join('_site', 'foo.html'))).toBeTruthy();
  });
});

test('generates basic text', () => {
  let page = build_page('foo.ghtml', 'bar');
  expect(page.html()).toBe('<!DOCTYPE html><html><body>bar</body></html>');
});

function build_page(filename, ghtml) {
  testdir({
    'pages': {[filename]: ghtml},
    '_site': [],
  });
  return new Page('pages', [], 'foo.ghtml');
}
