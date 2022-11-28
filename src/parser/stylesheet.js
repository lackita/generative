'use strict';

const css = require('css');

class Stylesheet {
  constructor (env) {
    this.env = env;
  }

  css () {
    return css.stringify(this.ast(), { compress: true });
  }

  ast () {
    return {
      type: 'stylesheet',
      stylesheet: {
        rules: this.env.css.valueSeq().map((r) => r.ast()),
      },
    };
  }
}

module.exports = Stylesheet;
