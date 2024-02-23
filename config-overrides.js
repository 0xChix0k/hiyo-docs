const path = require('path');
const {
  override,
  addWebpackAlias,
  addBabelPlugin,
} = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    hooks: path.resolve(__dirname, 'src/hooks'),
    data: path.resolve(__dirname, 'src/data'),
    assets: path.resolve(__dirname, 'src/assets'),
    components: path.resolve(__dirname, 'src/components'),
    model: path.resolve(__dirname, 'src/model'),
    styles: path.resolve(__dirname, 'src/styles'),
    router: path.resolve(__dirname, 'src/router'),
    pages: path.resolve(__dirname, 'src/pages'),
    services: path.resolve(__dirname, 'src/services'),
    store: path.resolve(__dirname, 'src/store'),
    utils: path.resolve(__dirname, 'src/utils'),
  }),
  addBabelPlugin('@emotion/babel-plugin'),
);
