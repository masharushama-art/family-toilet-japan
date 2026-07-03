export function calcDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * 点から線分（出発地→目的地）までの最短距離（メートル）。
 * 地理的な緯度経度差を平面近似で扱う（都市内の短距離ルートなら十分な精度）。
 * ROADMAP P3-10: ルート沿いトイレ検索用
 */
export function distancePointToSegment(
  lat: number, lon: number,
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  // 緯度1度あたりの距離はほぼ一定（約111km）、経度は緯度によって縮む
  const latScale = 111320;
  const lonScale = 111320 * Math.cos((lat1 * Math.PI) / 180);

  const px = (lon - lon1) * lonScale;
  const py = (lat - lat1) * latScale;
  const dx = (lon2 - lon1) * lonScale;
  const dy = (lat2 - lat1) * latScale;

  const lenSq = dx * dx + dy * dy;
  let t = lenSq === 0 ? 0 : (px * dx + py * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));

  const closestX = t * dx;
  const closestY = t * dy;
  const distX = px - closestX;
  const distY = py - closestY;
  return Math.sqrt(distX * distX + distY * distY);
}
