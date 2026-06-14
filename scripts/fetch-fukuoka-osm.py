"""
福岡市の公衆トイレ OSM データを Overpass API で取得し、
scripts/fukuoka_osm_raw.json に保存するスクリプト。

使い方:
  python scripts/fetch-fukuoka-osm.py
"""

import json
import urllib.request
import urllib.parse
from pathlib import Path

OVERPASS_URL = "https://overpass-api.de/api/interpreter"
OUT_FILE = Path(__file__).parent / "fukuoka_osm_raw.json"

QUERY = """
[out:json][timeout:60];
(
  node["amenity"="toilets"](33.50,130.31,33.70,130.50);
  way["amenity"="toilets"](33.50,130.31,33.70,130.50);
);
out center;
"""

def main():
    print("Fetching Fukuoka toilets from Overpass API...")
    payload = urllib.parse.urlencode({"data": QUERY}).encode()
    req = urllib.request.Request(
        OVERPASS_URL,
        data=payload,
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "FamilyToiletJapan/1.0 (https://family-toilet-japan.vercel.app)",
        },
    )
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = json.loads(resp.read())

    elements = data.get("elements", [])
    print(f"Got {len(elements)} elements")
    OUT_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved → {OUT_FILE}")

if __name__ == "__main__":
    main()
