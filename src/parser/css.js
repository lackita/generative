'use strict';

class Rule {
  constructor (selectors, declarations) {
    this.selectors = selectors;
    this.declarations = declarations;
  }

  scopedTo (scope) {
    return new Rule(
      this.selectors.map((s) => `${scope} ${s}`),
      this.declarations,
    );
  }

  ast () {
    return {
      type: 'rule',
      selectors: this.selectors,
      declarations: this.declarations.map((d) => d.ast()),
    };
  }
}

class Declaration {
  constructor (property, value) {
    this.property = property;
    this.value = value;
  }

  ast () {
    return {
      type: 'declaration',
      property: this.property,
      value: this.value,
    };
  }
}

module.exports = { Rule, Declaration };
