// 月次データ更新PRを安全に自動マージしてよいか判定するスクリプト。
// Overpass APIの一時的な取得失敗や重複バグ等で件数が異常変動した場合は
// safe=false を返し、ワークフロー側で自動マージをスキップして人間の確認に回す。
import fs from "fs";
import path from "path";

const historyPath = path.join(process.cwd(), "app", "lib", "data-history.json");
const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
const latest = history[history.length - 1];
const previous = history[history.length - 2];

const MIN_TOTAL_PCT = -0.03; // 全国合計が3%以上減ったら取得失敗を疑う
const MAX_TOTAL_PCT = 0.08; // 8%を超える増加も重複等の想定外の変化を疑う
const MIN_CITY_PCT = -0.3; // 個別都市が30%以上減ったら該当都道府県の取得失敗を疑う

function writeOutput(name, value) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

function writeMultilineOutput(name, value) {
  const delimiter = "EOF_SANITY_SUMMARY";
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
}

if (!previous) {
  console.log("比較対象の過去スナップショットが無いため、安全とみなします。");
  writeOutput("safe", "true");
  writeMultilineOutput("summary", "初回スナップショットのため比較なし。自動マージします。");
  process.exit(0);
}

const problems = [];

const totalPct = previous.total === 0 ? 0 : (latest.total - previous.total) / previous.total;
if (totalPct < MIN_TOTAL_PCT || totalPct > MAX_TOTAL_PCT) {
  problems.push(`全国合計が${(totalPct * 100).toFixed(1)}%変化（${previous.total} → ${latest.total}）`);
}

for (const [city, prevStats] of Object.entries(previous.cities)) {
  const latestStats = latest.cities[city];
  if (!latestStats) {
    problems.push(`${city}のデータが消失`);
    continue;
  }
  if (prevStats.total > 0) {
    const cityPct = (latestStats.total - prevStats.total) / prevStats.total;
    if (cityPct < MIN_CITY_PCT) {
      problems.push(`${city}が${(cityPct * 100).toFixed(1)}%減少（${prevStats.total} → ${latestStats.total}）`);
    }
  }
}

const safe = problems.length === 0;
const summary = safe
  ? `データ変化は正常範囲内（全国合計 ${previous.total} → ${latest.total}、${totalPct >= 0 ? "+" : ""}${(totalPct * 100).toFixed(1)}%）。自動マージします。`
  : `異常な変化を検出したため自動マージをスキップします:\n${problems.map((p) => `- ${p}`).join("\n")}`;

console.log(summary);
writeOutput("safe", String(safe));
writeMultilineOutput("summary", summary);
