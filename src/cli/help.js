'use strict';

function help (command) {
  let unknownMessage = '';
  if (command !== 'help') {
    unknownMessage = `Unknown command: ${command}
`;
  }
  console.log(`Generative - Building Clean Web Abstractions
${unknownMessage}
Commands:
help - print this message
init - make the current directory a generative project`);
}

module.exports = help;
