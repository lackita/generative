'use strict';

const css = require('css');
const { Rule, Declaration } = require('./css.js');

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
        rules: this.env.addCSS(
          new Rule(
            ['body'],
            [
              new Declaration('height', '100vh'),
              new Declaration('margin', '0'),
            ],
          ),
        ).css.valueSeq().map((r) => r.ast()),
      },
    };
  }
}

module.exports = Stylesheet;
