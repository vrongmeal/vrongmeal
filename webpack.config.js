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
            options: { outputPath: '../styles/', name: 'main.css' }
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
    path: path.resolve(__dirname, 'static/scripts/'),
    filename: 'index.js'
  }
};
