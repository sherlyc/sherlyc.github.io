import * as webpack from "webpack";

export default {
  devtool: false,
  output: {
    filename: "spade/[name].[chunkhash:20].js"
  },
  externals: {
    newrelic: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({ SPADE_VERSION: "SNAPSHOT" }),
    new webpack.SourceMapDevToolPlugin({
      noSources: true
    })
  ]
} as webpack.Configuration;
