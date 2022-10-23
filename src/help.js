function help(command) {
  let unknown_message = '';
  if(command != 'help') {
    unknown_message = `Unknown command: ${command}
`;
  }
  console.log(`Generative - Building Clean Web Abstractions
${unknown_message}
Commands:
help - print this message
init - make the current directory a generative project`);
}

module.exports = help;
