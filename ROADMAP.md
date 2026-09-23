# Family Toilet Japan — 改善ロードマップ

最終更新: 2026-09-23（このファイルは実装のたびに更新する）

## 現状スナップショット
- **本番URL**: `family-toilet-japan.vercel.app` → **`family-toilet-japan.familytoiletjapan.workers.dev`**（Cloudflare Workers、2026-07-14完了。アカウント共有サブドメインを個人名`masharu-shama`から`familytoiletjapan`に変更済み）
- AdSense: Vercel版(`vercel.app`)は削除し、新URL(`familytoiletjapan.workers.dev`)を新規サイトとして登録・再審査中（旧Vercel向けの審査結果は待たずそのまま放置でOK）
- ビルド: 3,518ページ（PR #1マージ反映後。トイレ個別2,030 / 駅スポット226×4言語 / ガイド65×4言語 / 都市・カテゴリ ほか）
- 4言語対応（en/ja/zh-TW/ko）、hreflang済み、ダークモード済み
- ✅ **OGP画像: 動的セグメントを含む8ルート（都市・多言語ガイド・スポット）を復活・本番反映完了**（2026-08-11、下記「動的OGP画像生成機能の復活」参照）。OpenNext（`@opennextjs/cloudflare`）移行後は旧`next-on-pages`時代のedge runtime制約が解消されていることをローカルpreview・本番(`familytoiletjapan.com`)双方の実URL検証で確認済み。`middleware.ts`（410 Gone対応）は役目を終えたため削除
- ⚠️ **デプロイ運用の訂正（2026-08-11判明）**: 「GitHub連携でmasterへのpushが本番Cloudflare Workersへの自動デプロイをトリガーする構成」という従来の記載は誤り。実際は`npm run cf:deploy`（`opennextjs-cloudflare build && opennextjs-cloudflare deploy`）による手動CLIデプロイが必要（`wrangler deployments list`のデプロイ履歴で確認、過去のデプロイもすべて手動）。pushしただけでは本番に反映されない
- AdSense: **4回連続不承認**（07-05・08-14・08-27・09-23、すべて「有用性の低いコンテンツ」、文言は毎回同一の定型文で個別ページの指摘なし）。2026-09-06にトイレ個別ページを全件noindex化（第1弾）、共通ヘッダー/フッター新設・薄いページのnoindex・Consent Mode v2・運営者情報の構造化データ（第2弾）、EN都市ページの残存重複解消（第3弾）、JA都市ページへのTips追加（09-15）、http→https 301リダイレクト有効化（09-21）を実施し、2026-09-13に4回目再審査を申請したが09-23付で再び不承認。詳細は下記「4回目のAdSense再審査 結果（不承認）」参照。5回目に向けた方針は未決定・要検討
- ガイド記事の実数: **EN 21本 + JA/ZH/KO 各19本 = 78ページ**（sitemap.tsと完全一致、登録漏れなし）。過去の記録にある「164本」は誤記
- アフィリエイト（楽天・Klook・Amazon）: 新環境でも動作確認済み
- 集客: Reddit（japan_travel_dad）でカルマ構築中（貢献65、カルマ2、目標50）

## ✅ 4回目のAdSense再審査申請（2026-09-13）

**Search Console運用**（2026-09-09〜09-13、旧`sitemap-toilets.xml`削除・`sitemap.xml`のみ運用に一本化した後の観察）:
- `sitemap.xml`は2026/09/09読み込みで「成功しました」・検出ページ数181件（目標値78ガイド+94都市+9静的/言語と完全一致）を確認
- 「ページのインデックス登録」レポートは2026/09/04時点のデータで09-09〜09-13の3回の確認で更新が止まっていた（Google側の集計反映待ち、こちら側で早める手段はない）。noindex除外314・重複174・404 26件など主要カテゴリは変化なし
- 「見つかりませんでした（404）」26件のうち2件をURL検査のライブテストで個別確認した結果、実際には404ではなく**noindexタグによって除外されている（=第1弾のnoindex化が正しく機能している）**か、**本番では正常にリダイレクト・表示されている**ことを確認。レポート上の404は2026-07台の古いクロール結果の残存であり、コンテンツ側の実害は無いと判断
- 上記2件はURL検査から「インデックス登録をリクエスト」を実行済み（うち1件はnoindexのためリクエスト自体は成立せず＝想定通り）

**判断根拠**: ROADMAP:284の方針（GSCの数値傾向ではなくコンテンツ品質の実改善で判断）に基づき、第1〜3弾の対策は完了済み・サイトマップも正しい構成で成功している一方、インデックス登録レポートの反映停滞や404表示はGoogle側の反映待ちに起因すると確認できたため、待ち続ける理由がないと判断し申請に進んだ。

**対応**: AdSenseの「サイト」→ familytoiletjapan.com → 「ポリシー違反が見つかりました（有用性の低いコンテンツ）」画面で「問題を修正しました」にチェックの上、「審査をリクエスト」を実行。実行後、赤いエラー表示が消え「サイトをリンクしていただきありがとうございます／有効化に必要な手順が完了しました」の表示に変化したことを確認。

**次のアクション**: 審査結果（通常数日〜数週間）を待つ。承認されれば`NEXT_PUBLIC_ADSENSE_APPROVED`環境変数を有効化して広告表示。4回目も不承認の場合は却下理由を確認し追加対策を検討。

## ✅ 審査中の追加ブラッシュアップ: JA都市ページにTips追加（2026-09-15）

4回目審査の結果待ちの間、インデックス対象181件（ガイド78・都市94）に直接効く改善を追加実施。

**発見**: `app/ja/[city]/page.tsx`は2026-09-06の旧FAQブロック除去（47都市で本文同一の近似重複だったため）以降、統計数値（おむつ替え台数・車椅子対応数・無料件数）以外に都市固有のテキストが一切無く、EN版（`app/[city]/page.tsx`、第3弾で全都市に固有Tipsを実装済み）と比べて明確に薄いページになっていた。94件のインデックス対象のうち47件（JA都市ページ）がこの状態だった。

**対応**: `app/lib/city-tips-ja.ts`を新設し、EN版`CITY_META`/`buildDataDrivenTips`と同じ構成でJA版を実装。主要8都市（東京・大阪・京都・名古屋・横浜・福岡・奈良・千葉）は手書きTips（`JA_CITY_TIPS`）、残り39都市は`getCityStats`の実データから都市固有の文章を生成する`buildDataDrivenTipsJa()`を用意。`app/ja/[city]/page.tsx`に💡Tipsセクションとして追加し、統計グリッドにも「収録トイレ数」を追加（EN版は4項目、JA版は従来3項目だったため4項目に統一）。

**検証**: `next start`で仙台（データ駆動生成文）・東京（手書きTips）双方が意図通りの文章で表示されることを確認。tsc・eslint（新規warningなし）・build（3,518ページ、エラーなし）すべてクリーン。

**本番反映（2026-09-15）**: `npm run cf:deploy`実行、Version ID `1209d7fe-fb91-4665-8b1e-c6473f17bfb3`。本番（`familytoiletjapan.com/ja/sendai`・`/ja/tokyo`）で新しいTipsセクションが表示されることを確認済み。

## ❌ 4回目のAdSense再審査 結果（不承認、2026-09-23）

2026-09-13に申請した4回目再審査の結果がメールで届いた（ユーザー転送、19:23受信、審査所要期間は約10日）。結果は**不承認**、理由は1〜3回目と同一の「有用性の低いコンテンツ」。AdSense管理画面のサイト一覧でも「要確認」ステータス、「サイトの管理」詳細画面の指摘文言は次回・前回と完全に同一の定型文（個別ページやURLの指摘は無し）:

> 健全で信頼できる広告エコシステムを維持するには、パートナーが明確な品質基準と運用基準を満たす必要があります。広告配信の対象となるには、サイトが独自の価値を提供し、ウェブ上で一貫したプレゼンスを確立し、商業広告パートナーシップを維持できるレベルのユーザーの関心を集めている必要があります。

**この結果の意味**: 09-13の申請前後で実施した対策（第1〜3弾のnoindex化・重複解消・共通ヘッダー/フッター・Consent Mode v2、09-15のJA都市ページTips追加、09-21のhttp→https 301リダイレクト）はいずれもコード品質・技術的正しさの改善であり、Search Console側の指標（noindex反映・404解消・sitemap成功）も09-14時点で明確に改善していた。それにもかかわらず4回連続で同一の「有用性の低いコンテンツ」判定が下りたことは、個別ページの薄さや技術的な重複といった**これまで対応してきた種類の問題ではなく**、サイト全体の性質（トイレ検索データベースという性質上、Googleが求める「独自の価値」「編集的な一貫性」「商業パートナーシップに値するユーザーの関心の高さ」の基準に構造的に届いていない可能性）を示唆している。2026-09-23時点でエージェントによる独立監査（インデックス対象181件の再点検）でも「これ以上の具体的な薄さ・重複は見つからない」という結果が出ていた直後の不承認であり、**小さな追加修正の積み重ねでは解決しない可能性が高い**という位置づけで次の一手を検討する必要がある。

**次のアクション**: 5回目の再審査に向けた方針は未決定。ユーザーと相談の上、以下のような選択肢を検討する:
- AdSense以外の収益化手段（アフィリエイトのみでの運用、他の広告ネットワーク）への比重シフト
- サイトの性質自体の見直し（データベース色を薄め、より「メディア」寄りの編集コンテンツ比率を大幅に引き上げる等の大規模な構造変更）
- しばらく申請を控え、コンテンツ・被リンク・実績を蓄積してから再挑戦する
- Google側に直接問い合わせる手段の検討（フォーラム等、直接サポートへの問い合わせ手段は限定的）

## 📌 AdSense審査確認リマインダー設定（2026-09-16）

4回目再審査（2026-09-13申請）の結果とSearch Consoleの状況を2026-09-09〜09-16の間繰り返し確認したが、AdSense側は「準備中・審査待ち」のまま、Search Consoleの「ページのインデックス登録」レポートも2026/09/04時点のデータで12日間更新が止まっている状態が継続。クラウドの定期実行エージェントはSearch Console/AdSenseへのブラウザアクセス（ユーザーのログイン済みセッション）を持てないため、実際の確認はローカルのClaude Codeセッション（Chrome操作可能）で行う必要がある。そのため、2026-09-17 09:00（Asia/Tokyo）に一度だけ発火する**通知専用**のクラウドルーティン（`trig_01NVt9aKPhZ4bUMCLQxg8rEN`）を作成した。ルーティン自体はブラウザ操作・コード変更を行わず、「ユーザーに確認を促すメッセージを伝えるだけ」に限定している。

**次のアクション**: リマインダーが発火したら、ローカルのClaude Codeセッションでユーザーに知らせた上でAdSense審査結果・Search Console状況を確認する（ユーザー指示: 2026-09-16「明日のリマインダーが来たら教えて」）。

## ✅ リマインダー発火・Search Console 12日ぶりの更新確認（2026-09-17）

予定通りリマインダーが発火し、AdSense・Search Consoleを確認。

**AdSense**: 「準備中」「審査待ち」のまま、まだ結果は出ていない。

**Search Console**: 「ページのインデックス登録」レポートが2026/09/04時点から**12日ぶりに2026/09/14時点のデータへ更新**。主な変化:

| 理由 | 09-04 | 09-14 |
|---|---|---|
| noindexタグで除外 | 314 | 349 |
| クロール済み未登録 | 18 | 15 |
| 見つかりませんでした（404） | 26 | 25 |
| 検出-インデックス未登録 | 335 | **112**（大幅減少） |
| 未登録合計 | 883 | 691 |
| 登録済み | 327 | 314 |

「検出-インデックス未登録」の大幅減少（335→112）はGoogleのクロール・処理が明確に進んでいることを示す。404も1件減少、noindex除外も増加しており、これまでの対策（第1〜3弾・JA都市ページTips追加）が着実に反映されつつある。登録済みページ数の微減（327→314）はnoindex反映過程での一時的な動きと判断し、悪化とは捉えていない。

**次のアクション**: 引き続きAdSenseの審査結果を待つ。Search Console側は良い方向に動き始めているため、次回確認時にさらなる改善（404減少・noindex反映の完了）があるか注視する。

## ✅ http→https 301リダイレクトの有効化（2026-09-21）

Search Consoleから「代替ページ（適切な canonical タグあり）」の修正検証結果メール（ユーザー転送、Message type: WNC-10031170）を受け、対象URL 4件（`/`、`/saga`、`/hiroshima`、`/guide/japan-family-restaurants-guide`のhttp版）を調査。

**原因**: `curl -I http://familytoiletjapan.com/...`で確認したところ、http版が301リダイレクトされず直接200 OKを返していた。Cloudflareの「常にHTTPSを使用」設定が無効になっており、http/https両方が生きたページとして応答し、Googleが両方をクロールしていた。canonicalタグは正しくhttps側を指しているためGoogle側では実害なく「代替ページ・問題なし」に分類されていたが、本来はサーバー側で301リダイレクトすべき状態だった。AdSense審査（コンテンツ品質を見るプロセス）とは無関係の、純粋に技術的なURL正規化の話であることをユーザーに確認済み。

**対応**: Cloudflareダッシュボード → familytoiletjapan.com → SSL/TLS → エッジ証明書 → 「常にHTTPSを使用」を有効化（ユーザー承認の上、コード変更・デプロイ不要のダッシュボード設定のみ）。

**検証**: 有効化直後に4件すべて`curl -I`で`301 Moved Permanently`＋`Location: https://...`を確認。

## ✅ AdSense対策 第3弾: 最終見直しで見つかったEN都市ページの残存重複を解消（2026-09-06）

第2弾の後、もう一段深く監査（Exploreエージェント）した結果、1件の具体的な残課題を発見・修正した。

**発見**: `app/[city]/page.tsx`の`CITY_META`は8都市（tokyo/osaka/kyoto/nagoya/yokohama/fukuoka/nara/chiba）にしか手書きTipsが無く、**残り39都市のEN都市ページは完全に同一の4行の汎用Tips**（"Department stores..."等）を表示していた。第1弾・第2弾ではこの点は指摘のみで未対応だった。

**調査した代替案**: `CITIES[city]`（`toilet-data.ts`）は名前と緯度経度のみでTips文章の元になるデータが無く、`getSpotsByCity(city)`は主要8都市以外ほぼスポットデータが無いため使えない。一方`getCityStats(city)`（合計・おむつ交換台・車いす対応・無料件数）は全47都市で必ず取得できる。

**対応**: `buildDataDrivenTips(cityName, stats)`関数を追加し、CITY_META未設定の都市では実際の統計値から「{都市}には{件数}件のトイレを収録、うち{件数}件がおむつ交換台付き」「{割合}%が車いす対応」「{件数}件が無料」という3文＋汎用1文を生成するよう変更。手書きTipsを持つ8都市には影響なし。件数・割合は都市ごとに実際に異なるため、文面自体が都市固有になり、従来の完全一致の重複を解消した。

**検証**: `next start`で仙台(323件・交換台1件・車いす14件4%)と広島(145件・交換台3件・車いす28件19%)のTipsが完全に異なる文章であること、東京・大阪の既存手書きTipsが変化していないこと、sitemap 181件に変化がないことを確認。ビルド・tsc・eslintすべてクリーン。

トイレ個別ページのnoindex化（下記第1弾）の後、4回目の再審査リクエスト前にサイト全体を再監査し、コンテンツ比率以外でAdSense審査に落ちうる要因を洗い出して対処した。

**監査で判明した問題（重要度順）**:
1. **サイト共通のヘッダー/フッターが存在しない**。`app/layout.tsx`は`I18nProvider`でchildrenを包むだけで、About・Privacy・FAQ・お問い合わせ（Googleフォーム）へのリンクはAbout/Privacy/Widgetの3ページからしか辿れず、ホーム・全ガイド・全都市ページ・/mapに一切無かった。`/ja`・`/zh`・`/ko`配下にはポリシーページ自体が無い。AdSenseの「ナビゲーション」「プライバシーポリシーへの到達性」要件を直撃する、最も機械的に検出される不備
2. **薄いユーティリティページがインデックス対象**: `/map`（`MapPageClient`が`dynamic(ssr:false)`で地図を読み込むため、SSRのHTMLは`loading`の「Loading map...」＋都市リンク4つ＝約12語。sitemap優先度0.9）、`/coverage`（47都市×4列の数値表）、`/widget`（埋め込みHTML断片が主体）、`/offline`（PWA用、robots未設定）
3. **都市ページの近似重複**: JA/ZH/KOの各都市ページは約85%が同一テキスト（都市名と数値3つのみ差し替え）。JAは全都市で同一内容のFAQを`FAQPage`構造化データとして47ページに出力（構造化データの大量重複はスパム信号）
4. **Cookie同意バナーが飾り**: Declineを押してもGA4・AdSenseスクリプトは無条件でロード。Consent Mode未実装、CMP未導入
5. **noindexの薄いページ（トイレ詳細・スポット・カテゴリ、計2,500ページ超）に`AdUnit`が配線済み**。現在は`NEXT_PUBLIC_ADSENSE_APPROVED`未設定で非表示だが、承認後に有効化した瞬間「コンテンツのないページへの広告」ポリシー違反になる
6. **運営者の識別情報が無い**: `Organization`/`WebSite`構造化データ無し、連絡手段はGoogleフォームのみ

問題なしと確認した項目: `ads.txt`（正しい`pub-9686216801075877`）、AdSense設置スニペット（`layout.tsx`）、プレースホルダー文言、アフィリエイト（現在は環境変数未設定で非表示。表示時は各ボックスに開示文あり）、ガイド記事の中身（JA/ZH/KOは本物の翻訳。監査時にcurlの`wc -w`で「JAガイド23語」等と出たのは空白区切りでCJKを数えた計測ミスで、実際は京都ガイドがJA 2,930字・ZH 2,420字・KO 3,390字）

**実装内容**（ユーザー承認: 基本対策4点、ZH/KO都市noindex+JAのFAQ/スキーマ除去、/map本文追加、Consent Mode v2、すべて推奨案を採用）:
- `app/components/SiteHeader.tsx`・`SiteFooter.tsx`を新設し`app/layout.tsx`で全ページに配置。`usePathname`で4言語を判定し、ホーム・地図・ガイド・FAQ・About・Privacy・データ出典・お問い合わせ（Googleフォーム）へのリンク、AdSense/アフィリエイト利用の開示文、データ出典、©表記を各言語で表示。JA/ZH/KOはポリシーページが英語である旨を注記。`/map`と`/offline`は全画面アプリのため非表示（ウィジェット埋め込みの`/map?embed=1`にも出ない）
- `app/layout.tsx`: `Organization`+`WebSite`のJSON-LD（連絡先＝Googleフォーム）を`<head>`に追加。**Google Consent Mode v2**を導入 — `beforeInteractive`の`consent-default`スクリプトでGA4/AdSenseより前に`ad_storage`/`ad_user_data`/`ad_personalization`/`analytics_storage`の既定値を設定（localStorageに`accepted`があれば`granted`、それ以外は`denied`、`wait_for_update:500`）。`CookieConsent.tsx`のAccept/Declineで`gtag('consent','update')`を呼ぶよう修正
- `/map`: 説明文（地図に載っている情報・使い方・データ出典・都市/ガイドへの導線、約250語）を`app/components/MapIntro.tsx`に切り出し、`MapPageClient`の`dynamic`の`loading`として出力。**ページ側のSuspenseフォールバックに書いてもSSRのHTMLには出ない**（`dynamic(ssr:false)`の`loading`が出力されるため。最初はSuspense側に書いて12語のままだった）。sitemap優先度0.9→0.7
- `/coverage`・`/widget`・`app/offline/layout.tsx`にnoindex、`/coverage`・`/widget`をsitemapから除外
- `app/zh/[city]`・`app/ko/[city]`（計30件）にnoindex、sitemapから除外（`ZH_KO_CITIES`定数と`zhCityPages`/`koCityPages`を削除）。hreflangは言語切替用に維持
- `app/ja/[city]`: 可視FAQブロックと`FAQPage`JSON-LDを除去（`BreadcrumbList`のみ残す）
- `AdUnit`を`app/toilet/[city]/[id]`・`app/ja/toilet/[city]/[id]`・`SpotPageView.tsx`・`app/[city]/[category]`から撤去（承認後に広告を出すのはインデックス対象の編集ページのみ）

**結果**: `sitemap.xml`は213→**181 URL**（ガイド78・都市EN47+JA47・静的6・言語3）。ローカルビルド（4,917ページ、tsc/eslintエラーなし）＋`next start`で、共通ヘッダー/フッターと各言語ラベル、/mapの非表示と本文255語、noindex×6、インデックス維持×9、JAのFAQ/スキーマ除去、sitemap構成、Consent既定値、Organization/WebSite JSON-LD、埋め込み/ディープリンクの挙動、既存ページの回帰なし、をすべて確認済み。

**本番デプロイ完了（2026-09-06、コミット`8515cb8`、Version `5db1bbce-3da6-43f0-a710-28c0a65a3f5f`）**: 本番`familytoiletjapan.com`で41項目を実機確認済み — 共通ヘッダー/フッターとPrivacy/お問い合わせリンクが`/`・EN/JA/ZH/KO都市ページ・EN/JAガイド・/faq・/aboutに存在、各言語のフッターラベル、`/map`は本文255語・ヘッダー/フッター無し・インデックス維持・`?embed=1`は200、noindex×8（/coverage・/widget・/offline・ZH/KO都市・トイレ詳細・スポット・カテゴリ）、インデックス維持×11（ホーム・EN/JA都市・FAQ・About・Privacy・3言語ガイド・/zh・/ko）、JA都市のFAQ本文/FAQPage除去、`sitemap.xml`181件で除外対象を含まず`/map`優先度0.7、Consent既定値スクリプト、Organization/WebSite JSON-LD、robots.txt、既存ページの回帰なし。

**未対応（承認後・ユーザー作業）**: AdSense管理画面「プライバシーとメッセージ」でのCMP（同意メッセージ）設定。Consent Mode v2はコード側で導入済みなので、CMPを有効化すればそのまま連動する。

## ✅ AdSense根本対策: トイレ個別ページ全件noindex化・都市ページをガイド優先構造へ転換（2026-09-06）

**経緯**: 08-30の是正（リッチネススコア≥2で318件に絞り込み・ガイド導線追加）を踏まえ、4回目の再審査リクエスト前に、Claude Codeで根本原因を再調査した。

**調査で判明した事実**:
- 編集コンテンツは実質ガイド21本×4言語=78ページのみ（「164本」は誤記）。インデックス構成は非トイレ約216件（ガイド78+都市124+静的等）vs トイレ詳細318件で、**絞り込み後もトイレDBページが全体の約6割**を占めていた
- トイレ詳細ページの固有文章は1ページあたり実質10〜15語（施設名・最寄駅・距離の数値スロットのみ）。残りは共通テンプレート+都市統計の使い回し
- 絞り込みはスコア閾値方式で上限が無く、月次OSM更新でスコア≥2のトイレが増えるたびにインデックス対象も際限なく増える設計だった（今回の調査時点では本番318件で増加は未発生。9月分の自動更新PRは未マージ）
- 「都市ごと上位3件」のような中間案では比率が60%→57%にしか動かず、審査結果が変わらないリスクが高いと判断

**決定（ユーザー判断）**: サイトの位置づけを**「ガイド主体の旅行情報サイト＋トイレ検索ツール（/map）」**として明確化し、トイレ個別ページは検索インデックスから全件外す。トイレDBは/mapと直リンク・共有URLで従来通り完全に機能する。薄いページ経由の検索流入は元々ほぼ無いため、失うものは実質ない。

**実装内容**:
1. `app/toilet/[city]/[id]/page.tsx`・`app/ja/toilet/[city]/[id]/page.tsx`: `generateMetadata`で常に`robots: {index:false, follow:true}`を返す（`follow`は維持し、内部リンク経由のリンクジュースは流す）。`generateStaticParams`は変更なし（ページ自体は引き続き生成・アクセス可能）
2. `app/sitemap-toilets.xml/route.ts`を削除、`app/robots.ts`・`scripts/indexnow.js`から参照を除去
3. `app/lib/toilet-data.ts`: 呼び出し元の無くなった`getToiletRichnessScore`/`RICH_DATA_MIN_SCORE`/`isIndexableToilet`/`getIndexableDetailPageParams`を削除
4. **都市ページ4言語（`app/[city]`・`app/ja/[city]`・`app/zh/[city]`・`app/ko/[city]`）でTravel Guidesセクションをヒーロー直後・統計/カテゴリ/エリア（DB由来）より前に移動**。トイレページ除外後はインデックスの最大グループが都市ページ（124件、約57%）になり、次に指摘されうる箇所のため
5. `app/lib/guides.ts`を新設し`getGuidesForCity(city)`を実装。専用ガイドの無い都市（47都市中37都市）でも、同じ地方の都市向けガイド→汎用ガイド（4言語すべてに存在する4本）の順で最大3本を表示する。従来の「`/#guides`への汎用リンク1本」への縮退を廃止

**本番デプロイ完了（2026-09-06、コミット`222c62c`）**: `npm run cf:deploy`実行（Version `816a1895-1c37-4d39-93fb-44fb2f9ef723`）。本番`familytoiletjapan.com`で以下を実機確認済み — (a)トイレ個別ページEN/JAに`<meta name="robots" content="noindex, follow">`、(b)`/sitemap-toilets.xml`が404、(c)`robots.txt`から参照除去、(d)`/sitemap.xml`は**213 URL・トイレURL 0件**（ガイド78+都市124+静的8+言語3）、(e)`/tokyo`でGuidesが統計より前・専用ガイド2本のみ、`/saitama`・`/ibaraki`・`/ja/saitama`・`/zh/chiba`・`/ko/chiba`でフォールバック3本表示（saitamaは東京2本+横浜1本と同地方優先が機能）。トップ・`/map`・ガイド・`/ja`・`/coverage`は200で回帰なし。

**補足（調査時の注意点）**: 着手前に「本番sitemap-toilets.xmlが418件に増えている」と判断していたが、これはWebFetch（要約用の小型モデル）がXMLのURL数を数え間違えたもので、`curl | grep -c "<loc>"`で直接数えると318件（リポジトリ算出値と一致、乖離なし）だった。件数などの定量確認はWebFetchの要約に頼らず直接カウントすること。また本番`robots.txt`にはCloudflareが自動付与する「Cloudflare Managed content」ブロック（Content-Signal・AI学習クローラーのDisallow）が先頭に挿入されているが、Googlebot・Mediapartners-Googleは対象外のため検索・AdSenseには影響しない。

**運用**: ユーザー作業として、Search Consoleで旧`sitemap-toilets.xml`を削除・`sitemap.xml`を再送信。Googleの再クロールを1〜2週間待ってからAdSense再審査をリクエストする（即時申請はしない）。

**4回目も不承認だった場合の次の手**: (a) ガイド記事の追加執筆（編集コンテンツ78ページは正直少ない）、(b) 都市ページのうちガイド無し・ZH/KO版（計30件）のnoindex化。

## ✅ 動的OGP画像生成機能の復活（2026-08-11、AdSense審査結果とは無関係に実施）

「残タスク」記載の動的OGP画像8ルート（都市・多言語ガイド・スポット）を復活。着手前に、旧実装（コミット`ba8a4f6`、2026-07-13削除）と2026-08-10のmiddleware.ts（410 Gone対応）との整合性を確認した。

**着手前の整合性確認結果**:
- 削除された8ファイルはいずれも`generateStaticParams`によるビルド時静的生成＋`next/og`の`ImageResponse`を使用。共有ヘルパー`app/lib/og.tsx`（`ogCard`/`OG_SIZE`）・参照先lib（`toilet-data.ts`/`spots.ts`/`guides-{ja,ko,zh}.ts`）はいずれも現存・エクスポート名も無変更で、コード自体の復元は可能と確認
- 削除理由は当時の`@cloudflare/next-on-pages`アダプター（非推奨）が動的セグメント付きopengraph-imageルートに無条件でedge runtimeを要求し、`generateStaticParams`・fs読み込みと衝突していたため。現行スタック（`@opennextjs/cloudflare` 1.20.1、Workers、`nodejs_compat`）にはこの制約が存在しない
- **⚠️ 明確な競合を発見**: `middleware.ts`が削除済み8ルートと完全に同一の8パスへ無条件で410 Goneを返す設定になっており、Next.jsのmiddlewareはルーティング解決より前に実行されるため、ファイルを復活させるだけでは`middleware.ts`が先にリクエストを横取りし続け、新しいopengraph-image.tsxには到達しない。コード自体の重複はなし

**対応**:
1. 削除された8ファイルを、旧実装（git履歴）どおりの内容でそのまま復元（`app/[city]/opengraph-image.tsx`・`app/spot/[slug]/opengraph-image.tsx`・`app/{ja,ko,zh}/guide/[slug]/opengraph-image.tsx`・`app/{ja,ko,zh}/spot/[slug]/opengraph-image.tsx`）
2. `middleware.ts`を削除（この8パスへの410対応以外の用途がなかったため。Next.js 16でも非推奨の仕組みであり、復活後は不要）
3. **実装中に追加で発見・修正した不具合**: `app/[city]/page.tsx`の`generateMetadata`が`openGraph.images`/`twitter.images`を`/og-image.png`に明示的に上書きしており、Next.jsのファイル規約による自動検出（復活させた`opengraph-image.tsx`）より優先されてしまうため、都市ページだけ実際のog:imageタグには反映されない状態だった。該当の`images:`指定を削除し、ファイル規約の自動検出に委ねる形に修正。他7ルート（spot/[slug]・{ja,ko,zh}/guide/[slug]・{ja,ko,zh}/spot/[slug]）の`page.tsx`は同種の上書きなし（`{ja,ko,zh}/guide/[slug]`の`ShareButtons`コンポーネントの`imageUrl` propは引き続き`/og-image.png`のままだが、これは2026-07-29に調査済みのとおりPinterest「Pin it」ボタンの`media`パラメータのみに影響し、実際のog:image/twitter:imageタグやSNSクローラーには影響しない範囲のため、今回は対象外とした）

**検証**: `npx tsc --noEmit`エラーなし。`npm run build`（webpack）・`npx opennextjs-cloudflare build`とも成功（8ルートすべて生成: `/-/opengraph-image`都市47件・`/spot/-/opengraph-image`324件・`{ja,ko,zh}/guide/-/opengraph-image`各19件・`{ja,ko,zh}/spot/-/opengraph-image`各324件）。`opennextjs-cloudflare preview`（ローカルWorkers環境、R2キャッシュ込み）を起動し実URLで検証: 8ルート代表7点(`/tokyo`・`/spot/shinjuku-station`・`/ja/guide/...`・`/ja/spot/...`・`/ko/spot/...`・`/zh/guide/...`・既存の静的`/guide/japan-toilet-etiquette`)すべてHTTP 200・`image/png`・1200×630の正常なPNGを確認。存在しないslugへのアクセスはHTTP 404で正しくフォールバック。修正後は`/tokyo`・`/spot/shinjuku-station`・`/ja/guide/...`いずれも実際の`<meta property="og:image">`タグが新しい動的ルート（コンテンツハッシュ付きURL）を指すことを確認。既存の無関係ページ（トイレ個別詳細・ホーム・既存の静的ガイドOGP画像）に regression がないことも確認済み。

**本番反映(2026-08-11、追記)**: 別チャットでの検討を経て、これはfamily-toilet-japanの正式な残タスクの実行(2026-08-10の410 Gone対応は応急処置、今回が本来あるべき最終形)と判断し、push・本番デプロイを実施。

- `git push origin master`実施(コミット`ef1711e`)。**発見**: このリポジトリには`.github/workflows/`にデプロイ用ワークフローが存在せず、`wrangler deployments list`で確認したところpush後も新規デプロイが発生しなかった。ROADMAP冒頭で従来「GitHub連携でmasterへのpushが本番Cloudflare Workersへの自動デプロイをトリガーする構成」と記載していたが、**この記載は現状と一致しない**(過去のデプロイ履歴はすべて`wrangler`/`opennextjs-cloudflare deploy`によるCLI手動デプロイのみ)。今後pushだけでは本番反映されない前提で運用すること
- 上記を踏まえ`npm run cf:deploy`(`opennextjs-cloudflare build && opennextjs-cloudflare deploy`)を手動実行し本番デプロイ完了(Version ID `13ffbe5d-676e-4c4f-970a-34f12f78252a`)
- **本番実機確認(`familytoiletjapan.com`)**:
  1. 復活した8ルートすべてHTTP 200・`image/png`・1200×630の正常なPNGを確認(都市10件`tokyo`/`yokohama`/`chiba`/`osaka`/`kyoto`/`nagoya`/`fukuoka`/`nara`/`sapporo`/`sendai`、EN/ja/ko/zhのguide・spot各代表1件)
  2. 都市ページ(`/tokyo`・`/osaka`)、スポットページ(`/spot/shinjuku-station`・`/ja/spot/...`・`/ko/spot/...`)、多言語ガイド(`/ja/guide/...`・`/zh/guide/...`)いずれも、実際の`<meta property="og:image">`・`<meta name="twitter:image">`タグがコンテンツハッシュ付きの新しい動的ルートを指すことを確認
  3. GSCで404報告されていた個別URLの一覧はリポジトリ内に保存されておらず(コミット`f52c879`のメッセージには「都市・多言語ガイド・多言語スポットのOGP画像URL26件」という件数のみ記載、個別URL列挙なし)、その個別URL単位での再クロール結果は本セッションでは確認不可。ただし該当する8ルートパターン自体は上記の通りいずれも本番でHTTP 200を返す状態に復旧しており、410 Gone(削除済みマーク)からHTTP 200(実在するページ)への切り替えが完了している。**GSCのインデックス反映(404報告の解消)には今後のGoogle再クロールを待つ必要があり、即時確認はできない**。次回GSC確認時にこの8パターンの404/410報告が消えていることを確認すること
  4. 既存の無関係ページ(ホーム`/`・トイレ個別詳細`/toilet/tokyo/...`・既存の静的EN guide OGP画像`/guide/japan-toilet-etiquette/opengraph-image`)への影響なし(いずれもHTTP 200)を確認

## ✅ opengraph-image動的ルート撤去に伴うGSC 404警告への対応: 410 Gone化(2026-08-10、応急処置・現在は上記により発展的に解消)

family-toilet-japan.comのGSC通知で、2026-07-13（コミット`ba8a4f6`）にnext-on-pages非互換のため撤去した動的OGP画像生成ルート8本（都市ページ・多言語ガイド・多言語スポット）に対応するURL計26件が404として報告された。

**原因**: 撤去前にGoogleがクロール済みだったURLを、削除後の再訪で404検出したもの。og:image自体は`layout.tsx`の静的`/og-image.png`が全ページで正常に機能しており、実害はなかった。

**対応(2026-08-10時点、応急処置)**: `middleware.ts`を新規作成し、該当8パターン（`/:city/opengraph-image`、`/spot/:slug/opengraph-image`、`/{ja,ko,zh}/{guide,spot}/:slug/opengraph-image`）へのアクセスに410 Goneを明示的に返すよう設定。`tsc --noEmit`エラーなし、devサーバーでの実URL検証で「8パターンとも410」「生存中のEN個別ガイドOG画像は200のまま」「実ページのog:image/twitter:imageタグは`/og-image.png`のまま変化なし」を確認済み。

**位置づけの整理(2026-08-11追記)**: この410 Gone対応は、「削除済みURLへの404報告を、意図的な削除であることを示す正しいステータスコードに置き換える」という**応急処置**であり、動的OGP画像機能そのものを諦める決定ではなかった(「残タスク」節に「復活を検討」として記録済み)。2026-08-11、この機能復活に正式着手し本番反映まで完了したことで、410 Goneでの一時しのぎから、機能自体の復旧という本来あるべき最終形に到達した。`middleware.ts`は復活作業の一環として削除済み(下記「動的OGP画像生成機能の復活」参照)。矛盾ではなく、計画されていた2段階の対応(①応急処置→②本復旧)が完了した形。

**⚠️ 将来対応事項として記録していたNext.js 16非推奨警告**: `middleware.ts`自体を削除したため解消(対応不要)。

Next.js公式ドキュメント（`node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`）によると機能は同一のままで、`proxy.ts`へのリネーム（ファイル名変更＋エクスポート名を`middleware`→`proxy`に変更するのみ）が推奨されている。次回Next.jsアップグレード時、またはこのファイルに触れる機会に対応を検討する。

## 📝 A8.net: JR西日本(WESTERモール)アフィリエイトプログラム不採用（2026-08-05、出典: ユーザー報告に基づく記録）

2026-08-05、A8.net経由で申請していたJR西日本公式/WESTERモール（地域特産品・お土産通販）のアフィリエイトプログラムへの参加申請が不採用となった旨の通知を受領。

**理由**: サイト内容との相性（先方希望内容との不一致）。通知文には、サイトの質自体を否定するものではない旨が明記されている。

**対応方針**: 再申請等のアクションは取らない。テーマ的な親和性の問題であり、時間を置いても結果が変わりにくいと判断したため。

**影響範囲**: A8.net本体の登録や他ASP提携への影響はなし。

## ✅ 月次OSMデータ自動更新: 初回PR作成の失敗原因を解消・検証・マージ完了（2026-08-01自動実行 → 2026-08-03検証・マージ）

**GitHub Actions PR作成失敗の原因と対処**:
`monthly-data-refresh.yml`（2026-07実装、`peter-evans/create-pull-request@v6`でPR自動作成）がPRを作成できていなかった。原因はワークフローYAML自体の不備ではなく、リポジトリ設定（Settings → Actions → General → Workflow permissions）がデフォルトの「読み取りのみ」になっており、デフォルト`GITHUB_TOKEN`に`pull-requests: write`相当の権限が付与されていなかったこと。ワークフローYAMLに`permissions:`ブロックを明示する対応もあり得たが、今回はリポジトリ設定側を「Read and write permissions」に変更して解消した（API確認: `default_workflow_permissions: "write"`）。2026-08-01の月次自動実行（schedule起動、run ID `30686554275`）で初めて成功し、PR #1が作成された。

**PR #1検証結果（2026-08-03）**:
- `public/data/cities/*.json`差分: 29都市ファイルで+41件（3,820→3,861）。減少した都市0件、異常な急増（最大+14%、山梨93→106）なし
- `public/data/toilets.json`合計: 16,277→16,318（+41、上記と一致）
- `npm run build`: エラー・警告なしで正常終了、3,518ページ生成（master比+2）
- `/coverage`ページ統計: 合計14,464→14,505（+41）、🍼交換台1,015→1,016（+1）、♿車いす対応2,802→2,810（+8）。比率（交換台約7%・車いす約19%）に大きな変動なし
- 上記確認の上、`gh pr merge`でマージ完了（マージコミット`a992379`）。次回（2026-09-01予定）の自動実行も同様の手順（差分件数・build・coverage統計の確認）でレビューすること

## ✅ GSC「重複しています。ユーザーにより、正規ページとして選択されていません」174件の調査（2026-08-03 → 2026-08-04 追加調査で結論）

**背景**: Search Consoleで、familytoiletjapan.comの一部ページの「Googleが選択した正規URL」が旧Vercelドメイン（`family-toilet-japan.vercel.app`、現在はVercelプラットフォーム自身が返す404で消滅済み）を指しているケースが見つかり、174件の重複エラーの一因ではないかと調査した。

**調査結果**: コード側の原因は見つからなかった。`app/layout.tsx`の`metadataBase`、全42ページの`canonical:`定義、`sitemap.xml`/`sitemap-toilets.xml`、`robots.ts`、hreflang（実ビルドHTMLで確認）まで、いずれも`https://familytoiletjapan.com`に一貫して統一されており、Vercelドメインへの参照は0件。`vercel.json`/`.vercel/`も存在しない。

**是正した2件**（canonicalタグ自体が未設定だった箇所。Vercel誤参照ではなく「未設定」だった）:
- `app/map/page.tsx`: bare `/map`にcanonical追加（`?id=`/`?city=`付きはbareへ正規化、id/city付きは既存のnoindex設定を維持）
- `app/guide/how-to-use-japanese-toilet/page.tsx`: 他ガイド同様にcanonical追加
- `npm run build`・実ビルドHTML（`/map`は`next start`でランタイム確認）・`npx tsc --noEmit`で反映を確認、コミット`474abd8`でpush済み

**174件そのものへの対応方針（コード側対応なし）**: 旧Vercelドメインは配信先自体が存在しない（Vercelプラットフォーム自身の404）ため、こちらから301リダイレクトを設定する技術的手段がない（2026-07-18時点で既に確認済みの制約、下記「Vercel→Cloudflare移行」節参照）。174件はこの制約下での**Search Console側の古いインデックス情報の残存**が主因と判断し、コード追加対応は行わず、**自然な再クロールを待つ方針**とした。

**対応完了(2026-08-11、このセッションで実施)**:
| 項目 | 内容 |
|---|---|
| canonical追加 | `app/attribution/page.tsx`・`app/privacy/page.tsx`に`alternates.canonical`を追加。`app/offline/page.tsx`は`"use client"`のため直接metadataをexportできず、新設した`app/offline/layout.tsx`(Server Component)経由でcanonicalを付与。ビルド後のHTML出力(`offline.html`/`privacy.html`/`attribution.html`)で実際に反映されていることを確認済み |
| Vercel文言の是正 | `app/privacy/page.tsx`のプライバシーポリシー本文の「Vercel — hosting」を「Cloudflare Workers — hosting」に修正 |
| OSM取得スクリプトのUser-Agent | `scripts/fetch-{all-prefectures,yokohama,nara,fukuoka,chiba}-osm.py`の5ファイル、Overpass API向けUser-Agentヘッダーを`family-toilet-japan.vercel.app`→`familytoiletjapan.com`に修正 |
| indexnow.ymlのコメント | `.github/workflows/indexnow.yml`のコメント・ステップ名から「Vercelデプロイ待ち」の表現を除去し、本番デプロイが`npm run cf:deploy`による手動CLI実行である旨を明記。**あわせて判明した点**: このワークフローは`master`へのpushをトリガーに180秒待ってIndexNow通知するが、本番デプロイ自体は手動CLI実行のため、pushしただけでは実際のデプロイが伴わない場合がある(コメント修正のみ実施、トリガー設計自体の変更は今回のスコープ外) |

`npx tsc --noEmit`エラーなし、`npm run build`成功(全ページ生成)を確認済み。

### 追加調査で判明: 174件は正常設計、対応不要（2026-08-04、出典: ユーザー提供のページソース〈view-source〉確認に基づく記録）

**調査対象**: `/map?id=osm-node-XXX&city=XXX`等、個別トイレ詳細ビューのURL

**判明した内容**: 対象ページのソースに以下が設定されていることを確認——
- `<meta name="robots" content="noindex, follow">`
- `<link rel="canonical" href="https://familytoiletjapan.com/map">`

これは意図的な実装。個別クエリパラメータURLはSPA的に`/map`ページ上で動的に内容を切り替える設計であり、canonicalで`/map`に正規化・noindexで個別URLのインデックス化を明示的に抑制している。GSCの「重複しています。ユーザーにより、正規ページとして選択されていません」は、この指示が正しく機能していることの報告であり、エラーではない。

**方針変更**: 「Search Console重複エラーの減少傾向を1〜2週間後に確認してからAdSense再審査を判断する」という旧方針は、この174件が待つ必要のない正常な状態であることが分かったため撤回。AdSense再審査（「審査をリクエスト」）の判断基準は、重複エラー件数の推移ではなく、下記「AdSense不承認への対応」節の「有用性の低いコンテンツ」指摘への実質的なコンテンツ充実度改善に置き直す。

**残る軽微な確認事項（優先度低）**: http（非https）のURL1件、city名のみ・パラメータなしURL数件

## ✅ opendata_tokyo由来トイレページの本番404問題（2026-07-28発覚 → 2026-07-29 根本原因特定・修正済み）
Search Consoleの404検出をきっかけに調査したところ、東京の自治体オープンデータ由来トイレページ（`opendata_tokyo_*`）が本番で100%404を返すことが判明。sitemap-toilets.xml・周辺リンクから一時除外して応急対応した後、根本原因を特定して恒久修正した。

**対象区数の訂正**: 発覚時のメモでは「千代田区・中央区・新宿区・台東区・目黒区・杉並区・荒川区・板橋区・江東区・江戸川区の10区、584/1004件」と記録したが、これは調査時点のデータスナップショットに基づく誤った記録だった。実際に`scripts/merge-tokyo-wards.py`の`WARD_CSVS`と現行データを照合したところ、対象は**15区・1,668件**で、上記10区に加えて墨田区・品川区・中野区・練馬区・葛飾区の5区が含まれていた。修正時（コミット参照）に15区全件を対象として扱った。

**根本原因**: `@opennextjs/aws`（`@opennextjs/cloudflare`が内部で使用する共有ルーティング層）の`core/routing/matcher.ts`内`handleFallbackFalse()`が、リクエストの生パス（`rawPath`、常にパーセントエンコードされた状態で届く）を、Next.jsのprerender-manifestに格納されたデコード済みUnicode文字列とデコードせずに直接比較していたため。ASCIIのみのIDはパーセントエンコードが恒等変換になるため一致するが、非ASCII文字（日本語区名）を含むIDは常に不一致となり、`dynamicParams = false`と組み合わさって強制的に`/404`へ書き換えられていた。R2キャッシュのキー生成・保存自体は無関係で、`x-nextjs-cache: HIT`はこの強制404書き換え後にNext.js自身の`/404`（`_not-found`）ページが正しくキャッシュからHITしていただけだった。

**恒久修正**: IDに含まれる区名を生の日本語からローマ字（`app/lib/ward-mapping.ts`のマッピング）に変換してASCII化。旧ID→新IDの301リダイレクトを`next.config.ts`に追加し、`/map?id=`の後方互換ルックアップも`MapView.tsx`に実装。

**今後の注意点（OpenNextで非ASCIIな動的ルートを扱う場合）**: OpenNextのルーティング層には非ASCIIパスの解決に既知の制約があることを踏まえ、動的ルートのパラメータには可能な限りASCII文字を使う設計にすること。関連issue: [opennextjs-cloudflare#611](https://github.com/opennextjs/opennextjs-cloudflare/issues/611)（`dynamicParams = false`が他ルートに影響する不具合、同じ`handleFallbackFalse`周りの不具合系統）、[vercel/next.js#17642](https://github.com/vercel/next.js/issues/17642)（Next.js本体でも過去に同種の「`getStaticPaths` fallback:false + 非ASCII/非ラテン文字URLで404」issueがあった。Next.js本体では解決済みだが、OpenNextの独自ルーティング実装で同じクラスの不具合が再発した形）。

## ✅ Vercel→Cloudflare移行 完了（2026-07-14）
**背景**: VercelのFair Use Guidelinesで「Hobbyプランは非商用利用限定。アフィリエイトリンクが主目的のサイトやAdSense広告掲載は商用利用に該当し、Pro以上のプラン必須」と判明。本サイトはアフィリエイト＋AdSenseを掲載しているため規約違反状態だった。Proプラン課金（月$20）ではなく、無料で商用利用可能なCloudflareへの移行を選択。

**進めなかった代替案（記録として）**:
- 独自ドメイン`office-kuma.jp`のサブドメイン活用 → 業務メール（ロリポップ運用）への影響リスクがあり撤回。当面`*.workers.dev`の無料URLで運用し、必要になれば別途安価な新規ドメインを取得する方針
- ムームーDNS → お名前.com管理ドメインの利用にはレジストラ移管が必要と判明し断念

**アダプター選定の紆余曲折**:
1. `@cloudflare/next-on-pages`（Pages、非推奨アダプター）で試行 → 依存関係競合（`.npmrc`で解決）→ 動的セグメント付きOGP画像がedge runtime要件と衝突（8ルート削除で回避）→ **サイト規模（35,166ルート）でアダプター自体が`Invalid string length`エラーによりクラッシュ、規模的限界と判断し撤退**
2. **`@opennextjs/cloudflare`（公式推奨・最新アダプター、Workers）に切替 → 成功**。Pagesの「静的出力」ではなくWorkers用スクリプト（`.open-next/worker.js`）を生成する方式のため、プロジェクトごと新規作成が必要だった
3. 生成された`generateStaticParams`ページ（トイレ個別・スポット等）が404 → OpenNextはSSGページも`.open-next/cache`配下に格納し実行時にincremental cache経由で配信する仕様と判明 → **R2バケット（`family-toilet-japan-cache`、無料枠10GB内）を作成しバインディング設定、Deploy commandを`npx opennextjs-cloudflare deploy`に変更**（`wrangler deploy`単体ではR2へのキャッシュアップロードが行われない点に注意）

**実施済み・確認済み**:
- `wrangler.jsonc`・`open-next.config.ts`・`package.json`（`cf:build`/`cf:preview`/`cf:deploy`スクリプト）追加
- GitHub連携でCloudflare Workersへ自動デプロイ（`master`push→ビルド→デプロイ）
- 環境変数（楽天・Klook・Amazon）をCloudflare側にも設定、動作確認済み
- 本番動作確認済み: トップ・地図・検索API・トイレ個別（EN/JA）・駅スポット・都市×カテゴリ・サイトマップ・3アフィリエイトリンクすべて200 OK・正常表示
- `/api/vote`からedge runtime指定を削除（OpenNextはNode.js runtimeをネイティブサポートするため不要かつ有害だった）

**残タスク**:
- ✅ 動的OGP画像（都市・多言語ガイド・スポット、8ルート）の復活 → 2026-08-11実施・完了（詳細は下記「動的OGP画像生成機能の復活」参照）
- ✅ 旧Vercelプロジェクトの削除判断（2026-07-18確認）: `family-toilet-japan.vercel.app`への全パスアクセスが`404 DEPLOYMENT_NOT_FOUND`（Vercelプラットフォーム自身が返すエラー）であることを確認。既に削除済みかドメインのプロダクションエイリアスが解除済みと推定され、実害なし・追加対応不要と判断
  - 背景: GSCから「重複しています。ユーザーにより、正規ページとして選択されていません」の通知（対象: vercel.app）があり301リダイレクト設定を検討したが、配信先自体が存在せずリダイレクト設定は技術的に不可能と判明。GSCの古いインデックス情報に起因するもので、再クロールにより自然にインデックスから外れるのを待つ方針とした（追加対応なし）
- 旧Cloudflare Pagesプロジェクト（`family-toilet-japan.pages.dev`、next-on-pages時代の残骸）の削除判断は未確認・未対応のまま
- Search Console・IndexNow等の送信先URLを新ドメイン（`*.workers.dev`）に更新が必要か確認
- 独自ドメイン取得の要否は引き続き保留（`*.workers.dev`のままで運用継続中）

## ⚠️ AdSense 3回連続不承認・根本原因調査（2026-08-30）

**経緯**: 2026-08-04申請→08-14に2回目不承認（プレースホルダーページのnoindex化を実施済みだったにもかかわらず再度「有用性の低いコンテンツ」）。ガイド記事78→164本への拡充等を実施し08-18に3回目申請→**08-27に3回目も同一理由で不承認**（AdSense管理画面のスクリーンショットで確認、「弊社の定めるサイト運営者ネットワークのご利用要件を満たしていない」）。

**調査結果（実サイト・robots.txt・sitemap.xml・実ページ内容を確認）**:
- 技術的な不備（noindexタグの漏れ、sitemap誤り）は見つからず。仕組みとしては設計通り機能している。
- インデックス対象は約1,500件（sitemap.xml 531件+sitemap-toilets.xml 1,004件）。うち施設名ありトイレ個別ページ1,004件（全体の約2/3）は「施設名+座標+アメニティ絵文字+最寄り駅距離+都市統計の使い回し文+定型FAQ」という共通テンプレート構成で、文章としての独自性はほぼゼロ（実例: 祐天寺公衆便所ページの固有文は機械生成的な1文のみ）。
- 都市ページも47都市共通テンプレート（Tips4行以外はテンプレ）。
- 人間が書いた独自コンテンツと言えるガイド記事は164本（4言語、実質EN基準40〜50本規模）のみで、インデックス対象全体の1割未満。
- **仮説**: Googleの審査は個々のページのnoindex有無ではなく、サイト全体の「機械的なデータ羅列 vs 独自の編集的価値」の比率を見ている可能性が高く、これまでの対応（薄いページのnoindex化・ガイド記事の量的拡充）は量は減らしたが構造的な比率の問題には届いていない。

**是正案（優先度順、いずれも大きな編集判断のため未実施・ユーザー判断待ち）**:
1. トイレ個別ページのインデックス対象をさらに絞る（例: 複数の実データが揃うページのみ、上位100〜200件程度に限定）か、既存ページの本文を厚くする
2. サイト構造をトイレDB主体からガイド記事主体へ転換（トップページ・内部リンクでガイドを前面に出す）
3. 「サイトの主目的はDBかコンテンツか」を編集方針として明確に決める — 現状は16,000件超のトイレDBが主目的でガイドが付随物に見える構造。これがAdSense基準と根本的に相性が悪い可能性

詳細調査はClaude Codeエージェントによる2026-08-30セッション参照。

## ✅ AdSense是正案①②を同時実施（2026-08-30）

上記調査の是正案のうち、「①トイレ個別ページのインデックス対象をさらに絞る」と「②サイト構造をガイド記事主体へ転換」を同時実装した（③の編集方針の明確化はこの2つの実施をもって事実上の回答とした: DBは検索の受け皿として残しつつ、インデックス・導線上の主役はガイド記事に切り替える方針）。

### ① トイレ個別ページのインデックス対象をさらに絞る

**判定基準の変更**: 従来は「施設名（`name`/`nameEn`）の有無」のみでインデックス可否を判定していた（`getIndexableDetailPageParams()`、2026-07-05実装）。これに加えて、実データの充実度を4項目（`address`住所・`openingHours`営業時間・`wheelchair`車いす対応・`operator`運営者）でスコアリングし、**2項目以上該当するページのみ**をインデックス対象とする基準を追加した（`app/lib/toilet-data.ts`の`getToiletRichnessScore()`・`isIndexableToilet()`）。

**閾値の根拠**: 施設名あり・おむつ交換台ありのトイレ510件（全都市データ集計、EN基準）に対して上記4項目でスコアリングしたところ、分布は 0点152件（30%）/ 1点199件（39%）/ 2点157件（31%）/ 3点2件（0.4%）/ 4点0件 だった。「施設名+座標+アメニティ絵文字のみ」に相当する0〜1点（351件、69%）を薄いページとして除外し、**2点以上（159件、31%）を「複数の実データが揃っている」の基準**とした。`address`と`openingHours`は同時に埋まっているレコードが0件（データソースが自治体オープンデータ vs OSMで排他的なため）で、単独では2点に届かないケースが多く、実質的に「(住所or営業時間) + (車いす対応or運営者情報)」を満たすページに絞り込む形になっている。

**絞り込み後の件数**: EN/JA合計で `sitemap-toilets.xml` は 1,004件 → **318件**（159件×2言語、約68%削減）。目安として提示されていた「上位100〜300件程度」の範囲に収まった。ページ自体は削除せず、noindexのまま地図・共有URLとしては引き続き機能する（既存方針を踏襲）。

**実装箇所**:
- `app/lib/toilet-data.ts`: `getToiletRichnessScore()`・`RICH_DATA_MIN_SCORE`（=2）・`isIndexableToilet()`を追加。`getIndexableDetailPageParams()`はこの新基準を使うよう変更
- `app/toilet/[city]/[id]/page.tsx`・`app/ja/toilet/[city]/[id]/page.tsx`: `generateMetadata`の`hasRealName`判定を`isIndexableToilet()`に置き換え（noindexタグとsitemapの基準を一本化。ズレ防止のため判定ロジックは`toilet-data.ts`に集約し両ファイルで共通利用）
- `app/sitemap-toilets.xml/route.ts`: 変更なし（既存の`getIndexableDetailPageParams()`呼び出しがそのまま新基準を反映するため自動追随）

### ② サイト構造をガイド記事主体へ転換

**トップページ（EN, `app/page.tsx`）**:
- ヒーローのCTAボタンを「📍 Find Toilets Near Me」の1本から、「📍 Find Toilets Near Me」と「📖 Read Travel Guides」（`#guides`アンカーへスクロール）の2本並列に変更
- 「Travel Guides」セクション（21本のガイド記事一覧）を、従来ページ下部（Browse by Regionの後）にあったのを**ファーストビュー直後・都市検索/エリア一覧より前**に移動。`id="guides"`を付与し導入文（「子連れで日本を旅する親が書いた実践的ガイド」）を追加。旧位置の重複ブロックとAd（同一slotの重複掲載になっていた）は削除し、ガイドセクション直後に配置し直した

**都市ページからガイド記事への内部リンク（4言語、新規追加）**:
調査の結果、都市ページ（`/[city]`・`/ja/[city]`・`/zh/[city]`・`/ko/[city]`）には元々ガイド記事へのリンクが一切無かった（スポットページ・トイレ個別ページには既存の`CITY_GUIDE_SLUGS`経由のリンクがあったが、都市ページだけ抜けていた）。4ファイルすべてに「📖 {都市名} Travel Guides」セクションを追加し、`app/components/SpotPageView.tsx`の`CITY_GUIDE_SLUGS`（都市→関連ガイドのマッピング、既存資産）を再利用してリンクさせた。該当都市のガイドが無い場合は各言語トップページの`#guides`セクションへの汎用リンクにフォールバックする（ja/zh/koトップページには`id="guides"`を新規付与）。

**ナビゲーション**: 本サイトには共通ヘッダー/フッターコンポーネントが存在せず（各ページが個別にレイアウトを持つ設計）、ヘッダーへのガイド導線追加は該当コンポーネントが無いため対象外。かわりに、最も導線として重要なトップページのファーストビューと、全都市ページ（47都市×4言語）という2つの主要な合流点にガイド記事への導線を追加することで同等の効果を狙った。

**検証**: `npx tsc --noEmit`エラーなし。`npm run build`成功（全ページ生成、既存の3,518ページ構成に変更なし）。`next start`でローカル起動し、`/`（EN）に「Read Travel Guides」ボタンと新位置のTravel Guidesセクション、`/tokyo`・`/ja/tokyo`・`/zh/tokyo`・`/ko/tokyo`にそれぞれの言語でガイドセクションが表示されることをHTTP経由で確認。`/sitemap-toilets.xml`のURL数が318件（159×2）であることも確認。アフィリエイト導線（楽天・Klook・Amazon）・多言語hreflang・既存のAdUnit配置には変更を加えていない。

**本番デプロイ完了（2026-08-30）**: ユーザー承認を得て`npm run cf:deploy`を実行（Version `6716b720-749a-4729-80ec-f6d48a388449`）。本番実機で`https://familytoiletjapan.com/sitemap-toilets.xml`が318件であること、トップページに「Read Travel Guides」ボタンが表示されることを確認。次のAdSense再審査リクエストは、Googleの再クロールを待ってからユーザー判断で実施すること。

## ⚠️ AdSense不承認への対応（2026-07-05）
**原因**: AdSenseダッシュボードの「サイト」ページで「有用性の低いコンテンツ」のステータス。診断の結果、トイレ個別ページ1,142件中632件（55%）が施設名の無い汎用プレースホルダー（「Public Toilet in Tokyo」等）で、地図上の座標以外に固有情報が無いことが判明。EN/JA合計で約1,264ページに及び、全体の3割以上を占めていたため、これが有力な原因と判断。

**実施した対応**:
- 施設名（`name`/`nameEn`）が無いトイレページに `robots: noindex, follow` を設定（EN/JA両方）
- `sitemap-toilets.xml` から同ページを除外する `getIndexableDetailPageParams()` を追加
- ページ自体は削除せず、地図からのリンク・共有URLとしては引き続き機能。インデックス対象のみ絞り込み（サイトマップ掲載数 約2,030→約1,004）

**次のアクション（ユーザー実行）**:
1. デプロイ完了を確認
2. Google Search Consoleでサイトマップを再送信（反映を促す）
3. 数日〜1週間ほど待ってGoogleに再クロールさせてから、AdSenseダッシュボードで「再審査をリクエスト」（即座に申請しても状態が変わっていないと再度弾かれる可能性が高い）
4. 再度不承認の場合はダッシュボードの理由を再確認し、追加対応を検討（候補: 駅スポットページ226件も内容の厚みを見直す、ガイド系ページを目立たせるトップページ導線強化など）

**再審査タイミングの判断基準（2026-08-04訂正）**: 上記「GSC重複エラー174件」節の追加調査により、GSC重複エラー件数の減少傾向を待ってから再審査を判断する旧方針は撤回。174件は`/map?id=`個別ビューURLの正常なnoindex/canonical設計によるものであり、待っても減らない・減らす必要もない指標だったため。再審査の判断基準は、重複エラー件数ではなく「有用性の低いコンテンツ」指摘への実質的なコンテンツ充実度改善（施設名の無いプレースホルダーページの解消状況等）に置く。

**再審査リクエスト実施（2026-08-04 17:00、出典: ユーザー報告に基づく記録）**: 上記の判断基準訂正を受け、Search Console重複エラー174件は正常設計と判明し待機不要と判断、待たずに即日AdSense再審査をリクエスト。想定審査期間は通常数日〜最大2〜4週間。次回確認: 審査結果が出るまで待機。結果次第で「有用性の低いコンテンツ」への追加対応方針を検討

## 📝 運用メモ: Search Consoleのサイトマップ送信欄（2026-07-25）

「サイトマップアドレスが無効です」エラーが発生したが、サーバー側（Content-Type・robots.txt・XML妥当性・Cloudflareのボット遮断有無）はすべて正常と確認済みだった。

**原因**: サイトマップ追加欄への入力形式の誤り。**フルURL（`https://familytoiletjapan.com/sitemap.xml`）を入力したら解決した。**

**注意**: 当初「入力欄はプロパティURLが前提になっており相対パス（`sitemap.xml`）のみを入力する仕様のはず」と推測したが、実際の挙動は逆で、フルURLを入力する必要があった。次回同様の作業をする際は、まずフルURLで試すこと。相対パスでの挙動やGSCのUI仕様は将来変わる可能性があるため、エラーが出たら両方の入力形式を試すのが確実。

## ⚠️ 薄いページ対策 第2弾（2026-07-25実施）

**背景**: 上記の対応後もサイト全体を棚卸しした結果、トイレ個別ページ以外にも「データの自動表示＋定型文のみ」のページが大量に存在すると判明:
- スポット/駅ページ（`/spot/[slug]` 他3言語、96施設+ODPT駅226=322件×4言語=**1,288ページ**）: 全ページ共通の`SpotPageView`テンプレートで、近隣トイレ一覧と数値だけ差し込んだ定型FAQ以外、そのスポット固有の解説文が無い
- 都市×カテゴリページ（`/[city]/[category]`、47都市×3カテゴリ=**141ページ**、EN限定）: 導入文がサイト全体で3パターン（`INTRO_TEXT`）しかなく、都市名と件数だけ差し替え
- 都市ページの汎用Tips/FAQ（**116ページ**＝EN39都市＋JA47＋ZH15＋KO15）: 都市名以外一言一句同じテンプレート文言

コンテンツページ全体（3,671ページ）の**約97%が上記いずれかに該当する薄いページ**という結果になった。

### 実施した対応（THIN_PAGES_NOINDEXフラグ）
`app/lib/feature-flags.ts`に`THIN_PAGES_NOINDEX`という真偽値フラグを追加し、一括ON/OFFできるようにした。

```ts
// app/lib/feature-flags.ts
export const THIN_PAGES_NOINDEX = true;
```

**`true`のとき**（現在の状態）:
- スポット/駅ページ（EN/JA/ZH/KO 計1,288件）に`robots: { index: false, follow: true }`を設定（`app/spot/[slug]/page.tsx`・`app/ja/spot/[slug]/page.tsx`・`app/zh/spot/[slug]/page.tsx`・`app/ko/spot/[slug]/page.tsx`の`generateMetadata`）
- 都市×カテゴリページ（EN 141件）に同様のnoindexを設定（`app/[city]/[category]/page.tsx`）
- `app/sitemap.ts`から上記2種のURLを除外（`categoryPages`・`spotPages`をフラグ判定で空配列に）
- トイレ個別ページのnoindex（施設名の有無で判定、7/5実装分）とサイトマップ除外は本フラグとは独立して既存のまま維持（変更なし）

**復元手順（AdSense通過後）**:
1. `app/lib/feature-flags.ts`の`THIN_PAGES_NOINDEX`を`false`に変更
2. デプロイ（`master`push→自動ビルド）
3. Google Search Consoleでサイトマップを再送信
4. ページ・データ自体は一度も削除していないため、フラグを戻すだけで元の状態（スポット/駅ページ・都市×カテゴリページがインデックス対象）に復元される

**⚠️ 復元時の注意点**:
- noindexを解除しても、Googleの再クロール・再インデックスには数日〜数週間かかる（即座には反映されない）
- AdSense通過後も継続的にポリシー準拠が求められるため、将来のレビューで「有用性の低いコンテンツ」等の指摘が再度入る可能性はゼロではない。フラグを戻す際は、その時点でのページ品質（スポットページの中身が今回の指摘時点から改善されているか等）を再確認してから判断すること

### 変更後のインデックス対象ページ数（再集計・2026-07-25時点）
| サイトマップ | 変更前 | 変更後 |
|---|---|---|
| `sitemap.xml`（都市・カテゴリ・スポット・ガイド・固定ページ） | 1,642件 | **213件** |
| `sitemap-toilets.xml`（施設名ありトイレのみ、変更なし） | 1,004件 | 1,004件 |
| **合計インデックス対象** | 2,646件 | **1,217件** |

除外した1,429件の内訳: スポット/駅ページ1,288件 + 都市×カテゴリページ141件（いずれもnoindex化・サイトマップ除外。ページ自体はビルドされ、地図からのリンク・共有URLとしては引き続き機能する）

### ✅ 解消済み: `/map`（bare、クエリなし）のコンテンツの薄さについて（2026-07-28メモ→2026-09-06対応済み、2026-09-22再確認）
`/map?id=...&city=...`形式のクエリ付きページはGSCの重複指摘を受けてnoindex化した（別項）。クエリなしのbare `/map`自体のコンテンツの薄さ（地図表示のみで固有の解説文等はない）は当初スコープ外としていたが、下記「AdSense対策 第2弾」（2026-09-06）で`app/components/MapIntro.tsx`に地図の見方・アイコンの意味・データ出典・都市/ガイドへの導線を含む約250語の解説文を実装済み（詳細は第2弾の項を参照）。2026-09-22、本番`familytoiletjapan.com/map`のHTMLに該当セクション（"What this map shows"等）が実際に出力されていることを再確認し、追加対応不要と判断した。

### 設計案（未実装）: 都市ページTipsの主要5都市手書き化
対象116件のうち、都市ページの汎用Tips/FAQは今回noindex化していない（トップページ導線として使われる可能性がありSEO上の扱いを変えると影響範囲が読みにくいため）。かわりに中身を厚くする方向で、まず主要5都市（Tokyo/Osaka/Kyoto/Nagoya/Yokohama）分から着手する設計を以下に固めた。実装はまだ行っていない。

**現状の担当コンポーネント**:
- EN版（`app/[city]/page.tsx`）: ファイル内の`CITY_META`オブジェクト（L10-83）が8都市（tokyo/osaka/kyoto/nagoya/yokohama/fukuoka/nara/chiba）分の手書きTips・キーワードを保持し、無い都市はL230付近のフォールバック配列（4行の汎用Tips、42都市で完全に同一文言）を使う。対象5都市はいずれも**EN版はすでに手書き済み**。
- JA版（`app/ja/[city]/page.tsx`）: Tips相当のセクション自体が存在せず、47都市全てが同一の4問FAQ（L88-112）のみ。**今回の対象はここ**。
- ZH版（`app/zh/[city]/page.tsx`）・KO版（`app/ko/[city]/page.tsx`）: 同様にTipsセクションなし、15都市全てが同一の3問FAQのみ。

**提案する変更**:
1. `app/lib/city-tips-ja.ts`を新規作成し、`Record<"tokyo"|"osaka"|"kyoto"|"nagoya"|"yokohama", { tips: string[] }>`型で5都市分の日本語Tipsを手書きする（EN版`CITY_META`の直訳ではなく、日本語話者向けに書き起こす。デパート名等の固有名詞はEN版と共有可）
2. `app/ja/[city]/page.tsx`にセクションを追加: 統計ブロックとFAQブロックの間に、`city-tips-ja.ts`にエントリがある場合のみ「💡 {都市名}で子連れ旅行のヒント」ブロックを表示。エントリが無い残り42都市は現状のまま（FAQのみ）で変更なし
3. FAQブロック自体は変更しない（構造化データ（FAQPage）と表示内容が対応しているため、Tips追加とは独立に保つ）
4. 効果検証後、ZH/KO版にも同じ5都市分を横展開するか判断（ZH/KOはこの5都市のうち対応言語版がある都市のみ対象: `ZH_KO_CITIES`に全5都市含まれるため展開自体は可能）
5. noindex/サイトマップには影響しない変更（都市ページは`THIN_PAGES_NOINDEX`の対象外のまま）

## ✅ 完了：収益化3本柱（すべて動作確認済み・稼働中）
- **楽天トラベル**: `NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID` 設定済み。全ガイドにホテル広告表示中。リンク先は楽天トラベルのトップページ（`dsearch`検索エンドポイントは存在しないため404を修正済み）
- **Klook**: `NEXT_PUBLIC_KLOOK_AFFILIATE_ID` 設定済み。USJ・ディズニー等8スポットページで検索結果へのアフィリエイトリンクが機能（`aid`+`utm_medium=affiliate-alwayson`のトラッキングを実機確認済み）
- **Amazonアソシエイト**: `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`（`familytoiletj-22`）設定済み。`traveling-japan-with-toddler-checklist` ガイドに実在4商品（ベビーゼンYOYO2/エルゴベビーOMNI Breeze/Ankerモバイルバッテリー/ジップロック）のASINを組み込み済み。税務情報登録も完了
  - ⚠️ **180日以内に3件の適格販売がないとアカウント自動閉鎖**。現状トラフィックはまだ小規模なため、達成は流入増加次第。閉鎖されても再申請可能なので致命傷ではない

## ✅ 完了：検索エンジン登録
- **Google Search Console**: 登録済み、サイトマップ送信済み
- **Bing Webmaster Tools**: GSCからインポートで登録完了。sitemap.xml（730件）・sitemap-toilets.xml（919件）とも処理成功、エラー0件
- **IndexNow**: Bing公式ツールで生成したキー（`76cee36382e74b6fbcf8a6c0e26db84c`）に統一。`public/`直下にキーファイル設置、`scripts/indexnow.js`で全URL通知、`.github/workflows/indexnow.yml`でデプロイ後自動実行

## ✅ 完了：GA4イベント計測
- `app/lib/analytics.ts`: `track.*` ヘルパー群（Directionsクリック・トイレ詳細表示・スポット閲覧・ガイド読了など）
- 数週間データが溜まったら、GA4のカスタムイベントでどの導線が実際に使われているか確認し、今後の優先順位づけに使う
- 未適用: `how-to-use-japanese-toilet` と `japan-travel-with-baby`（英語ガイド2本、構造が異なるため）

## ✅ 完了：P2 コンテンツ拡張
- 夏祭り特集ガイド（4言語）
- スポットFAQ構造化データ（全260ページ）
- 都市×カテゴリページ刷新（SEO説明文・内部リンク強化）
- スポット65→96ヶ所に拡張

## ✅ 完了：P3 機能強化
- **清潔度投票**: 実装済みだが `UPSTASH_REDIS_REST_URL`/`TOKEN` 未設定のため現在は非表示（下記「残タスク」参照）
- **データ更新自動化**: 月次GitHub Actions（`monthly-data-refresh.yml`）で自動PR作成
- **フィルター拡張**: `changingTableLocation`（男性トイレ側の交換台）/`level`（階数）/`ostomate` を新規取得対象に追加。既存都市データは次回の月次自動更新で反映
- **ルート沿いトイレ検索**: 地図に🛣️ボタン、2点間400m以内のトイレに絞り込み。実機確認済み
- **PWA仕上げ**: manifest強化済み。maskableアイコン・スクリーンショットは簡易対応のみ（下記「残タスク」参照）

## ✅ 完了：P4 サイト外集客インフラ
- Pinterest共有ボタンを全スポット・ja/zh/koガイドに設置、動作確認済み
- Reddit・ウィジェット営業の投稿テンプレートは本ファイル末尾に保管

---

## 🚀 クオリティ向上計画（第2次・2026-07-03策定）

前提: 基盤（収益化・SEO登録・4言語・季節特集・PWA）は完成。ここからは「ページ数を増やす」フェーズを終え、**既存ページ1枚あたりの品質・滞在価値を上げる**フェーズに移行する。優先度は「検索流入への効果 × 実装コスト」で決定。

### Q1. トイレ個別ページの日本語版 ✅ 完了（2026-07-04）
- `/ja/toilet/[city]/[id]` を1,015ページ追加（総ビルドページ数 1,676→2,604）
- 日本語施設名を主表示、設備ラベル・パンくず・周辺トイレ・スポット/ガイドリンクすべて日本語化
- EN/JA相互のhreflang設定済み、`sitemap-toilets.xml`に両言語URL（計2,030件）を掲載
- 構造化データ（BreadcrumbList + CivicStructure）もJA版に対応（`inLanguage: "ja"`）
- 狙い: 「駅名・公園名＋おむつ替え」系の日本語ロングテール検索の受け皿

### Q2. 薄いページの中身を厚くする ✅ 完了（2026-07-04）
- **周辺情報の自動生成文**: 最寄りスポットからの距離、徒歩500m圏内の代替おむつ替えトイレ数を各ページ固有の数値で表示（EN/JA両対応）
- **都市統計ブロック**: 交換台数・車いす対応数・無料数・総登録数を各ページに表示
- BreadcrumbList構造化データは調査したところ既に実装済みだった（計画時の見立て違い）
- `getToiletAreaContext()` を `toilet-data.ts` に追加。ビルド時間への影響は軽微（19s→22s）

### Q3. サイト内検索 ✅ 完了（2026-07-04）
- 既存のCitySearch（都市のみ）をサイト横断検索に拡張。都市47＋スポット96＋ガイド21＋名前付きトイレ502の計666件を対象
- `/api/search-index`（ビルド時静的生成・約80KB）を初回フォーカス時に遅延取得。取得前は従来の都市検索でフォールバック
- 前方一致＞部分一致のランキング、種別ごとの表示上限、英日両言語で検索可能
- 選択時に `site_search_select` GA4イベント送信 →「ユーザーが何を探しているか」の生データが今後溜まる
- 追加ライブラリなし（自前実装）。ガイド追加時は `app/api/search-index/route.ts` のGUIDES配列への追記が必要

### Q4. パフォーマンス計測と改善 ✅ 一区切り（2026-07-04）
**計測結果（モバイル・改善前→改善後）**:
- トップページ: 74点 → **87点**（LCP 4.1s・TBT 70ms・CLS 0）
- `/map`: 44点 → **45点**（LCP 13.9→13.6s・TBT 1,560→**1,090ms**・CLS 0）
**実施した改善**: Esriタイルへのpreconnect / 都市JSONの`priority: "low"` fetch / `/data/*`・`/icons/*`への長期Cache-Controlヘッダー
**`/map`のLCPはこれ以上追わない判断（理由）**:
1. 根本原因は「JS読込→Leaflet初期化→タイル取得」の直列チェーンで、解決には静的地図画像ファースト等の再設計が必要（工数対効果が悪い）
2. `/map`は検索流入の入口ではなくアプリページ。SEO上重要なトップ・ガイド・個別ページは健全
3. CrUX（実ユーザー）データがまだ無く、ラボスコアが順位に影響する段階ではない。実ユーザーデータが溜まって問題が出たら再検討
**副産物の発見**: 現行データには`ostomate`タグ付きトイレがほぼ存在しない（フィルターONで0件）。月次データ更新（次回8/1）で取得タグに追加済みなので、更新後に再確認

### Q5. 信頼性シグナル（E-E-A-T）強化 ✅ 完了（2026-07-04）
- Aboutページに「Who's Behind This」セクション追加（子連れ旅行の実体験ベースであること、独立運営・広告と施設データの分離の明示）
- 「Site last built」（ビルド日付＝データ更新日）表示を追加
- 問い合わせフォーム・FAQ・出典ページへの導線は既存で十分と判断

### Q6. GA4データに基づく改善ループの開始（継続タスク）
- 数週間分のイベントデータが溜まった時点で: ①流入クエリ上位（GSC）②よく使われる機能（GA4）③直帰が多いページ を確認
- その結果に基づいてQ1〜Q5の優先順を再調整する。**このレビューを月1回の定例タスクにする**

**推奨着手順: Q3（検索・工数小）→ Q1（JA版・効果大）→ Q2（コンテンツ増厚）→ Q4（計測）→ Q5（E-E-A-T）**。Q6は並行で月次実施。

---

## ✅ 完了: 地下鉄駅スポット自動生成（2026-07-04実装）
- `scripts/fetch-odpt-stations.py` で東京メトロ186＋都営149駅を取得、同名駅統合で258駅に
- 既存スポットとの重複排除（slug一致 or 300m以内）で32件除外 → **226駅を新規追加**
- `app/lib/stations-odpt.json`（静的コミット、ビルド時API依存なし）を `spots.ts` が読み込み統合
- 全4言語対応（都営の多言語欠落分はzh=日本語漢字・ko=英語ローマ字でフォールバック）
- 最寄り都市割当が都外始発駅に対応（和光市→埼玉、西船橋→千葉）
- 総ページ数 2,604 → **3,516**（+912）。サイトマップ・検索インデックス・トイレ個別ページの内部リンクは自動追随
- `/attribution` に公共交通オープンデータセンターのクレジット追加
- 再取得コマンド: `ODPT_TOKEN=xxx python scripts/fetch-odpt-stations.py`（トークンはコミット禁止）

<details><summary>当初の設計（実装済み）</summary>

## 🎯 次期実装: 地下鉄駅スポット自動生成（設計完了・実装待ち）

**背景**: ODPT APIの再調査（2026-07-04）で、東京メトロ186駅＋都営149駅の計335レコードに緯度経度＋6言語駅名（en/ja/ko/zh-Hans/zh-Hant）が入っていることを発見。既存スポットページの仕組みで「〇〇駅 おむつ替え」系検索の受け皿を4言語×約250駅（重複統合後）＝約1,000ページ自動生成できる。

**APIアクセス**（トークンは取得済み・コードにコミットしないこと）:
- エンドポイント: `https://api.odpt.org/api/v4/odpt:Station?acl:consumerKey={TOKEN}&odpt:operator=odpt.Operator:TokyoMetro`（Toeiも同様）
- トークンは developer.odpt.org のマイページ（editkeys）で確認できる。スクリプト実行時は環境変数 `ODPT_TOKEN` で渡す
- 座標があるのはTokyoMetroとToeiのみ（JR東・私鉄各社は駅名のみで使用不可、検証済み）

**実装手順**:
1. `scripts/fetch-odpt-stations.py` を新規作成:
   - TokyoMetro/Toei の odpt:Station を取得
   - **同名駅の統合**: `dc:title`（日本語駅名）が同じレコード（例: 上野=銀座線+日比谷線）は1駅にマージし、座標は平均値
   - Spot型に変換: `names.en`=stationTitle.en、`ja`=ja、`zh`=**zh-Hant**、`ko`=ko / `type: "station"` / slug=`{en名を小文字ハイフン化}-station`（例: Ueno → `ueno-station`）
   - `city`: 座標から tokyo/chiba/saitama/yokohama の最寄り（CITIES座標とのユークリッド距離）を割当（西船橋・和光市など都外駅対応）
   - 出力: `app/lib/stations-odpt.json`（リポジトリにコミットする静的ファイル。ビルド時のAPI依存なし）
2. `app/lib/spots.ts` を修正:
   - 生成JSONをimportし、**重複排除してから** SPOTS に結合。除外条件: ①slugが既存と一致 ②既存スポットから300m以内（手作業キュレーション分を優先）
3. 出典表示: `/attribution` ページに「公共交通オープンデータセンター」のクレジットを追加（ライセンス上必須）
4. 確認事項: サイトマップ（SPOT_SLUGSから自動）と検索インデックス（/api/search-indexはSPOTSを走査）は**自動で追随する**ので変更不要。`getNearbySpots` が返す候補が増えるためトイレ個別ページの内部リンクも自動で充実する
5. ビルドして総ページ数増（約+1,000）とスポットページ表示を確認、コミット・プッシュ

**推奨実行環境**: Opus 4.8 + fastモード（定型実装のため。設計判断は本セクションで完了済み）

</details>

---

## 🔲 残タスク（優先度順）

### 1. Upstash Redis登録（任意・低優先度）
清潔度投票機能を有効化したい場合のみ。[upstash.com](https://upstash.com)で無料DB作成し、`UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`をVercelに設定するだけ。なくても他機能に影響なし。

### 2. Reddit カルマ稼ぎ（継続作業）
現在貢献40、カルマ50到達で r/japanlife に再挑戦。r/JapanTravelの旅程相談への回答を継続。

### 3. Pinterest運用開始（ユーザー実行）
アカウント作成 →「Japan with Baby」等のボード作成 → 各ページの「Pin」ボタンで投稿（画像・文言は自動入力）。優先ページ：夏祭りガイド、USJ/ディズニー等のスポットページ。

### 4. ウィジェット営業（ユーザー実行）
`/widget` を子連れ旅行系ブログに紹介。テンプレは下記参照。「japan travel with baby blog」等で検索し個人ブログ10件をピックアップ、必ず個別カスタマイズして送信。

### 5. 季節特集
- ✅ 夏祭り・紅葉（koyo）・桜（sakura）の3特集すべて完了。4言語対応、sitemap・各言語トップページに登録済み
- 紅葉: `/guide/autumn-foliage-with-kids-japan`（2026-07-03実装）
- 桜: `/guide/cherry-blossoms-with-kids-japan`（2026-07-03実装、通常なら来年1〜2月着手が理想だが冬旅行を計画中のユーザーもいるため前倒しで実装）
- これで季節特集は一巡。次に何か作るなら、既存3特集の検索順位・流入をGA4で見てから追加要否を判断する

### 6. PWA仕上げの残り
- ✅ maskableアイコン画像: 完了（2026-07-03）。既存の`icon-192.png`/`icon-512.png`が実は中身のない水色の正方形だったバグを発見し、🚽絵文字デザインに差し替え。セーフゾーン内に収まる余白付き
- ✅ `/map`・トイレ個別ページのスクリーンショット撮影: 完了（2026-09-03）。`npm run cf:deploy`で本番反映済み（Version ID `2c008779-6840-49fa-b61a-5c3342901c3c`）、`https://familytoiletjapan.com/manifest.json`にscreenshots 4件が反映されていることを確認。`npm install puppeteer --no-save`（package.json/lockは無変更のまま一時的にローカルnode_modulesへ導入、作業後にuninstall済み）でヘッドレスChromeを起動し、devサーバー（`npm run dev`、localhost:3000）に対して4枚を撮影: `/map`のモバイル版（390×844）・デスクトップ版（1280×800）、トイレ個別ページのモバイル版（390×844、`osm-node-366818868`＝実名ありの東京都立目黒区駒場東大前駅公衆便所）、トップページのデスクトップ版（1280×800）。撮影前にCookie同意バナーは自動でAcceptしてから撮る処理を追加（`/map`の位置情報拒否バナーはheadless環境の制約でそのまま残るが、実害のある表示ではないため許容）。`public/screenshots/`に保存し、`public/manifest.json`の`screenshots`フィールド（`form_factor: narrow`×2、`wide`×2、各`label`付き）に登録。JSON構文チェック済み

### 7. データ強化（次回・私が対応、規模大）
✅ ostomateフィルターは実装済み（2026-07-03）。ODPT駅施設データ・赤ちゃんの駅事業データはいずれも調査の結果見送り（詳細は下記「データ強化候補」参照）。残るは①OSMの他アメニティ（授乳室・給水スポット・公園遊具）の新規レイヤー化 →②自治体オープンデータの公衆トイレCSV取り込み。いずれも規模が大きいため着手前に方向性の確認が必要。

---

## 営業テンプレート保管

### Reddit投稿（カルマ50到達後）
> タイトル案: "Mapped every toilet with a baby changing table in Japan (free, no signup) — sharing in case it helps other parents"
> 本文の骨子: 個人の子連れ旅行での困りごと→解決のために作った経緯→機能紹介（4言語対応、オフライン対応）→リンクは最後に一度だけ

### ウィジェット営業メール
> 件名: Free interactive toilet map widget for your Japan travel blog
> 本文骨子: ブログを読んだこと（具体的な記事名に言及）→ 悩み（トイレ情報の欠如）に対する解決策として無料ウィジェットを紹介 → 埋め込みコード1行 → 見返りは求めない旨を明記

---

## データ強化候補（詳細）

### A. OSMの未取り込みタグ
| タグ | 内容 | 状態 |
|---|---|---|
| `changing_table:location` | 交換台の場所（male/female/unisex等） | ✅ 実装済み（月次更新で反映） |
| `level` | 階数 | ✅ 実装済み（月次更新で反映） |
| `ostomate` | オストメイト対応 | ✅ 実装済み（月次更新で反映） |
| `changing_table:count` | 交換台の台数 | 未着手 |
| `toilets:wheelchair` / `wheelchair:description` | 車いす詳細 | 未着手 |
| `toilets:paper_supplied` | 紙の有無 | 未着手 |
| `description` / `operator` | 説明・運営者（SEO文章量増） | 未着手 |

### B. OSMの別アメニティ（トイレ以外への拡張）
- `changing_table=yes`付き店舗・施設（カフェ、百貨店等）→「トイレ以外のおむつ替え場所」レイヤー
- `amenity=nursing_room`（授乳室）
- `amenity=drinking_water`（給水スポット、夏特集と連動）
- `leisure=playground`（公園遊具、「トイレ×遊び場」セット表示）

### C. 公共オープンデータ（要ライセンス確認）
1. 自治体オープンデータの公衆トイレCSV（中核市クラスに未取り込みが多数）
2. 国交省「歩行空間ネットワークデータ」（バリアフリー経路）

### D. 見送り
- **公共交通オープンデータセンター（ODPT）（2026-07-03調査・見送り決定）** — 開発者登録・APIキー発行まで完了し実際にAPIを叩いて検証したところ、ODPTは時刻表・運賃・列車位置・乗降客数調査など「鉄道運行データ」が中心で、エレベーター・多目的トイレ・おむつ替え室のような「駅設備」データはそもそも提供されていないことが判明（`StationFacility`等の型名を複数試したが全て「存在しない型」エラー）。駅データの本命という当初の見立ては調査不足によるもので誤りだった。APIキー自体は無料で保持しているので、将来的に運行情報を使う機会があれば流用可能
- **「赤ちゃんの駅」事業データ（2026-07-03調査・見送り決定）** — デジタル庁の自治体標準オープンデータセットとして統一フォーマットはあるものの、実際に確認した自治体（中央区・会津若松市）はいずれも緯度・経度・住所が未入力。標準フォーマットに項目はあっても自治体側が埋めていないのが実態で、ジオコーディングでの補完が必要になり、費用対効果が見合わないため見送り。他自治体で座標入りのデータが見つかれば再検討の余地あり
- Google Places API（規約で保存・再配布不可）
- 商業施設サイトのスクレイピング（規約リスク）
- ⚠️ ODbL継承条項に注意：他ソースと混ぜず別レイヤーで保持し出典を分離表示すること

---

## 保留・見送り（恒久）
- 写真掲載（ライセンスリスク）
- ネイティブアプリ化（PWAで十分）
- ユーザーアカウント機能（localStorageで足りている）
