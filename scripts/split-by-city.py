"""
toilets.json を都市別 JSON に分割する。
public/data/cities/{city}.json として出力。

使い方:
  python scripts/split-by-city.py
"""
import json
from pathlib import Path
from collections import Counter

SRC = Path(__file__).parent.parent / "public" / "data" / "toilets.json"
OUT_DIR = Path(__file__).parent.parent / "public" / "data" / "cities"
OUT_DIR.mkdir(exist_ok=True)

data = json.load(open(SRC, encoding="utf-8"))
cities = Counter(t.get("city", "other") for t in data)

for city, count in sorted(cities.items(), key=lambda x: -x[1]):
    records = [t for t in data if t.get("city") == city]
    out = OUT_DIR / f"{city}.json"
    out.write_text(json.dumps(records, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    size_kb = out.stat().st_size / 1024
    print(f"  {city:12s}: {count:,} records → {size_kb:.0f}KB")

print(f"\nTotal: {len(data):,} records across {len(cities)} cities")
print(f"Output: {OUT_DIR}")
