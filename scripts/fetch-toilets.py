"""
Overpass APIから東京・大阪・京都のトイレデータを取得してJSONに保存
"""
import json
import os
import time
import urllib.request
import urllib.parse

CITIES = {
    "tokyo": "35.5,139.4,35.9,139.9",
    "osaka": "34.5,135.3,34.8,135.7",
    "kyoto": "34.9,135.6,35.1,135.9",
}

BLACKLIST_AMENITIES = {"bar", "nightclub", "pub", "casino", "stripclub", "amusement_arcade", "gambling"}
BLACKLIST_KEYWORDS = ["パチンコ", "スロット", "カラオケ", "バー", "スナック", "ナイトクラブ", "キャバクラ", "風俗"]


def is_whitelisted(tags):
    if tags.get("access") == "private":
        return False
    if tags.get("amenity") in BLACKLIST_AMENITIES:
        return False
    if tags.get("leisure") == "amusement_arcade":
        return False
    operator = (tags.get("operator", "") + tags.get("name", "")).lower()
    for kw in BLACKLIST_KEYWORDS:
        if kw.lower() in operator:
            return False
    return True


def fetch_city(city_name, bbox):
    query = f"""
[out:json][timeout:60];
(
  node["amenity"="toilets"]({bbox});
  way["amenity"="toilets"]({bbox});
);
out center tags;
""".strip()

    url = "https://overpass-api.de/api/interpreter"
    data = urllib.parse.urlencode({"data": query}).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    req.add_header("User-Agent", "FamilyToiletJapan/1.0")

    print(f"Fetching {city_name}...")
    with urllib.request.urlopen(req, timeout=90) as res:
        result = json.loads(res.read().decode("utf-8"))

    elements = result.get("elements", [])
    print(f"  Raw results: {len(elements)}")

    toilets = []
    for el in elements:
        tags = el.get("tags", {})
        if not is_whitelisted(tags):
            continue

        lat = el.get("lat") or (el.get("center") or {}).get("lat")
        lon = el.get("lon") or (el.get("center") or {}).get("lon")
        if not lat or not lon:
            continue

        changing = tags.get("changing_table") == "yes" or tags.get("toilets:changing_table") == "yes"
        toilets.append({
            "id": f"osm-{el['type']}-{el['id']}",
            "lat": lat,
            "lon": lon,
            "name": tags.get("name") or tags.get("name:en"),
            "operator": tags.get("operator"),
            "changingTable": changing,
            "wheelchair": tags.get("wheelchair") == "yes",
            "openingHours": tags.get("opening_hours"),
            "fee": tags.get("fee") == "yes",
            "city": city_name,
            "source": "osm",
        })

    print(f"  After filter: {len(toilets)}")
    return toilets


def main():
    all_toilets = []
    for city_name, bbox in CITIES.items():
        try:
            toilets = fetch_city(city_name, bbox)
            all_toilets.extend(toilets)
            time.sleep(2)
        except Exception as e:
            print(f"  Error: {e}")

    out_dir = os.path.join(os.path.dirname(__file__), "..", "public", "data")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "toilets.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_toilets, f, ensure_ascii=False, indent=2)

    print(f"\nTotal: {len(all_toilets)} toilets saved to {out_path}")
    for city in CITIES:
        count = sum(1 for t in all_toilets if t["city"] == city)
        changing = sum(1 for t in all_toilets if t["city"] == city and t["changingTable"])
        print(f"  {city}: {count} total, {changing} with changing table")


if __name__ == "__main__":
    main()
