@AGENTS.md

## プロジェクト概要
日本全国のトイレ検索サイト(Next.js 16、Cloudflare Workers/OpenNext)。4言語(en/ja/zh-TW/ko)対応、収益源はAdSense＋アフィリエイト(楽天・Klook・Amazon)。進捗・意思決定・障害対応の記録は[ROADMAP.md](ROADMAP.md)に集約している(他プロジェクトのPROGRESS.mdに相当)。

## 運用メモ
- 2026-09-06: 独立プロジェクト化。以後はこのフォルダ専用のClaude Codeセッションで作業する。
- **本番デプロイ: Cloudflare Workers Builds(GitHub連携)がmasterブランチに対して有効になっており、pushすると自動的にビルド・デプロイされる**(2026-09-26判明、Cloudflareダッシュボードの当該Workerの「設定」→「ビルド」で確認可能。以前の「push時自動デプロイは無い」という記載は誤りだったため訂正。経緯はROADMAP.md参照)。アフィリエイトの`NEXT_PUBLIC_*`環境変数もCloudflare側のビルド設定に登録済みなので、自動デプロイでも欠落しない。`npm run cf:deploy`の手動CLI実行は今も可能で、pushを待たずに即座に反映したい場合に使う。
- **AdSense: 2026-09-06時点で3回連続不承認、根本対策(第1〜3弾)を実施済み・4回目再審査はユーザー作業待ち**。詳細・背景・次の一手はROADMAP.mdの該当セクション参照。広告は`NEXT_PUBLIC_ADSENSE_APPROVED`環境変数で有効化するまで非表示。
- コード変更時は`npx tsc --noEmit`・`npx eslint`・`npm run build`(3,500ページ超、数分かかる)で検証してからデプロイすること。
- サイト全体で共通ヘッダー/フッター(`app/components/SiteHeader.tsx`・`SiteFooter.tsx`)を使用。新規ページを追加する際もこれらは自動的に適用される(layout.tsx経由)。
