'use strict';
const webpack = require('webpack');
module.exports = {
  devtool: false,
  output: {
    filename: 'spade/[name].[chunkhash:20].js'
  },
  externals: {
    newrelic: true
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /locale/),
    new webpack.EnvironmentPlugin(['SPADE_VERSION']),
    new webpack.SourceMapDevToolPlugin({
      noSources: true
    })
  ]
};
