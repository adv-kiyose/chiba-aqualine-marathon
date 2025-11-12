export function initScrollTop() {
	const button = document.querySelector('.js-pagetop');

	if(!button) { return; }

	button.addEventListener('click', () => {
		window.scroll({
			top: 0,
			behavior: "smooth",
		});
	})
}