import Link from "next/link";
import { getDataReport, type Snapshot } from "../lib/data-report";
import { CITIES, type CitySlug } from "../lib/toilet-data";
import { CONTACT_FORM_URL } from "../lib/contact";

export type ReportLang = "en" | "ja";

const BASE = "https://familytoiletjapan.com";

// 数値は毎月のデータ更新で変わるため、所見の文章も実データから組み立てる。
// 「どこが一番良いか」の順位づけはしない: 件数の差は実態よりもデータの網羅度
// （自治体オープンデータの有無・OSMのタグ付けの濃さ）を反映するため（ROADMAP.md参照）。
export default function DataReport({ lang }: { lang: ReportLang }) {
  const { rows, totals, history, latest, previous } = getDataReport();
  const ja = lang === "ja";
  const n = (v: number) => v.toLocaleString(ja ? "ja-JP" : "en-US");
  const pct = (a: number, b: number) => `${((a / Math.max(b, 1)) * 100).toFixed(1)}%`;
  const signed = (v: number) => (v > 0 ? `+${n(v)}` : v < 0 ? `−${n(-v)}` : "±0");
  const cityName = (slug: string) =>
    slug in CITIES ? (ja ? CITIES[slug as CitySlug].jaName : CITIES[slug as CitySlug].name) : ja ? "その他の地域" : "Other areas";
  const cityHref = (slug: string) => (slug in CITIES ? (ja ? `/ja/${slug}` : `/${slug}`) : undefined);

  const openDataRows = rows.filter((r) => r.opendata > 0).sort((a, b) => b.opendata - a.opendata);
  const tokyo = rows.find((r) => r.slug === "tokyo");
  const delta = (key: keyof Omit<Snapshot, "date" | "cities">) => (previous ? latest[key] - previous[key] : 0);
  const openDataList = openDataRows.map((r) => `${cityName(r.slug)} ${n(r.opendata)}`).join(ja ? "、" : ", ");

  const findings = ja
    ? [
        `収録しているトイレは全国で${n(totals.total)}件。うちOpenStreetMap由来が${n(totals.osm)}件（${pct(totals.osm, totals.total)}）、自治体オープンデータ由来が${n(totals.opendata)}件（${openDataList}）です。`,
        `おむつ交換台が「ある」と確認できているトイレは${n(totals.changingTable)}件（全体の${pct(totals.changingTable, totals.total)}）。車いす対応が確認できているのは${n(totals.wheelchair)}件（${pct(totals.wheelchair, totals.total)}）です。`,
        tokyo
          ? `おむつ交換台の確認済みデータのうち${pct(tokyo.changingTable, totals.changingTable)}（${n(tokyo.changingTable)}件）が東京に集中しています。OpenStreetMapの登録が特に詳しいことに加え、複数の区が公衆トイレのオープンデータを公開していることが影響しています。`
          : "",
        `名称（施設名など）が分かっているのは${n(totals.named)}件（${pct(totals.named, totals.total)}）、営業時間が記録されているのは${n(totals.openingHours)}件にとどまります。`,
        previous
          ? `前回の更新（${previous.date}）から今回（${latest.date}）までに、トイレは${signed(delta("total"))}件、おむつ交換台の確認済みは${signed(delta("changingTable"))}件、車いす対応の確認済みは${signed(delta("wheelchair"))}件変化しました。`
          : "",
      ]
    : [
        `We map ${n(totals.total)} public toilets across Japan: ${n(totals.osm)} (${pct(totals.osm, totals.total)}) from OpenStreetMap and ${n(totals.opendata)} from municipal open data (${openDataList}).`,
        `${n(totals.changingTable)} toilets (${pct(totals.changingTable, totals.total)}) are confirmed to have a baby changing table, and ${n(totals.wheelchair)} (${pct(totals.wheelchair, totals.total)}) are confirmed wheelchair accessible.`,
        tokyo
          ? `${pct(tokyo.changingTable, totals.changingTable)} of all confirmed changing tables (${n(tokyo.changingTable)}) are in Tokyo, which has both unusually detailed OpenStreetMap coverage and public-toilet open data from several wards.`
          : "",
        `Only ${n(totals.named)} records (${pct(totals.named, totals.total)}) include a name such as the building or park, and just ${n(totals.openingHours)} list opening hours.`,
        previous
          ? `Changes between the previous refresh (${previous.date}) and the latest one (${latest.date}) — toilets: ${signed(delta("total"))}; confirmed changing tables: ${signed(delta("changingTable"))}; confirmed wheelchair access: ${signed(delta("wheelchair"))}.`
          : "",
      ];

  const t = ja
    ? {
        back: "← ファミリートイレジャパン",
        title: "日本のファミリートイレ・データレポート",
        lead: "当サイトの地図に載っているトイレデータが、どこから来ていて、どこまで分かっていて、何が分かっていないのかを、実データの集計で公開しています。",
        refreshed: "データ更新日",
        findings: "主な数字",
        sources: "データの出どころ",
        sourcesBody:
          "データは2種類の公開データを組み合わせています。ひとつはボランティアが世界中で編集している地図データベースOpenStreetMap（ODbL）、もうひとつは自治体が公開している公衆トイレのオープンデータ（CC BY）です。毎月1日にOpenStreetMapから最新データを取り込み、内容を確認してからサイトに反映しています。",
        osmLabel: "OpenStreetMap",
        odLabel: "自治体オープンデータ",
        limits: "この数字で分かること・分からないこと",
        limitItems: [
          "「おむつ交換台あり」は、元データで「ある」と明記されているものだけを数えています。記載がないトイレは「ない」とは限らず、単に情報が登録されていない場合が多くあります。",
          "駅の構内やデパート・商業施設の中のトイレは、OpenStreetMapに登録されていないことが多く、実際より少なく出ます。たとえば大きなターミナル駅の周辺でも、データ上の確認済みおむつ交換台がごく少ない場合があります。",
          "地域ごとの件数の差は、トイレの実際の多さよりも、自治体がオープンデータを公開しているか、地元のOpenStreetMap編集者がどれだけ詳しく登録しているかを強く反映します。そのため、このレポートでは地域の順位づけはしていません。",
          "データは月1回の更新のため、閉鎖・改装などの最新の状況と異なる場合があります。",
        ],
        byArea: "地域別の収録状況",
        byAreaNote: "件数の多い順。数値は網羅度の目安で、トイレの実際の多さの順位ではありません。",
        colArea: "地域",
        colTotal: "件数",
        colOsm: "OSM",
        colOd: "自治体",
        colCt: "🍼 交換台",
        colWc: "♿ 車いす",
        colNamed: "名称あり",
        history: "更新履歴",
        colDate: "更新日",
        colChange: "増減",
        help: "データを良くするために",
        helpBody: [
          "トイレの追加や修正は、どなたでもOpenStreetMapで行えます。反映されたデータは翌月の更新で当サイトにも取り込まれます。",
          "おむつ交換台の情報は、OpenStreetMapのタグ「changing_table=yes」で登録できます。",
          "誤りを見つけたら、お問い合わせフォームからもお知らせください。",
        ],
        osmWiki: "changing_table タグの説明（OpenStreetMap Wiki）",
        contact: "お問い合わせフォーム",
        attribution: "出典・ライセンスの詳細",
        otherLang: "English version",
      }
    : {
        back: "← Family Toilet Japan",
        title: "Japan Family Toilet Data Report",
        lead: "Where the toilet data on our map comes from, what it covers, and what it can't tell you — published from the actual numbers and refreshed every month.",
        refreshed: "Data refreshed",
        findings: "Key numbers",
        sources: "Where the data comes from",
        sourcesBody:
          "We combine two kinds of open data: OpenStreetMap (ODbL), the volunteer-built map of the world, and public-toilet datasets published by Japanese municipalities (CC BY). On the 1st of every month we pull the latest OpenStreetMap data, review the changes, and then publish them to the site.",
        osmLabel: "OpenStreetMap",
        odLabel: "Municipal open data",
        limits: "What these numbers can — and can't — tell you",
        limitItems: [
          "\"Confirmed changing table\" counts only toilets whose source data explicitly says a changing table is present. A toilet without that information doesn't necessarily lack one — often nobody has recorded it yet.",
          "Toilets inside train stations, department stores and shopping malls are often missing from OpenStreetMap, so they are under-counted. Even around a major terminal station, the number of confirmed changing tables in the data can be very small.",
          "Differences between areas mostly reflect data coverage — whether the municipality publishes open data and how thoroughly local OpenStreetMap volunteers tag toilets — rather than how many toilets actually exist. That's why this report does not rank areas.",
          "The data is refreshed monthly, so recent closures or renovations may not be reflected yet.",
        ],
        byArea: "Coverage by area",
        byAreaNote: "Sorted by number of records. Treat the numbers as a measure of data coverage, not a ranking of where toilets are best.",
        colArea: "Area",
        colTotal: "Records",
        colOsm: "OSM",
        colOd: "Municipal",
        colCt: "🍼 Changing",
        colWc: "♿ Accessible",
        colNamed: "Named",
        history: "Update history",
        colDate: "Refresh date",
        colChange: "Change",
        help: "Help improve the data",
        helpBody: [
          "Anyone can add or correct a toilet on OpenStreetMap. Your edits are picked up by our next monthly refresh.",
          "Baby changing tables are recorded with the OpenStreetMap tag \"changing_table=yes\".",
          "Spotted a mistake? You can also tell us through our contact form.",
        ],
        osmWiki: "About the changing_table tag (OpenStreetMap Wiki)",
        contact: "Contact form",
        attribution: "Sources & licensing details",
        otherLang: "日本語版",
      };

  const home = ja ? "/ja" : "/";
  const url = `${BASE}${ja ? "/ja/coverage" : "/coverage"}`;
  const th = "py-2 pr-3 font-medium whitespace-nowrap";
  const td = "py-2 pr-3 text-right tabular-nums text-gray-700 dark:text-gray-300";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-sky-600 text-white px-6 py-12 text-center">
        <Link href={home} className="text-sky-200 text-sm mb-4 block hover:text-white">{t.back}</Link>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t.title}</h1>
        <p className="text-sky-100 max-w-xl mx-auto text-sm leading-relaxed">{t.lead}</p>
        <p className="text-sky-200 text-xs mt-3">{t.refreshed}: {latest.date}</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 text-gray-700 dark:text-gray-300">
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{t.findings}</h2>
          <ul className="space-y-3 text-sm leading-relaxed list-disc pl-5">
            {findings.filter(Boolean).map((f) => <li key={f}>{f}</li>)}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{t.sources}</h2>
          <p className="text-sm leading-relaxed mb-4">{t.sourcesBody}</p>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100">{t.osmLabel}</p>
              <p className="text-2xl font-bold text-sky-700 dark:text-sky-300 tabular-nums">{n(totals.osm)}</p>
            </div>
            <div className="bg-sky-50 dark:bg-sky-900/20 rounded-xl p-4">
              <p className="font-semibold text-gray-800 dark:text-gray-100">{t.odLabel}</p>
              <p className="text-2xl font-bold text-sky-700 dark:text-sky-300 tabular-nums">{n(totals.opendata)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{openDataList}</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{t.limits}</h2>
          <ul className="space-y-2 text-sm leading-relaxed list-disc pl-5">
            {t.limitItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">{t.byArea}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{t.byAreaNote}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100 dark:border-gray-800">
                  <th className={th}>{t.colArea}</th>
                  <th className={`${th} text-right`}>{t.colTotal}</th>
                  <th className={`${th} text-right`}>{t.colOsm}</th>
                  <th className={`${th} text-right`}>{t.colOd}</th>
                  <th className={`${th} text-right`}>{t.colCt}</th>
                  <th className={`${th} text-right`}>{t.colWc}</th>
                  <th className={`${th} text-right`}>{t.colNamed}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const href = cityHref(r.slug);
                  return (
                    <tr key={r.slug} className="border-b border-gray-50 dark:border-gray-900">
                      <td className="py-2 pr-3 whitespace-nowrap">
                        {href ? <Link href={href} className="text-sky-600 hover:underline font-medium">{cityName(r.slug)}</Link> : cityName(r.slug)}
                      </td>
                      <td className={td}>{n(r.total)}</td>
                      <td className={td}>{n(r.osm)}</td>
                      <td className={td}>{r.opendata ? n(r.opendata) : "–"}</td>
                      <td className={td}>{n(r.changingTable)}</td>
                      <td className={td}>{n(r.wheelchair)}</td>
                      <td className={td}>{pct(r.named, r.total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{t.history}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 text-xs border-b border-gray-100 dark:border-gray-800">
                  <th className={th}>{t.colDate}</th>
                  <th className={`${th} text-right`}>{t.colTotal}</th>
                  <th className={`${th} text-right`}>{t.colChange}</th>
                  <th className={`${th} text-right`}>{t.colCt}</th>
                  <th className={`${th} text-right`}>{t.colChange}</th>
                </tr>
              </thead>
              <tbody>
                {[...history].reverse().map((s, i, arr) => {
                  const prev = arr[i + 1];
                  return (
                    <tr key={s.date} className="border-b border-gray-50 dark:border-gray-900">
                      <td className="py-2 pr-3 whitespace-nowrap">{s.date}</td>
                      <td className={td}>{n(s.total)}</td>
                      <td className={td}>{prev ? signed(s.total - prev.total) : "–"}</td>
                      <td className={td}>{n(s.changingTable)}</td>
                      <td className={td}>{prev ? signed(s.changingTable - prev.changingTable) : "–"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-5 text-sm leading-relaxed">
          <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">{t.help}</h2>
          <ul className="space-y-1 list-disc pl-5 mb-3">
            {t.helpBody.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href="https://wiki.openstreetmap.org/wiki/Key:changing_table" target="_blank" rel="noopener noreferrer" className="text-sky-600 underline">{t.osmWiki}</a>
            <a href={CONTACT_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-sky-600 underline">{t.contact}</a>
            <Link href="/attribution" className="text-sky-600 underline">{t.attribution}</Link>
            <Link href={ja ? "/coverage" : "/ja/coverage"} className="text-sky-600 underline">{t.otherLang}</Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: t.title,
            description: t.lead,
            url,
            inLanguage: ja ? "ja" : "en",
            isAccessibleForFree: true,
            license: "https://opendatacommons.org/licenses/odbl/1-0/",
            creator: { "@type": "Organization", name: "Family Toilet Japan", url: BASE },
            spatialCoverage: { "@type": "Place", name: "Japan" },
            temporalCoverage: `${history[0].date}/${latest.date}`,
            dateModified: latest.date,
            variableMeasured: [
              "Number of public toilets",
              "Toilets with a confirmed baby changing table",
              "Toilets confirmed wheelchair accessible",
            ],
          }),
        }}
      />
    </div>
  );
}
