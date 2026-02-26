import './assets/styles/main.scss'
import { initNavigationMenu } from './js/modules/navigationMenu.js';
import { initToggleMenu } from './js/modules/toggleMenu.js';
import { registerResponsiveSlider } from './js/modules/bannerSlider';
import { initScrollTop } from './js/modules/scrollTop.js';
import { initTogglePageTop } from './js/modules/togglePageTop.js';
import { loadNews } from './js/modules/newsList.js';
import { initCountdown } from './js/modules/countdown.js';
import { initFadeInContainer } from './js/modules/fadeInContainer.js';
import { initOpenModal } from './js/modules/openModal.js';
import { initWaveAnimation } from './js/modules/waveAnimation.js';
import { initSwitchTab } from './js/modules/switchTab.js';
import { initAccordion } from './js/modules/toggleAccordion.js';
import ScrollHint from 'scroll-hint';
import 'scroll-hint/css/scroll-hint.css';

initNavigationMenu();
initToggleMenu();
initTogglePageTop();
initFadeInContainer();

registerResponsiveSlider('.js-banner-slider', {
	spaceBetween: 10,
	slidesPerView: 2,
	centeredSlide: false,
	loop: true
	// 他に必要なSwiperオプションを追加
}, 768);

registerResponsiveSlider('.js-movies-slider', {
	spaceBetween: 10,
	slidesPerView: 1,
	centeredSlide: true,
	loopSlides: 16,
	loop: true
	// 他に必要なSwiperオプションを追加
}, 768);

registerResponsiveSlider('.js-info-slider', {
	spaceBetween: 10,
	slidesPerView: 1,
	centeredSlide: true,
	loopSlides: 16,
	loop: true
	// 他に必要なSwiperオプションを追加
}, 768);


registerResponsiveSlider('.js-kv-slider', {
	spaceBetween: 0,
	slidesPerView: 1,
	centeredSlide: true,
	loop: true,
	autoplay: {
        delay: 4000,
        disableOnInteraction: false
	}
	// 他に必要なSwiperオプションを追加
}, 768);

registerResponsiveSlider('.js-sponsor-slider', {
	spaceBetween: 10,
	slidesPerView: 1,
	centeredSlide: true,
	loopSlides: 16,
	loop: true
	// 他に必要なSwiperオプションを追加
}, 768);

document.addEventListener('DOMContentLoaded', () => {
	// initScrollHint();
	initScrollTop();
	loadNews();
	initCountdown();
	initOpenModal();
	initWaveAnimation();
	initSwitchTab();
	initAccordion();

	new ScrollHint('.js-scrollable');
});