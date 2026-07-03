"use client";

// GA4 カスタムイベント送信ヘルパー
// 目的: 地図起動・ルート案内・回遊(スポット⇔ガイド)・ガイド読了などの行動を計測し、
// 今後の施策（アフィリエイト配置、コンテンツ優先度）の判断材料にする。

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GtagFn = (...args: any[]) => void;

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gtag: GtagFn | undefined = (window as any).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}

// よく使うイベントの薄いラッパー（呼び出し側の記述量を減らす）
export const track = {
  directionsClick: (toiletId: string, city: string) =>
    trackEvent("directions_click", { toilet_id: toiletId, city }),
  toiletDetailOpen: (toiletId: string, city: string, source: "map" | "spot" | "guide") =>
    trackEvent("toilet_detail_open", { toilet_id: toiletId, city, source }),
  spotToMap: (spotSlug: string) => trackEvent("spot_to_map", { spot_slug: spotSlug }),
  spotToGuide: (spotSlug: string, guideSlug: string) =>
    trackEvent("spot_to_guide", { spot_slug: spotSlug, guide_slug: guideSlug }),
  guideToSpot: (guideSlug: string, spotSlug: string) =>
    trackEvent("guide_to_spot", { guide_slug: guideSlug, spot_slug: spotSlug }),
  guideScrollComplete: (guideSlug: string, lang: string) =>
    trackEvent("guide_scroll_complete", { guide_slug: guideSlug, lang }),
  widgetCopy: (city: string) => trackEvent("widget_embed_copy", { city }),
  mapFilterToggle: (filter: string, enabled: boolean) =>
    trackEvent("map_filter_toggle", { filter, enabled }),
};
