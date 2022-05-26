module.exports = function (babel, opts) {
  return {
    visitor: {
      ExportAllDeclaration: (path) => {
        const { node } = path
        if (node.source && node.source.extra && node.source.extra.rawValue.startsWith('./')) {
          node.source = babel.types.stringLiteral(
            node.source.extra && node.source.extra.rawValue + '.' + opts.extension
          )
        }
      },
      ImportDeclaration: (path) => {
        const { node } = path
        if (node.source && node.source.extra && node.source.extra.rawValue.startsWith('./')) {
          node.source = babel.types.stringLiteral(
            node.source.extra && node.source.extra.rawValue + '.' + opts.extension
          )
        }
      }
    }
  }
}
