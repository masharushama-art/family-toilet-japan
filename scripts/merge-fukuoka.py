"""
福岡市の公衆トイレデータを統合するスクリプト。

手順:
  1. python scripts/fetch-fukuoka-osm.py   ← OSM取得（完了済み）
  2. python scripts/merge-fukuoka.py        ← 統合

CSV があれば: python scripts/merge-fukuoka.py <CSV_URL>
"""

import json
import math
import sys
import importlib.util
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "public" / "data" / "toilets.json"
OSM_RAW = Path(__file__).parent / "fukuoka_osm_raw.json"

_spec = importlib.util.spec_from_file_location(
    "merge_opendata", Path(__file__).parent / "merge-opendata.py"
)
mo = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mo)

RADIUS_M = 50
BBOX = (33.50, 33.70, 130.31, 130.50)


def load_osm():
    data = json.load(open(OSM_RAW, encoding="utf-8"))
    lat_min, lat_max, lon_min, lon_max = BBOX
    out = []
    for e in data["elements"]:
        if e["type"] == "node":
            lat, lon = e.get("lat"), e.get("lon")
        else:
            c = e.get("center", {}); lat, lon = c.get("lat"), c.get("lon")
        if lat is None or lon is None:
            continue
        if not (lat_min <= lat <= lat_max and lon_min <= lon <= lon_max):
            continue
        tg = e.get("tags", {})
        rec = {
            "id": f"osm-{e['type']}-{e['id']}",
            "lat": round(lat, 6),
            "lon": round(lon, 6),
            "city": "fukuoka",
            "source": "osm",
            "changingTable": tg.get("changing_table") == "yes",
            "wheelchair": tg.get("wheelchair") == "yes",
            "fee": tg.get("fee") == "yes",
        }
        if tg.get("name"): rec["name"] = tg["name"]
        if tg.get("name:en"): rec["nameEn"] = tg["name:en"]
        if tg.get("opening_hours"): rec["openingHours"] = tg["opening_hours"]
        out.append(rec)
    return out


def main():
    dry = "--dry-run" in sys.argv
    csv_url = next((a for a in sys.argv[1:] if a.startswith("http") or a.endswith(".csv")), None)

    if not OSM_RAW.exists():
        print("ERROR: fukuoka_osm_raw.json が見つかりません。")
        print("  先に: python scripts/fetch-fukuoka-osm.py を実行してください。")
        sys.exit(1)

    osm = load_osm()
    print(f"OSM fukuoka: {len(osm)} records")

    toilets = json.load(open(DATA_FILE, encoding="utf-8"))

    existing = [t for t in toilets if t.get("city") == "fukuoka"]
    if existing:
        print(f"既存の福岡レコード {len(existing)} 件を除去して再統合します")
        toilets = [t for t in toilets if t.get("city") != "fukuoka"]

    toilets.extend(osm)

    if csv_url:
        print(f"\nCSV統合: {csv_url}")
        lat_min, lat_max, lon_min, lon_max = BBOX
        rows = mo.fetch_csv(csv_url)
        newcomers = []
        for row in rows:
            rec = mo.normalize_row(row, "fukuoka")
            if rec is None:
                continue
            if not (lat_min <= rec["lat"] <= lat_max and lon_min <= rec["lon"] <= lon_max):
                continue
            newcomers.append(rec)
        print(f"CSV有効件数: {len(newcomers)}")
        result = mo.merge(toilets, newcomers, RADIUS_M)
        print(f"  名寄せ: {result['matched']}件  補完: {result['enriched']}件  新規: {result['added']}件")
    else:
        print("CSV URL が指定されていません。OSMデータのみ統合します。")

    fuk = [t for t in toilets if t.get("city") == "fukuoka"]
    print(f"\n=== 福岡サマリ ===")
    print(f"  総件数          : {len(fuk)}")
    print(f"  乳幼児設備あり  : {sum(1 for t in fuk if t.get('changingTable'))}")
    print(f"  車椅子対応      : {sum(1 for t in fuk if t.get('wheelchair'))}")

    from collections import Counter
    c = Counter(t.get("city") for t in toilets)
    print(f"\n=== 全体 ===")
    for city, n in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {city:12s}: {n:,}")
    print(f"  {'TOTAL':12s}: {sum(c.values()):,}")

    if not dry:
        mo.save_toilets(toilets)


if __name__ == "__main__":
    main()
