// navigationMenu.js
export function initNavigationMenu() {
	document.addEventListener('DOMContentLoaded', () => {
		const breakpoint = window.matchMedia('(max-width: 767px)');
		let currentMode = ''; // 'sp' or 'pc'
		let navItems = document.querySelectorAll('.c-navigation__header > li');

		if (!navItems.length) return;

		function enableSPMode() {
			disableAllEvents();
			currentMode = 'sp';
			navItems.forEach(item => {
				const link = item.querySelector('.c-link__navigation');
				const subMenu = item.querySelector('.c-navigation__sub');
				if (!link || !subMenu) return;

				link.addEventListener('click', onClickSP);
			});
		}

		function onClickSP(e) {
			const subMenu = e.currentTarget.nextElementSibling;
			if (subMenu && subMenu.classList.contains('c-navigation__sub')) {
				e.preventDefault();
				e.currentTarget.classList.toggle('is-open');
				subMenu.classList.toggle('is-visible');
			}
		}

		function enablePCMode() {
			disableAllEvents();
			currentMode = 'pc';
			navItems.forEach(item => {
				const subMenu = item.querySelector('.c-navigation__sub');
				if (!subMenu) return;
				item.addEventListener('mouseenter', onEnterPC);
				item.addEventListener('mouseleave', onLeavePC);
			});
		}

		function onEnterPC(e) {
			const sub = e.currentTarget.querySelector('.c-navigation__sub');
			if (sub) sub.classList.add('is-visible');
		}

		function onLeavePC(e) {
			const sub = e.currentTarget.querySelector('.c-navigation__sub');
			if (sub) sub.classList.remove('is-visible');
		}

		function disableAllEvents() {
			navItems.forEach(item => {
				const link = item.querySelector('.c-link__navigation');
				const subMenu = item.querySelector('.c-navigation__sub');

				// イベント削除
				item.removeEventListener('mouseenter', onEnterPC);
				item.removeEventListener('mouseleave', onLeavePC);
				if (link) link.removeEventListener('click', onClickSP);

				// 状態リセット
				if (subMenu) {
					subMenu.classList.remove('is-visible');
					item.classList.remove('is-open');
				}
			});
		}

		function handleBreakpointChange(e) {
			if (e.matches && currentMode !== 'sp') {
				enableSPMode();
			} else if (!e.matches && currentMode !== 'pc') {
				enablePCMode();
			}
		}

		handleBreakpointChange(breakpoint);
		breakpoint.addEventListener('change', handleBreakpointChange);
	});
}
