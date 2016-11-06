var assert = require('assert')
var path = require('path')
var isRelativeUrl = require('is-relative-url')

/**
* Read the contents of a directory asynchronously
* @name rewriteGitHubUrls
* @param {String} src – The markdown string with links to rewrite
* @param {Object} options – options object
* @param {String} options.baseurl – the baseurl of the links. default is an empty string
* @param {String} options.root – the root directory of the markdown files
* @param {String} options.filepath – the full path of the markdown file
* @param {String} options.ext – the extension to replace `.md`. default is an empty string
* @example

**/
module.exports = function rewriteMarkdownUrls (src, options) {
  options = options || {}

  assert.equal(typeof src, 'string', 'src must be a string of markdown')
  assert.equal(typeof options, 'object', 'options must be an object')
  assert.equal(typeof options.root, 'string', 'options.root must be the absolute path of the root directory that contains the markdown')
  assert.equal(typeof options.filepath, 'string', 'options.filepath must be the absolute path of the markdown file')

  var baseurl = options.baseurl || ''
  var ext = options.ext || '/'
  var mdMatchRegex = /\[([^\]]+)]\((.+?)(\))/g

  return src.replace(mdMatchRegex, function (str, text, link) {
    if (!isRelativeUrl(link)) return str

    var root = path.dirname(options.filepath).replace(options.root, '')
    link = baseurl + path.normalize(root + '/' + link)

    if (link.indexOf('.md') >= 0) {
      link = link.replace('.md', ext)
      return '[' + text + '](' + link + ')'
    } else {
      return '[' + text + '](' + link + ')'
    }
  })
}
