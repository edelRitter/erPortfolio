const path = require('path');

const { declare } = require('@babel/helper-plugin-utils');

function extFix(ext) {
  return ext.charAt(0) === '.' ? ext : (`.${ext}`);
}

module.exports = declare(() => {
  return {
    name: 'ignore-import',
    visitor: {
      CallExpression: {
        enter(nodePath, { opts }) {
          const { extensions = [], pathPattern } = opts;
          const filteredExtensions = extensions.map(extFix);
          const callee = nodePath.get('callee');

          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            const arg = nodePath.get('arguments')[0];
            if (arg && arg.isStringLiteral()) {
              const argVal = arg.node.value;
              if (filteredExtensions.indexOf(path.extname(argVal)) > -1 || (pathPattern && (new RegExp(pathPattern)).test(argVal))) {
                nodePath.remove();
              }
            }
          }
        }
      },
      ImportDeclaration(nodePath, { opts }) {
        const { pathPattern, extensions = [] } = opts;
        const filteredExtensions = extensions.map(extFix);
        if ((pathPattern && (new RegExp(pathPattern)).test(nodePath.node.source.value)) || filteredExtensions.indexOf(path.extname(nodePath.node.source.value)) > -1) {
          nodePath.remove();
        }
      }
    }
  };
});
