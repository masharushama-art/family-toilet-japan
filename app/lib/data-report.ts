import fs from "fs";
import path from "path";
import type { Toilet } from "../types/toilet";
import historyJson from "./data-history.json";

export interface CountSet {
  total: number;
  changingTable: number;
  wheelchair: number;
  osm: number;
  opendata: number;
}

export interface Snapshot extends CountSet {
  date: string;
  cities: Record<string, CountSet>;
}

export interface CityRow extends CountSet {
  slug: string;
  named: number;
}

export interface DataReport {
  rows: CityRow[];
  totals: CountSet & { named: number; openingHours: number };
  history: Snapshot[];
  latest: Snapshot;
  previous: Snapshot | undefined;
}

// 集計値は data-history.json（月次ワークフローで追記）と同じ定義。現在値だけは実データから直接数え、
// 名称・営業時間のように履歴に持たない項目もここで集計する
export function getDataReport(): DataReport {
  const dir = path.join(process.cwd(), "public", "data", "cities");
  let openingHours = 0;
  const rows: CityRow[] = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const toilets = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as Toilet[];
      const row: CityRow = { slug: file.replace(/\.json$/, ""), total: 0, changingTable: 0, wheelchair: 0, osm: 0, opendata: 0, named: 0 };
      for (const t of toilets) {
        row.total++;
        if (t.changingTable === true) row.changingTable++;
        if (t.wheelchair === true) row.wheelchair++;
        if (t.id.startsWith("opendata")) row.opendata++;
        else row.osm++;
        if (t.name || t.nameEn) row.named++;
        if (t.openingHours) openingHours++;
      }
      return row;
    })
    .sort((a, b) => b.total - a.total);

  const totals = rows.reduce(
    (acc, r) => ({
      total: acc.total + r.total,
      changingTable: acc.changingTable + r.changingTable,
      wheelchair: acc.wheelchair + r.wheelchair,
      osm: acc.osm + r.osm,
      opendata: acc.opendata + r.opendata,
      named: acc.named + r.named,
      openingHours,
    }),
    { total: 0, changingTable: 0, wheelchair: 0, osm: 0, opendata: 0, named: 0, openingHours }
  );

  const history = historyJson as Snapshot[];
  return { rows, totals, history, latest: history[history.length - 1], previous: history[history.length - 2] };
}
