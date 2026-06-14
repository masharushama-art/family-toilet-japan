"""千葉の公衆トイレデータを統合。"""
import json, sys, importlib.util
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_FILE = ROOT / "public" / "data" / "toilets.json"
OSM_RAW = Path(__file__).parent / "chiba_osm_raw.json"

_spec = importlib.util.spec_from_file_location("merge_opendata", Path(__file__).parent / "merge-opendata.py")
mo = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(mo)

BBOX = (35.45, 35.75, 139.85, 140.25)

def load_osm():
    data = json.load(open(OSM_RAW, encoding="utf-8"))
    lat_min, lat_max, lon_min, lon_max = BBOX
    out = []
    for e in data["elements"]:
        lat, lon = (e.get("lat"), e.get("lon")) if e["type"] == "node" else (e.get("center",{}).get("lat"), e.get("center",{}).get("lon"))
        if lat is None or not (lat_min <= lat <= lat_max and lon_min <= lon <= lon_max): continue
        tg = e.get("tags", {})
        rec = {"id": f"osm-{e['type']}-{e['id']}", "lat": round(lat,6), "lon": round(lon,6),
               "city": "chiba", "source": "osm",
               "changingTable": tg.get("changing_table") == "yes",
               "wheelchair": tg.get("wheelchair") == "yes",
               "fee": tg.get("fee") == "yes"}
        if tg.get("name"): rec["name"] = tg["name"]
        if tg.get("name:en"): rec["nameEn"] = tg["name:en"]
        if tg.get("opening_hours"): rec["openingHours"] = tg["opening_hours"]
        out.append(rec)
    return out

def main():
    csv_url = next((a for a in sys.argv[1:] if a.startswith("http") or a.endswith(".csv")), None)
    osm = load_osm()
    print(f"OSM chiba: {len(osm)} records")
    toilets = json.load(open(DATA_FILE, encoding="utf-8"))
    toilets = [t for t in toilets if t.get("city") != "chiba"]
    toilets.extend(osm)
    if csv_url:
        lat_min, lat_max, lon_min, lon_max = BBOX
        rows = mo.fetch_csv(csv_url)
        newcomers = [r for row in rows if (r := mo.normalize_row(row, "chiba")) and lat_min <= r["lat"] <= lat_max and lon_min <= r["lon"] <= lon_max]
        print(f"CSV有効件数: {len(newcomers)}")
        result = mo.merge(toilets, newcomers, 50)
        print(f"  名寄せ: {result['matched']}件  補完: {result['enriched']}件  新規: {result['added']}件")
    chiba = [t for t in toilets if t.get("city") == "chiba"]
    print(f"\n=== 千葉サマリ ===")
    print(f"  総件数: {len(chiba)}  乳幼児設備: {sum(1 for t in chiba if t.get('changingTable'))}  車椅子: {sum(1 for t in chiba if t.get('wheelchair'))}")
    from collections import Counter
    c = Counter(t.get("city") for t in toilets)
    print(f"\n=== 全体 ===")
    for city, n in sorted(c.items(), key=lambda x: -x[1]): print(f"  {city:12s}: {n:,}")
    print(f"  {'TOTAL':12s}: {sum(c.values()):,}")
    mo.save_toilets(toilets)

if __name__ == "__main__":
    main()
