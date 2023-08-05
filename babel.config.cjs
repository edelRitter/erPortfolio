module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': 'false',
        'useBuiltIns': 'usage',
        'targets': '> 0.25%, not dead',
      }
    ]
  ],
};