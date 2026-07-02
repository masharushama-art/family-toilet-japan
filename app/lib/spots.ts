// 主要駅・観光地のスポットデータ
// /spot/[slug]（en）と /{lang}/spot/[slug] でエリア別トイレページを自動生成する

export interface Spot {
  slug: string;
  city: string; // CitySlug
  lat: number;
  lon: number;
  type: "station" | "attraction";
  names: { en: string; ja: string; zh: string; ko: string };
}

export const SPOTS: Spot[] = [
  // ---- Tokyo ----
  { slug: "shinjuku-station", city: "tokyo", lat: 35.6896, lon: 139.7006, type: "station", names: { en: "Shinjuku Station", ja: "新宿駅", zh: "新宿車站", ko: "신주쿠역" } },
  { slug: "shibuya-station", city: "tokyo", lat: 35.658, lon: 139.7016, type: "station", names: { en: "Shibuya Station", ja: "渋谷駅", zh: "澀谷車站", ko: "시부야역" } },
  { slug: "tokyo-station", city: "tokyo", lat: 35.6812, lon: 139.7671, type: "station", names: { en: "Tokyo Station", ja: "東京駅", zh: "東京車站", ko: "도쿄역" } },
  { slug: "ueno-station", city: "tokyo", lat: 35.7141, lon: 139.7774, type: "station", names: { en: "Ueno Station", ja: "上野駅", zh: "上野車站", ko: "우에노역" } },
  { slug: "ikebukuro-station", city: "tokyo", lat: 35.7295, lon: 139.7109, type: "station", names: { en: "Ikebukuro Station", ja: "池袋駅", zh: "池袋車站", ko: "이케부쿠로역" } },
  { slug: "shinagawa-station", city: "tokyo", lat: 35.6285, lon: 139.7387, type: "station", names: { en: "Shinagawa Station", ja: "品川駅", zh: "品川車站", ko: "시나가와역" } },
  { slug: "asakusa-sensoji", city: "tokyo", lat: 35.7148, lon: 139.7967, type: "attraction", names: { en: "Asakusa & Senso-ji", ja: "浅草・浅草寺", zh: "淺草・淺草寺", ko: "아사쿠사・센소지" } },
  { slug: "ginza", city: "tokyo", lat: 35.6717, lon: 139.765, type: "attraction", names: { en: "Ginza", ja: "銀座", zh: "銀座", ko: "긴자" } },
  { slug: "akihabara", city: "tokyo", lat: 35.6984, lon: 139.7731, type: "attraction", names: { en: "Akihabara", ja: "秋葉原", zh: "秋葉原", ko: "아키하바라" } },
  { slug: "harajuku", city: "tokyo", lat: 35.6702, lon: 139.7027, type: "attraction", names: { en: "Harajuku", ja: "原宿", zh: "原宿", ko: "하라주쿠" } },
  { slug: "roppongi", city: "tokyo", lat: 35.6628, lon: 139.7315, type: "attraction", names: { en: "Roppongi", ja: "六本木", zh: "六本木", ko: "롯폰기" } },
  { slug: "tokyo-skytree", city: "tokyo", lat: 35.7101, lon: 139.8107, type: "attraction", names: { en: "Tokyo Skytree", ja: "東京スカイツリー", zh: "東京晴空塔", ko: "도쿄 스카이트리" } },
  { slug: "odaiba", city: "tokyo", lat: 35.63, lon: 139.7756, type: "attraction", names: { en: "Odaiba", ja: "お台場", zh: "台場", ko: "오다이바" } },
  { slug: "tokyo-dome", city: "tokyo", lat: 35.7056, lon: 139.7519, type: "attraction", names: { en: "Tokyo Dome", ja: "東京ドーム", zh: "東京巨蛋", ko: "도쿄돔" } },
  { slug: "ueno-park-zoo", city: "tokyo", lat: 35.7156, lon: 139.7713, type: "attraction", names: { en: "Ueno Park & Zoo", ja: "上野公園・動物園", zh: "上野公園・動物園", ko: "우에노 공원・동물원" } },

  // ---- Yokohama ----
  { slug: "yokohama-station", city: "yokohama", lat: 35.466, lon: 139.6222, type: "station", names: { en: "Yokohama Station", ja: "横浜駅", zh: "橫濱車站", ko: "요코하마역" } },
  { slug: "minato-mirai", city: "yokohama", lat: 35.4574, lon: 139.6325, type: "attraction", names: { en: "Minato Mirai", ja: "みなとみらい", zh: "港未來", ko: "미나토미라이" } },
  { slug: "yokohama-chinatown", city: "yokohama", lat: 35.4437, lon: 139.6425, type: "attraction", names: { en: "Yokohama Chinatown", ja: "横浜中華街", zh: "橫濱中華街", ko: "요코하마 차이나타운" } },
  { slug: "shin-yokohama-station", city: "yokohama", lat: 35.507, lon: 139.6176, type: "station", names: { en: "Shin-Yokohama Station", ja: "新横浜駅", zh: "新橫濱車站", ko: "신요코하마역" } },

  // ---- Chiba ----
  { slug: "maihama-disney", city: "chiba", lat: 35.6363, lon: 139.8836, type: "attraction", names: { en: "Maihama (Tokyo Disney Resort)", ja: "舞浜（東京ディズニーリゾート）", zh: "舞濱（東京迪士尼度假區）", ko: "마이하마(도쿄 디즈니 리조트)" } },
  { slug: "makuhari-messe", city: "chiba", lat: 35.648, lon: 140.0344, type: "attraction", names: { en: "Makuhari Messe", ja: "幕張メッセ", zh: "幕張展覽館", ko: "마쿠하리 멧세" } },

  // ---- Saitama ----
  { slug: "omiya-station", city: "saitama", lat: 35.9064, lon: 139.6238, type: "station", names: { en: "Omiya Station", ja: "大宮駅", zh: "大宮車站", ko: "오미야역" } },

  // ---- Osaka ----
  { slug: "namba-station", city: "osaka", lat: 34.6659, lon: 135.5013, type: "station", names: { en: "Namba Station", ja: "なんば駅", zh: "難波車站", ko: "난바역" } },
  { slug: "umeda-osaka-station", city: "osaka", lat: 34.7025, lon: 135.4959, type: "station", names: { en: "Umeda / Osaka Station", ja: "梅田・大阪駅", zh: "梅田・大阪車站", ko: "우메다・오사카역" } },
  { slug: "tennoji-station", city: "osaka", lat: 34.6465, lon: 135.514, type: "station", names: { en: "Tennoji Station", ja: "天王寺駅", zh: "天王寺車站", ko: "텐노지역" } },
  { slug: "shin-osaka-station", city: "osaka", lat: 34.7335, lon: 135.5002, type: "station", names: { en: "Shin-Osaka Station", ja: "新大阪駅", zh: "新大阪車站", ko: "신오사카역" } },
  { slug: "osaka-castle", city: "osaka", lat: 34.6873, lon: 135.5262, type: "attraction", names: { en: "Osaka Castle", ja: "大阪城", zh: "大阪城", ko: "오사카성" } },
  { slug: "dotonbori", city: "osaka", lat: 34.6687, lon: 135.5013, type: "attraction", names: { en: "Dotonbori", ja: "道頓堀", zh: "道頓堀", ko: "도톤보리" } },
  { slug: "universal-studios-japan", city: "osaka", lat: 34.6654, lon: 135.4323, type: "attraction", names: { en: "Universal Studios Japan", ja: "ユニバーサル・スタジオ・ジャパン", zh: "日本環球影城", ko: "유니버설 스튜디오 재팬" } },

  // ---- Kyoto ----
  { slug: "kyoto-station", city: "kyoto", lat: 34.9858, lon: 135.7585, type: "station", names: { en: "Kyoto Station", ja: "京都駅", zh: "京都車站", ko: "교토역" } },
  { slug: "gion", city: "kyoto", lat: 35.0037, lon: 135.7752, type: "attraction", names: { en: "Gion", ja: "祇園", zh: "祇園", ko: "기온" } },
  { slug: "arashiyama", city: "kyoto", lat: 35.0094, lon: 135.6768, type: "attraction", names: { en: "Arashiyama", ja: "嵐山", zh: "嵐山", ko: "아라시야마" } },
  { slug: "fushimi-inari", city: "kyoto", lat: 34.9671, lon: 135.7727, type: "attraction", names: { en: "Fushimi Inari Shrine", ja: "伏見稲荷大社", zh: "伏見稻荷大社", ko: "후시미 이나리 신사" } },
  { slug: "kinkakuji", city: "kyoto", lat: 35.0394, lon: 135.7292, type: "attraction", names: { en: "Kinkaku-ji (Golden Pavilion)", ja: "金閣寺", zh: "金閣寺", ko: "킨카쿠지(금각사)" } },
  { slug: "nijo-castle", city: "kyoto", lat: 35.0142, lon: 135.7481, type: "attraction", names: { en: "Nijo Castle", ja: "二条城", zh: "二條城", ko: "니조성" } },
  { slug: "kiyomizu-dera", city: "kyoto", lat: 34.9949, lon: 135.785, type: "attraction", names: { en: "Kiyomizu-dera", ja: "清水寺", zh: "清水寺", ko: "기요미즈데라" } },

  // ---- Nagoya ----
  { slug: "nagoya-station", city: "nagoya", lat: 35.1709, lon: 136.8815, type: "station", names: { en: "Nagoya Station", ja: "名古屋駅", zh: "名古屋車站", ko: "나고야역" } },
  { slug: "sakae", city: "nagoya", lat: 35.168, lon: 136.9086, type: "attraction", names: { en: "Sakae", ja: "栄", zh: "榮", ko: "사카에" } },
  { slug: "nagoya-castle", city: "nagoya", lat: 35.1856, lon: 136.8998, type: "attraction", names: { en: "Nagoya Castle", ja: "名古屋城", zh: "名古屋城", ko: "나고야성" } },
  { slug: "nagoya-port", city: "nagoya", lat: 35.0947, lon: 136.8781, type: "attraction", names: { en: "Port of Nagoya (Aquarium)", ja: "名古屋港（水族館）", zh: "名古屋港（水族館）", ko: "나고야항(수족관)" } },
  { slug: "atsuta-jingu", city: "nagoya", lat: 35.1278, lon: 136.9086, type: "attraction", names: { en: "Atsuta Jingu Shrine", ja: "熱田神宮", zh: "熱田神宮", ko: "아츠타 신궁" } },

  // ---- Fukuoka ----
  { slug: "hakata-station", city: "fukuoka", lat: 33.5902, lon: 130.4207, type: "station", names: { en: "Hakata Station", ja: "博多駅", zh: "博多車站", ko: "하카타역" } },
  { slug: "tenjin", city: "fukuoka", lat: 33.5914, lon: 130.3989, type: "attraction", names: { en: "Tenjin", ja: "天神", zh: "天神", ko: "텐진" } },
  { slug: "canal-city", city: "fukuoka", lat: 33.5899, lon: 130.4114, type: "attraction", names: { en: "Canal City Hakata", ja: "キャナルシティ博多", zh: "運河城博多", ko: "캐널시티 하카타" } },
  { slug: "ohori-park", city: "fukuoka", lat: 33.586, lon: 130.376, type: "attraction", names: { en: "Ohori Park", ja: "大濠公園", zh: "大濠公園", ko: "오호리 공원" } },

  // ---- Sapporo ----
  { slug: "sapporo-station", city: "sapporo", lat: 43.0687, lon: 141.3508, type: "station", names: { en: "Sapporo Station", ja: "札幌駅", zh: "札幌車站", ko: "삿포로역" } },
  { slug: "odori-park", city: "sapporo", lat: 43.0606, lon: 141.354, type: "attraction", names: { en: "Odori Park", ja: "大通公園", zh: "大通公園", ko: "오도리 공원" } },
  { slug: "susukino", city: "sapporo", lat: 43.0555, lon: 141.3535, type: "attraction", names: { en: "Susukino", ja: "すすきの", zh: "薄野", ko: "스스키노" } },
  { slug: "maruyama-zoo", city: "sapporo", lat: 43.0525, lon: 141.3086, type: "attraction", names: { en: "Maruyama Zoo", ja: "円山動物園", zh: "圓山動物園", ko: "마루야마 동물원" } },

  // ---- Sendai ----
  { slug: "sendai-station", city: "sendai", lat: 38.2601, lon: 140.8823, type: "station", names: { en: "Sendai Station", ja: "仙台駅", zh: "仙台車站", ko: "센다이역" } },
  { slug: "ichibancho", city: "sendai", lat: 38.262, lon: 140.871, type: "attraction", names: { en: "Ichibancho Arcade", ja: "一番町商店街", zh: "一番町商店街", ko: "이치반초 상점가" } },

  // ---- Hiroshima ----
  { slug: "hiroshima-station", city: "hiroshima", lat: 34.3979, lon: 132.4757, type: "station", names: { en: "Hiroshima Station", ja: "広島駅", zh: "廣島車站", ko: "히로시마역" } },
  { slug: "peace-memorial-park", city: "hiroshima", lat: 34.3925, lon: 132.4525, type: "attraction", names: { en: "Peace Memorial Park", ja: "平和記念公園", zh: "和平紀念公園", ko: "평화기념공원" } },
  { slug: "hondori", city: "hiroshima", lat: 34.3934, lon: 132.457, type: "attraction", names: { en: "Hondori Shopping Street", ja: "本通商店街", zh: "本通商店街", ko: "혼도리 상점가" } },

  // ---- Nara ----
  { slug: "nara-park", city: "nara", lat: 34.6851, lon: 135.843, type: "attraction", names: { en: "Nara Park", ja: "奈良公園", zh: "奈良公園", ko: "나라 공원" } },
  { slug: "kintetsu-nara-station", city: "nara", lat: 34.6845, lon: 135.8281, type: "station", names: { en: "Kintetsu Nara Station", ja: "近鉄奈良駅", zh: "近鐵奈良車站", ko: "긴테츠 나라역" } },

  // ---- Kobe ----
  { slug: "sannomiya-station", city: "kobe", lat: 34.6947, lon: 135.195, type: "station", names: { en: "Sannomiya Station", ja: "三宮駅", zh: "三宮車站", ko: "산노미야역" } },
  { slug: "kobe-harborland", city: "kobe", lat: 34.6796, lon: 135.178, type: "attraction", names: { en: "Kobe Harborland", ja: "神戸ハーバーランド", zh: "神戶臨海樂園", ko: "고베 하버랜드" } },

  // ---- Kanazawa ----
  { slug: "kanazawa-station", city: "kanazawa", lat: 36.578, lon: 136.6478, type: "station", names: { en: "Kanazawa Station", ja: "金沢駅", zh: "金澤車站", ko: "가나자와역" } },
  { slug: "kenrokuen", city: "kanazawa", lat: 36.5613, lon: 136.6626, type: "attraction", names: { en: "Kenroku-en Garden", ja: "兼六園", zh: "兼六園", ko: "겐로쿠엔" } },

  // ---- Okinawa ----
  { slug: "kokusai-dori", city: "okinawa", lat: 26.2145, lon: 127.6875, type: "attraction", names: { en: "Kokusai Street (Naha)", ja: "国際通り（那覇）", zh: "國際通（那霸）", ko: "고쿠사이도리(나하)" } },
  { slug: "naha-airport", city: "okinawa", lat: 26.2065, lon: 127.6465, type: "station", names: { en: "Naha Airport", ja: "那覇空港", zh: "那霸機場", ko: "나하 공항" } },
  { slug: "shuri-castle", city: "okinawa", lat: 26.217, lon: 127.7195, type: "attraction", names: { en: "Shuri Castle", ja: "首里城", zh: "首里城", ko: "슈리성" } },
];

export const SPOT_SLUGS = SPOTS.map((s) => s.slug);

export function getSpot(slug: string): Spot | undefined {
  return SPOTS.find((s) => s.slug === slug);
}

export function getSpotsByCity(city: string): Spot[] {
  return SPOTS.filter((s) => s.city === city);
}

// 距離（km）: 簡易ハバースイン
export function spotDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearbySpots(lat: number, lon: number, city: string, limit = 3): Spot[] {
  return SPOTS.filter((s) => s.city === city)
    .map((s) => ({ s, d: spotDistanceKm(lat, lon, s.lat, s.lon) }))
    .filter(({ d }) => d <= 3)
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map(({ s }) => s);
}
