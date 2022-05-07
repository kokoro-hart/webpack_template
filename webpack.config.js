const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        // .cssファイルがあれば
        test: /\.css/,
        // css-loaderを利用する
        // 注意: loaderは下から順に適用されていく
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    //htmlのビルド
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ]
}
