#!/usr/bin/env node

'use strict';

const Args = require('./arguments.js');

const args = new Args(process.argv);

switch (args.command()) {
  case 'init':
    require('./init.js')();
    break;
  case 'build':
    require('./build.js')();
    break;
  default:
    require('./help.js')(args.command());
    break;
}
