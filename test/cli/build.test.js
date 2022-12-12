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
    pages: { 'foo.ghtml': '<body><div>foo</div></body>' },
  });
  build();
  expect(fs.existsSync('_site/foo.html')).toBeTruthy();
});

test('clears existing directory', () => {
  testdir({
    components: [],
    pages: { 'foo.ghtml': '<body><div>foo</div></body>' },
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
    pages: { foo: { 'bar.ghtml': '<body>hi</body>' } },
  });
  build();
  expect(fs.existsSync('_site/foo/bar.html')).toBeTruthy();
});

test('builds a component', () => {
  testdir({
    components: {
      'foo.ghtml': '<define><name>foo</name><base>div</base><body>bar</body></define>',
    },
    pages: { 'index.ghtml': '<body><foo /></body>' },
  });
  build();
  expect(fs.readFileSync('_site/index.html', 'utf8')).toBe(pageHTML('<div class="foo">bar</div>'));
});

it('creates a stylesheet if any component rules exist', () => {
  testdir({
    components: { 'foo.ghtml': '<define><name>foo</name><base>div</base><head><style>span {font-size: 12px;}</style></head><body><span>foo</span></body></define>' },
    pages: { 'index.ghtml': '<body><foo /></body>' },
  });

  build();
  expect(fs.readFileSync('_site/stylesheet.css', 'utf8')).toBe('div.foo span{font-size:12px;}');
});

it('handles multiple defines in the same file', () => {
  testdir({
    components: {
      'foo.ghtml': `
        <define>
          <name>foo</name>
          <base>div</base>
          <body><children><bar /></body>
        </define>
        <define>
          <name>bar</name>
          <base>div</base>
          <body>baz</body>
        </define>
      `,
    },
    pages: {
      'index.ghtml': '<body><foo>bing</foo></body>',
    },
  });

  build();
  expect(fs.readFileSync('_site/index.html', 'utf8')).toBe(pageHTML('<div class="foo"><div class="children">bing</div><div class="bar">baz</div></div>'));
});

function pageHTML (content) {
  return `<!DOCTYPE html><html><head><link rel="stylesheet" href="stylesheet.css"></head><body>${content}</body></html>`;
}
