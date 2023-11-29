module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'false',
        useBuiltIns: 'usage',
        corejs: '3.22',
        targets: '> 0.25%, not dead',
      },
    ],
  ],
};
