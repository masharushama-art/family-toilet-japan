"""
東京23区の公衆トイレオープンデータ (自治体標準オープンデータセット13準拠/準ずる)
を一括で OSM 由来 toilets.json に統合するバッチスクリプト。

- 各区CSVを取得 → normalize → 50m名寄せで統合
- 区ごとに「新規追加件数」「補完件数」を集計
- 全区の名寄せペアからランダム5件の座標差をログ出力（誤統合の目視確認用）
- 完了後、東京全体の総件数・乳幼児設備あり・英語名ありを報告

CSV公開なし(2026-06時点): 港区/文京区/大田区/渋谷区/北区/足立区/世田谷区(XLSX)
"""

import sys
import random
from pathlib import Path

# 同ディレクトリの merge-opendata.py を import（ハイフン名のため importlib 経由）
import importlib.util
_spec = importlib.util.spec_from_file_location(
    "merge_opendata", Path(__file__).parent / "merge-opendata.py"
)
mo = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(mo)

RADIUS_M = 50

# 23区のうち CSV を公開している16区（2026-06調査時点）
WARD_CSVS = {
    "千代田区": "https://www.opendata.metro.tokyo.lg.jp/chiyoda/131016_13public_toilet.csv",
    "中央区":   "https://www.city.chuo.lg.jp/documents/984/kousyuutoilet.csv",
    "新宿区":   "https://www.city.shinjuku.lg.jp/content/000399974.csv",
    "台東区":   "https://www.city.taito.lg.jp/kusei/online/opendata/seikatu/shisethutizujouhou.files/20250314_koshu_koen_toilet.csv",
    "墨田区":   "https://www.opendata.metro.tokyo.lg.jp/sumida/131075_public_toilet.csv",
    "江東区":   "https://www.opendata.metro.tokyo.lg.jp/koto/131083_013_public_toilet.csv",
    "品川区":   "http://www.city.shinagawa.tokyo.jp/ct/other000081600/toilet.csv",
    "目黒区":   "https://data.bodik.jp/dataset/73861054-d37f-4d84-a7ac-7d1010aae790/resource/79060cab-e0e4-468b-bac6-b82d4610df47/download/131105_public_toilet_20210401.csv",
    "中野区":   "https://www2.wagmap.jp/nakanodatamap/nakanodatamap/opendatafile/map_50/CSV/opendata_550070.csv",
    "杉並区":   "https://www.city.suginami.tokyo.jp/documents/1609/131156_public_toilet.csv",
    "豊島区":   "https://www.opendata.metro.tokyo.lg.jp/toyoshima/R4_public_toilet.csv",
    "荒川区":   "https://www.city.arakawa.tokyo.jp/documents/23112/131181_public_toilet.csv",
    "板橋区":   "https://www.opendata.metro.tokyo.lg.jp/itabashi/131199_public_toilet.csv",
    "練馬区":   "https://www.city.nerima.tokyo.jp/kusei/tokei/opendata/opendatasite/matidukuri/public_toilet.files/131202_public_toilet.csv",
    "葛飾区":   "https://www.opendata.metro.tokyo.lg.jp/katsushika/131229_public_toilet.csv",
    "江戸川区": "https://www.opendata.metro.tokyo.lg.jp/edogawa/131237_public_toilet.csv",
}

NO_CSV_WARDS = ["港区", "文京区", "大田区", "渋谷区", "北区", "足立区", "世田谷区(XLSXのみ)"]


def main():
    dry_run = "--dry-run" in sys.argv
    toilets = mo.load_toilets()
    bbox = mo.CITY_BBOX["tokyo"]
    lat_min, lat_max, lon_min, lon_max = bbox

    per_ward = []          # (ward, valid, matched, enriched, added, fetch_ok)
    all_samples = []       # 全区共通の名寄せサンプル

    for ward, url in WARD_CSVS.items():
        try:
            rows = mo.fetch_csv(url)
        except Exception as e:
            print(f"[{ward}] FETCH FAILED: {e}")
            per_ward.append((ward, 0, 0, 0, 0, False))
            continue

        newcomers = []
        for row in rows:
            rec = mo.normalize_row(row, "tokyo")
            if rec is None:
                continue
            if not (lat_min <= rec["lat"] <= lat_max and lon_min <= rec["lon"] <= lon_max):
                continue
            # id を区名でユニーク化
            rec["id"] = f"opendata_tokyo_{ward}_{rec['lat']:.6f}_{rec['lon']:.6f}"
            rec["ward"] = ward
            newcomers.append(rec)

        if not newcomers:
            print(f"[{ward}] 0 valid geocoded records (CSVに座標なし等)")
            per_ward.append((ward, 0, 0, 0, 0, True))
            continue

        stats = mo.merge(toilets, newcomers, radius_m=RADIUS_M)
        per_ward.append((ward, len(newcomers), stats["matched"],
                         stats["enriched"], stats["added"], True))
        # 区名ラベルを付けてサンプルを集約
        for s in stats["samples"]:
            all_samples.append((ward, *s))
        print(f"[{ward}] valid={len(newcomers)} matched={stats['matched']} "
              f"enriched={stats['enriched']} added={stats['added']}")

    # ---- 区ごとの集計表 ----
    print("\n" + "=" * 64)
    print("区ごとの統合結果")
    print("=" * 64)
    print(f"{'区':10s} {'有効':>6s} {'名寄せ':>6s} {'補完':>6s} {'新規追加':>8s}")
    print("-" * 64)
    tot_valid = tot_matched = tot_enriched = tot_added = 0
    for ward, valid, matched, enriched, added, ok in per_ward:
        flag = "" if ok else "  (取得失敗)"
        print(f"{ward:10s} {valid:>6,} {matched:>6,} {enriched:>6,} {added:>8,}{flag}")
        tot_valid += valid; tot_matched += matched
        tot_enriched += enriched; tot_added += added
    print("-" * 64)
    print(f"{'合計':10s} {tot_valid:>6,} {tot_matched:>6,} {tot_enriched:>6,} {tot_added:>8,}")
    print(f"\nCSV非公開の区: {', '.join(NO_CSV_WARDS)}")

    # ---- 名寄せサンプル（ランダム5件）座標差ログ ----
    print("\n" + "=" * 64)
    print("名寄せサンプル（ランダム5件・誤統合の目視確認用）")
    print("=" * 64)
    if all_samples:
        random.seed(42)
        picks = random.sample(all_samples, min(5, len(all_samples)))
        for ward, dist, new_name, new_ll, ex_name, ex_ll in picks:
            print(f"\n[{ward}] 距離 {dist:.1f}m")
            print(f"  オープンデータ: {new_name}")
            print(f"      座標: {new_ll[0]:.6f}, {new_ll[1]:.6f}")
            print(f"  OSM既存施設  : {ex_name}")
            print(f"      座標: {ex_ll[0]:.6f}, {ex_ll[1]:.6f}")
    else:
        print("（名寄せ0件）")

    # ---- 保存 ----
    if not dry_run:
        mo.save_toilets(toilets)
    else:
        print("\n[dry-run] 保存なし")

    # ---- 東京全体サマリ ----
    tokyo = [t for t in toilets if t.get("city") == "tokyo"]
    with_changing = sum(1 for t in tokyo if t.get("changingTable") is True)
    with_en = sum(1 for t in tokyo if t.get("nameEn"))
    print("\n" + "=" * 64)
    print("東京全体サマリ")
    print("=" * 64)
    print(f"  トイレ総件数          : {len(tokyo):,}")
    print(f"  うち乳幼児用設備あり  : {with_changing:,}")
    print(f"  うち英語名あり        : {with_en:,}")


if __name__ == "__main__":
    main()
