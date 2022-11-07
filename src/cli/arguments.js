'use strict';

function Arguments (argv) {
  this.argv = argv;
  this.command = () => argv[2];
}

module.exports = Arguments;
