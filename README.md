# webpackによるPug + DartSass + VanillaJsテンプレート

## 開発開始時
```
$ npm run server
```
- http://localhost:3000 でローカルサーバーが起動。
- Pug,Sassのコンパイル、babelによるjsのトランスパイル、画像圧縮.etc
- 詳しくはwebpack.config.jsを参照

## 納品時

```
$ npm run build
```
- distフォルダに納品時ファイルを生成

## その他コマンド
```
$ npm run dev // 開発環境として出力
```