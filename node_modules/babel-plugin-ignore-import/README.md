# babel-plugin-ignore-import
Babel plugin to ignore import statements that match a particular string. This plugin will completely remove the `import` or `require` line from the file if the path matches the passed regular expression string. Also supports passing an array of file extensions.

Usage:

{
  plugins: [
    ["ignore-import", {
      "pathPattern": "path/to/remove",
      "extensions": [".css", ".less"]
    }]
  ]
}
