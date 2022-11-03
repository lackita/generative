const fs = require('fs');
const path = require('path');
const {Builder} = require('./parser.js');
const {Element, Doctype} = require('./element.js');
const File = require('./file.js');

const builder = new Builder();

class Page extends File {
  html(env) {
    return builder.build(this.converted_tree(env));
  }

  converted_tree(env) {
    return [
      new Doctype('html'),
      new Element(
        'html',
        {},
        [new Element('body', {}, this.parsed_file().children)],
      ),
    ];
  }

  build(env, destination) {
    let match = this.is_generative();
    if(match) {
      fs.writeFileSync(
        this.destination_path(destination),
        this.html(env),
      );
    }
  }

  destination_path(destination) {
    let match = this.is_generative();
    if (!match) throw `${this.source_path()} is not a generative file`;

    return path.join(destination, ...this.path, `${match[1]}.html`);
  }
}

module.exports = Page;
