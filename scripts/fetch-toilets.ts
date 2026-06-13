/**
 * Overpass APIから東京・大阪・京都のトイレデータを取得してJSONに保存するスクリプト
 * 実行: npx ts-node scripts/fetch-toilets.ts
 */

import * as fs from "fs";
import * as path from "path";

interface OverpassElement {
  type: "node" | "way" | "relation";
  id: number;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassElement[];
}

export interface Toilet {
  id: string;
  lat: number;
  lon: number;
  name?: string;
  operator?: string;
  changingTable: boolean;
  wheelchair: boolean;
  openingHours?: string;
  fee: boolean;
  city: string;
  source: "osm";
}

// ホワイトリスト：表示対象の運営者・施設種別
const WHITELIST_OPERATORS = [
  "公園", "park", "駅", "station", "道の駅", "michi-no-eki",
  "セブン", "7-eleven", "seven", "ローソン", "lawson",
  "ファミリーマート", "familymart", "family mart",
  "ショッピング", "shopping", "mall", "百貨店", "department",
  "博物館", "museum", "美術館", "図書館", "library",
  "病院", "hospital", "クリニック", "clinic",
  "観光", "tourist", "公共", "public", "municipal",
  "東京都", "大阪府", "京都府", "区", "市",
];

// ブラックリスト：除外対象
const BLACKLIST_OPERATORS = [
  "パチンコ", "pachinko", "スロット", "カラオケ", "karaoke",
  "バー", "bar", "スナック", "snack", "ナイトクラブ", "nightclub",
  "キャバクラ", "風俗",
];

const BLACKLIST_AMENITIES = [
  "bar", "nightclub", "pub", "casino", "stripclub",
  "amusement_arcade", "gambling",
];

function isWhitelisted(element: OverpassElement): boolean {
  const tags = element.tags || {};

  // ブラックリストチェック
  if (BLACKLIST_AMENITIES.includes(tags.amenity || "")) return false;
  if (tags.leisure === "amusement_arcade") return false;

  const operator = (tags.operator || tags.name || "").toLowerCase();
  if (BLACKLIST_OPERATORS.some((b) => operator.includes(b.toLowerCase()))) {
    return false;
  }

  // access=privateは除外
  if (tags.access === "private") return false;

  return true;
}

function buildQuery(city: string, bbox: string): string {
  return `
[out:json][timeout:60];
(
  node["amenity"="toilets"](${bbox});
  way["amenity"="toilets"](${bbox});
);
out center tags;
`.trim();
}

const CITIES: Record<string, { bbox: string }> = {
  tokyo: { bbox: "35.5, 139.4, 35.9, 139.9" },
  osaka: { bbox: "34.5, 135.3, 34.8, 135.7" },
  kyoto: { bbox: "34.9, 135.6, 35.1, 135.9" },
};

async function fetchCity(cityName: string, bbox: string): Promise<Toilet[]> {
  const query = buildQuery(cityName, bbox);
  const url = "https://overpass-api.de/api/interpreter";

  console.log(`Fetching ${cityName}...`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });

  if (!res.ok) {
    throw new Error(`Overpass API error: ${res.status} ${res.statusText}`);
  }

  const data: OverpassResponse = await res.json();
  console.log(`  Raw results: ${data.elements.length}`);

  const toilets: Toilet[] = [];

  for (const el of data.elements) {
    if (!isWhitelisted(el)) continue;

    const lat = el.lat ?? el.center?.lat;
    const lon = el.lon ?? el.center?.lon;
    if (!lat || !lon) continue;

    const tags = el.tags || {};

    toilets.push({
      id: `osm-${el.type}-${el.id}`,
      lat,
      lon,
      name: tags.name || tags["name:en"] || undefined,
      operator: tags.operator || undefined,
      changingTable:
        tags.changing_table === "yes" || tags["toilets:changing_table"] === "yes",
      wheelchair: tags.wheelchair === "yes",
      openingHours: tags.opening_hours || undefined,
      fee: tags.fee === "yes",
      city: cityName,
      source: "osm",
    });
  }

  console.log(`  After filter: ${toilets.length}`);
  return toilets;
}

async function main() {
  const allToilets: Toilet[] = [];

  for (const [cityName, { bbox }] of Object.entries(CITIES)) {
    try {
      const toilets = await fetchCity(cityName, bbox);
      allToilets.push(...toilets);
      // Overpass APIへの負荷を避けるため1秒待機
      await new Promise((r) => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error fetching ${cityName}:`, err);
    }
  }

  const outDir = path.join(process.cwd(), "public", "data");
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, "toilets.json");
  fs.writeFileSync(outPath, JSON.stringify(allToilets, null, 2), "utf-8");

  console.log(`\nTotal: ${allToilets.length} toilets saved to ${outPath}`);

  // 都市別サマリー
  for (const city of Object.keys(CITIES)) {
    const count = allToilets.filter((t) => t.city === city).length;
    const withChanging = allToilets.filter(
      (t) => t.city === city && t.changingTable
    ).length;
    console.log(`  ${city}: ${count} total, ${withChanging} with changing table`);
  }
}

main().catch(console.error);
