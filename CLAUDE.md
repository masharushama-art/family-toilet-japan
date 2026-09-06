@AGENTS.md

## プロジェクト概要
日本全国のトイレ検索サイト(Next.js 16、Cloudflare Workers/OpenNext)。4言語(en/ja/zh-TW/ko)対応、収益源はAdSense＋アフィリエイト(楽天・Klook・Amazon)。進捗・意思決定・障害対応の記録は[ROADMAP.md](ROADMAP.md)に集約している(他プロジェクトのPROGRESS.mdに相当)。

## 運用メモ
- 2026-09-06: 独立プロジェクト化。以後はこのフォルダ専用のClaude Codeセッションで作業する。
- **本番デプロイは`npm run cf:deploy`の手動CLI実行が必須**。GitHub連携によるpush時自動デプロイは無い(過去に誤った記載があったため明記)。
- **AdSense: 2026-09-06時点で3回連続不承認、根本対策(第1〜3弾)を実施済み・4回目再審査はユーザー作業待ち**。詳細・背景・次の一手はROADMAP.mdの該当セクション参照。広告は`NEXT_PUBLIC_ADSENSE_APPROVED`環境変数で有効化するまで非表示。
- コード変更時は`npx tsc --noEmit`・`npx eslint`・`npm run build`(3,500ページ超、数分かかる)で検証してからデプロイすること。
- サイト全体で共通ヘッダー/フッター(`app/components/SiteHeader.tsx`・`SiteFooter.tsx`)を使用。新規ページを追加する際もこれらは自動的に適用される(layout.tsx経由)。
