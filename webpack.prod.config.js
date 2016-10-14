/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, prefer-template */

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {

  entry: [
    './dev-index.js',
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'ob-list.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer],
      },
    }),
  ],

  resolve: {
    modules: [
      path.resolve('./node_modules'),
    ],
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=' + path.join(__dirname, 'node_modules/babel-preset-fbjs/index') +
          ',plugins[]=' + path.join(__dirname, 'uniRelayPlugin') +
          ',plugins[]=' + path.join(__dirname, 'babelRelayPlugin')],
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&localIdentName=[name]_[local]_[hash:base64:3]',
          'postcss',
          'sass',
        ],
      },
      {
        test: /\.(ttf|eot|svg|png|jpg|gif)(\?[\s\S]+)?$/,
        loader: 'file',
      },
    ],
  },
};
