export function initFacebook() {
	let interval = false;
	let isSP = false;
	const breakpoint = window.matchMedia('(max-width: 767px)');
	if(breakpoint) {
		isSP = true;
	}

	const rewriteFacebookWidget = () => {
		const breakpoint = window.matchMedia('(max-width: 767px)');

		// intervalがtrueの間は直前に登録されたイベントを削除
		if(interval !== false) {
			clearTimeout(interval);
		}

		// 
		if(isSP || breakpoint.matches) {
			interval = setTimeout(function() {
				const boxWidth = document.querySelector('.facebook').clientWidth;
				const currentWidth = document.querySelector('.facebook .fb-page').dataset.width;

				if(boxWidth !== currentWidth){
					document.querySelector('.facebook .fb-page').dataset.width = boxWidth;
					FB.XFBML.parse(document.querySelector('.facebook'));
				}

				// PC表示の際、ブレイクポイント切り替わり直後の1回以外は、フラグをfalseにしてリサイズ処理をスキップさせる
				if(!breakpoint.matches) {
					isSP = false;
				} else {
					isSP = true;
				}
			}, 500);
		}
	};

	rewriteFacebookWidget();
	window.addEventListener('resize', rewriteFacebookWidget);
};