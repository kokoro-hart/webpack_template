# Pug + DartSass(FROCSS) + TypeScriptテンプレート

## 開発開始時
```
$ npm i
$ npm run server
```
- http://localhost:3000 でローカルサーバーが起動。
- Pug,Sass,TypeScriptのコンパイル、babelによるjsのトランスパイル、ESLint、Prettier,画像圧縮.etc
- 詳しくはwebpack.config.jsを参照

## 納品時

```
$ npm run build
```
- distフォルダ直下に納品時ファイルを生成

## その他コマンド
```
$ npm run dev // developmentモードで出力
$ npm run lint // ESLintとPrettierを実行する
```