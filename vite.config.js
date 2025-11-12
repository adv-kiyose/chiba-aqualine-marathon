import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { webfontDownload } from 'vite-plugin-webfont-dl';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

const pages = fs.readdirSync('.', { withFileTypes: true })
.flatMap(dirent => {
	if (dirent.isDirectory()) {
	const dirPath = path.resolve(__dirname, dirent.name);
	// ディレクトリ内の全 .html ファイルを探索
	return fs.readdirSync(dirPath)
		.filter(file => file.endsWith('.html'))
		.map(file => ({
		name: `${dirent.name}/${path.basename(file, '.html')}`,
		path: path.resolve(dirPath, file)
		}));
	}
	// ルート直下の .html も対象にする
	if (dirent.isFile() && dirent.name.endsWith('.html')) {
	return [{
		name: path.basename(dirent.name, '.html'),
		path: path.resolve(__dirname, dirent.name)
	}];
	}
	return [];
})
.reduce((entries, page) => {
	entries[page.name] = page.path;
	return entries;
}, {});

export default defineConfig({
	root: '.', // index.htmlがルートにある場合はこのままでOK
	base: '/', // 相対パスで出力（FTPアップロードでも動くように）

	resolve: {
		alias: {
		'@': path.resolve(__dirname, './src'), // 例：@/assets/styles/main.scss
		},
	},

	server: {
		open: true, // 開発時に自動でブラウザを開く
		host: true, // LANアクセスを許可（他デバイスで確認する場合）
		port: 5173, // 任意（デフォルト5173）
	},

	build: {
		outDir: 'dist', // 出力ディレクトリ
		emptyOutDir: true, // ビルド時にクリア
		rollupOptions: {
			input: pages
		}
	},

	plugins: [
		webfontDownload([
			'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap',
			'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Outfit:wght@100..900&display=swap'
		]),
		ViteEjsPlugin({
			title: 'ちばアクアラインマラソン2026',
			og_title: '海を走ろう〜アクアラインの風にのって〜',
			description: '2026年11月8日開催！ちばアクアラインマラソン2026のサイトです。海ほたるの青く雄大な空と海に囲まれた景色の中や、千葉の田園を、市民ランナーが走ります。',
			ogImage: '/image/ogp.png',
			site_name: 'ちばアクアラインマラソン2026ホームページ',
		})
	]
});