"""京都のみ再取得してtoilets.jsonに追記"""
import json, os, time, urllib.request, urllib.parse

BLACKLIST_AMENITIES = {"bar", "nightclub", "pub", "casino", "stripclub", "amusement_arcade", "gambling"}
BLACKLIST_KEYWORDS = ["パチンコ", "スロット", "カラオケ", "バー", "スナック", "ナイトクラブ", "キャバクラ", "風俗"]

def is_whitelisted(tags):
    if tags.get("access") == "private": return False
    if tags.get("amenity") in BLACKLIST_AMENITIES: return False
    if tags.get("leisure") == "amusement_arcade": return False
    op = (tags.get("operator","") + tags.get("name","")).lower()
    return not any(kw.lower() in op for kw in BLACKLIST_KEYWORDS)

query = """[out:json][timeout:60];(node["amenity"="toilets"](34.9,135.6,35.1,135.9);way["amenity"="toilets"](34.9,135.6,35.1,135.9););out center tags;"""

print("Waiting 30s before retry..."); time.sleep(30)
url = "https://overpass-api.de/api/interpreter"
data = urllib.parse.urlencode({"data": query}).encode("utf-8")
req = urllib.request.Request(url, data=data, method="POST")
req.add_header("Content-Type", "application/x-www-form-urlencoded")
req.add_header("User-Agent", "FamilyToiletJapan/1.0")

print("Fetching kyoto...")
with urllib.request.urlopen(req, timeout=90) as res:
    result = json.loads(res.read().decode("utf-8"))

elements = result.get("elements", [])
print(f"  Raw: {len(elements)}")

toilets = []
for el in elements:
    tags = el.get("tags", {})
    if not is_whitelisted(tags): continue
    lat = el.get("lat") or (el.get("center") or {}).get("lat")
    lon = el.get("lon") or (el.get("center") or {}).get("lon")
    if not lat or not lon: continue
    changing = tags.get("changing_table") == "yes" or tags.get("toilets:changing_table") == "yes"
    toilets.append({"id": f"osm-{el['type']}-{el['id']}", "lat": lat, "lon": lon,
        "name": tags.get("name") or tags.get("name:en"), "operator": tags.get("operator"),
        "changingTable": changing, "wheelchair": tags.get("wheelchair") == "yes",
        "openingHours": tags.get("opening_hours"), "fee": tags.get("fee") == "yes",
        "city": "kyoto", "source": "osm"})

print(f"  After filter: {len(toilets)}")

out_path = os.path.join(os.path.dirname(__file__), "..", "public", "data", "toilets.json")
with open(out_path, encoding="utf-8") as f:
    existing = json.load(f)

existing.extend(toilets)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(existing, f, ensure_ascii=False, indent=2)

print(f"Total now: {len(existing)}, kyoto: {len(toilets)}, with changing: {sum(1 for t in toilets if t['changingTable'])}")
