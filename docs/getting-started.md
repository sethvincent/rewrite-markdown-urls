# Getting started with rewrite-markdown-urls

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
