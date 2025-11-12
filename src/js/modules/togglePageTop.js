// ページトップボタンの表示制御
export function initTogglePageTop() {
	document.addEventListener('DOMContentLoaded', () => {
		const pageTopButton = document.querySelector('.js-pagetop'); // PAGE TOPボタン
		const mainVisual = document.querySelector('.p-top__mainvisual'); // キービジュアル


		if(!pageTopButton) { return; }

		if(mainVisual) {
			// キービジュアルがある＝TOP画面のみスクロールによる表示制御を実施

			const observerOptions = {
				root: null, // viewpoint
				rootMargin: '0px',
				threshold: 0.2 // 20%見えているとき
			};

			const observer = new IntersectionObserver((entries) => {
				entries.forEach((entry) => {
					if(entry.isIntersecting) {
						pageTopButton.classList.add('is-hidden');
					} else {
						pageTopButton.classList.remove('is-hidden');
					}
				});
			}, observerOptions);

			observer.observe(mainVisual);
		}
	});
}

