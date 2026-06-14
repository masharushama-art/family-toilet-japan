"""
横浜市の公衆トイレデータを統合するスクリプト。

手順:
  1. python scripts/fetch-yokohama-osm.py   ← OSM取得
  2. python scripts/merge-yokohama.py        ← OSM + 横浜市CSV を統合

横浜市オープンデータ CSV:
  https://www.city.yokohama.lg.jp/city-info/koho-kyoiku/koho/topics/opendata/data/kenkou/koukyou-toire.html
  または横浜市オープンデータポータル:
  https://data.city.yokohama.lg.jp/

自治体標準13列準拠か確認してから --csv に渡す。
"""

import json
import math
import os
import sys
import importlib.util
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "public" / "data" / "toilets.json"
OSM_RAW = Path(__file__).parent / "yokohama_osm_raw.json"

# merge-opendata.py を import
_spec = importlib.util.spec_from_file_location(
    "merge_opendata", Path(__file__).parent / "merge-opendata.py"
)
mo = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mo)

RADIUS_M = 50
YOKOHAMA_BBOX = (35.30, 35.60, 139.48, 139.75)  # (lat_min, lat_max, lon_min, lon_max)


def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    φ1, φ2 = math.radians(lat1), math.radians(lat2)
    dφ = math.radians(lat2 - lat1)
    dλ = math.radians(lon2 - lon1)
    a = math.sin(dφ / 2) ** 2 + math.cos(φ1) * math.cos(φ2) * math.sin(dλ / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def load_osm():
    data = json.load(open(OSM_RAW, encoding="utf-8"))
    out = []
    lat_min, lat_max, lon_min, lon_max = YOKOHAMA_BBOX
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
            "city": "yokohama",
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

    # CSVのURLをコマンドライン引数から取得（省略可）
    csv_url = None
    for arg in sys.argv[1:]:
        if arg.startswith("http") or arg.endswith(".csv"):
            csv_url = arg
            break

    if not OSM_RAW.exists():
        print("ERROR: yokohama_osm_raw.json が見つかりません。")
        print("  先に: python scripts/fetch-yokohama-osm.py を実行してください。")
        sys.exit(1)

    osm = load_osm()
    print(f"OSM yokohama: {len(osm)} records")

    toilets = json.load(open(DATA_FILE, encoding="utf-8"))

    # 横浜が既に存在する場合は除去して再統合
    existing_yoko = [t for t in toilets if t.get("city") == "yokohama"]
    if existing_yoko:
        print(f"既存の横浜レコード {len(existing_yoko)} 件を除去して再統合します")
        toilets = [t for t in toilets if t.get("city") != "yokohama"]

    # OSM データを追加
    toilets.extend(osm)
    print(f"OSM {len(osm)} 件を追加")

    # 自治体CSV があれば merge
    if csv_url:
        print(f"\nCSV統合: {csv_url}")
        rows = mo.fetch_csv(csv_url)
        lat_min, lat_max, lon_min, lon_max = YOKOHAMA_BBOX
        newcomers = []
        for row in rows:
            rec = mo.normalize_row(row, "yokohama")
            if rec is None:
                continue
            if not (lat_min <= rec["lat"] <= lat_max and lon_min <= rec["lon"] <= lon_max):
                continue
            newcomers.append(rec)
        print(f"CSV有効件数: {len(newcomers)}")

        result = mo.merge(toilets, newcomers, RADIUS_M)
        print(f"  名寄せ: {result['matched']}件  補完: {result['enriched']}件  新規: {result['added']}件")
    else:
        print("\nCSV URL が指定されていません。OSMデータのみ統合します。")
        print("CSV を統合する場合: python scripts/merge-yokohama.py <CSV_URL>")

    yoko = [t for t in toilets if t.get("city") == "yokohama"]
    baby = sum(1 for t in yoko if t.get("changingTable"))
    wc = sum(1 for t in yoko if t.get("wheelchair"))
    print(f"\n=== 横浜サマリ ===")
    print(f"  総件数          : {len(yoko)}")
    print(f"  乳幼児設備あり  : {baby}")
    print(f"  車椅子対応      : {wc}")
    print(f"\n=== 全体 ===")
    from collections import Counter
    c = Counter(t.get("city") for t in toilets)
    for city, n in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {city:12s}: {n:,}")
    print(f"  {'TOTAL':12s}: {sum(c.values()):,}")

    if not dry:
        mo.save_toilets(toilets)


if __name__ == "__main__":
    main()
