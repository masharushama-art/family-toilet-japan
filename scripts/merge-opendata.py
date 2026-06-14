"""
自治体オープンデータ (自治体標準オープンデータセット13準拠CSV) と
既存 OSM 由来 toilets.json を統合するスクリプト。

統合戦略:
  - 緯度経度の近接性（デフォルト50m以内）で名寄せ
  - 自治体データ優先項目: 名称_英語, 乳幼児用設備設置トイレ有無, 画像
  - 重複なし新規レコードはそのまま追加

対応CSV形式: 自治体標準オープンデータセット公衆トイレ13準拠
  必須列: 緯度, 経度
  任意列: 名称, 名称_英語, 乳幼児用設備設置トイレ有無, 車椅子使用者用トイレ有無,
           利用開始時間, 利用終了時間, 画像, 市区町村名

使い方:
  python scripts/merge-opendata.py --csv <path_or_url> --city tokyo
  python scripts/merge-opendata.py --csv <path_or_url> --city nagoya --add-city
  python scripts/merge-opendata.py --report
"""

import json
import math
import csv
import io
import sys
import argparse
import urllib.request
from pathlib import Path

DATA_FILE = Path(__file__).parent.parent / "public" / "data" / "toilets.json"

# 対応都市の bounding box (lat_min, lat_max, lon_min, lon_max)
CITY_BBOX = {
    "tokyo":    (35.50, 35.82, 139.55, 139.93),
    "osaka":    (34.55, 34.75, 135.43, 135.58),
    "kyoto":    (34.93, 35.08, 135.68, 135.82),
    "nagoya":   (35.06, 35.28, 136.83, 137.00),
    "yokohama": (35.30, 35.60, 139.48, 139.75),
    "fukuoka":  (33.50, 33.70, 130.31, 130.50),
    "sapporo":  (42.96, 43.18, 141.22, 141.52),
}

MERGE_RADIUS_M = 50  # この距離以内なら同一施設とみなす


def haversine(lat1, lon1, lat2, lon2) -> float:
    R = 6371000
    φ1, φ2 = math.radians(lat1), math.radians(lat2)
    dφ = math.radians(lat2 - lat1)
    dλ = math.radians(lon2 - lon1)
    a = math.sin(dφ / 2) ** 2 + math.cos(φ1) * math.cos(φ2) * math.sin(dλ / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def load_toilets() -> list[dict]:
    with open(DATA_FILE, encoding="utf-8") as f:
        return json.load(f)


def save_toilets(data: list[dict]):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    print(f"Saved {len(data):,} records → {DATA_FILE}")


def _decode_bytes(raw: bytes) -> str:
    """BOM を見て UTF-16/UTF-8 を判定し、なければ日本語エンコードを順に試す。"""
    if raw[:2] in (b"\xff\xfe", b"\xfe\xff"):
        return raw.decode("utf-16")
    for enc in ("utf-8-sig", "cp932", "shift_jis", "euc_jp"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def fetch_csv(path_or_url: str) -> list[dict]:
    """CSV をパスまたはURLから読み込み、辞書リストで返す。"""
    if path_or_url.startswith("http"):
        print(f"Downloading: {path_or_url}")
        # 一部自治体サーバは UA 無しを弾くため明示
        req = urllib.request.Request(path_or_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read()
        text = _decode_bytes(raw)
    else:
        with open(path_or_url, "rb") as f:
            text = _decode_bytes(f.read())

    # 改行コードを正規化（CR / CRLF 混在や行内のはみ出し改行に強くする）
    reader = csv.DictReader(io.StringIO(text), skipinitialspace=False)
    try:
        return list(reader)
    except csv.Error:
        # 「new-line character seen in unquoted field」対策:
        # newline='' 相当で読み直す（universal newline を無効化）
        reader = csv.DictReader(io.StringIO(text.replace("\r\n", "\n").replace("\r", "\n")))
        return list(reader)


def normalize_row(row: dict, city: str) -> dict | None:
    """
    自治体標準CSV の1行を toilets.json 形式に変換。
    緯度経度が取れない行は None を返す。
    """
    lat_key = next((k for k in row if "緯度" in k), None)
    lon_key = next((k for k in row if "経度" in k), None)
    if not lat_key or not lon_key:
        return None
    try:
        lat = float(row[lat_key])
        lon = float(row[lon_key])
    except (ValueError, TypeError):
        return None
    if lat == 0 or lon == 0:
        return None

    name_key = next((k for k in row if k in ("名称", "施設名")), None)
    name_en_key = next((k for k in row if "名称_英語" in k or "英語" in k), None)
    addr_key = next((k for k in row if k in ("住所", "所在地", "address")), None)
    baby_key = next((k for k in row if "乳幼児" in k), None)
    wc_key = next((k for k in row if "車椅子" in k), None)
    img_key = next((k for k in row if "画像" in k and "ライセンス" not in k), None)
    open_key = next((k for k in row if "利用開始" in k), None)
    close_key = next((k for k in row if "利用終了" in k), None)

    def val(k): return (row.get(k) or "").strip() or None

    changing = None
    if baby_key:
        v = (val(baby_key) or "").strip()
        if v in ("有", "○", "1", "true", "True", "yes"):
            changing = True
        elif v in ("無", "×", "0", "false", "False", "no"):
            changing = False

    wheelchair = None
    if wc_key:
        v = (val(wc_key) or "").strip()
        if v in ("有", "○", "1", "true", "True", "yes"):
            wheelchair = True
        elif v in ("無", "×", "0", "false", "False", "no"):
            wheelchair = False

    opening_hours = None
    if open_key and close_key:
        o, c = val(open_key), val(close_key)
        if o and c:
            opening_hours = f"{o}-{c}"

    record: dict = {
        "id": f"opendata_{city}_{lat:.6f}_{lon:.6f}",
        "lat": round(lat, 6),
        "lon": round(lon, 6),
        "city": city,
        "source": "opendata",
    }
    if val(name_key):
        record["name"] = val(name_key)
    if val(addr_key):
        record["address"] = val(addr_key)
    if val(name_en_key):
        record["nameEn"] = val(name_en_key)
    if changing is not None:
        record["changingTable"] = changing
    if wheelchair is not None:
        record["wheelchair"] = wheelchair
    if opening_hours:
        record["openingHours"] = opening_hours
    if val(img_key):
        record["image"] = val(img_key)

    return record


def merge(existing: list[dict], newcomers: list[dict], radius_m: float = MERGE_RADIUS_M):
    """
    newcomers を existing に統合する。
    radius_m 以内に既存レコードがあれば、優先項目だけ上書き。
    なければ新規追加。

    戻り値: dict(matched, enriched, added, samples)
      matched  : 50m以内で既存と一致した件数（補完されなかったものも含む）
      enriched : うち実際に項目が補完された件数
      added    : 新規追加件数
      samples  : 名寄せされたペアの座標差サンプル（目視確認用）
    """
    matched = 0
    enriched = 0
    added = 0
    samples = []  # (dist_m, new_name, new_latlon, ex_name, ex_latlon)

    # 名寄せは「処理開始時点の既存レコード(=OSM等)」だけを対象にする。
    # 新規追加したオープンデータ同士は名寄せしない（自治体データは座標を
    # プレースホルダ化していることがあり、別施設が同一座標を共有して
    # 誤統合されるのを防ぐ）。
    original_count = len(existing)

    for new in newcomers:
        best_dist = float("inf")
        best_idx = -1
        for i in range(original_count):
            ex = existing[i]
            d = haversine(new["lat"], new["lon"], ex["lat"], ex["lon"])
            if d < best_dist:
                best_dist = d
                best_idx = i

        if best_dist <= radius_m and best_idx >= 0:
            ex = existing[best_idx]
            matched += 1
            samples.append((
                best_dist,
                new.get("name") or new.get("nameEn") or new["id"],
                (new["lat"], new["lon"]),
                ex.get("name") or ex.get("id"),
                (ex["lat"], ex["lon"]),
            ))
            # 優先項目の補完ルール:
            #  - changingTable: 自治体データが True なら OSM の false を上書き
            #    （乳幼児設備は本アプリの核心情報で、自治体データの方が信頼できる）
            #  - nameEn / image: 既存に値が無ければ補完
            changed = False
            if new.get("changingTable") is True and ex.get("changingTable") is not True:
                ex["changingTable"] = True
                changed = True
            for k in ("nameEn", "image", "address"):
                if new.get(k) and not ex.get(k):
                    ex[k] = new[k]
                    changed = True
            if changed:
                enriched += 1
        else:
            existing.append(new)
            added += 1

    return {"matched": matched, "enriched": enriched, "added": added, "samples": samples}


def report(toilets: list[dict]):
    from collections import Counter
    counts = Counter(t.get("city", "unknown") for t in toilets)
    print("\n=== データ件数（都市別） ===")
    for city, n in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {city:12s}: {n:,}")
    print(f"  {'TOTAL':12s}: {sum(counts.values()):,}")
    sources = Counter(t.get("source", "osm") for t in toilets)
    print("\n=== ソース別 ===")
    for src, n in sorted(sources.items(), key=lambda x: -x[1]):
        print(f"  {src:12s}: {n:,}")


def main():
    parser = argparse.ArgumentParser(description="Merge open data CSVs into toilets.json")
    parser.add_argument("--csv", help="CSV path or URL to import")
    parser.add_argument("--city", help="City slug (tokyo/osaka/kyoto/nagoya/yokohama/fukuoka/sapporo)")
    parser.add_argument("--add-city", action="store_true",
                        help="Allow adding records for a new city not yet in toilets.json")
    parser.add_argument("--radius", type=float, default=MERGE_RADIUS_M,
                        help=f"Merge radius in meters (default: {MERGE_RADIUS_M})")
    parser.add_argument("--dry-run", action="store_true",
                        help="Don't write output, just report what would change")
    parser.add_argument("--report", action="store_true",
                        help="Show current record counts and exit")
    args = parser.parse_args()

    toilets = load_toilets()

    if args.report:
        report(toilets)
        return

    if not args.csv or not args.city:
        parser.error("--csv and --city are required (or use --report)")

    city = args.city.lower()
    if city not in CITY_BBOX and not args.add_city:
        print(f"Unknown city '{city}'. Use --add-city to allow it, or choose from: {list(CITY_BBOX)}")
        sys.exit(1)

    # CSV 読み込み・正規化
    rows = fetch_csv(args.csv)
    print(f"Loaded {len(rows):,} rows from CSV")

    newcomers = []
    skipped = 0
    for row in rows:
        rec = normalize_row(row, city)
        if rec is None:
            skipped += 1
            continue
        # bounding box フィルタ（都市外レコードを除外）
        if city in CITY_BBOX:
            lat_min, lat_max, lon_min, lon_max = CITY_BBOX[city]
            if not (lat_min <= rec["lat"] <= lat_max and lon_min <= rec["lon"] <= lon_max):
                skipped += 1
                continue
        newcomers.append(rec)

    print(f"  Valid records in {city} bbox: {len(newcomers):,}  (skipped: {skipped})")

    if not newcomers:
        print("No valid records to merge. Exiting.")
        return

    stats = merge(toilets, newcomers, radius_m=args.radius)
    print(f"\nMerge result:")
    print(f"  Matched existing (<= {args.radius:.0f}m): {stats['matched']:,}")
    print(f"  Enriched (fields filled):     {stats['enriched']:,}")
    print(f"  New records added:            {stats['added']:,}")
    print(f"  Total after merge:            {len(toilets):,}")

    # 名寄せサンプル（ランダム5件・誤統合の目視確認用）
    if stats["samples"]:
        import random as _r
        _r.seed(42)
        picks = _r.sample(stats["samples"], min(5, len(stats["samples"])))
        print("\n=== 名寄せサンプル（ランダム5件・誤統合チェック） ===")
        for dist, new_name, new_ll, ex_name, ex_ll in picks:
            print(f"  距離 {dist:.1f}m")
            print(f"    オープンデータ: {new_name}  ({new_ll[0]:.6f}, {new_ll[1]:.6f})")
            print(f"    OSM既存施設  : {ex_name}  ({ex_ll[0]:.6f}, {ex_ll[1]:.6f})")

    if not args.dry_run:
        save_toilets(toilets)
        print("\nFinal counts:")
        report(toilets)
    else:
        print("\n[dry-run] No file written.")


if __name__ == "__main__":
    main()
