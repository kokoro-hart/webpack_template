const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globule = require("globule");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const app = {
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
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        },
      },
      {// Pugの設定
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
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
    // //htmlのビルド
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/templates/index.pug',
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'about.html',
    //   template: './src/templates/about.pug',
    // }),
    new CleanWebpackPlugin(),
  ]
}
//srcフォルダからpngを探す
const templates = globule.find("./src/templates/*.pug", {
  ignore: ["./src/templates/_*.pug"]
});

//pugファイルがある分だけhtmlに変換する
templates.forEach((template) => {
  const fileName = template.replace("./src/templates/", "").replace(".pug", ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: template,
      //inject: false, //false, head, body, trueから選べる
      minify: false //本番環境でも圧縮しない
    }),
  );
});

module.exports = app;