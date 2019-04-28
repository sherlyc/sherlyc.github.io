'use strict';
const webpack = require('webpack');
module.exports = {
  devtool: false,
  externals: {
    newrelic: true
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /locale/),
    new webpack.SourceMapDevToolPlugin({
      noSources: true
    })
  ]
};
