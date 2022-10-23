const {Parser, Expander, builder, Element} = require('./parser.js');

let p = new Parser();
let tree = p.parse('<div><p>a</p></div>');
