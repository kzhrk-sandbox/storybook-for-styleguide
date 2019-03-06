const path = require('path');

module.exports = ({config, mode}) => {

  config.resolve = {
    extensions: ['.js', '.scss', '.pug', '.md']
  };

  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  });

  config.module.rules.push({
    test: /\.pug$/,
    exclude: /node_modules/,
    loader: 'pug-loader',
    options: {
      globals: ['config']
    }
  });

  // config.entry.main = './src/js/index.js';
  // config.output.path = path.resolve(__dirname, './public/js');

  // Return the altered config
  return config;
};