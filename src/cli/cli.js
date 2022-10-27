#!/usr/bin/env node

const Args = require('./arguments.js');

let args = new Args(process.argv);

switch(args.command()) {
case 'init':
    let init = require('./init.js');
    init();
    break;
case 'build':
    let build = require('./build.js');
    build();
    break;
default:
    let help = require('./help.js');
    help(args.command());
    break;
}
