// 東京都特別区のオープンデータ由来トイレID（opendata_tokyo_<区名>_<lat>_<lon>）に
// 使う区名→ローマ字マッピング。
//
// 背景: このIDに生の日本語区名を含めていたところ、OpenNext(Cloudflare)のルーティング層が
// リクエストパスをURLデコードせずにprerender-manifestのキー（デコード済みUnicode文字列）と
// 比較しているため、非ASCII文字を含む動的ルートが常に404になる不具合があった
// （node_modules/@opennextjs/aws の handleFallbackFalse）。ASCII化したIDに切り替えることで
// この不具合を回避する。
//
// scripts/merge-tokyo-wards.py の WARD_ROMAJI と内容を同期させること。
export const TOKYO_WARD_ROMAJI: Record<string, string> = {
  "千代田区": "chiyoda",
  "中央区": "chuo",
  "新宿区": "shinjuku",
  "台東区": "taito",
  "墨田区": "sumida",
  "江東区": "koto",
  "品川区": "shinagawa",
  "目黒区": "meguro",
  "中野区": "nakano",
  "杉並区": "suginami",
  "荒川区": "arakawa",
  "板橋区": "itabashi",
  "練馬区": "nerima",
  "葛飾区": "katsushika",
  "江戸川区": "edogawa",
};

const ROMAJI_TO_TOKYO_WARD: Record<string, string> = Object.fromEntries(
  Object.entries(TOKYO_WARD_ROMAJI).map(([ward, romaji]) => [romaji, ward])
);

// opendata_tokyo_<区名>_<lat>_<lon> 形式。区名部分だけが日本語⇔ローマ字で入れ替わる。
const OPENDATA_TOKYO_ID_RE = /^opendata_tokyo_([^_]+)_(-?\d+\.\d+)_(-?\d+\.\d+)$/;

/**
 * 旧ID（区名が生の日本語、例: opendata_tokyo_江東区_35.640480_139.779290）を
 * 新ID（区名がローマ字、例: opendata_tokyo_koto_35.640480_139.779290）に変換する。
 * 対象外のID（他都市・OSM由来・既に変換済み等）はそのまま返す。
 */
export function toAsciiToiletId(id: string): string {
  const m = id.match(OPENDATA_TOKYO_ID_RE);
  if (!m) return id;
  const romaji = TOKYO_WARD_ROMAJI[m[1]];
  if (!romaji) return id;
  return `opendata_tokyo_${romaji}_${m[2]}_${m[3]}`;
}

/**
 * 新ID（区名がローマ字）を旧ID（区名が生の日本語）に変換する。
 * next.config.ts のリダイレクト表生成に使用。対象外のIDはそのまま返す。
 */
export function toLegacyToiletId(id: string): string {
  const m = id.match(OPENDATA_TOKYO_ID_RE);
  if (!m) return id;
  const ward = ROMAJI_TO_TOKYO_WARD[m[1]];
  if (!ward) return id;
  return `opendata_tokyo_${ward}_${m[2]}_${m[3]}`;
}
