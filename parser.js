const {XMLParser, XMLBuilder} = require('fast-xml-parser');

options = {
  isArray: (name) => name == 'define',
  ignoreAttributes: false,
  preserveOrder: true,
  unpairedTags: ['br'],
};

const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

function Parser() {
  this.parse = (code) => new RootElement(this.tree_for(parser.parse(code)));
  this.tree_for = (code) => new RootElement(code);
  /* {
     return code.map(
     e => {
     return new Element(e);
     /* let name;
   * let attributes;
   * let children;
   * for(k in e) {
   *   if(k == ':@') {
   *     attributes = e[k];
   *   } else {
   *     name = k;

   *     if (e[k] instanceof Array)
   *       chilren = this.tree_for(e[k]);
   *     else
   *       children = e[k];
   *   }
   * } */

  //}
  //);
  //} */;

  this.functions = () => {
    return parsed_code
      .filter((e) => e['define'])
      .reduce((r, f) => {
        let tag = this.tree_for([f])[0];
        let name = tag.find('name').children;
        let html = this.findTag(f['define'], 'html');
        r[name] = new Function(name, html);
        return r;
      }, {});
  };

  this.findTag = (parent, name) => parent.find((e) => e[[name]])[name];
}

/* function Tag(name, attributes, children) {
 *   this.name = name;
 *   this.attributes = attributes;
 *   this.children = children;
 *
 *   this.find = n => children.find(e => e.name == n);
 * }
 *  */
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

class Element {
  constructor(parsed_code) {
    this.parsed_code = parsed_code;
    this._attributes = {};
    this.raw_children = [];
    for(let k in parsed_code) {
      if(k == ':@') {
        for(let a in parsed_code[k]) {
          this._attributes[a.substring(2)] = parsed_code[k][a];
        }
      } else {
        this._tag = k;
        for(let c in parsed_code[k]) {
          this.raw_children.push(parsed_code[k][c]);
        }
      }
    }
  }

  find(tag) {
    if(this.tag == tag) return this;
    return this.children().find((c) => c.find(tag));
  }

  get tag() {
    return this._tag;
  }

  get attributes() {
    return this._attributes;
  }

  children() {
    return this.raw_children.map((c) => {
      if(c['#text']) {
        return new TextElement(c);
      } else {
        return new Element(c);
      }
    });
  };
}

class TextElement extends Element {
  children() {
    return [];
  }

  get value() {
    return this.raw_children[0];
  }
}

class RootElement extends Element {
  constructor(children) {
    super([]);
    this._children = [];
    for(let k in children) {
      this._children.push(children[k]);
    }
  }

  children() {
    return this._children;
  }
}

module.exports = {Parser, Expander, builder, Element};
