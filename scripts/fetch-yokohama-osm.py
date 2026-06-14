"""
横浜市の公衆トイレ OSM データを Overpass API で取得し、
scripts/yokohama_osm_raw.json に保存するスクリプト。

使い方:
  python scripts/fetch-yokohama-osm.py
"""

import json
import urllib.request
from pathlib import Path

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OUT_FILE = Path(__file__).parent / "yokohama_osm_raw.json"

QUERY = """
[out:json][timeout:60];
(
  node["amenity"="toilets"](35.30,139.48,35.60,139.75);
  way["amenity"="toilets"](35.30,139.48,35.60,139.75);
);
out center;
"""

def main():
    print("Fetching Yokohama toilets from Overpass API...")
    req = urllib.request.Request(
        OVERPASS_URL,
        data=QUERY.encode(),
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read())

    elements = data.get("elements", [])
    print(f"Got {len(elements)} elements")
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved → {OUT_FILE}")

if __name__ == "__main__":
    main()
