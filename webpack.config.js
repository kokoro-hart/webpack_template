const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globule = require("globule");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 本番環境のときはsoucemapを出力させない設定
const enabledSourceMap = process.env.NODE_ENV !== "production";

const app = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "./js/bundle.js",
  },
  devServer: {
    //ルートディレクトリの指定
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    // ブラウザを自動的に起動
    open: true,
    // ホットリロード
    hot: true,
    // ポート番号指定
    port: 3000,
    // 監視するフォルダ
    watchFiles: {
      paths: ["src/**/*"],
    },
    // bundle先ファイルを出力する
    devMiddleware: {
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        //babelの設定
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'targets':'> 0.25%, not dead',
                  }
                ]
              ]
            }
          },
        ]
      },
      {
        //Sassの設定
        test: /\.(sa|sc|c)ss$/,
        // 注意: loaderは下から順に適用されていく
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: [require("autoprefixer")({ grid: true })]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // dart-sass を優先
              implementation: require("sass"),
              //  production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap
            }
          },
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        },
      },
      {
        // Pugの設定
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