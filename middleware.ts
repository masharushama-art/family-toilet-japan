import { NextResponse } from "next/server";

/**
 * 2026-07-13(コミットba8a4f6)にnext-on-pages非互換のため削除した動的OGP画像
 * 生成ルート8本への直接アクセスに410 Goneを返す。og:image自体はlayout.tsxの
 * 静的/og-image.pngが正常に機能しているが、削除前にGoogleにクロールされたURL
 * が再訪時に404を返しSearch Consoleでエラー報告されるため、意図的削除である
 * ことを明示する。
 */
export function middleware() {
  return new NextResponse(null, { status: 410 });
}

export const config = {
  matcher: [
    "/:city/opengraph-image",
    "/spot/:slug/opengraph-image",
    "/ja/guide/:slug/opengraph-image",
    "/ja/spot/:slug/opengraph-image",
    "/ko/guide/:slug/opengraph-image",
    "/ko/spot/:slug/opengraph-image",
    "/zh/guide/:slug/opengraph-image",
    "/zh/spot/:slug/opengraph-image",
  ],
};
