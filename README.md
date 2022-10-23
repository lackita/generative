# Generative

Generative is a new way of constructing HTML. This is just the start
of the project at this point, though, so here are the project goals:

* Encapsulation of ideas in new tags
* Keep HTML, Javascript and CSS that are interrelated in source files,
  but separate an minify them before serving.
* Allow designers to specify in terms of completely compliant specs
* Provide succinct high level summaries of the information on a page

It will achieve these goals by generating the actual HTML served from
an extended version of HTML, CSS and Javascript.

# Usage

To get started in a new project, run the following command in the
directory of your choice:

``` shell
generative init
```

This will create a few files that you'll need to worry about:

* .gitignore: Really all we care about is that the _site directory is
  not checked in. If the file already exists, it will append that if
  it's not already present.
* pages: Files in this directory will get translated into actual html
  pages in the _site directory. It will be seeded with an example
  file.
* components: Files in this directory will define building blocks used
  by pages. It will also be seeded with an example file.

# Development

Code quality is maintained using jshint and jest, and those passing
are a prerequisite for any changes. You can run them using `npm test`,
and any new code should be covered by some new test.

## Parsing

Parsing ghtml is done using fast-xml-parser, but the data structures
that library produces are difficult to work with. To address that
limitation, the parser library immediately converts the result into a
tree of classes.

Because Generative aims to allow extremely succinct files, it's
distinctly possible to have a file with text at the top
level. Unfortunately, fast-xml-parser operates under the assumption
that the code it's parsing has some sort of root element, so every
parse tree has an implicit top level root element.
