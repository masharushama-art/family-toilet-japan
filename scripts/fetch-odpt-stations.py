"""
ODPT（公共交通オープンデータセンター）から東京メトロ・都営地下鉄の駅データを取得し、
Spot型のJSON（app/lib/stations-odpt.json）を生成する。

- 座標が入っているのは TokyoMetro と Toei のみ（JR・私鉄各社は駅名のみで使用不可）
- 同名駅（複数路線・複数事業者）は1駅に統合し座標を平均
- 駅名6言語のうち en/ja/ko/zh-Hant を Spot.names に対応づける
- 座標から最寄り都市（tokyo/saitama/chiba/yokohama）を割当

使い方:
  ODPT_TOKEN=xxxx python scripts/fetch-odpt-stations.py

トークンは developer.odpt.org のマイページ（editkeys）で確認できる。
※トークンはコミットしないこと（環境変数で渡す）。
"""

import json
import os
import re
import sys
import urllib.request
from pathlib import Path

TOKEN = os.environ.get("ODPT_TOKEN")
if not TOKEN:
    print("ERROR: 環境変数 ODPT_TOKEN が未設定です。", file=sys.stderr)
    sys.exit(1)

API = "https://api.odpt.org/api/v4/odpt:Station"
OPERATORS = ["TokyoMetro", "Toei"]

# 最寄り都市判定用（既存トイレデータを持つ都市の中心座標）
CITY_CENTERS = {
    "tokyo": (35.681, 139.767),
    "saitama": (35.861, 139.645),
    "chiba": (35.605, 140.123),
    "yokohama": (35.443, 139.638),
}

OUT = Path(__file__).parent.parent / "app" / "lib" / "stations-odpt.json"


def fetch_operator(op):
    url = f"{API}?acl:consumerKey={TOKEN}&odpt:operator=odpt.Operator:{op}"
    req = urllib.request.Request(url, headers={"User-Agent": "FamilyToiletJapan/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return json.loads(resp.read())


def nearest_city(lat, lon):
    best, bestd = None, 1e9
    for city, (clat, clon) in CITY_CENTERS.items():
        d = (lat - clat) ** 2 + (lon - clon) ** 2
        if d < bestd:
            best, bestd = city, d
    return best


def slugify(en_name):
    # "Ueno" -> "ueno-station" / "Nishi-funabashi" -> "nishi-funabashi-station"
    s = en_name.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return f"{s}-station"


def main():
    raw = []
    for op in OPERATORS:
        data = fetch_operator(op)
        print(f"{op}: {len(data)} records")
        for s in data:
            lat, lon = s.get("geo:lat"), s.get("geo:long")
            if lat is None or lon is None:
                continue
            title = s.get("odpt:stationTitle", {})
            raw.append({
                "ja": s.get("dc:title", ""),
                "en": title.get("en", ""),
                "ko": title.get("ko", ""),
                "zh": title.get("zh-Hant", "") or title.get("zh-Hans", ""),
                "lat": lat,
                "lon": lon,
            })

    # 同名駅を統合（日本語駅名が同じ かつ 1.5km以内なら同一ハブとみなす）
    merged = []  # list of {ja,en,ko,zh, lats:[], lons:[]}
    for r in raw:
        hit = None
        for m in merged:
            if m["ja"] == r["ja"]:
                # 代表座標との距離が近いか
                mlat = sum(m["lats"]) / len(m["lats"])
                mlon = sum(m["lons"]) / len(m["lons"])
                if (mlat - r["lat"]) ** 2 + (mlon - r["lon"]) ** 2 < (0.015) ** 2:
                    hit = m
                    break
        if hit:
            hit["lats"].append(r["lat"])
            hit["lons"].append(r["lon"])
            # 英名等が空なら埋める
            for k in ("en", "ko", "zh"):
                if not hit[k] and r[k]:
                    hit[k] = r[k]
        else:
            merged.append({
                "ja": r["ja"], "en": r["en"], "ko": r["ko"], "zh": r["zh"],
                "lats": [r["lat"]], "lons": [r["lon"]],
            })

    spots = []
    seen_slugs = set()
    for m in merged:
        if not m["en"]:
            continue  # 英名が無い駅はslug化できないためスキップ
        lat = round(sum(m["lats"]) / len(m["lats"]), 6)
        lon = round(sum(m["lons"]) / len(m["lons"]), 6)
        slug = slugify(m["en"])
        # slug衝突回避（別ハブで同英名の稀なケース）
        base = slug
        i = 2
        while slug in seen_slugs:
            slug = f"{base}-{i}"
            i += 1
        seen_slugs.add(slug)
        ja = m["ja"] if m["ja"].endswith("駅") else f"{m['ja']}駅"
        en = m["en"] if m["en"].endswith("Station") else f"{m['en']} Station"
        # 都営駅は多言語名が無いことがある。zhは日本語漢字（繁体読者にも概ね読める）、
        # koは英語ローマ字をフォールバックにして4言語すべてを埋める
        zh = f"{m['zh']}車站" if m["zh"] else ja
        ko = f"{m['ko']}역" if m["ko"] else en
        spots.append({
            "slug": slug,
            "city": nearest_city(lat, lon),
            "lat": lat,
            "lon": lon,
            "type": "station",
            "names": {"en": en, "ja": ja, "zh": zh, "ko": ko},
        })

    spots.sort(key=lambda s: s["slug"])
    OUT.write_text(json.dumps(spots, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{len(spots)} stations -> {OUT}")
    from collections import Counter
    print("by city:", dict(Counter(s["city"] for s in spots)))


if __name__ == "__main__":
    main()
