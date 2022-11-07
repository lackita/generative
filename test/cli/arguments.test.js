'use strict';

const Args = require('../../src/cli/arguments.js');

test('has a command', () => {
  const args = new Args(['/usr/bin/node', '/usr/bin/generative', 'help']);
  expect(args.command()).toBe('help');
});
