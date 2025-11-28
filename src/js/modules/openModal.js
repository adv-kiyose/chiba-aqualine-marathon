import MicroModal from "micromodal";

export function initOpenModal() {
	MicroModal.init({
		openClass: 'is-open',
		disableScroll: true,
		awaitOpenAnimation: true
	})
}