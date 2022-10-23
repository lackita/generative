function Function(name, html) {
  this.name = () => name;
  this.html = () => [{
    'div': html,
    ':@': {'@_class': this.name()},
  }];
}

function Expander(functions) {
  this.expand = (code) => {
    let result = [];
    for (let i in code) {
      for (let tag_name in code[i]) {
        result.push(functions[tag_name].html()[0]);
      }
    }
    return result;
  };
}
