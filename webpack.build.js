'use strict';

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var bourbon = require('node-bourbon').includePaths;
var config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-rest-ui.js';
config.output.libraryTarget = 'umd';
config.output.library = 'sjRest';
config.externals = {
  angular: {
    root: 'angular',
    commonjs2: 'angular',
    commonjs: 'angular',
    amd: 'angular'
  },
  'ng-file-upload': {
    root: 'ngFileUpload',
    commonjs2: 'ng-file-upload',
    commonjs: 'ng-file-upload',
    amd: 'ng-file-upload'
  }
};

config.module.loaders = [
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      notExtractLoader: 'style-loader',
      loader: 'css!postcss!sass?includePaths[]=' + bourbon
    })
  }
].concat(config.module.loaders);

config.module.postLoaders = [
  {test: /\.js$/, loader: 'ng-annotate', exclude: /(node_modules)/}
];
config.postcss = [ autoprefixer({ browsers: ['last 2 versions'] }) ];

config.plugins.push(
  new ExtractTextPlugin('sanji-rest-ui.css'),
  new webpack.optimize.DedupePlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    }
  })
);
module.exports = config;
