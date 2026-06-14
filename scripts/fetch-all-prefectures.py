"""
全都道府県の公衆トイレ OSM データを一括取得し、
scripts/osm_raw/{slug}.json に保存するスクリプト。

既存ファイルがあればスキップする（差分取得）。

使い方:
  python scripts/fetch-all-prefectures.py
  python scripts/fetch-all-prefectures.py --force   # 全件再取得
"""

import json, time, sys, urllib.request, urllib.parse
from pathlib import Path

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OUT_DIR = Path(__file__).parent / "osm_raw"
OUT_DIR.mkdir(exist_ok=True)

FORCE = "--force" in sys.argv

# 既存都市はスキップ対象（既にデータあり）
EXISTING = {"tokyo", "osaka", "kyoto", "nagoya", "yokohama", "fukuoka", "nara", "chiba"}

# slug: (name_ja, lat_min, lat_max, lon_min, lon_max, center_lat, center_lon)
PREFECTURES = {
    # 北海道
    "sapporo":    ("札幌",    42.95, 43.20, 141.20, 141.55, 43.062, 141.354),
    # 東北
    "aomori":     ("青森",    40.70, 40.95, 140.60, 140.85, 40.824, 140.740),
    "iwate":      ("盛岡",    39.60, 39.85, 141.05, 141.30, 39.703, 141.154),
    "sendai":     ("仙台",    38.18, 38.42, 140.80, 141.10, 38.268, 140.869),
    "akita":      ("秋田",    39.68, 39.88, 140.02, 140.22, 39.718, 140.102),
    "yamagata":   ("山形",    38.22, 38.42, 140.28, 140.50, 38.240, 140.363),
    "fukushima":  ("福島",    37.68, 37.88, 140.36, 140.58, 37.750, 140.467),
    # 関東（既存以外）
    "saitama":    ("さいたま", 35.82, 36.05, 139.55, 139.75, 35.861, 139.645),
    "tochigi":    ("宇都宮",  36.48, 36.70, 139.82, 140.02, 36.566, 139.883),
    "gunma":      ("前橋",    36.35, 36.55, 139.00, 139.22, 36.391, 139.060),
    "ibaraki":    ("水戸",    36.30, 36.52, 140.37, 140.57, 36.341, 140.446),
    # 中部
    "niigata":    ("新潟",    37.82, 38.02, 138.90, 139.15, 37.902, 139.023),
    "toyama":     ("富山",    36.65, 36.85, 137.15, 137.38, 36.695, 137.211),
    "kanazawa":   ("金沢",    36.52, 36.72, 136.58, 136.80, 36.594, 136.625),
    "fukui":      ("福井",    36.00, 36.22, 136.15, 136.38, 36.065, 136.221),
    "yamanashi":  ("甲府",    35.58, 35.78, 138.48, 138.70, 35.664, 138.568),
    "nagano":     ("長野",    36.55, 36.75, 138.05, 138.30, 36.651, 138.181),
    "shizuoka":   ("静岡",    34.90, 35.12, 138.32, 138.55, 34.977, 138.383),
    "gifu":       ("岐阜",    35.35, 35.58, 136.65, 136.88, 35.423, 136.760),
    "mie":        ("三重",    34.67, 34.87, 136.42, 136.65, 34.730, 136.508),
    # 近畿（既存以外）
    "kobe":       ("神戸",    34.60, 34.80, 135.10, 135.32, 34.690, 135.195),
    "shiga":      ("大津",    34.95, 35.15, 135.80, 136.02, 35.004, 135.869),
    "wakayama":   ("和歌山",  34.15, 34.35, 135.12, 135.35, 34.226, 135.167),
    # 中国
    "hiroshima":  ("広島",    34.32, 34.52, 132.35, 132.58, 34.385, 132.455),
    "okayama":    ("岡山",    34.60, 34.80, 133.82, 134.05, 34.655, 133.919),
    "tottori":    ("鳥取",    35.42, 35.62, 134.12, 134.35, 35.501, 134.237),
    "shimane":    ("松江",    35.42, 35.62, 132.98, 133.22, 35.472, 133.050),
    "yamaguchi":  ("山口",    34.12, 34.32, 131.35, 131.60, 34.186, 131.470),
    # 四国
    "tokushima":  ("徳島",    34.02, 34.22, 134.45, 134.68, 34.066, 134.559),
    "kagawa":     ("高松",    34.27, 34.47, 133.98, 134.22, 34.340, 134.043),
    "ehime":      ("松山",    33.78, 33.98, 132.68, 132.90, 33.839, 132.765),
    "kochi":      ("高知",    33.50, 33.70, 133.45, 133.68, 33.559, 133.531),
    # 九州（既存以外）
    "saga":       ("佐賀",    33.22, 33.42, 130.23, 130.47, 33.249, 130.299),
    "nagasaki":   ("長崎",    32.68, 32.90, 129.82, 130.05, 32.745, 129.873),
    "kumamoto":   ("熊本",    32.72, 32.92, 130.60, 130.85, 32.803, 130.707),
    "oita":       ("大分",    33.18, 33.40, 131.50, 131.75, 33.238, 131.612),
    "miyazaki":   ("宮崎",    31.88, 32.10, 131.35, 131.60, 31.911, 131.423),
    "kagoshima":  ("鹿児島",  31.52, 31.72, 130.48, 130.72, 31.560, 130.558),
    # 沖縄
    "okinawa":    ("那覇",    26.15, 26.40, 127.62, 127.88, 26.212, 127.681),
}


def fetch_osm(slug, lat_min, lat_max, lon_min, lon_max):
    query = f"""
[out:json][timeout:60];
(
  node["amenity"="toilets"]({lat_min},{lon_min},{lat_max},{lon_max});
  way["amenity"="toilets"]({lat_min},{lon_min},{lat_max},{lon_max});
);
out center;
"""
    payload = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(OVERPASS_URL, data=payload, headers={
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "FamilyToiletJapan/1.0 (https://family-toilet-japan.vercel.app)",
    })
    with urllib.request.urlopen(req, timeout=90) as resp:
        return json.loads(resp.read())


def main():
    total_new = 0
    skipped = 0

    for slug, (name_ja, lat_min, lat_max, lon_min, lon_max, *_) in PREFECTURES.items():
        out_file = OUT_DIR / f"{slug}.json"

        if not FORCE and out_file.exists():
            data = json.load(open(out_file, encoding="utf-8"))
            n = len(data.get("elements", []))
            print(f"  [skip] {slug:12s} ({name_ja}) — {n} elements already cached")
            skipped += 1
            continue

        try:
            print(f"  fetch  {slug:12s} ({name_ja})...", end=" ", flush=True)
            data = fetch_osm(slug, lat_min, lat_max, lon_min, lon_max)
            n = len(data.get("elements", []))
            out_file.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"{n} elements")
            total_new += 1
            time.sleep(2)  # Overpass API レート制限
        except Exception as e:
            print(f"ERROR: {e}")
            time.sleep(5)

    print(f"\n完了: {total_new} 件取得, {skipped} 件スキップ")
    print(f"次のステップ: python scripts/merge-all-prefectures.py")


if __name__ == "__main__":
    main()
