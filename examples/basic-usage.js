const rewrite = require('../index')

var md = `# this is some markdown
[this is a github-style relative link](basic.md)
`
// In this case we're passing `/` to both `root` and `filepath` because this markdown isn't on the filesystem
// in most cases we'll be dealing with directories full of markdown
// see the nested-directories example

md = rewrite(md, {
  root: '/',
  filepath: '/'
})

console.log(md)
