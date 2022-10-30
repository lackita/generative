const {XMLParser, XMLBuilder} = require('fast-xml-parser');
const {Element, Text} = require('./element.js');

options = {
  isArray: (name) => name == 'define',
  ignoreAttributes: false,
  preserveOrder: true,
  unpairedTags: ['!DOCTYPE html', 'br'],
  alwaysCreateTextNode: true,
};

const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

class Parser {
  constructor() {}
  parse(string, debug) {
    let parsed = parser.parse(`<root>${string}</root>`);
    return this.parse_elements(parsed, debug)[0];
  }

  parse_elements(elements, debug) {
    let parsed = [];
    for(let i in elements) {
      parsed.push(this.parse_element(elements[i], debug));
    }
    return parsed;
  }

  parse_element(element, debug) {
    let components = this.collate_components(element, debug);

    if(components.tag == '#text') {
      return new Text(components.children);
    } else {
      return new Element(
        components.tag,
        this.parse_elements(components.children, debug),
        components.attributes,
      );
    }
  }

  collate_components(parsed_code) {
    let components = {
      attributes: {},
    };

    for(let k in parsed_code) {
      if(k == ':@') {
        for(let a in parsed_code[k]) {
          components.attributes[a.substring(2)] = parsed_code[k][a];
        }
      } else {
        components.tag = k;
        if(typeof parsed_code[k] === "string") {
          components.children = parsed_code[k];
        } else {
          components.children = [];
          for(let c in parsed_code[k]) {
            components.children.push(parsed_code[k][c]);
          }
        }
      }
    }

    return components;
  }
}

class Builder {
  constructor() {}

  build(parsed_tree) {
    return builder.build(parsed_tree.map((e) => e.fxp_element()));
  }
}

module.exports = {Parser, Builder};
