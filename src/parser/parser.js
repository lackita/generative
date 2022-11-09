'use strict';

const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const { Map } = require('immutable');
const { Element, Text } = require('./element.js');

const options = {
  isArray: (name) => name === 'define',
  ignoreAttributes: false,
  preserveOrder: true,
  unpairedTags: ['!DOCTYPE html', 'br', 'input'],
  alwaysCreateTextNode: true,
  processEntities: false,
};

const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

class Parser {
  parse (string, debug) {
    const parsed = parser.parse(`<root>${string}</root>`);
    return this.parse_elements(parsed, debug)[0];
  }

  parse_elements (elements) {
    const parsed = [];
    for (const i in elements) {
      parsed.push(this.parse_element(elements[i]));
    }
    return parsed;
  }

  parse_element (element) {
    const components = this.collate_components(element);

    if (components.tag === '#text') {
      return new Text(components.children);
    } else {
      return new Element(
        components.tag,
        components.attributes,
        this.parse_elements(components.children),
      );
    }
  }

  collate_components (parsedCode) {
    const components = {
      attributes: new Map(),
    };

    for (const k in parsedCode) {
      if (k === ':@') {
        for (const a in parsedCode[k]) {
          components.attributes = components.attributes.set(a.substring(2), parsedCode[k][a]);
        }
      } else {
        components.tag = k;
        if (typeof parsedCode[k] === 'string') {
          components.children = parsedCode[k];
        } else {
          components.children = [];
          for (const c in parsedCode[k]) {
            components.children.push(parsedCode[k][c]);
          }
        }
      }
    }

    return components;
  }
}

class Builder {
  build (parsedTree) {
    return builder.build(parsedTree.map((e) => e.fxp_element()));
  }
}

module.exports = { Parser, Builder };
