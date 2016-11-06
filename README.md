# rewrite-markdown-urls

Make links work both in GitHub README files and on static sites.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/rewrite-markdown-urls.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/rewrite-markdown-urls
[travis-image]: https://img.shields.io/travis/sethvincent/rewrite-markdown-urls.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/rewrite-markdown-urls
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

This module turns relative links used in GitHub markdown files into links that will work when that markdown is turned into a static site.

## Install

```sh
npm install --save rewrite-markdown-urls
```

## Usage

This example uses the [folder-reader](https://npmjs.org/folder-reader) and [obj-keypath](https://npmjs.org/obj-keypath) modules along with rewrite-markdown-urls:

```js
var path = require('path')
var reader = require('folder-reader')
var ok = require('obj-keypath')
var rewrite = require('rewrite-markdown-urls')

var docsDir = path.join(__dirname, 'docs')

var options = {
  map: function (data, cb) {
    data.file = rewrite(data.file, data)
    cb(data)
  }
}

var contents = {}
var stream = reader(docsDir, options)

stream.on('data', function (data) {
  ok.set(contents, data.relname.split('/'), data.file)
})

stream.on('end', function () {
  console.log(contents)
})
```

## Documentation
- [Getting started](docs/getting-started.md)
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic.js)
- [Nested directories](examples/nested-directories/index.js)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It is important that this project contributes to a friendly, safe, and welcoming environment for all. Read this project's [code of conduct](CONDUCT.md)

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/rewrite-markdown-urls/issues)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
