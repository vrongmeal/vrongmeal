const path = require('path');

module.exports = {
  entry: [
      './src/_js/index.js',
      './src/_sass/main.scss',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: '.', name: 'main.min.css' }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          },
        ]
      }
    ]
  },
  output: {
    // Build the javascript (and css) directly into the _site directory so
    // webpack and eleventy can work independent of each other.
    path: path.resolve(__dirname, '_site/webpack/'),
    filename: 'index.min.js'
  }
};
