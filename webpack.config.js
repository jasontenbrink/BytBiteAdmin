var webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  // ,plugins: [
  //       new webpack.optimize.UglifyJsPlugin({
  //         // sourceMap: true,
  //         compress:{
  //           warnings: false
  //         }
  //       })
  //   ]

  devtool: "eval-source-map"
  // ,devtool: 'cheap-module-source-map' //use this for prod
};
