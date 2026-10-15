# Family Toilet Japan

日本全国の公衆トイレを、おむつ交換台・車いす対応・無料/有料で探せる無料の地図サービスです（日本語・英語・繁体字中国語・韓国語）。
A free map for finding family-friendly public toilets in Japan — baby changing tables, wheelchair access and free toilets.

- Website: https://familytoiletjapan.com
- Data coverage report: https://familytoiletjapan.com/coverage
- Data sources and licenses: https://familytoiletjapan.com/attribution

## Open data

The toilet data is published as an open dataset (CSV and GeoJSON, 16,000+ toilets, updated monthly):

**[`dataset/`](dataset/)** — see [`dataset/README.md`](dataset/README.md) for the schema, how to read the attributes, and the license.

- License: [ODbL 1.0](https://opendatacommons.org/licenses/odbl/) — © OpenStreetMap contributors, plus municipal open data (CC BY 4.0) for parts of Tokyo, Osaka and Nagoya
- Citation: [`CITATION.cff`](CITATION.cff) · DOI: [10.5281/zenodo.23396111](https://doi.org/10.5281/zenodo.23396111) (Zenodo)

The data comes from [OpenStreetMap](https://www.openstreetmap.org/) volunteers and municipal open data. If a toilet near you is
missing or wrong, you can fix it directly on OpenStreetMap — the next monthly update will include the change.

## Tech

Next.js (App Router) on Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare). Pages are generated at build time
from `public/data/cities/*.json`; the data is refreshed monthly by a GitHub Actions workflow
(`.github/workflows/monthly-data-refresh.yml`).

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (3,500+ pages, takes a few minutes)
npm run cf:preview   # build and preview on the Cloudflare Workers runtime
```
