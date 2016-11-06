var test = require('tape')
var path = require('path')
var reader = require('folder-reader')
var ok = require('obj-keypath')
var rewrite = require('../index')

test('convert those links', function (t) {
  var md = '[example](example.md)'

  md = rewrite(md, {
    root: '/',
    filepath: '/'
  })

  t.equal(md, '[example](/example/)')
  t.end()
})

test('nested directories', function (t) {
  var dir = path.join(__dirname, 'fixtures')
  var options = {
    map: function (data, cb) {
      data.file = rewrite(data.file, data)
      cb(data)
    }
  }

  var contents = {}
  var stream = reader(dir, options)

  stream.on('data', function (data) {
    ok.set(contents, data.relname.split('/'), data.file)
  })

  stream.on('end', function () {
    t.equal(contents.wut.wee.oh['oh.md'], '[a](/a/)\n\n[hey](/wut/hey/hey/)')
    t.end()
  })
})
