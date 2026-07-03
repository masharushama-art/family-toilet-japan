// IndexNow API へサイトマップの全URLを通知するスクリプト
// Bing/Yandex等がクロール前にこのプロトコルを見て優先的にインデックスする
// 使い方: node scripts/indexnow.js
//   環境変数 INDEXNOW_HOST が未設定なら本番ホストを使う

const HOST = process.env.INDEXNOW_HOST || "family-toilet-japan.vercel.app";
const KEY = "76cee36382e74b6fbcf8a6c0e26db84c";
const BASE = `https://${HOST}`;

async function main() {
  // sitemap.xml と sitemap-toilets.xml の両方からURLを収集
  const sitemapUrls = [`${BASE}/sitemap.xml`, `${BASE}/sitemap-toilets.xml`];
  const urls = new Set();

  for (const sm of sitemapUrls) {
    try {
      const res = await fetch(sm);
      const xml = await res.text();
      const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
      for (const m of matches) urls.add(m[1]);
    } catch (e) {
      console.error("サイトマップ取得失敗:", sm, e.message);
    }
  }

  const urlList = Array.from(urls);
  console.log(`収集したURL数: ${urlList.length}`);

  if (urlList.length === 0) {
    console.log("URLが0件のため送信をスキップします");
    return;
  }

  // IndexNowは1リクエストあたり最大10,000URLまで。念のため500件ずつ分割送信
  const CHUNK = 500;
  for (let i = 0; i < urlList.length; i += CHUNK) {
    const chunk = urlList.slice(i, i + CHUNK);
    const body = {
      host: HOST,
      key: KEY,
      keyLocation: `${BASE}/${KEY}.txt`,
      urlList: chunk,
    };
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      console.log(`送信 ${i}-${i + chunk.length}: HTTP ${res.status}`);
    } catch (e) {
      console.error("IndexNow送信失敗:", e.message);
    }
  }
}

main();
