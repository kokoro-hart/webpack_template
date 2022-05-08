const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "./js/bundle.js",
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
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: 'img/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename:'./css/style.css',
    }),
    //htmlのビルド
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html',
    }),
    new CleanWebpackPlugin(),
  ]
}
