const Args = require('../../src/cli/arguments.js');

test('has a command', () => {
  let args = new Args(['/usr/bin/node', '/usr/bin/generative', 'help']);
  expect(args.command()).toBe('help');
});
