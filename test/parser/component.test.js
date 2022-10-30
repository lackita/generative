const testdir = require("../cli/testdir.js");
const Component = require('../../src/parser/component.js');

test('parses a component file', () => {
    testdir({
        'components': {'foo.ghtml': '<define><name>foo</name></define>'},
    });
    let c = new Component('components', [], 'foo.ghtml');

    // expect(c.functions()).toBe(1);
});
