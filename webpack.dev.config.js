/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, prefer-template */

const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const theme = require('postcss-theme');

const libraryName = 'forms';
const outputFile = libraryName + '.js';

module.exports = {

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    './src/index.js',
  ],

  output: {
    path: path.join(__dirname, 'lib'),
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,

    publicPath: '/',
  },

  devServer: {
    headers:
    {
      'Access-Control-Allow-Origin': 'http://sg.isasoft.ru',
      'Access-Control-Allow-Credentials': 'true',
    },
  },

  devtool: '#source-map',

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer,
          theme({ themePath: '../../themes/default-theme' }),
        ],
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
        test: /\.(js)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=' + path.join(__dirname, 'node_modules/babel-preset-fbjs/index')],
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
        test: /\.(ttf|woff|woff2|eot|svg|png|jpg|gif)(\?[\s\S]+)?$/,
        loader: 'file',
      },
    ],
  },
};
