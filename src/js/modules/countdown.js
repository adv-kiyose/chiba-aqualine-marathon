
// 開催日を設定（2026年11月8日）
const targetDate = new Date('2026-11-08T09:40:00+09:00');

const updateCountdown = (targetDate) => {
	const now = new Date();
	const diffMs = targetDate - now;
	const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
	const countdownWrapper = document.querySelector('.p-top__countdown');

	if(diffMs > 0) {
		// 開催時間まで
		const elDay = countdownWrapper.querySelector('.js-countdown-day');
		const elHour = countdownWrapper.querySelector('.js-countdown-hour');
		const elMin = countdownWrapper.querySelector('.js-countdown-min');
		const elSec = countdownWrapper.querySelector('.js-countdown-sec');

		const diffSec = Math.floor(diffMs / 1000);
		const days = Math.floor(diffSec / (60 * 60 * 24));
		const hours = Math.floor((diffSec % (60 * 60 * 24)) / (60 * 60));
		const minutes = Math.floor((diffSec % (60 * 60)) / 60);
		const seconds = diffSec % 60;

		elDay.textContent = String(days).padStart(3, '0');
		elHour.textContent = String(hours).padStart(2, '0');
		elMin.textContent = String(minutes).padStart(2, '0');
		elSec.textContent = String(seconds).padStart(2, '0');
	} else if(diffDays === 0) {
		// 開催時間後～当日中
		countdownWrapper.querySelector('.p-top__countdown--text').textContent = 'アクアラインマラソン2026';
		countdownWrapper.querySelector('.p-top__countdown--day').innerHTML = '<span>本日開催！</span>';

		clearInterval(timer);
	} else {
		// 開催後
		countdownWrapper.style.display = 'none';
		clearInterval(timer);
	}
};

export function initCountdown() {
	const countdownWrapper = document.querySelector('.p-top__countdown');
	if (!countdownWrapper) return;

	// 初回実行＋1秒ごと更新
	updateCountdown(targetDate);
	const timer = setInterval(() => {
		updateCountdown(targetDate)
	}, 1000);
}
