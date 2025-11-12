// src/js/sliderManager.js
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const registeredSelectors = new Set();
const sliders = new Map();

/** 登録用API（既存の呼び出しを維持） */
export function registerResponsiveSlider(selector, options = {}, breakpoint = 1024) {
  // registeredSelectors は object の Set として保持
  registeredSelectors.add({ selector, options, breakpoint });
  evaluateSelector({ selector, options, breakpoint });
}

/** スライド群の「実際の総幅」を算出する（margin も含める） */
function calcTotalSlidesWidth(slides) {
  return Array.from(slides).reduce((sum, s) => {
    const style = getComputedStyle(s);
    const marginRight = parseFloat(style.marginRight || '0');
    const w = s.offsetWidth + marginRight;
    return sum + w;
  }, 0);
}

/** ナビボタン生成ユーティリティ */
function createNavButton(direction) {
	const btn = document.createElement('div');
	btn.classList.add(`swiper-button-${direction}`);
	return btn;
}

/** 各セレクタ要素を評価して初期化/破棄 */
function evaluateSelector({ selector, options, breakpoint }) {
  const nodes = document.querySelectorAll(selector);
  nodes.forEach((el) => {
	const parent = el.parentElement;
    const slides = el.querySelectorAll('.swiper-slide');
    // スライドが存在しない場合はスキップ
    if (!slides.length) return;

    const totalSlidesWidth = calcTotalSlidesWidth(slides);
    const containerWidth = el.clientWidth;
    const overflow = totalSlidesWidth > containerWidth + 1; // 誤差を吸収

    // 当該要素の既存インスタンスがあるか
    const existing = sliders.get(el);

    // **決定**：loopを有効にするかどうか（ユーザー指定の options をベースに上書き）
    const wantLoop = !!options.loop;
    const loopEnabled = wantLoop && overflow; // overflowしているときだけ loop を有効化

    // 初期化する場合
    if (window.innerWidth <= breakpoint && !existing) {
      // 破棄モードで付けた中央寄せスタイルが残っていたら削除（初期化時は干渉NG）
		const wrapper = el.querySelector('.swiper-wrapper');
		if (wrapper) {
			wrapper.style.display = '';
			wrapper.style.justifyContent = '';
		}

	// ナビボタン
	let prevBtn = parent.querySelector('.swiper-button-prev');
	let nextBtn = parent.querySelector('.swiper-button-next');
	if (!prevBtn) prevBtn = createNavButton('prev');
	if (!nextBtn) nextBtn = createNavButton('next');
	// 既に追加されていなければ append
	if (!prevBtn.parentElement) parent.appendChild(prevBtn);
	if (!nextBtn.parentElement) parent.appendChild(nextBtn);

      // Swiper に渡す最終オプション
	const finalOptions = {
        modules: [Navigation],
        slidesPerView: 'auto',
        spaceBetween: 16,
        navigation: { prevEl: prevBtn, nextEl: nextBtn },
        // loop は overflow の有無で決める
        loop: loopEnabled,
        // もし loopEnabled なら明示的に複製数を指定する（安全策）
        ...(loopEnabled ? { loopedSlides: slides.length } : {}),
        // freeMode と loop は相性が悪いことがあるため freeMode は overflow時のみ許容
        freeMode: !!options.freeMode && !wantLoop ? options.freeMode : false,
        ...options,
        on: {
			// 初期化直後と resize 時にナビ切替
			init(sw) {
				toggleNavigation(sw, totalSlidesWidth, containerWidth);
			},
			resize(sw) {
				// 再計算（スライドやコンテナが変わる可能性あり）
				const slides2 = sw.el.querySelectorAll('.swiper-slide');
				const totalW = calcTotalSlidesWidth(slides2);
				const contW = sw.el.clientWidth;
				toggleNavigation(sw, totalW, contW);
			},
        },
      };

      const swiper = new Swiper(el, finalOptions);
      sliders.set(el, swiper);

      // 初期表示のナビ表示切替（念のため）
      toggleNavigation(swiper, totalSlidesWidth, containerWidth);

    } else if ((window.innerWidth > breakpoint) && existing) {
      // 破棄パス
      existing.destroy(true, true);
      sliders.delete(el);

      // 破棄後に transform 等が残る場合があるのでクリアして、中央寄せを付与する
      const wrapper = el.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.style.transform = '';
        wrapper.style.display = 'flex';
        // wrapper.style.justifyContent = 'center';
      }

      // ナビボタンは残すか削除するかは好みだが、ここでは非表示にする
      const prevBtn = parent.querySelector('.swiper-button-prev');
      const nextBtn = parent.querySelector('.swiper-button-next');
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    } else if (existing) {
      // 既存インスタンスがあるが overflow の有無で loop の取り扱いを変えたい場合など
      // 例えば、既に loop 無効で初期化している場合はそのままにする。
      // もし loop の切り替えが必要ならここで destroy -> reinit 処理を入れる。
      // （現状はリサイズ時のresizeハンドラでナビ表示は更新される）
    } else {
      // 初期化しない（例: PCで未初期化のまま）だがボタンの表示だけ制御したい場合
      // 親が非スライダー状態で中央寄せしたいならここで wrapper に style をつける
      const wrapper = el.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.style.display = 'flex';
        // wrapper.style.justifyContent = 'center';
      }
      // ナビは隠す
      const prevBtn = parent.querySelector('.swiper-button-prev');
      const nextBtn = parent.querySelector('.swiper-button-next');
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }
  });
}

/** ナビの表示/非表示切替（totalSlidesWidth / containerWidth を渡す） */
function toggleNavigation(swiper, totalSlidesWidth, containerWidth) {
  const prev = swiper.el.parentElement.querySelector('.swiper-button-prev');
  const next = swiper.el.parentElement.querySelector('.swiper-button-next');
  const overflow = totalSlidesWidth > containerWidth + 1;
  if (prev) prev.style.display = overflow ? 'block' : 'none';
  if (next) next.style.display = overflow ? 'block' : 'none';
}

/** 全件評価 */
function evaluateAll() {
  for (const entry of registeredSelectors) {
    evaluateSelector(entry);
  }
}

window.addEventListener('load', evaluateAll);
window.addEventListener('resize', evaluateAll);

/* デバッグ（必要なら） */
export function _debug_getSlidersMap() { return sliders; }
