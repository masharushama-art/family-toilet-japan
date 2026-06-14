"""
名古屋市 公衆トイレ オープンデータ (BODIK, CC BY 4.0) を統合する。

座標精度を優先する方針:
  1. OSM 名古屋トイレ (scripts/nagoya_osm_raw.json) を基盤にする（正確な座標）
  2. 自治体892件は住所を国土地理院APIでジオコーディング（キャッシュ利用）
  3. 自治体 ↔ OSM を50m名寄せ:
     - 一致: OSM座標を正とし、設備情報(乳幼児設備/車椅子)を自治体から付与
     - 不一致: ジオコーディング座標で新規追加 (source=opendata, geocoded=true)
  4. OSM単独レコードもそのまま採用
  5. city="nagoya" を付与

出典: ジオコーディング座標利用レコードは「国土地理院」帰属表示が必要。
"""
import csv, io, json, math, random, os, urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "public" / "data" / "toilets.json"
OSM_RAW = Path(__file__).parent / "nagoya_osm_raw.json"
GEO_CACHE = Path(__file__).parent / "nagoya_geocode_cache.json"
CSV_URL = "https://data.bodik.jp/dataset/de718dc8-6b82-409b-b185-c4e100875707/resource/67dd6aa4-7db1-4861-92f6-b8c9e056643f/download/250401_public_toilet.csv"
RADIUS_M = 50


def haversine(la1, lo1, la2, lo2):
    R = 6371000
    p1, p2 = math.radians(la1), math.radians(la2)
    dp = math.radians(la2 - la1); dl = math.radians(lo2 - lo1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return R*2*math.atan2(math.sqrt(a), math.sqrt(1-a))


def dec(raw):
    for e in ("utf-8-sig", "cp932", "shift_jis"):
        try: return raw.decode(e)
        except UnicodeDecodeError: continue
    return raw.decode("utf-8", "replace")


def load_csv():
    req = urllib.request.Request(CSV_URL, headers={"User-Agent": "Mozilla/5.0"})
    return list(csv.DictReader(io.StringIO(dec(urllib.request.urlopen(req, timeout=30).read()))))


def yn(v):
    v = (v or "").strip()
    if v == "有": return True
    if v == "無": return False
    return None


def load_osm():
    """OSM raw → 正規化レコード(city=nagoya, source=osm)。"""
    data = json.load(open(OSM_RAW, encoding="utf-8"))
    out = []
    for e in data["elements"]:
        if e["type"] == "node":
            lat, lon = e.get("lat"), e.get("lon")
        else:
            c = e.get("center", {}); lat, lon = c.get("lat"), c.get("lon")
        if lat is None or lon is None:
            continue
        tg = e.get("tags", {})
        rec = {
            "id": f"osm-{e['type']}-{e['id']}",
            "lat": round(lat, 6), "lon": round(lon, 6),
            "city": "nagoya", "source": "osm",
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
    dry = "--dry-run" in os.sys.argv
    toilets = json.load(open(DATA_FILE, encoding="utf-8"))
    cache = json.load(open(GEO_CACHE, encoding="utf-8")) if GEO_CACHE.exists() else {}

    osm = load_osm()
    osm_base = list(osm)  # 名寄せは「実OSM」だけを対象（新規追加分とは照合しない）
    rows = load_csv()
    print(f"OSM nagoya: {len(osm)}   municipal rows: {len(rows)}   geocode cache: {len(cache)}")

    matched = added_geo = added_nogeo = enriched = geo_miss = 0
    samples = []  # (dist, muni_name, geo_ll, osm_name, osm_ll)
    nogeo_examples = []

    for r in rows:
        addr = "愛知県名古屋市" + (r.get("住所") or "").split("、")[0].strip()
        geo = cache.get(addr)  # [lat, lon] or None
        baby = yn(r.get("乳幼児用設備設置トイレ有無"))
        wc = yn(r.get("車椅子使用者用トイレ有無"))
        name = (r.get("名称") or "").strip()

        # OSM名寄せ（ジオコーディング座標で照合）
        best_d, best = float("inf"), None
        if geo:
            for o in osm_base:
                d = haversine(geo[0], geo[1], o["lat"], o["lon"])
                if d < best_d:
                    best_d, best = d, o

        if geo and best and best_d <= RADIUS_M:
            # 一致: OSM座標を正とし設備を補完
            matched += 1
            samples.append((best_d, name or "(no name)", tuple(geo),
                            best.get("name") or best["id"], (best["lat"], best["lon"])))
            ch = False
            if baby is True and best.get("changingTable") is not True:
                best["changingTable"] = True; ch = True
            if wc is True and best.get("wheelchair") is not True:
                best["wheelchair"] = True; ch = True
            if name and not best.get("name"):
                best["name"] = name; ch = True
            raw_addr = (r.get("住所") or "").strip()
            if raw_addr and not best.get("address"):
                best["address"] = "愛知県名古屋市" + raw_addr.split("、")[0].strip(); ch = True
            if ch: enriched += 1
        elif geo:
            # 新規追加（ジオコーディング座標）
            rec = {
                "id": f"opendata_nagoya_{geo[0]:.6f}_{geo[1]:.6f}",
                "lat": round(geo[0], 6), "lon": round(geo[1], 6),
                "city": "nagoya", "source": "opendata", "geocoded": True,
            }
            if name: rec["name"] = name
            if baby is not None: rec["changingTable"] = baby
            if wc is not None: rec["wheelchair"] = wc
            raw_addr = (r.get("住所") or "").strip()
            if raw_addr:
                rec["address"] = "愛知県名古屋市" + raw_addr.split("、")[0].strip()
            osm.append(rec)  # OSMリストに足して以降の名寄せ基準にも含める
            added_geo += 1
        else:
            geo_miss += 1
            if len(nogeo_examples) < 10:
                nogeo_examples.append(r.get("住所"))

    # OSM + 追加分すべてを本体へ
    toilets.extend(osm)

    print(f"\n=== 統合結果 ===")
    print(f"  OSM名寄せ一致     : {matched}")
    print(f"  └ 設備補完        : {enriched}")
    print(f"  新規追加(ジオ座標): {added_geo}")
    print(f"  ジオコーディング失敗(除外): {geo_miss}")
    if nogeo_examples:
        print(f"  失敗例: {nogeo_examples[:5]}")

    nag = [t for t in toilets if t.get("city") == "nagoya"]
    osm_c = sum(1 for t in nag if t.get("source") == "osm")
    geo_c = sum(1 for t in nag if t.get("geocoded"))
    baby_c = sum(1 for t in nag if t.get("changingTable"))
    wc_c = sum(1 for t in nag if t.get("wheelchair"))
    print(f"\n=== 名古屋サマリ ===")
    print(f"  総件数            : {len(nag)}")
    print(f"  ├ OSM座標         : {osm_c}")
    print(f"  └ ジオコーディング: {geo_c}")
    print(f"  乳幼児設備あり    : {baby_c}")
    print(f"  車椅子対応        : {wc_c}")

    if samples:
        random.seed(42)
        print(f"\n=== 名寄せサンプル5件（OSM座標 vs ジオ座標の差） ===")
        for d, mn, gll, on, oll in random.sample(samples, min(5, len(samples))):
            print(f"  距離 {d:.1f}m  自治体[{mn}] geo=({gll[0]:.6f},{gll[1]:.6f})")
            print(f"            OSM[{on}] =({oll[0]:.6f},{oll[1]:.6f})")

    if not dry:
        json.dump(toilets, open(DATA_FILE, "w", encoding="utf-8"),
                  ensure_ascii=False, separators=(",", ":"))
        print(f"\nSaved {len(toilets):,} records")
    else:
        print("\n[dry-run] 保存なし")


if __name__ == "__main__":
    import sys
    main()
