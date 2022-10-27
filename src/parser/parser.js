const {XMLParser} = require('fast-xml-parser');
const {Element, TextElement} = require('./element.js');

options = {
  isArray: (name) => name == 'define',
  ignoreAttributes: false,
  preserveOrder: true,
  unpairedTags: ['br'],
  alwaysCreateTextNode: true,
};

const parser = new XMLParser(options);

class Parser {
  constructor() {}
  parse(string) {
    let parsed = parser.parse(`<root>${string}</root>`);
    return this.parse_elements(parsed, false)[0];
  }

  parse_elements(elements, debug) {
    let parsed = [];
    for(let i in elements) {
      parsed.push(this.parse_element(elements[i]));
    }
    return parsed;
  }

  parse_element(element) {
    let components = this.collate_components(element);

    if(components.tag == '#text') {
      return new TextElement(components.children[0]);
    } else {
      return new Element(
        components.tag,
        this.parse_elements(components.children),
        components.attributes,
      );
    }
  }

  collate_components(parsed_code) {
    let components = {
      attributes: {},
      children: [],
    };
    for(let k in parsed_code) {
      if(k == ':@') {
        for(let a in parsed_code[k]) {
          components.attributes[a.substring(2)] = parsed_code[k][a];
        }
      } else {
        components.tag = k;
        for(let c in parsed_code[k]) {
          components.children.push(parsed_code[k][c]);
        }
      }
    }

    return components;
  }
}

module.exports = Parser;
