# Family Toilet Japan — 改善ロードマップ

最終更新: 2026-07-03（このファイルは実装のたびに更新する）

## 現状スナップショット
- ビルド: 1,538ページ（トイレ個別919 / ガイド64 / スポット260 / 都市・カテゴリ ほか）
- 4言語対応（en/ja/zh-TW/ko）、hreflang済み、OGP画像動的生成済み、ダークモード済み
- AdSense: 審査中（承認後に `NEXT_PUBLIC_ADSENSE_APPROVED=true` をVercelに設定）
- 集客: Reddit（japan_travel_dad）でカルマ構築中
- **GA4イベント計測: 実装済み**（2026-07-03）— `directions_click` `toilet_detail_open` `spot_view` `guide_scroll_complete` 等。`app/lib/analytics.ts`
- **アフィリエイト土台: 実装済み**（2026-07-03、要ID登録）— `app/components/AffiliateBox.tsx`。下記「有効化手順」参照

---

## ✅ 実装済み: GA4イベント計測（2026-07-03）
- `app/lib/analytics.ts`: `track.*` ヘルパー群
- `ToiletDetail.tsx`: 詳細パネル表示・Directionsクリック
- `PageViewTracker.tsx`: SSGページ（トイレ個別・スポット）のビュー計測用の薄いクライアント発火体
- `GuideScrollTracker.tsx`: ガイド90%スクロールで読了イベント（英語ガイド16本中14本＋ja/zh/ko共通テンプレートに適用済み。`how-to-use-japanese-toilet`と`japan-travel-with-baby`は構造が違うため未適用 — 次回手動で追加）
- GA4管理画面で「カスタムイベント」からこれらのイベント名を確認できる。数週間データが溜まったら、どの導線が実際にクリックされているか（Directions率、スポット→ガイド遷移率）を見て優先順位を再判断する

## ✅ 実装済み: アフィリエイト土台（2026-07-03・要有効化）
- `app/components/AffiliateBox.tsx`: `HotelAffiliateBox`（楽天トラベル）/ `ActivityAffiliateBox`（Klook）/ `GearAffiliateBox`（Amazon）
- `HotelAffiliateBox` は ja/zh/ko ガイドテンプレートの `GuideAreaLinks` 直前に設置済み。都市に紐づかないガイド（旅行基本ガイド等）では自動非表示
- **未実施＝次回のアクション**:
  1. 楽天アフィリエイト（楽天トラベル）に登録 → 発行されたIDをVercel環境変数 `NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID` に設定するだけで全ガイドに自動表示される
  2. Klookアフィリエイトに登録 → `NEXT_PUBLIC_KLOOK_AFFILIATE_ID` を設定。`ActivityAffiliateBox` はまだどのページにも配置していないので、USJ・ディズニー系スポットページ（`app/components/SpotPageView.tsx`）に追加する
  3. Amazonアソシエイトに登録 → `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` を設定。`GearAffiliateBox` は `traveling-japan-with-toddler-checklist` ガイド（持ち物リスト）に配置するのが最適。ASINは商品ページURLから取得
  4. 各広告に「広告」「PR」表記が言語ごとに入っている（法令・各プログラム規約対応済み）ので追加対応不要
  5. 登録には運営者情報・銀行口座等が必要（Claude Codeでは代行不可、ユーザー本人の作業）

## ✅ 実装済み: IndexNow（2026-07-03・要手動確認）
- キーファイル: `public/e8442e45ff5c4ebd9ce220c08394d63f.txt`
- 通知スクリプト: `scripts/indexnow.js`（`npm run indexnow` で手動実行可）。sitemap.xml + sitemap-toilets.xmlの全URLをBing/Yandex等に一括通知
- GitHub Actions: `.github/workflows/indexnow.yml` — masterへのpush（Vercelデプロイ）から3分後に自動実行
- **未実施＝次回のアクション**:
  1. デプロイ後、ブラウザで `https://family-toilet-japan.vercel.app/e8442e45ff5c4ebd9ce220c08394d63f.txt` を開いてキーが正しく返るか確認
  2. [Bing Webmaster Tools](https://www.bing.com/webmasters) にサイトを手動登録（Google Search Consoleと同様の認証が必要、これはユーザー本人の作業）
  3. GitHub Actionsが正常に動いているかリポジトリの Actions タブで確認

## ✅ 実装済み: Klookアフィリエイト配置（2026-07-03・要ID）
- `SpotPageView.tsx` の `TICKETED_SPOTS` に8スポット（USJ・ディズニー・スカイツリー・首里城等）を指定済み。`NEXT_PUBLIC_KLOOK_AFFILIATE_ID` 設定で自動表示

## ⏸ 保留: Amazonアフィリエイト（ASIN要手動確認）
- `GearAffiliateBox` は実装済みだが、まだどのガイドにも配置していない
- 理由: ASIN（Amazon商品コード）を推測すると誤った商品にリンクしてしまうため、実データなしでは設置を見送った
- **次回のアクション**: Amazon.co.jpで実際に「ベビーゼン YOYO2」「サイベックス Libelle」等を検索し、商品ページURLから正しいASINを取得 → `traveling-japan-with-toddler-checklist` ガイドに `GearAffiliateBox` を追加

## P2: コンテンツ拡張（検索流入の面を広げる）

## ✅ 実装済み: 夏祭り特集ガイド（2026-07-03）
- `summer-festivals-with-kids-japan` を4言語で追加（英語は個別ファイル、ja/zh/koは共通テンプレート）
- 混雑回避・屋台グルメ・熱中症/迷子対策・トイレの探し方の4セクション
- sitemap.ts・4言語トップページ・hreflangすべて反映済み

### 4. 残りの季節特集（次回）
- 「桜シーズンの子連れ花見スポットとトイレ」（2〜4月に検索急増、来年の桜シーズン前の1〜2月頃に実装するのが理想）
- 「紅葉シーズンの京都・日光」（9〜11月。今から数ヶ月あるので8月頃着手でも間に合う）
- 実装パターンは summer-festivals-with-kids-japan と同じ（英語個別ファイル＋ja/zh/ko共通テンプレートにデータ追加）

## ✅ 実装済み: スポットFAQ構造化データ（2026-07-03）
- 「新宿駅におむつ交換台はある？」等3問を全260スポットページ（4言語）に実データから自動生成
- FAQPage JSON-LD ＋ 可視のQ&Aブロック両方を追加（Google PAA枠と実訪問者の両方に対応）
- `app/components/SpotPageView.tsx` 内 `faqText` オブジェクトで管理。統計値0件の場合は「データなし」の適切な回答文に自動切替

## ✅ 実装済み: 都市×カテゴリページの充実（2026-07-03）
- `app/[city]/[category]/page.tsx` を全面刷新：カテゴリ別の説明文（SEO対策）、エリアショートカット（スポットページへのリンク）、他カテゴリへのリンク、ダークモード対応、canonical追加
- おむつ交換台カテゴリでは既存の919個別SSGページへ優先的にリンク（内部リンク強化）
- AdUnit追加

## ✅ 実装済み: スポット拡張（2026-07-03）65→96ヶ所
- `app/lib/spots.ts` に31スポット追加：鎌倉・江ノ島・箱根（横浜データ利用）、成田空港、心斎橋・関空・梅田スカイビル（大阪）、錦市場・哲学の道・宇治（京都）、レゴランド・大須（名古屋）、福岡空港・太宰府、小樽・新千歳（札幌データ利用）、宮島・原爆ドーム（広島）、東大寺（奈良）、美ら海水族館（沖縄）、日光東照宮（栃木）、高山・白川郷（岐阜）、下北沢・吉祥寺・谷中・ジブリ美術館・中野ブロードウェイ・築地（東京）など
- ビルド: 1,543→**1,675ページ**（+132）
- 注意: `city`フィールドは既存の`CITIES`（toilet-data.ts）のキーと一致させる必要がある（例：鎌倉は"kanagawa"ではなく"yokohama"を使う——神奈川県全体のデータが横浜ファイルに集約されているため）
- 次回さらに追加する場合の候補: 金沢21世紀美術館、道頓堀以外の大阪スポット、松島（仙台）、湯布院・別府、軽井沢、伊勢神宮、京都嵐山周辺の追加スポット

## P3: 機能強化（リピーター・滞在時間）

### 8. 清潔度ワンタップ投票（要DB判断）
- Upstash Redis（無料枠1万コマンド/日）で「Clean / OK / Dirty」集計
- 個別ページ・詳細パネルに表示。UGCで再訪問動機とページ独自性を作る
- 実装: Route Handler `/api/vote` + Upstash。個人情報なしなのでプライバシー影響小

## ✅ 実装済み: データ更新パイプライン自動化（2026-07-03）
- `.github/workflows/monthly-data-refresh.yml`: 毎月1日正午JSTに自動実行（`workflow_dispatch`で手動実行も可）
- `fetch-all-prefectures.py --force` → `merge-all-prefectures.py` → `split-by-city.py` の順で実行し、差分があれば自動でPRを作成（**自動マージはしない**——データ異常の混入を防ぐ安全策）
- PR本文に確認事項（差分件数・ビルド通過・coverageページの統計）を明記

## ✅ 実装済み: フィルター拡張・データフィールド強化（2026-07-03）
- `merge-all-prefectures.py`（月次自動更新で使われるスクリプト）が `changing_table:location`（男性トイレ側の交換台）、`level`（階数）、`ostomate`（オストメイト対応）を取り込むよう拡張
- `Toilet`型に `changingTableLocation` / `level` / `ostomate` を追加（オプショナルなので既存データは影響なし）
- `ToiletDetail.tsx`（地図の詳細パネル）とトイレ個別ページ（919枚）両方で、データがある場合のみ表示
- **注意**: 既存の東京・大阪等のデータはこれらのタグをまだ持っていない（次回の月次自動更新でOSMから再取得された時に反映される）。個別の `merge-tokyo-wards.py` 等の手動マージスクリプトは今回未修正——必要なら同様の3行を追加する

### 10. ルート沿いトイレ検索（次回・未着手）
- 「東京駅→ディズニー」のような2点間ルート沿いのトイレ表示（直線バッファでも実用的）
- 地図に「経路モード」追加。子連れ移動の実需にドンピシャ

## ✅ 実装済み: PWA仕上げ（2026-07-03・一部要フォロー）
- `manifest.json`: `id`/`scope`/`lang`/`dir`/`categories` 追加、`purpose: "maskable"` アイコンエントリ追加
- **既知の制約**: maskable用に新規デザインした画像ではなく既存の `icon-512.png` を流用しているため、Android等でロゴがセーフゾーン外にクロップされる可能性がある。理想的には中央80%に収まるロゴの専用maskable画像を用意すべき（次回、画像生成ツールで対応）
- オフラインページ（`app/offline/page.tsx`）は既に実装済みで良好な状態だったため変更なし
- **screenshots未追加**: PWAインストールプロンプト用のアプリスクリーンショットは、プレビュー環境のスクリーンショットツールが本セッションでタイムアウトし続けたため撮影できず。次回、環境が安定していれば `/map` と `/toilet/tokyo/{id}` の実機スクリーンショットを撮ってmanifestに追加する

## P4: 集客（サイト外）

### 13. Pinterest 運用
- 子連れ旅行はPinterestと相性抜群。既存OGP画像324枚をピンとして投稿可能
- 「Japan with baby」系ボードを作成、ガイドへ誘導

### 14. Reddit 継続 + r/JapanTravelTips
- カルマ50到達後、月1回の「役立つ情報まとめ」投稿（宣伝ではなく情報提供でサイト言及）

### 15. ウィジェット営業
- 子連れ日本旅行系ブログ10件に /widget を紹介するアウトリーチ（被リンク獲得）

---

## 実装順の推奨
1. **GA4イベント計測**（他施策の効果測定に必要、半日）
2. **アフィリエイト導入**（収益源の複線化、1日）
3. **スポットFAQ構造化データ**（1ファイル修正で260ページに効く、1時間）
4. **IndexNow/Bing**（1時間＋手動登録）
5. **季節特集：夏祭り編**（7月なので今が旬、半日）
6. 以降 P2→P3 の順

---

## データ強化: 取得可能な情報源の候補

### A. OSMの未取り込みタグ（既存パイプラインの拡張だけで済む・最優先）
| タグ | 内容 | 使い道 |
|---|---|---|
| `changing_table:location` | 交換台の場所（male/female/unisex/dedicated_room） | 「男性トイレにも交換台」フィルター（差別化の目玉） |
| `changing_table:count` | 交換台の台数 | 個別ページの詳細表示 |
| `toilets:wheelchair` / `wheelchair:description` | 車いす詳細 | アクセシビリティ情報の精度向上 |
| `ostomate` | オストメイト対応 | 多目的トイレ検索の付加価値 |
| `level` / `indoor` | 階数（3F等） | 「何階にあるか」表示（駅・モールで超有用） |
| `male` / `female` / `unisex` | 男女区分 | フィルター |
| `toilets:paper_supplied` | 紙の有無 | 詳細表示 |
| `description` / `operator` | 説明・運営者 | 個別ページの文章量増（SEO） |

### B. OSMの別アメニティ（トイレ以外への拡張）
- **`changing_table=yes` が付いた店舗・施設**（カフェ、百貨店、高速SA等）→「トイレ以外のおむつ替え場所」として新レイヤー
- **授乳室**: `amenity=nursing_room`（データ少なめだが存在）
- **`amenity=drinking_water`**（給水スポット）→ 夏の子連れ需要・季節特集と連動
- **`leisure=playground`**（公園遊具）→「トイレ×遊び場」のセット表示は子連れに刺さる
- **駅出入口の `wheelchair` タグ** → エレベーターのある出口案内

### C. 公共オープンデータ（要ライセンス確認だが有望）
1. **「赤ちゃんの駅」事業データ** — 全国多数の自治体が授乳・おむつ替え可能施設を登録・公開する制度（板橋区発祥）。自治体ごとにCSV/PDF公開。CC-BY系が多い。**授乳室データの本命**
2. **公共交通オープンデータセンター（ODPT）** — 鉄道各社の駅施設API。トイレ・多機能トイレ・ベビーシート・エレベーター位置を含む。開発者登録無料。**駅データの本命**
3. **自治体オープンデータカタログの公衆トイレCSV** — 未取り込みの自治体を拾う（現在は主要都市のみ。中核市クラスに多数あり）
4. **国交省「歩行空間ネットワークデータ」** — バリアフリー経路・段差情報。ルート機能実装時に活用
5. **東京都「だれでもトイレ」バリアフリー情報** — 都のオープンデータカタログ
6. **G空間情報センター** — 上記データの横断検索ポータル

### D. 見送り・注意
- **Google Places API**: 規約でデータ保存・再配布不可 → 不可
- **Check A Toilet等のNPO系DB**: ライセンス個別確認が必要
- **商業施設サイトのスクレイピング**: 規約リスク → 見送り
- ⚠️ **ODbLの継承条項**: OSMデータと他ソースを「混ぜて1つのDB」にすると全体がODbL継承になる。ソース別に別レイヤー（別JSONファイル・別マーカー）として保持し、出典を分離表示すること

### 実装順の推奨（データ編）
1. **A: OSMタグ拡張**（取得スクリプト修正のみ。`changing_table:location` と `level` が特に価値大）
2. **C-2: ODPT駅施設データ**（登録→API取得。スポットページ65駅と直結）
3. **C-1: 赤ちゃんの駅**（東京23区・政令市から順次。授乳室レイヤー新設）
4. **B: 遊び場・給水レイヤー**（季節特集と同時期に）

---

## 保留・見送り
- 写真掲載（ライセンスリスク）
- ネイティブアプリ化（PWAで十分）
- ユーザーアカウント機能（localStorage で足りている）
