"""
全都道府県の OSM データを toilets.json および cities/{slug}.json に統合。

使い方:
  python scripts/merge-all-prefectures.py
"""

import json, importlib.util
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "public" / "data" / "toilets.json"
CITIES_DIR = ROOT / "public" / "data" / "cities"
OSM_RAW_DIR = Path(__file__).parent / "osm_raw"

_spec = importlib.util.spec_from_file_location("merge_opendata", Path(__file__).parent / "merge-opendata.py")
mo = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(mo)

# fetch-all-prefectures.py と同じ定義
PREFECTURES = {
    "sapporo":   ("札幌",    42.95, 43.20, 141.20, 141.55, 43.062, 141.354),
    "aomori":    ("青森",    40.70, 40.95, 140.60, 140.85, 40.824, 140.740),
    "iwate":     ("盛岡",    39.60, 39.85, 141.05, 141.30, 39.703, 141.154),
    "sendai":    ("仙台",    38.18, 38.42, 140.80, 141.10, 38.268, 140.869),
    "akita":     ("秋田",    39.68, 39.88, 140.02, 140.22, 39.718, 140.102),
    "yamagata":  ("山形",    38.22, 38.42, 140.28, 140.50, 38.240, 140.363),
    "fukushima": ("福島",    37.68, 37.88, 140.36, 140.58, 37.750, 140.467),
    "saitama":   ("さいたま", 35.82, 36.05, 139.55, 139.75, 35.861, 139.645),
    "tochigi":   ("宇都宮",  36.48, 36.70, 139.82, 140.02, 36.566, 139.883),
    "gunma":     ("前橋",    36.35, 36.55, 139.00, 139.22, 36.391, 139.060),
    "ibaraki":   ("水戸",    36.30, 36.52, 140.37, 140.57, 36.341, 140.446),
    "niigata":   ("新潟",    37.82, 38.02, 138.90, 139.15, 37.902, 139.023),
    "toyama":    ("富山",    36.65, 36.85, 137.15, 137.38, 36.695, 137.211),
    "kanazawa":  ("金沢",    36.52, 36.72, 136.58, 136.80, 36.594, 136.625),
    "fukui":     ("福井",    36.00, 36.22, 136.15, 136.38, 36.065, 136.221),
    "yamanashi": ("甲府",    35.58, 35.78, 138.48, 138.70, 35.664, 138.568),
    "nagano":    ("長野",    36.55, 36.75, 138.05, 138.30, 36.651, 138.181),
    "shizuoka":  ("静岡",    34.90, 35.12, 138.32, 138.55, 34.977, 138.383),
    "gifu":      ("岐阜",    35.35, 35.58, 136.65, 136.88, 35.423, 136.760),
    "mie":       ("三重",    34.67, 34.87, 136.42, 136.65, 34.730, 136.508),
    "kobe":      ("神戸",    34.60, 34.80, 135.10, 135.32, 34.690, 135.195),
    "shiga":     ("大津",    34.95, 35.15, 135.80, 136.02, 35.004, 135.869),
    "wakayama":  ("和歌山",  34.15, 34.35, 135.12, 135.35, 34.226, 135.167),
    "hiroshima": ("広島",    34.32, 34.52, 132.35, 132.58, 34.385, 132.455),
    "okayama":   ("岡山",    34.60, 34.80, 133.82, 134.05, 34.655, 133.919),
    "tottori":   ("鳥取",    35.42, 35.62, 134.12, 134.35, 35.501, 134.237),
    "shimane":   ("松江",    35.42, 35.62, 132.98, 133.22, 35.472, 133.050),
    "yamaguchi": ("山口",    34.12, 34.32, 131.35, 131.60, 34.186, 131.470),
    "tokushima": ("徳島",    34.02, 34.22, 134.45, 134.68, 34.066, 134.559),
    "kagawa":    ("高松",    34.27, 34.47, 133.98, 134.22, 34.340, 134.043),
    "ehime":     ("松山",    33.78, 33.98, 132.68, 132.90, 33.839, 132.765),
    "kochi":     ("高知",    33.50, 33.70, 133.45, 133.68, 33.559, 133.531),
    "saga":      ("佐賀",    33.22, 33.42, 130.23, 130.47, 33.249, 130.299),
    "nagasaki":  ("長崎",    32.68, 32.90, 129.82, 130.05, 32.745, 129.873),
    "kumamoto":  ("熊本",    32.72, 32.92, 130.60, 130.85, 32.803, 130.707),
    "oita":      ("大分",    33.18, 33.40, 131.50, 131.75, 33.238, 131.612),
    "miyazaki":  ("宮崎",    31.88, 32.10, 131.35, 131.60, 31.911, 131.423),
    "kagoshima": ("鹿児島",  31.52, 31.72, 130.48, 130.72, 31.560, 130.558),
    "okinawa":   ("那覇",    26.15, 26.40, 127.62, 127.88, 26.212, 127.681),
}


def osm_to_records(raw_file, slug, lat_min, lat_max, lon_min, lon_max):
    data = json.load(open(raw_file, encoding="utf-8"))
    out = []
    for e in data["elements"]:
        lat, lon = (e.get("lat"), e.get("lon")) if e["type"] == "node" else (e.get("center",{}).get("lat"), e.get("center",{}).get("lon"))
        if lat is None or not (lat_min <= lat <= lat_max and lon_min <= lon <= lon_max):
            continue
        tg = e.get("tags", {})
        rec = {
            "id": f"osm-{e['type']}-{e['id']}",
            "lat": round(lat, 6), "lon": round(lon, 6),
            "city": slug, "source": "osm",
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
    CITIES_DIR.mkdir(exist_ok=True)
    toilets = json.load(open(DATA_FILE, encoding="utf-8"))

    total_added = 0
    results = []

    for slug, (name_ja, lat_min, lat_max, lon_min, lon_max, *_) in PREFECTURES.items():
        raw_file = OSM_RAW_DIR / f"{slug}.json"
        if not raw_file.exists():
            print(f"  [missing] {slug} — {raw_file} が見つかりません。fetch-all-prefectures.py を先に実行してください。")
            continue

        # 既存を除去して再統合
        toilets = [t for t in toilets if t.get("city") != slug]
        records = osm_to_records(raw_file, slug, lat_min, lat_max, lon_min, lon_max)
        toilets.extend(records)

        # cities/{slug}.json を更新
        city_file = CITIES_DIR / f"{slug}.json"
        city_file.write_text(json.dumps(records, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        size_kb = city_file.stat().st_size / 1024

        total_added += len(records)
        results.append((slug, name_ja, len(records), size_kb))
        print(f"  {slug:12s} ({name_ja:6s}): {len(records):4d} records  {size_kb:.0f}KB")

    print(f"\n=== 統合結果 ===")
    print(f"新規都市: {len(results)} 都市  追加件数: {total_added:,}")

    c = Counter(t.get("city") for t in toilets)
    print(f"\n=== 全体 ===")
    for city, n in sorted(c.items(), key=lambda x: -x[1]):
        print(f"  {city:12s}: {n:,}")
    print(f"  {'TOTAL':12s}: {sum(c.values()):,}")

    mo.save_toilets(toilets)

    # 既存都市の cities/ ファイルも念のため更新
    print("\n既存都市の cities/ ファイルは変更なし（既に最新）")


if __name__ == "__main__":
    main()
