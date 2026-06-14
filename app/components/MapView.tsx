"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Toilet, FilterState } from "../types/toilet";
import ToiletDetail from "./ToiletDetail";
import FilterPanel from "./FilterPanel";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n/provider";

// Leafletデフォルトアイコン修正
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// おむつ替え台ありアイコン（青）
const changingTableIcon = L.divIcon({
  html: `<div style="background:#0ea5e9;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.4)"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

// 通常トイレアイコン（グレー）
const normalIcon = L.divIcon({
  html: `<div style="background:#6b7280;width:10px;height:10px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
  className: "",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

// 現在地アイコン
const locationIcon = L.divIcon({
  html: `<div style="background:#ef4444;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.5)"></div>`,
  className: "",
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// 概算位置（ジオコーディング）アイコン: 半透明アンバー＋破線で「正確でない」を表現
const geocodedChangingIcon = L.divIcon({
  html: `<div style="background:rgba(245,158,11,0.55);width:14px;height:14px;border-radius:50%;border:2px dashed #b45309"></div>`,
  className: "",
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});
const geocodedNormalIcon = L.divIcon({
  html: `<div style="background:rgba(180,180,180,0.5);width:10px;height:10px;border-radius:50%;border:2px dashed #9ca3af"></div>`,
  className: "",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

// 重なりクラスタ用バッジ（概算位置が同一座標に複数集中）
function clusterIcon(count: number, hasChanging: boolean) {
  const bg = hasChanging ? "rgba(245,158,11,0.85)" : "rgba(148,163,184,0.85)";
  return L.divIcon({
    html: `<div style="background:${bg};min-width:22px;height:22px;padding:0 4px;border-radius:11px;border:2px dashed #b45309;color:#1f2937;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 1px 3px rgba(0,0,0,0.3)">${count}</div>`,
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

function FlyToLocation({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 15, { duration: 1.5 });
  }, [position, map]);
  return null;
}

const DEFAULT_CENTER: [number, number] = [35.681, 139.767]; // 東京駅

export default function MapView({ initialCenter }: { initialCenter?: [number, number] }) {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<Toilet | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [gpsError, setGpsError] = useState("");
  const { t } = useI18n();
  const [filters, setFilters] = useState<FilterState>({
    familyFriendlyOnly: true,
    changingTableOnly: false,
    wheelchairOnly: false,
    open24hOnly: false,
  });

  // トイレデータ読み込み
  useEffect(() => {
    fetch("/data/toilets.json")
      .then((r) => r.json())
      .then((data: Toilet[]) => setToilets(data))
      .catch(console.error);
  }, []);

  // マップ表示時に自動でGPS取得
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setGpsError("");
      },
      () => setGpsError("Location access denied. Tap 📍 to try again, or browse the map manually.")
    );
  }, []);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setGpsError("");
      },
      () => setGpsError(t("gpsError"))
    );
  }, []);

  // フィルタリング（データはすでにサーバーサイドでフィルタリング済み）
  const BLACKLIST_NAMES = ["パチンコ", "スロット", "カラオケ", "バー", "スナック", "ナイトクラブ", "キャバクラ", "nightclub", "pachinko"];
  const filtered = toilets.filter((t) => {
    if (filters.familyFriendlyOnly) {
      const text = ((t.name || "") + (t.operator || "")).toLowerCase();
      if (BLACKLIST_NAMES.some((kw) => text.includes(kw.toLowerCase()))) return false;
    }
    if (filters.changingTableOnly && !t.changingTable) return false;
    if (filters.wheelchairOnly && !t.wheelchair) return false;
    if (filters.open24hOnly && t.openingHours !== "24/7") return false;
    return true;
  });

  // 正確座標 / 概算座標(geocoded) に分離。概算は同一座標でまとめてクラスタ化。
  const accurate = filtered.filter((t) => !t.geocoded);
  const geoGroups = new Map<string, Toilet[]>();
  for (const t of filtered) {
    if (!t.geocoded) continue;
    const key = `${t.lat},${t.lon}`;
    const g = geoGroups.get(key);
    if (g) g.push(t);
    else geoGroups.set(key, [t]);
  }

  return (
    <div className="relative w-full h-screen">
      {/* ヘッダー */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🚽</span>
          <span className="font-bold text-sky-700 text-sm">Family Toilet Japan</span>
        </div>
        <div className="flex items-center gap-2">
          {filters.familyFriendlyOnly && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
              👨‍👩‍👧 Family
            </span>
          )}
          <LanguageSwitcher />
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {t("filters")} {(filters.changingTableOnly || filters.wheelchairOnly || filters.open24hOnly) ? "●" : ""}
          </button>
        </div>
      </div>

      {/* 地図 */}
      <MapContainer
        center={initialCenter ?? DEFAULT_CENTER}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToLocation position={userPos} />

        {/* 現在地 */}
        {userPos && (
          <Marker position={userPos} icon={locationIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}

        {/* 正確座標のトイレピン */}
        {accurate.map((t) => (
          <Marker
            key={t.id}
            position={[t.lat, t.lon]}
            icon={t.changingTable ? changingTableIcon : normalIcon}
            eventHandlers={{ click: () => setSelected(t) }}
          />
        ))}

        {/* 概算座標(geocoded)のピン。同一座標は数バッジでクラスタ表示 */}
        {Array.from(geoGroups.entries()).map(([key, group]) => {
          const t = group[0];
          const hasChanging = group.some((g) => g.changingTable);
          if (group.length > 1) {
            return (
              <Marker
                key={`cluster-${key}`}
                position={[t.lat, t.lon]}
                icon={clusterIcon(group.length, hasChanging)}
                eventHandlers={{ click: () => setSelected(t) }}
              />
            );
          }
          return (
            <Marker
              key={t.id}
              position={[t.lat, t.lon]}
              icon={t.changingTable ? geocodedChangingIcon : geocodedNormalIcon}
              eventHandlers={{ click: () => setSelected(t) }}
            />
          );
        })}
      </MapContainer>

      {/* GPS ボタン */}
      <button
        onClick={getLocation}
        className="absolute bottom-32 right-4 z-[1000] bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-xl"
        title="Find my location"
      >
        📍
      </button>

      {/* 凡例 */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow px-3 py-2 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-3 h-3 rounded-full bg-sky-400 border-2 border-white shadow"></span>
          <span>{t("changingTable")}</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-500 border-2 border-white shadow"></span>
          <span>{t("facilityName")}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ background: "rgba(245,158,11,0.55)", border: "2px dashed #b45309" }}
          ></span>
          <span>{t("approxLocation")}</span>
        </div>
      </div>

      {/* 件数表示 */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-white rounded-lg shadow px-3 py-2 text-xs text-gray-600">
        {filtered.length.toLocaleString()} toilets
      </div>

      {/* GPSエラー */}
      {gpsError && (
        <div className="absolute top-16 left-4 right-4 z-[1000] bg-amber-50 border border-amber-200 text-amber-800 rounded-lg px-3 py-2 text-sm">
          📍 {gpsError}
        </div>
      )}

      {/* 0件フォールバック */}
      {toilets.length > 0 && filtered.length === 0 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl shadow-lg px-6 py-5 text-center max-w-xs">
          <div className="text-3xl mb-2">🔍</div>
          <p className="font-semibold text-gray-800 mb-1">No toilets found</p>
          <p className="text-sm text-gray-500">Try relaxing the filters to see more results.</p>
        </div>
      )}

      {/* フィルターパネル */}
      {showFilter && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* 施設詳細 */}
      {selected && (
        <ToiletDetail toilet={selected} userPos={userPos} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
