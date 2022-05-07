const path = require('path');

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
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      }
    ]
  },
}
