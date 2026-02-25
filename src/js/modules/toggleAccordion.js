// navigationMenu.js
const toggleAccordion = (event) => {
	const button = event.currentTarget;
	const targetName = button.dataset.target;

	// dataの設定漏れがあった場合エラーを投げる
	if(!targetName) {
		throw error();
	};

	const accordionTarget = document.querySelector(`.js-toggle-target[data-name="${targetName}"]`);

	if(button.classList.contains('is-active')) {
		button.classList.remove('is-active');
		accordionTarget.classList.remove('is-active');
	} else {
		button.classList.add('is-active');
		accordionTarget.classList.add('is-active');
	}
}

export function initAccordion() {
	const accordionContent = document.querySelectorAll('.js-toggle-accordion');
	if(accordionContent.length === 0) { return; }

	accordionContent.forEach((target) => {
		target.addEventListener('click', toggleAccordion);
	})
}
