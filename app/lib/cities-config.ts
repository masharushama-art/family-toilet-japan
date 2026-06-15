export const CITIES_CONFIG = {
  tokyo:      { name: "Tokyo",      jaName: "東京",    lat: 35.681, lon: 139.767 },
  yokohama:   { name: "Yokohama",   jaName: "横浜",    lat: 35.443, lon: 139.638 },
  chiba:      { name: "Chiba",      jaName: "千葉",    lat: 35.605, lon: 140.123 },
  osaka:      { name: "Osaka",      jaName: "大阪",    lat: 34.693, lon: 135.502 },
  kyoto:      { name: "Kyoto",      jaName: "京都",    lat: 35.011, lon: 135.768 },
  nagoya:     { name: "Nagoya",     jaName: "名古屋",  lat: 35.170, lon: 136.882 },
  fukuoka:    { name: "Fukuoka",    jaName: "福岡",    lat: 33.590, lon: 130.401 },
  nara:       { name: "Nara",       jaName: "奈良",    lat: 34.685, lon: 135.805 },
  sapporo:    { name: "Sapporo",    jaName: "札幌",    lat: 43.062, lon: 141.354 },
  sendai:     { name: "Sendai",     jaName: "仙台",    lat: 38.268, lon: 140.869 },
  aomori:     { name: "Aomori",     jaName: "青森",    lat: 40.824, lon: 140.740 },
  iwate:      { name: "Morioka",    jaName: "盛岡",    lat: 39.703, lon: 141.154 },
  akita:      { name: "Akita",      jaName: "秋田",    lat: 39.718, lon: 140.102 },
  yamagata:   { name: "Yamagata",   jaName: "山形",    lat: 38.240, lon: 140.363 },
  fukushima:  { name: "Fukushima",  jaName: "福島",    lat: 37.750, lon: 140.467 },
  saitama:    { name: "Saitama",    jaName: "さいたま", lat: 35.861, lon: 139.645 },
  ibaraki:    { name: "Mito",       jaName: "水戸",    lat: 36.341, lon: 140.446 },
  tochigi:    { name: "Utsunomiya", jaName: "宇都宮",  lat: 36.566, lon: 139.883 },
  gunma:      { name: "Maebashi",   jaName: "前橋",    lat: 36.391, lon: 139.060 },
  niigata:    { name: "Niigata",    jaName: "新潟",    lat: 37.902, lon: 139.023 },
  toyama:     { name: "Toyama",     jaName: "富山",    lat: 36.695, lon: 137.211 },
  kanazawa:   { name: "Kanazawa",   jaName: "金沢",    lat: 36.594, lon: 136.625 },
  fukui:      { name: "Fukui",      jaName: "福井",    lat: 36.065, lon: 136.221 },
  yamanashi:  { name: "Kofu",       jaName: "甲府",    lat: 35.664, lon: 138.568 },
  nagano:     { name: "Nagano",     jaName: "長野",    lat: 36.651, lon: 138.181 },
  shizuoka:   { name: "Shizuoka",   jaName: "静岡",    lat: 34.977, lon: 138.383 },
  gifu:       { name: "Gifu",       jaName: "岐阜",    lat: 35.423, lon: 136.760 },
  mie:        { name: "Tsu",        jaName: "津",      lat: 34.730, lon: 136.508 },
  kobe:       { name: "Kobe",       jaName: "神戸",    lat: 34.690, lon: 135.195 },
  shiga:      { name: "Otsu",       jaName: "大津",    lat: 35.004, lon: 135.869 },
  wakayama:   { name: "Wakayama",   jaName: "和歌山",  lat: 34.226, lon: 135.167 },
  hiroshima:  { name: "Hiroshima",  jaName: "広島",    lat: 34.385, lon: 132.455 },
  okayama:    { name: "Okayama",    jaName: "岡山",    lat: 34.655, lon: 133.919 },
  tottori:    { name: "Tottori",    jaName: "鳥取",    lat: 35.501, lon: 134.237 },
  shimane:    { name: "Matsue",     jaName: "松江",    lat: 35.472, lon: 133.050 },
  yamaguchi:  { name: "Yamaguchi",  jaName: "山口",    lat: 34.186, lon: 131.470 },
  tokushima:  { name: "Tokushima",  jaName: "徳島",    lat: 34.066, lon: 134.559 },
  kagawa:     { name: "Takamatsu",  jaName: "高松",    lat: 34.340, lon: 134.043 },
  ehime:      { name: "Matsuyama",  jaName: "松山",    lat: 33.839, lon: 132.765 },
  kochi:      { name: "Kochi",      jaName: "高知",    lat: 33.559, lon: 133.531 },
  saga:       { name: "Saga",       jaName: "佐賀",    lat: 33.249, lon: 130.299 },
  nagasaki:   { name: "Nagasaki",   jaName: "長崎",    lat: 32.745, lon: 129.873 },
  kumamoto:   { name: "Kumamoto",   jaName: "熊本",    lat: 32.803, lon: 130.707 },
  oita:       { name: "Oita",       jaName: "大分",    lat: 33.238, lon: 131.612 },
  miyazaki:   { name: "Miyazaki",   jaName: "宮崎",    lat: 31.911, lon: 131.423 },
  kagoshima:  { name: "Kagoshima",  jaName: "鹿児島",  lat: 31.560, lon: 130.558 },
  okinawa:    { name: "Naha",       jaName: "那覇",    lat: 26.212, lon: 127.681 },
} as const;

export type CitySlug = keyof typeof CITIES_CONFIG;

export function getNearestCity(lat: number, lon: number): CitySlug {
  let nearest: CitySlug = "tokyo";
  let minDist = Infinity;
  for (const [slug, c] of Object.entries(CITIES_CONFIG)) {
    const d = Math.hypot(lat - c.lat, lon - c.lon);
    if (d < minDist) { minDist = d; nearest = slug as CitySlug; }
  }
  return nearest;
}
