const switchTab = (target) => {
	const tabs = target.querySelectorAll('.tabs li');
	const contents = target.querySelectorAll('.tab-content');

	tabs.forEach((tab) => {
		tab.addEventListener('click', (event) => {
			const _this = event.currentTarget;
			const id = _this.dataset.tab;

			if(_this.classList.contains('is-current')) {
				// カレントなら処理はスキップ
				return;
			}

			// 一旦全てのタブのカレントを解除
			tabs.forEach((li) => {
				li.classList.remove('is-current');
			})
			contents.forEach((cont) => {
				cont.classList.remove('is-current');
			});

			// 押下したタブと対応するIDを持つコンテンツを表示
			_this.classList.add('is-current');
			document.querySelector(`#${id}`).classList.add('is-current');
		})
	});
}

export function initSwitchTab() {
	const tabContent = document.querySelectorAll('.js-switch-tab');
	if(tabContent.length === 0) { return; }

	tabContent.forEach((target) => {
		switchTab(target);
	})
}