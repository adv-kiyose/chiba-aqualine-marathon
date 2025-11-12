const categoryMap = {
	"大会情報": "info",
	"ランナー": "runner",
	"ボランティア": "volunteer",
	"イベント・応援": "event",
	"交通規制": "traffic"
};

const list = document.querySelector('.c-list__news--list');

export async function loadNews() {
	try {
	const response = await fetch('/data/news.json'); // baseパス考慮
	const newsItems = await response.json();
	if (!list) return;

	renderNews(newsItems);

	// --- タブクリック時のフィルタリング ---
	document.querySelectorAll('.c-tab__news li button').forEach(btn => {
		btn.addEventListener('click', () => {
		const category = btn.parentElement.classList[0]; // liのクラス名（例: info, runner）
		document.querySelectorAll('.c-tab__news li').forEach(li => li.classList.remove('is-active'));
		btn.parentElement.classList.add('is-active');

		if (category === 'all') {
			renderNews(newsItems);
		} else {
			const filtered = newsItems.filter(item =>
			item.tags.some(cat => categoryMap[cat] === category)
			);
			renderNews(filtered);
		}
		});
	});
	} catch (err) {
		console.error('ニュース読み込みエラー:', err);

		renderNews([
			{
				date: '----.--.--',
				tags: [],
				text: 'ニュースの読み込みに失敗しました。'
			}
		]);
	}
}

// --- レンダリング関数 ---
const renderNews = (items) => {
	list.innerHTML = items.map(item => `
	<li class="c-list__news--item">
		<p class="c-list__news--date">${item.date}</p>
		<div class="c-list__news--container">
		<ul class="c-list__tags">
			${item.tags.map(cat =>
			`<li class="c-tag ${categoryMap[cat]}">${cat}</li>`
			).join('')}
		</ul>
		<div class="c-list__news--text">
			<p><a href="${item.link}">${item.text}</a></p>
		</div>
		</div>
	</li>
	`).join('');
}