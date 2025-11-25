// toggleMenu.js
export function initToggleMenu() {
	document.addEventListener('DOMContentLoaded', () => {
		const breakpoint = window.matchMedia('(max-width: 767px)');
		const toggleMenuButton = document.querySelector('.js-toggle-menu');
		const headerNavigation = document.querySelector('.c-navigation__header--wrapper');
		const root = document.querySelector('html');

		if (!headerNavigation) return;

		const toggleMenu = () => {
			if(headerNavigation.classList.contains('is-open')) {
				headerNavigation.classList.remove('is-open');
				toggleMenuButton.classList.remove('is-open');
				root.classList.remove('is-open');
			} else {
				headerNavigation.classList.add('is-open');
				toggleMenuButton.classList.add('is-open');
				root.classList.add('is-open');
			}
		};

		const resetOpenMenu = () => {
			headerNavigation.classList.remove('is-open');
			toggleMenuButton.classList.remove('is-open');
			root.classList.remove('is-open');
		}

		toggleMenuButton.addEventListener('click', toggleMenu);

		function handleBreakpointChange() {
			// ブレイクポイント切り替えのタイミングでメニューの開閉状態をリセット
			resetOpenMenu();
		}

		handleBreakpointChange(breakpoint);
		breakpoint.addEventListener('change', handleBreakpointChange);
	});
}
