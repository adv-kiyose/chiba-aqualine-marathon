# AquaMarathon2026

## 開発環境要件
- viteを利用して簡易的な開発環境を構築しています。
- お使いのPCに[Node.js](https://nodejs.org/ja)をインストールしてご利用ください。
- Node.jsのバージョンは20.18.2にて動作を確認しています。

## セットアップ
1. ターミナルやpowershellなどを開き、作業ディレクトリに移動します。（パスは一例です）<br>
`cd C:\works\AqualineMarathon2026`
2. `npm ci`を実行し、開発環境をインストールします。

## コマンドについて
- `npm run dev`：ローカルサーバーを起動し、リアルタイムに変更を確認できます。
- `npm run build`：現在の状態でサーバーアップ用のデータをビルドします。<br>ビルドされたデータは"dist"ディレクトリに出力されます。
  - 環境によって、"dist"が既に存在していると既存データの削除に失敗し、エラーで処理が停止してしまう場合があります。その場合、一度"dist"ディレクトリを削除してから再度buildをお試しください。

## サーバーへのFTPアップロードについて
1. "assets"配下のファイルはビルドの度にファイル名が変更されるため、サーバー上の"assets"ディレクトリを削除してください。
2. "dist"ディレクトリ内のファイルをアップロードします。
   - このとき"data", "images", "favicon.ico"などの静的なファイルはアップロード対象から外しても問題ありません。（変更がなければ）
3. TOPページのニュースについては、src/public/data/news.jsonの内容を更新することができます。再ビルドせず、当該ファイルのみをアップロードすることで対応可能です。

## ファイル構成について
各ディレクトリ・ファイルの概要を記します。
```
📦aqua-marathon-2026
 ┣ 📂src
 === アセットファイル：ビルド時もassets配下に生成されます。生成物のファイル名は動的なものになります ===
 ┃ ┣ 📂assets #アセットファイル
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┗ 📂top
 ┃ ┃ ┃ ┗ 📂utils
 ┃ ┃ ┗ 📂styles #スタイルシート
 ┃ ┃ ┃ ┣ 📂page #ページ固有スタイル
 ┃ ┃ ┃ ┃ ┗ 📜_top.scss #トップページ
 ┃ ┃ ┃ ┣ 📜main.scss #メインスタイル（各ファイルのimport用）
 ┃ ┃ ┃ ┣ 📜_base.scss #全体設定
 ┃ ┃ ┃ ┣ 📜_components.scss #部品単位
 ┃ ┃ ┃ ┣ 📜_layout.scss #要素のレイアウト
 ┃ ┃ ┃ ┣ 📜_mixins.scss #mixin定義
 ┃ ┃ ┃ ┣ 📜_modules.scss #ライブラリ等の上書き用
 ┃ ┃ ┃ ┣ 📜_reset.scss #スタイルリセット
 ┃ ┃ ┃ ┣ 📜_utils.scss #局所的な補正用
 ┃ ┃ ┃ ┗ 📜_variables.scss # 変数定義
 ┃ ┣ 📂include #ページ共通要素
 ┃ ┃ ┣ 📜footer.html #フッター
 ┃ ┃ ┣ 📜head.ejs #headタグ
 ┃ ┃ ┣ 📜header.html #ヘッダー
 ┃ ┃ ┗ 📜subColumn.html #右カラム
 ┃ ┣ 📂js #javascript
 ┃ ┃ ┗ 📂modules #インタラクティブ
 ┃ ┃ ┃ ┣ 📜bannerSlider.js #フッター内バナー制御
 ┃ ┃ ┃ ┣ 📜countdown.js #TOP画面開催カウントダウン
 ┃ ┃ ┃ ┣ 📜fadeInContainer.js #スクロール時の要素のフェードイン
 ┃ ┃ ┃ ┣ 📜fb.js #Facebook設置
 ┃ ┃ ┃ ┣ 📜navigationMenu.js #ヘッダー内メニュー制御
 ┃ ┃ ┃ ┣ 📜newsList.js #TOPページニュース読み込み・タブ切り替え
 ┃ ┃ ┃ ┣ 📜scrollTop.js #ページトップボタン
 ┃ ┃ ┃ ┣ 📜toggleMenu.js #SP用メニューの開閉制御
 ┃ ┃ ┃ ┗ 📜togglePageTop.js #ページトップボタンの表示制御
 ┃ ┣ 📜main.js #メインファイル（各ファイルのimport、初期化用）
 === パブリックファイル：ビルド時はルート直下に生成されます、ファイル名はリネームされません ===
 ┣ 📂public #パブリックファイル
 ┃ ┣ 📂data #動的表示データ
 ┃ ┃ ┗ 📜news.json #ニュース一覧
 ┃ ┣ 📂images #画像ファイル
 ┃ ┃ ┣ 📂banners #ページ共通のバナー画像（スポンサーなど）
 ┃ ┃ ┣ 📂common #ページ共通
 ┃ ┃ ┣ 📂footer #フッター
 ┃ ┃ ┣ 📂header #ヘッダー
 ┃ ┃ ┣ 📂top #トップページ
 ┃ ┃ ┃ ┣ 📂banners #トップページ内バナー画像
 ┃ ┃ ┣ 📂tournament #大会情報ページ
 ┃ ┃ ┃ ┗ 📂course #コースページ
 ┃ ┃ ┗ 📜ogp.png #OGP用画像
 ┃ ┣ 📂pdf #pdfファイル
 ┃ ┗ 📜favicon.ico #ファビコン
 === ページファイル：生成前後とも、ルート直下に設置します ===
 ┣ 📂tournament #大会情報ページ（＆その配下のページ）
 ┣ 📂policy #個人情報保護方針ページ
 ┣ 📜404.html #404ページ
 ┣ 📜503.html #503ページ
 ┣ 📜index.html #TOPページ
 === その他設定ファイル：生成物には含まれません ===
 ┣ 📜.gitignore #git無視ファイル設定
 ┣ 📜package-lock.json #パッケージバージョン固定設定
 ┣ 📜package.json #パッケージ設定
 ┣ 📜README.md #簡易解説書（このファイル）
 ┣ 📜vite.config.js #vite設定ファイル
 ┗ 📂dist #納品用生成ファイル
```