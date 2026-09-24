export type SeasonLang = "en" | "ja" | "zh" | "ko";

export interface SeasonalGuide {
  slug: string;
  icon: string;
  // 掲載期間（日本時間の月日、両端を含む）。旅行計画の先行期間を見込んで見頃より早めに始める。
  // start > end の場合は年をまたぐ（例: 11-15〜02-28）
  start: string;
  end: string;
  text: Record<SeasonLang, { title: string; desc: string }>;
}

// 4言語すべてにガイドが存在するslugのみ（ja/zh/koで404にならないこと）
export const SEASONAL_GUIDES: SeasonalGuide[] = [
  {
    slug: "cherry-blossoms-with-kids-japan",
    icon: "🌸",
    start: "02-01",
    end: "04-30",
    text: {
      en: { title: "Cherry Blossoms (Sakura) with Kids", desc: "Best timing, stroller-friendly hanami spots, and crowd avoidance" },
      ja: { title: "子連れ花見・桜スポットガイド", desc: "見頃の時期・穴場スポット・混雑回避" },
      zh: { title: "帶寶寶賞櫻完整指南", desc: "花期時機・私房景點・避開人潮" },
      ko: { title: "아기와 함께하는 일본 벚꽃놀이", desc: "개화 시기・명소・혼잡 피하기" },
    },
  },
  {
    slug: "summer-festivals-with-kids-japan",
    icon: "🎆",
    start: "05-15",
    end: "08-31",
    text: {
      en: { title: "Summer Festivals & Fireworks with Kids", desc: "Crowd avoidance, heatstroke prevention, and finding toilets" },
      ja: { title: "子連れ夏祭り・花火大会攻略ガイド", desc: "混雑回避・熱中症対策・トイレの探し方" },
      zh: { title: "帶寶寶參加夏日祭典・煙火大會", desc: "避開人潮・防中暑對策・廁所尋找方式" },
      ko: { title: "아기와 함께하는 여름 축제・불꽃놀이", desc: "인파 피하기・열사병 대책・화장실 찾기" },
    },
  },
  {
    slug: "autumn-foliage-with-kids-japan",
    icon: "🍁",
    start: "09-01",
    end: "11-30",
    text: {
      en: { title: "Autumn Foliage (Koyo) with Kids", desc: "Best timing, stroller-friendly spots, and layering for the cold" },
      ja: { title: "子連れ紅葉狩りガイド", desc: "見頃の時期・穴場スポット・防寒対策" },
      zh: { title: "帶寶寶賞楓完整指南", desc: "賞楓時機・私房景點・保暖對策" },
      ko: { title: "아기와 함께하는 일본 단풍 여행", desc: "절정 시기・명소・방한 대책" },
    },
  },
  {
    slug: "tokyo-with-baby-winter",
    icon: "🧣",
    start: "11-15",
    end: "02-28",
    text: {
      en: { title: "Tokyo with Baby in Winter", desc: "Illuminations, indoor attractions, and cold weather tips" },
      ja: { title: "冬の東京を赤ちゃんと楽しむ", desc: "イルミネーション・屋内スポット・防寒対策" },
      zh: { title: "冬季帶寶寶遊東京", desc: "燈飾・室內景點・保暖攻略" },
      ko: { title: "겨울철 아기와 함께하는 도쿄", desc: "일루미네이션・실내 명소・방한 대책" },
    },
  },
];

function tokyoMonthDay(date: Date): string {
  // en-CA は YYYY-MM-DD 形式になる
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" })
    .format(date)
    .slice(5);
}

function inWindow(md: string, g: SeasonalGuide): boolean {
  return g.start <= g.end ? md >= g.start && md <= g.end : md >= g.start || md <= g.end;
}

// 期間が重なる時期（11月後半・2月）は、新しく始まった季節を先に出す
export function getSeasonalSlugs(date: Date): string[] {
  const md = tokyoMonthDay(date);
  const daysSinceStart = (g: SeasonalGuide) => {
    const [sm, sd] = g.start.split("-").map(Number);
    const [m, d] = md.split("-").map(Number);
    return ((m - sm) * 31 + (d - sd) + 372) % 372;
  };
  return SEASONAL_GUIDES.filter((g) => inWindow(md, g))
    .sort((a, b) => daysSinceStart(a) - daysSinceStart(b))
    .map((g) => g.slug);
}
