# MarchingCubes アニメーション描画手順
テストページ：https://yamaji-hironori.github.io/animation_test/

## 手順１：ライブラリの読み込み
MarchingCubes アニメーションのために以下のライブラリを読み込みます。
```html
  <script type="text/javascript" src="./animation/lib/three.min.js"></script>
  <script type="text/javascript" src="./animation/lib/MarchingCubes.js"></script>
```
## 手順２：アニメーションモジュールの読み込み
ライブラリを読み込んだ後に、アニメーションモジュールを読み込みます。
```html
  <script type="text/javascript" src="./animation/blocks/Webgl/Webgl.js"></script>
```
## 手順３：`canvas`要素の準備
手順２で読み込んだモジュール(Webgl.js)は、"Webgl"id属性を持つcanvas要素に対して、描画を行います。<br>
そのため、以下の要素が必須となります。
```html
      <canvas id="Webgl"></canvas>
```
