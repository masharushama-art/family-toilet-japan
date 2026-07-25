// AdSense再審査対応の一時フラグ。詳細と復元手順は ROADMAP.md 参照。
// true: スポット/駅ページ・都市×カテゴリページに noindex,follow を適用しサイトマップから除外
// false に戻すだけで元のインデックス状態に復元される（ページ・データの削除は不要）
export const THIN_PAGES_NOINDEX = true;
