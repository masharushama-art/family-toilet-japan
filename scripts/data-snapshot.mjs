// public/data/cities/*.json の集計値を app/lib/data-history.json に日付単位で追記（同日は上書き）する。
// データレポート（/coverage）の「更新履歴」の元データ。月次データ更新ワークフローから実行する。
// 使い方: node scripts/data-snapshot.mjs [--date YYYY-MM-DD] [--ref <git ref>]
//   --ref を付けると作業ツリーではなく指定コミット時点のデータを集計する（過去分の埋め戻し用）
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => (a.startsWith("--") ? [...acc, [a.slice(2), arr[i + 1]]] : acc), [])
);
const date = args.date ?? new Date().toISOString().slice(0, 10);
const ref = args.ref;
const DIR = "public/data/cities";
const OUT = "app/lib/data-history.json";

function listFiles() {
  if (!ref) return fs.readdirSync(DIR).filter((f) => f.endsWith(".json"));
  return execFileSync("git", ["ls-tree", "--name-only", `${ref}:${DIR}`]).toString().trim().split("\n").filter((f) => f.endsWith(".json"));
}

function readFile(name) {
  const raw = ref
    ? execFileSync("git", ["show", `${ref}:${DIR}/${name}`], { maxBuffer: 1e9 }).toString()
    : fs.readFileSync(path.join(DIR, name), "utf-8");
  return JSON.parse(raw);
}

const cities = {};
const total = { total: 0, changingTable: 0, wheelchair: 0, osm: 0, opendata: 0 };
for (const file of listFiles()) {
  const slug = file.replace(/\.json$/, "");
  const c = { total: 0, changingTable: 0, wheelchair: 0, osm: 0, opendata: 0 };
  for (const t of readFile(file)) {
    c.total++;
    if (t.changingTable === true) c.changingTable++;
    if (t.wheelchair === true) c.wheelchair++;
    if (String(t.id).startsWith("opendata")) c.opendata++;
    else c.osm++;
  }
  cities[slug] = c;
  for (const k of Object.keys(total)) total[k] += c[k];
}

const history = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf-8")) : [];
const next = [...history.filter((s) => s.date !== date), { date, ...total, cities }].sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(`snapshot ${date}${ref ? ` (ref ${ref})` : ""}: ${total.total} toilets, ${total.changingTable} changing tables`);
