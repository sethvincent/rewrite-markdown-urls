var path = require('path')
var reader = require('folder-reader')
var ok = require('obj-keypath')

var rewrite = require('../../index')

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
