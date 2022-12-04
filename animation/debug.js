/**
 * アニメーションのデバッグ・検証用モジュール
 * 本番反映時は用いない。
 */

const GUI = lil.GUI;
const gui = new GUI();

gui.add(effectController, 'ballSpeed', 0, 1, 0.01).name('ボールの動く速さ');
gui.add(effectController, 'numBlobs', 1, 20, 1).name('ボールの数');
// ボールの大きさ
gui.add(effectController, 'isolation', 60, 100, 1).name('ボールの大きさ');
// ボールの範囲
gui.add(effectController, 'scaleX', 0, 1000, 1).name('ボールのX範囲');
gui.add(effectController, 'scaleY', 0, 1000, 1).name('ボールのY範囲');
gui.add(effectController, 'scaleZ', 1, 100, 1).name('ボールのZ範囲');
// 光の変化について
gui.add(effectController, 'lightIntensity', 0, 1, 0.1).name('光の強さ');
gui.add(effectController, 'blur', 1, 100, 1)
    .name('ぼかし')
    .onChange(blur => {
        document.getElementById('webgl').style.filter = `blur(${blur}px)`;
    });
gui.add(effectController, 'opacitySpeed', {'線形': 1, '2乗': 2, '3乗': 3}).name('フェードの変化量');

const colorFolder = gui.addFolder('Colors');
colorFolder.addColor(colors, 'color1');
colorFolder.addColor(colors, 'color2');
colorFolder.addColor(colors, 'color3');
colorFolder.addColor(colors, 'color4');
colorFolder.addColor(colors, 'color5');
