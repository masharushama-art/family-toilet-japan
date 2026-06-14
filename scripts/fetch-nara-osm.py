"""奈良市の公衆トイレ OSM データを取得。"""
import json, urllib.request, urllib.parse
from pathlib import Path

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OUT_FILE = Path(__file__).parent / "nara_osm_raw.json"

QUERY = """
[out:json][timeout:60];
(
  node["amenity"="toilets"](34.60,135.72,34.78,135.92);
  way["amenity"="toilets"](34.60,135.72,34.78,135.92);
);
out center;
"""

def main():
    print("Fetching Nara toilets from Overpass API...")
    payload = urllib.parse.urlencode({"data": QUERY}).encode()
    req = urllib.request.Request(OVERPASS_URL, data=payload, headers={
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "FamilyToiletJapan/1.0 (https://family-toilet-japan.vercel.app)",
    })
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read())
    elements = data.get("elements", [])
    print(f"Got {len(elements)} elements")
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved → {OUT_FILE}")

if __name__ == "__main__":
    main()
