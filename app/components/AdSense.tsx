"use client";

import { useEffect } from "react";

const PUBLISHER_ID = "ca-pub-9686216801075877";
// AdSense審査通過後に NEXT_PUBLIC_ADSENSE_APPROVED=true を設定
const APPROVED = process.env.NEXT_PUBLIC_ADSENSE_APPROVED === "true";

/** インライン広告ユニット。審査通過前はプレースホルダーを表示 */
export function AdUnit({ slot, label = "Advertisement" }: { slot: string; label?: string }) {
  useEffect(() => {
    if (!APPROVED) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch { /* ignore */ }
  }, []);

  if (!APPROVED) {
    // 審査中はプレースホルダー（開発時のみ薄く表示、本番では非表示）
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className="w-full bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center py-6 text-xs text-gray-400 my-4">
        📢 Ad placeholder — {label} (slot: {slot})
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden my-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
