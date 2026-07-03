# Family Toilet Japan — 改善ロードマップ

最終更新: 2026-07-03（このファイルは実装のたびに更新する）

## 現状スナップショット
- ビルド: 1,676ページ（トイレ個別919 / ガイド65×4言語 / スポット96×4言語 / 都市・カテゴリ ほか）
- 4言語対応（en/ja/zh-TW/ko）、hreflang済み、OGP画像動的生成済み、ダークモード済み
- AdSense: 審査中（承認後に `NEXT_PUBLIC_ADSENSE_APPROVED=true` をVercelに設定）
- 集客: Reddit（japan_travel_dad）でカルマ構築中（貢献40、目標50）

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

## 🔲 残タスク（優先度順）

### 1. Upstash Redis登録（任意・低優先度）
清潔度投票機能を有効化したい場合のみ。[upstash.com](https://upstash.com)で無料DB作成し、`UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`をVercelに設定するだけ。なくても他機能に影響なし。

### 2. Reddit カルマ稼ぎ（継続作業）
現在貢献40、カルマ50到達で r/japanlife に再挑戦。r/JapanTravelの旅程相談への回答を継続。

### 3. Pinterest運用開始（ユーザー実行）
アカウント作成 →「Japan with Baby」等のボード作成 → 各ページの「Pin」ボタンで投稿（画像・文言は自動入力）。優先ページ：夏祭りガイド、USJ/ディズニー等のスポットページ。

### 4. ウィジェット営業（ユーザー実行）
`/widget` を子連れ旅行系ブログに紹介。テンプレは下記参照。「japan travel with baby blog」等で検索し個人ブログ10件をピックアップ、必ず個別カスタマイズして送信。

### 5. 季節特集の残り（次回・私が対応）
- 桜特集：来年1〜2月頃着手が理想（2〜4月に検索急増するため）
- 紅葉特集：8月頃着手でも間に合う
- 実装パターンは夏祭り特集と同じ

### 6. PWA仕上げの残り（次回・私が対応）
- maskable専用アイコン画像の作成（現在は既存アイコンの流用でクロップされる可能性あり）
- `/map`・トイレ個別ページの実機スクリーンショット撮影（前回セッションでプレビュー環境のスクリーンショットツールがタイムアウトし続けたため未達成）

### 7. データ強化（次回・私が対応、規模大）
優先順：①OSMタグ拡張（`changing_table:location`/`level`は実装済みなので次は`ostomate`の活用UI等）→②ODPT駅施設データ→③赤ちゃんの駅事業データ→④公園遊具・給水スポットレイヤー。詳細は下記「データ強化候補」参照。

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
1. **「赤ちゃんの駅」事業データ** — 自治体の授乳・おむつ替え施設登録制度。CC-BY系が多い。**授乳室データの本命**
2. **公共交通オープンデータセンター（ODPT）** — 鉄道各社の駅施設API。開発者登録無料。**駅データの本命**
3. 自治体オープンデータの公衆トイレCSV（中核市クラスに未取り込みが多数）
4. 国交省「歩行空間ネットワークデータ」（バリアフリー経路）

### D. 見送り
- Google Places API（規約で保存・再配布不可）
- 商業施設サイトのスクレイピング（規約リスク）
- ⚠️ ODbL継承条項に注意：他ソースと混ぜず別レイヤーで保持し出典を分離表示すること

---

## 保留・見送り（恒久）
- 写真掲載（ライセンスリスク）
- ネイティブアプリ化（PWAで十分）
- ユーザーアカウント機能（localStorageで足りている）
