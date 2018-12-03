const path = require('path');

module.exports = (storybookBaseConfig, configType) => {

  storybookBaseConfig.resolve = {
    extensions: ['.js', '.scss', '.pug', '.md']
  };

  storybookBaseConfig.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  });

  storybookBaseConfig.module.rules.push({
    test: /\.pug$/,
    exclude: /node_modules/,
    loader: 'pug-loader',
    options: {
      globals: ['config']
    }
  });

  // storybookBaseConfig.entry.main = './src/js/index.js';
  // storybookBaseConfig.output.path = path.resolve(__dirname, './public/js');

  // Return the altered config
  return storybookBaseConfig;
};