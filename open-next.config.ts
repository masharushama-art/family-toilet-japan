import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// generateStaticParams で事前生成したページも、OpenNextのCloudflareアダプターでは
// ビルド時にプレーンな静的HTMLとして出力されず、キャッシュストア経由で配信される。
// キャッシュが無いと動的セグメントを含むページ（トイレ個別・スポット等）が404になるため必須。
//
// 以前はR2（NEXT_INC_CACHE_R2_BUCKET）に書き込んでいたが、デプロイごとにビルドID別のキャッシュが溜まり、
// 保存量が無料枠(10GB)を超えて課金された（2026-10-13、ROADMAP.md「Cloudflare R2の保存料金」参照）。
// 本サイトはISR/revalidateを使わず事前生成ページを配信するだけなので、Workers静的アセットに
// キャッシュを同梱する読み取り専用方式に切り替え、R2を使わない（課金が発生しない）構成にしている。
// ISR・revalidateTag・composable cache（"use cache"）を使う機能を追加する場合はこの方式では動かない。
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
