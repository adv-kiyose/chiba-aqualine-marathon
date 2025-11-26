// コンテンツコンテナのスクロールに応じたフェードイン
export function initFadeInContainer() {
	document.addEventListener('DOMContentLoaded', () => {
		const contentContainers = document.querySelectorAll('.c-container');

		if(contentContainers.length <= 0) { return; }

		const observerOptions = {
			rootMargin: '-15% 0px -15% 0px' // 15%見えているとき
		}

		const observer = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if(entry.isIntersecting && !entry.target.classList.contains('is-visible')) {
					entry.target.classList.add('is-visible');
					// クラス追加後は不要となるため監視を解除
					obs.unobserve(entry.target);
				}
			});
		}, observerOptions);

		// 初期表示で画面内にある要素のチェック
		contentContainers.forEach((value) =>{
			observer.observe(value);

			// 初期状態で画面内にある要素を即時処理
			const rect = value.getBoundingClientRect();
			const inView =
				rect.top < window.innerHeight && // 画面幅によって判定をすり抜けるため、thresholdは考慮しない
				rect.bottom > 0;

			if (inView) {
				// 画面内にあるなら即時表示＆監視の解除
				value.classList.add('is-visible');
				observer.unobserve(value);
			}
		});
	});
}