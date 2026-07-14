import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

// generateStaticParams で事前生成したページも、OpenNextのCloudflareアダプターでは
// ビルド時にプレーンな静的HTMLとして出力されず、キャッシュストア（R2）経由で配信される。
// R2バインディングが無いと動的セグメントを含むページ（トイレ個別・スポット等）が404になるため必須。
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
});
