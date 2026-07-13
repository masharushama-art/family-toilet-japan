import { hIncrBy, hGetAll, isUpstashConfigured } from "../../lib/upstash";

// Cloudflare Pages（next-on-pages）はNode.js runtimeの動的ルートを許可しないため、
// fetchのみで完結するこのAPIはedge runtimeで動かす。
export const runtime = "edge";

// トイレの清潔度ワンタップ投票API（ROADMAP P3-8）
// Upstash未設定の環境（開発時や本番デプロイ前）では 501 を返す。
// キー設計: `votes:{toiletId}` の Hash に clean/ok/dirty の件数を保持する。

const VALID_VOTES = new Set(["clean", "ok", "dirty"]);

export async function GET(request: Request) {
  if (!isUpstashConfigured()) {
    return Response.json({ enabled: false }, { status: 200 });
  }
  const { searchParams } = new URL(request.url);
  const toiletId = searchParams.get("toiletId");
  if (!toiletId) {
    return Response.json({ error: "toiletId is required" }, { status: 400 });
  }
  const counts = await hGetAll(`votes:${toiletId}`);
  return Response.json({
    enabled: true,
    clean: Number(counts?.clean ?? 0),
    ok: Number(counts?.ok ?? 0),
    dirty: Number(counts?.dirty ?? 0),
  });
}

export async function POST(request: Request) {
  if (!isUpstashConfigured()) {
    return Response.json({ enabled: false }, { status: 200 });
  }
  let body: { toiletId?: string; vote?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON" }, { status: 400 });
  }
  const { toiletId, vote } = body;
  if (!toiletId || !vote || !VALID_VOTES.has(vote)) {
    return Response.json({ error: "toiletId and a valid vote (clean/ok/dirty) are required" }, { status: 400 });
  }
  await hIncrBy(`votes:${toiletId}`, vote, 1);
  const counts = await hGetAll(`votes:${toiletId}`);
  return Response.json({
    enabled: true,
    clean: Number(counts?.clean ?? 0),
    ok: Number(counts?.ok ?? 0),
    dirty: Number(counts?.dirty ?? 0),
  });
}
