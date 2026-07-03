// Upstash Redis REST API の薄いラッパー（サーバー専用・依存パッケージなしでfetchのみ）
// 環境変数未設定なら null を返し、呼び出し側は機能を非表示にする。

const URL = process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export function isUpstashConfigured(): boolean {
  return Boolean(URL && TOKEN);
}

async function command(args: (string | number)[]): Promise<unknown> {
  if (!URL || !TOKEN) return null;
  const res = await fetch(`${URL}/${args.map((a) => encodeURIComponent(String(a))).join("/")}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { result: unknown };
  return data.result;
}

export async function hIncrBy(key: string, field: string, amount = 1): Promise<number | null> {
  const result = await command(["HINCRBY", key, field, amount]);
  return typeof result === "number" ? result : null;
}

export async function hGetAll(key: string): Promise<Record<string, string> | null> {
  const result = await command(["HGETALL", key]);
  if (!Array.isArray(result)) return null;
  const obj: Record<string, string> = {};
  for (let i = 0; i < result.length; i += 2) {
    obj[String(result[i])] = String(result[i + 1]);
  }
  return obj;
}
