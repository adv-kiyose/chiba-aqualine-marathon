export function initWaveAnimation() {
	const canvas = document.getElementById('waveCanvas');

    if(!canvas) { return } // 対象がない画面ではスキップ
    const ctx = canvas.getContext('2d');

    let count = 0;   // アニメーション用カウンタ

    function init() {
        // 画像の表示サイズに合わせてCanvasサイズを調整
        // 全ての対象画像を取得
        const images = document.querySelectorAll('.p-top__mainvisual img');

        // 表示されている（display: none ではない）画像を探す
        const visibleImg = Array.from(images).find(img => img.offsetParent !== null);

        if (visibleImg) {
            // この visibleImg を使って canvas のサイズを合わせる
            canvas.width = visibleImg.clientWidth;
            canvas.height = visibleImg.clientHeight;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 1. グラデーションの作成（開始X, 開始Y, 終了X, 終了Y）
        // 横方向のグラデーションにするため、Y座標は固定(0)し、X座標を0からcanvas.widthまで指定します
        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        // 2. カラーストップの設定 (位置は 0.0 〜 1.0 で指定)
        grad.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
        grad.addColorStop(0.5, 'rgba(98, 170, 255, 1.0)');
        grad.addColorStop(1.0, 'rgba(255, 255, 255, 1.0)');

        // 波の塗りつぶし色（透過させると画像が見えます）
        ctx.fillStyle = grad;
        ctx.beginPath();
        
        // 波形の描画
        drawWave(canvas, ctx, count);
        
        ctx.lineTo(canvas.width, canvas.height); // 右下へ
        ctx.lineTo(0, canvas.height);            // 左下へ
        ctx.closePath();
        ctx.fill();

        count += 0.3;
        requestAnimationFrame(draw);
    }

    // Tips: 固定値の変数を引数化し、canvasを複数設置してdrawWaveすることで波を重ねることも可能
    function drawWave(canvas, ctx, count) {
        const pcHeight = 0.715;
        const spHeight = 0.690;

        const segment = 5; // 線を描く細かさ
        const amplitude = 10; // 波の高さ
        const wavelength = 22; // 波の周期
        const waveHeight = canvas.width > 769 ? pcHeight : spHeight; // 波の位置
        
        ctx.moveTo(0, canvas.height / 2); // 開始点（画像の高さ中央付近）

        for (let x = 0; x <= canvas.width; x += segment) {
            // サイン波の計算
            const y = Math.sin((x - count) / wavelength) * amplitude + (canvas.height * waveHeight); 
            ctx.lineTo(x, y);
        }
    }

    window.addEventListener('load', () => {
        init();
    });

    init();
    draw();

	window.addEventListener('resize', init);
}