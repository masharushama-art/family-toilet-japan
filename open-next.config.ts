import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// 当サイトはほぼ全ページが generateStaticParams による完全静的生成（ISR未使用）のため、
// R2などの追加インフラを要するincrementalCacheは設定しない。
export default defineCloudflareConfig();
