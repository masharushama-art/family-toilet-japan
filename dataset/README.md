# Japan Family Toilets Dataset（日本の公衆トイレ・おむつ交換台データセット）

Locations of public toilets in Japan, with attributes useful for families with babies and for wheelchair users
(baby changing table, wheelchair access, fee). Compiled from OpenStreetMap and municipal open data for
[Family Toilet Japan](https://familytoiletjapan.com) — a free map for finding family-friendly toilets across Japan.

日本全国の公衆トイレの位置情報と、おむつ交換台・車いす対応・有料/無料などの属性をまとめたオープンデータです。
OpenStreetMap と自治体のオープンデータから作成し、毎月更新しています。

- **Records**: see [`stats.json`](stats.json) (16,000+ toilets across 48 areas)
- **Formats**: [CSV](japan-family-toilets.csv) (UTF-8) and [GeoJSON](japan-family-toilets.geojson) (WGS84, Point)
- **Update cycle**: monthly (OpenStreetMap re-fetch). `stats.json` has the generation date.
- **Website with the same data (map, search)**: https://familytoiletjapan.com
- **Coverage report and data history**: https://familytoiletjapan.com/coverage
- **Sources and attribution**: https://familytoiletjapan.com/attribution

## Files

| File | Description |
|---|---|
| `japan-family-toilets.csv` | All records, one row per toilet (UTF-8, comma-separated, header row) |
| `japan-family-toilets.geojson` | Same records as a GeoJSON FeatureCollection (Point geometries, `[lon, lat]`) |
| `stats.json` | Record counts and generation date |
| `../CITATION.cff` | Citation metadata (repository root) |

## Columns

| Column | Description |
|---|---|
| `id` | Unique ID. `osm-node-…` / `osm-way-…` are OpenStreetMap element IDs; `opendata_*` are municipal records |
| `source` | `osm`, `opendata_tokyo`, `opendata_osaka`, `opendata_nagoya` |
| `license` | License of that record's source: `ODbL-1.0` or `CC-BY-4.0` |
| `city` | Area slug (e.g. `tokyo`, `osaka`, `kyoto`) |
| `ward` | Ward (Tokyo municipal records only, when available) |
| `name`, `name_en` | Facility name in Japanese / English, when available (many OSM toilets have no name) |
| `lat`, `lon` | WGS84 coordinates (decimal degrees) |
| `changing_table` | `true` if the source says the toilet has a baby changing table. See the note below |
| `changing_table_location` | Where the changing table is (e.g. `male_toilet`, `female_toilet`), OSM only |
| `wheelchair` | `true` if the source says it is wheelchair accessible. See the note below |
| `fee` | `false` if the toilet is **not** marked as paid. See the note below |
| `opening_hours` | OSM `opening_hours` string, when available |
| `level` | Floor level, when available |
| `operator` | Operator, when available |
| `address` | Address, when available |
| `location_approximate` | `true` if coordinates were estimated by geocoding an address (Nagoya municipal records; about chome-level accuracy) |
| `page_url` | Detail page on familytoiletjapan.com (only for toilets with a changing table) |

Empty cells mean the value is not available.

### How to read `true` / `false` (important)

For records from OpenStreetMap, the attributes are derived from OSM tags by a simple rule:
`changing_table` is `true` only when the OSM tag `changing_table=yes` is present, `wheelchair` is `true` only when
`wheelchair=yes`, and `fee` is `true` only when `fee=yes`.
**`false` therefore means "not marked as yes in the source", not "confirmed absent"** — in particular, `fee=false`
does not prove that the toilet is free, and `changing_table=false` does not prove that there is no changing table.
Many toilets are simply not tagged yet. Please treat `true` as the reliable signal and `false` as "unknown / not mapped".

OpenStreetMap coverage differs between areas; municipal open data is included for parts of Tokyo, Osaka and Nagoya.
Data can be outdated or wrong. Please verify on site, especially for opening hours.

## License and attribution

This dataset is a derived database that contains data from OpenStreetMap, and is distributed under the
[Open Database License (ODbL) 1.0](https://opendatacommons.org/licenses/odbl/).

- **Required attribution**: `© OpenStreetMap contributors` ([copyright](https://www.openstreetmap.org/copyright)), plus the
  data providers below when you use their records.
- Records with `license=CC-BY-4.0` come from municipal open data published under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/):
  - Tokyo (16 wards) — 東京都オープンデータカタログ / each ward: https://catalog.data.metro.tokyo.lg.jp/
  - Osaka — 大阪府オープンデータ / マップナビおおさか
  - Nagoya — 名古屋市（BODIK）オープンデータ. Coordinates for some records were geocoded with the
    Geospatial Information Authority of Japan (国土地理院) address search API (attribution required).
- Station-area pages on the website additionally use station coordinates from the Public Transportation Open Data
  Center (ODPT); those are not part of this dataset.

If you share the data or a derived database, keep the ODbL terms (attribution, share-alike) and the attribution above.
Details: https://familytoiletjapan.com/attribution

> This file is a plain-language summary, not legal advice. Check the original licenses before commercial reuse.

## Citation

```
Family Toilet Japan. (2026). Japan Family Toilets Dataset [Data set]. Zenodo. https://doi.org/10.5281/zenodo.23396111
Contains information from OpenStreetMap, © OpenStreetMap contributors, ODbL 1.0.
```

See also [`CITATION.cff`](../CITATION.cff).

## Regenerating

The files are generated from the site's data (`public/data/cities/*.json`) by `node scripts/build-dataset.mjs`
and are refreshed by the monthly data-refresh workflow.
