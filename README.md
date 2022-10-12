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
