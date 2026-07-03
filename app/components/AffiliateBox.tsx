// アフィリエイト導線（楽天トラベル/じゃらん/Klook/Amazon）
// 実際のアフィリエイトID取得後、環境変数を設定すると自動で有効化される。
// 未設定の間は何も表示しない（審査中の広告と同じ「承認後にON」方式）。

const RAKUTEN_AFFILIATE_ID = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID;
const KLOOK_AFFILIATE_ID = process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID;
const AMAZON_ASSOCIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

export type AffiliateLang = "en" | "ja" | "zh" | "ko";

const LABELS: Record<AffiliateLang, { hotel: string; activity: string; gear: string; pr: string }> = {
  en: { hotel: "🏨 Family-friendly hotels", activity: "🎫 Book tickets & tours", gear: "🎒 Recommended gear", pr: "Advertisement — we may earn a commission" },
  ja: { hotel: "🏨 子連れ歓迎ホテルを探す", activity: "🎫 チケット・ツアー予約", gear: "🎒 おすすめグッズ", pr: "広告 — 購入いただくと当サイトに手数料が入ります" },
  zh: { hotel: "🏨 尋找親子友善飯店", activity: "🎫 預訂票券・行程", gear: "🎒 推薦用品", pr: "廣告 — 透過連結購買我們可能會獲得佣金" },
  ko: { hotel: "🏨 아이와 가기 좋은 호텔 찾기", activity: "🎫 티켓・투어 예약", gear: "🎒 추천 용품", pr: "광고 — 링크로 구매 시 수수료를 받을 수 있습니다" },
};

/** 都市名（楽天トラベル/じゃらんの検索クエリ用） */
export function HotelAffiliateBox({ cityNameJa, lang }: { cityNameJa: string; lang: AffiliateLang }) {
  if (!RAKUTEN_AFFILIATE_ID || !cityNameJa) return null;
  const t = LABELS[lang];
  const rakutenUrl = `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_AFFILIATE_ID}/?pc=https%3A%2F%2Ftravel.rakuten.co.jp%2Fdsearch%2F%3Ff_keyword%3D${encodeURIComponent(cityNameJa)}`;
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 my-4">
      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2">{t.hotel}</p>
      <a
        href={rakutenUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        楽天トラベルで見る →
      </a>
      <p className="text-[10px] text-gray-400 mt-2">{t.pr}</p>
    </div>
  );
}

/** Klook: activityId未指定ならカテゴリ検索リンク */
export function ActivityAffiliateBox({ query, lang }: { query: string; lang: AffiliateLang }) {
  if (!KLOOK_AFFILIATE_ID) return null;
  const t = LABELS[lang];
  const klookUrl = `https://www.klook.com/search/?query=${encodeURIComponent(query)}&aid=${KLOOK_AFFILIATE_ID}`;
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 my-4">
      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2">{t.activity}</p>
      <a
        href={klookUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        Klook →
      </a>
      <p className="text-[10px] text-gray-400 mt-2">{t.pr}</p>
    </div>
  );
}

export interface GearItem {
  name: string;
  asin: string; // Amazon商品ID
}

/** Amazon: 持ち物チェックリスト等での商品リンク */
export function GearAffiliateBox({ items, lang }: { items: GearItem[]; lang: AffiliateLang }) {
  if (!AMAZON_ASSOCIATE_TAG || items.length === 0) return null;
  const t = LABELS[lang];
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-xl p-4 my-4">
      <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm mb-2">{t.gear}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.asin}
            href={`https://www.amazon.co.jp/dp/${item.asin}?tag=${AMAZON_ASSOCIATE_TAG}`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs bg-gray-50 dark:bg-gray-800/40 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full transition-colors"
          >
            {item.name}
          </a>
        ))}
      </div>
      <p className="text-[10px] text-gray-400 mt-2">{t.pr}</p>
    </div>
  );
}
