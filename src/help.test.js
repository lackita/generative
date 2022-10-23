const help = require('./help.js');

test('includes unknown command', () => {
  let message;
  console.log = (m) => message = m;
  help('unknown');
  expect(message).toMatch('Unknown command: unknown');
});

test('treats help as known', () => {
  let message;
  console.log = (m) => message = m;
  help('help');
  expect(message).not.toMatch('Unknown command: help');
});
