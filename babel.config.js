module.exports = (api) => ({
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        corejs: { version: '3.9', proposals: true }, // core-js 3.9.1 is the last version that don't create duplications with vue babel preset !
        useBuiltIns: 'usage',
      },
    ],
  ],
  plugins: api.cache(() => process.env.NODE_ENV === 'production')
    ? [['ignore-import', { pathPattern: 'axios-mock-adapter|api/mockData' }]]
    : [],
});
