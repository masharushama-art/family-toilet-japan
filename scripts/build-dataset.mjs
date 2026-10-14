// public/data/cities/*.json から、外部公開用のデータセット（CSV / GeoJSON / メタデータ）を dataset/ に出力する。
// 目的: GitHub・Zenodo・Kaggle・OSM wiki 等で引用・再利用してもらうための配布物（ROADMAP.md「流入増加策」案1）。
// 月次データ更新ワークフローからも実行し、PRにデータセットの更新を含める。
// 使い方: node scripts/build-dataset.mjs [--date YYYY-MM-DD]
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? [...acc, [a.slice(2), arr[i + 1]]] : acc), [])
);
const date = args.date ?? new Date().toISOString().slice(0, 10);
const DIR = "public/data/cities";
const OUT = "dataset";
const SITE = "https://familytoiletjapan.com";

// id の接頭辞から出典を判定する（osm-node-123 / osm-way-123 / opendata_tokyo_… / opendata_osaka_… / opendata_nagoya_…）
function sourceDetail(t) {
  if (t.id.startsWith("opendata_tokyo_")) return "opendata_tokyo";
  if (t.id.startsWith("opendata_osaka_")) return "opendata_osaka";
  if (t.id.startsWith("opendata_nagoya_")) return "opendata_nagoya";
  if (t.id.startsWith("osm-")) return "osm";
  return t.source === "opendata" ? "opendata_other" : "osm";
}

const LICENSE = { osm: "ODbL-1.0", opendata_tokyo: "CC-BY-4.0", opendata_osaka: "CC-BY-4.0", opendata_nagoya: "CC-BY-4.0" };

function tri(v) {
  return v === true ? "true" : v === false ? "false" : "";
}

function csvCell(v) {
  if (v === undefined || v === null) return "";
  const s = String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const rows = [];
for (const f of fs.readdirSync(DIR).filter((x) => x.endsWith(".json")).sort()) {
  const list = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf-8"));
  for (const t of list) {
    const sd = sourceDetail(t);
    rows.push({
      id: t.id,
      source: sd,
      license: LICENSE[sd] ?? "",
      city: t.city,
      ward: t.ward ?? "",
      name: t.name ?? "",
      name_en: t.nameEn ?? "",
      lat: t.lat,
      lon: t.lon,
      changing_table: tri(t.changingTable),
      changing_table_location: t.changingTableLocation ?? "",
      wheelchair: tri(t.wheelchair),
      fee: tri(t.fee),
      opening_hours: t.openingHours ?? "",
      level: t.level ?? "",
      operator: t.operator ?? "",
      address: t.address ?? "",
      location_approximate: t.geocoded ? "true" : "",
      page_url: t.changingTable ? `${SITE}/toilet/${t.city}/${encodeURIComponent(t.id)}` : "",
    });
  }
}
rows.sort((a, b) => (a.city === b.city ? (a.id < b.id ? -1 : 1) : a.city < b.city ? -1 : 1));

fs.mkdirSync(OUT, { recursive: true });

const cols = Object.keys(rows[0]);
const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n") + "\n";
fs.writeFileSync(path.join(OUT, "japan-family-toilets.csv"), csv);

const geojson = {
  type: "FeatureCollection",
  name: "japan-family-toilets",
  features: rows.map((r) => {
    const { lat, lon, ...props } = r;
    const p = {};
    for (const [k, v] of Object.entries(props)) {
      if (v === "") continue;
      p[k] = v === "true" ? true : v === "false" ? false : v;
    }
    return { type: "Feature", geometry: { type: "Point", coordinates: [lon, lat] }, properties: p };
  }),
};
fs.writeFileSync(path.join(OUT, "japan-family-toilets.geojson"), JSON.stringify(geojson) + "\n");

const count = (pred) => rows.filter(pred).length;
const stats = {
  generated: date,
  total: rows.length,
  cities: new Set(rows.map((r) => r.city)).size,
  changing_table_true: count((r) => r.changing_table === "true"),
  wheelchair_true: count((r) => r.wheelchair === "true"),
  free_true: count((r) => r.fee === "false"),
  by_source: Object.fromEntries(
    Object.entries(
      rows.reduce((acc, r) => ({ ...acc, [r.source]: (acc[r.source] ?? 0) + 1 }), {})
    ).sort()
  ),
};
fs.writeFileSync(path.join(OUT, "stats.json"), JSON.stringify(stats, null, 2) + "\n");
console.log(stats);
