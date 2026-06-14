"""
大阪市「マップナビおおさか」公衆トイレ オープンデータ (CC BY) の統合。

データの性質:
  - 緯度経度あり / 大阪市全域 / 321件
  - 乳幼児設備・おむつ替え台・英語名・画像の列は無い → changingTable等は触らない
  - 分類「車いす対応公衆便所」のみ wheelchair=true を付与
    （「公衆便所」は分類名に無いだけで実態不明 → wheelchair は未設定のまま）

列: 施設名称, 所在地, 施設名かな, カテゴリ, 分類, TEL, FAX, URL, URL2,
    バリアフリー情報, 詳細情報, 備考, 経度, 緯度
"""

import csv, io, ssl, math, random, urllib.request
import importlib.util
from pathlib import Path

_spec = importlib.util.spec_from_file_location(
    "merge_opendata", Path(__file__).parent / "merge-opendata.py")
mo = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mo)

CSV_URL = "https://www.mapnavi.city.osaka.lg.jp/osakacity/osakacity/opendatafile/map_1/CSV/opendata_1011.csv"
RADIUS_M = 50
BBOX = mo.CITY_BBOX["osaka"]  # 既存OSM大阪と同じ範囲


def fetch_rows():
    # 大阪市サーバは弱いDH鍵を使うため暗号強度のみ緩和（証明書/ホスト名検証は維持）
    ctx = ssl.create_default_context()
    ctx.set_ciphers("DEFAULT@SECLEVEL=1")
    req = urllib.request.Request(CSV_URL, headers={"User-Agent": "Mozilla/5.0"})
    raw = urllib.request.urlopen(req, timeout=30, context=ctx).read()
    text = mo._decode_bytes(raw)
    return list(csv.DictReader(io.StringIO(text)))


def normalize(row):
    try:
        lat = round(float(row["緯度"]), 6)
        lon = round(float(row["経度"]), 6)
    except (ValueError, TypeError, KeyError):
        return None
    la0, la1, lo0, lo1 = BBOX
    if not (la0 <= lat <= la1 and lo0 <= lon <= lo1):
        return None
    rec = {
        "id": f"opendata_osaka_mapnavi_{lat:.6f}_{lon:.6f}",
        "lat": lat, "lon": lon,
        "city": "osaka", "source": "opendata",
    }
    name = (row.get("施設名称") or "").strip()
    if name:
        rec["name"] = name
    # 分類が「車いす対応公衆便所」のものだけ wheelchair=true
    if "車いす" in (row.get("分類") or ""):
        rec["wheelchair"] = True
    return rec


def merge_mapnavi(existing, newcomers, radius_m=RADIUS_M):
    """
    マップナビ専用マージ:
      - OSM等の既存分(処理開始時点)とのみ50m名寄せ（誤統合対策）
      - 一致時は wheelchair のみ補完（false→true / 未設定→true）
      - changingTable / nameEn / image は一切触らない
      - 一致しなければ新規追加
    """
    matched = enriched = added = 0
    samples = []
    original = len(existing)
    for new in newcomers:
        best_d, best_i = float("inf"), -1
        for i in range(original):
            ex = existing[i]
            d = mo.haversine(new["lat"], new["lon"], ex["lat"], ex["lon"])
            if d < best_d:
                best_d, best_i = d, i
        if best_d <= radius_m and best_i >= 0:
            ex = existing[best_i]
            matched += 1
            samples.append((best_d, new.get("name") or new["id"],
                            (new["lat"], new["lon"]),
                            ex.get("name") or ex["id"], (ex["lat"], ex["lon"])))
            if new.get("wheelchair") is True and ex.get("wheelchair") is not True:
                ex["wheelchair"] = True
                enriched += 1
        else:
            existing.append(new)
            added += 1
    return {"matched": matched, "enriched": enriched, "added": added, "samples": samples}


def osaka_stats(toilets):
    o = [t for t in toilets if t.get("city") == "osaka"]
    wc = sum(1 for t in o if t.get("wheelchair") is True)
    ct = sum(1 for t in o if t.get("changingTable"))
    return len(o), wc, ct


def main():
    import sys
    dry = "--dry-run" in sys.argv
    toilets = mo.load_toilets()
    before_total, before_wc, before_ct = osaka_stats(toilets)

    rows = fetch_rows()
    print(f"Loaded {len(rows)} rows from mapnavi")
    newcomers = [r for r in (normalize(x) for x in rows) if r]
    print(f"Valid in osaka bbox: {len(newcomers)}")

    stats = merge_mapnavi(toilets, newcomers)
    after_total, after_wc, after_ct = osaka_stats(toilets)

    print(f"\nMerge: matched={stats['matched']} wheelchair-enriched={stats['enriched']} "
          f"added={stats['added']}")

    if stats["samples"]:
        random.seed(42)
        picks = random.sample(stats["samples"], min(5, len(stats["samples"])))
        print("\n=== 名寄せサンプル（ランダム5件・誤統合チェック） ===")
        for d, nn, nll, en, ell in picks:
            print(f"  距離 {d:.1f}m")
            print(f"    マップナビ : {nn}  ({nll[0]:.6f}, {nll[1]:.6f})")
            print(f"    OSM既存施設: {en}  ({ell[0]:.6f}, {ell[1]:.6f})")

    print("\n=== 大阪サマリ（統合前 → 後） ===")
    print(f"  総件数        : {before_total} → {after_total}  (+{after_total-before_total})")
    print(f"  車椅子対応    : {before_wc} → {after_wc}  (+{after_wc-before_wc})")
    print(f"  乳幼児設備あり: {before_ct} → {after_ct}  (変更なし)")

    if not dry:
        mo.save_toilets(toilets)
    else:
        print("\n[dry-run] 保存なし")


if __name__ == "__main__":
    main()
