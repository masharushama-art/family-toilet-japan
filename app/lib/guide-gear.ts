import type { GearItem } from "../components/AffiliateBox";

// ガイドごとのAmazon商品。ASINはAmazon.co.jpで実在・在庫ありを確認済み（2026-10-03）。
// 推測で追加しないこと（存在しないASINはリンク切れになる）
export const GUIDE_GEAR: Record<string, { en?: GearItem[]; ja?: GearItem[] }> = {
  "traveling-japan-with-toddler-checklist": {
    ja: [
      { name: "ストッケ YOYO3 ベビーカー", asin: "B0BGLVWT63" },
      { name: "エルゴベビー OMNI Breeze 抱っこ紐", asin: "B093L84C7H" },
      { name: "Anker モバイルバッテリー 10,000mAh", asin: "B0CQX67KTW" },
      { name: "ジップロック フリーザーバッグ M", asin: "B0DYYMMBQD" },
    ],
  },
  "japan-train-travel-with-stroller": {
    en: [
      { name: "Universal Stroller Rain Cover", asin: "B0CK2BG7T2" },
      { name: "Stroller Hook (360° rotating)", asin: "B0F2F6DWJW" },
    ],
    ja: [
      { name: "ベビーカー レインカバー（A型・B型対応）", asin: "B0CK2BG7T2" },
      { name: "ベビーカー バギーフック", asin: "B0F2F6DWJW" },
    ],
  },
  "summer-festivals-with-kids-japan": {
    en: [
      { name: "RHYTHM Handheld Fan", asin: "B0DP97SFL3" },
      { name: "Kids Neck Cooler (Skater)", asin: "B0C5Q49NNW" },
      { name: "Large Waterproof Picnic Mat", asin: "B0963X85HJ" },
    ],
    ja: [
      { name: "リズム ハンディファン", asin: "B0DP97SFL3" },
      { name: "子供用ネッククーラー（スケーター）", asin: "B0C5Q49NNW" },
      { name: "大判 防水レジャーシート", asin: "B0963X85HJ" },
    ],
  },
  "tokyo-with-baby-winter": {
    en: [{ name: "Combi Stroller Footmuff", asin: "B00FB5V5BM" }],
    ja: [{ name: "コンビ マルチフィット フットマフ", asin: "B00FB5V5BM" }],
  },
  "japan-travel-with-baby": {
    en: [
      { name: "Disposable Diaper Changing Mats (50)", asin: "B09T36S3QY" },
      { name: "Universal Stroller Rain Cover", asin: "B0CK2BG7T2" },
    ],
    ja: [
      { name: "使い捨て おむつ替えシート 50枚", asin: "B09T36S3QY" },
      { name: "ベビーカー レインカバー（A型・B型対応）", asin: "B0CK2BG7T2" },
    ],
  },
  "japan-family-restaurants-guide": {
    en: [{ name: "Disposable Baby Meal Bibs (50)", asin: "B0CQQV4V8S" }],
    ja: [{ name: "使い捨て お食事エプロン 50枚", asin: "B0CQQV4V8S" }],
  },
  "cherry-blossoms-with-kids-japan": {
    en: [
      { name: "Large Waterproof Picnic Mat", asin: "B0963X85HJ" },
      { name: "Disposable Diaper Changing Mats (50)", asin: "B09T36S3QY" },
    ],
    ja: [
      { name: "大判 防水レジャーシート", asin: "B0963X85HJ" },
      { name: "使い捨て おむつ替えシート 50枚", asin: "B09T36S3QY" },
    ],
  },
  "autumn-foliage-with-kids-japan": {
    en: [
      { name: "Large Waterproof Picnic Mat", asin: "B0963X85HJ" },
      { name: "Disposable Diaper Changing Mats (50)", asin: "B09T36S3QY" },
    ],
    ja: [
      { name: "大判 防水レジャーシート", asin: "B0963X85HJ" },
      { name: "使い捨て おむつ替えシート 50枚", asin: "B09T36S3QY" },
    ],
  },
};
