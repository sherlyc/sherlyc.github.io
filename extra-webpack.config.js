'use strict';
const webpack = require('webpack');
module.exports = {
  devtool: false,
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /locale/),
    new webpack.SourceMapDevToolPlugin({
      noSources: true
    })
  ]
};
