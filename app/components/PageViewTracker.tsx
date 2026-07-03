"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

/** サーバーコンポーネントページから任意のGA4イベントを1回だけ送るための小さなクライアント発火体 */
export default function PageViewTracker({ event, params }: { event: string; params: Record<string, string> }) {
  useEffect(() => {
    trackEvent(event, params);
    // マウント時に一度だけ送る
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
