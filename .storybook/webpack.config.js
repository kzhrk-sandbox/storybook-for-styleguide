const path = require('path');

module.exports = {
    resolve: {
      extensions: ['.js', '.scss', '.pug', '.md']
    },
      
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          exclude: /node_modules/,
          use: [
              'pug-loader'
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
              'style-loader',
              'css-loader',
              'sass-loader'
          ]
        }
      ]
    }
  };
  