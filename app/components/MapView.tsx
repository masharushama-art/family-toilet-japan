"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Toilet, FilterState } from "../types/toilet";
import ToiletDetail from "./ToiletDetail";
import FilterPanel from "./FilterPanel";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "../i18n/provider";
import { getFavorites } from "../lib/favorites";
import { getNearestCity, CITIES_CONFIG } from "../lib/cities-config";
import { calcDistance, formatDistance } from "../lib/distance";

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

function AutoCityLoader({
  onNearestCity,
  onMoved,
}: {
  onNearestCity: (slug: string) => void;
  onMoved: () => void;
}) {
  const map = useMap();
  const cb = useCallback(() => {
    const c = map.getCenter();
    onNearestCity(getNearestCity(c.lat, c.lng));
    onMoved();
  }, [map, onNearestCity, onMoved]);
  useMapEvents({ moveend: cb, zoomend: cb });
  return null;
}

function FlyToLocation({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 15, { duration: 1.5 });
  }, [position, map]);
  return null;
}

// ビューポート内の正確座標ピンのみ描画。moveend/zoomend で再計算。
function AccurateMarkers({
  toilets,
  onSelect,
}: {
  toilets: Toilet[];
  onSelect: (t: Toilet) => void;
}) {
  const map = useMap();
  const [visible, setVisible] = useState<Toilet[]>([]);
  const allRef = useRef(toilets);
  allRef.current = toilets;

  const update = useCallback(() => {
    const bounds = map.getBounds().pad(0.2);
    setVisible(allRef.current.filter((t) => bounds.contains([t.lat, t.lon])));
  }, [map]);

  useMapEvents({ moveend: update, zoomend: update });

  useEffect(() => { update(); }, [update, toilets]);

  return (
    <>
      {visible.map((t) => (
        <Marker
          key={t.id}
          position={[t.lat, t.lon]}
          icon={t.changingTable ? changingTableIcon : normalIcon}
          eventHandlers={{ click: () => onSelect(t) }}
        />
      ))}
    </>
  );
}

// 概算座標クラスタ（geocoded）は件数が少ないので全件描画
function GeocodedMarkers({
  groups,
  onSelect,
  onSelectGroup,
}: {
  groups: Map<string, Toilet[]>;
  onSelect: (t: Toilet) => void;
  onSelectGroup: (g: Toilet[]) => void;
}) {
  return (
    <>
      {Array.from(groups.entries()).map(([key, group]) => {
        const t = group[0];
        const hasChanging = group.some((g) => g.changingTable);
        if (group.length > 1) {
          return (
            <Marker
              key={`cluster-${key}`}
              position={[t.lat, t.lon]}
              icon={clusterIcon(group.length, hasChanging)}
              eventHandlers={{ click: () => onSelectGroup(group) }}
            />
          );
        }
        return (
          <Marker
            key={t.id}
            position={[t.lat, t.lon]}
            icon={t.changingTable ? geocodedChangingIcon : geocodedNormalIcon}
            eventHandlers={{ click: () => onSelect(t) }}
          />
        );
      })}
    </>
  );
}

const DEFAULT_CENTER: [number, number] = [35.681, 139.767]; // 東京駅

export default function MapView({ initialCenter, city = "tokyo" }: { initialCenter?: [number, number]; city?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showReSearch, setShowReSearch] = useState(false);
  const isFirstMove = useRef(true);
  const [cityCache, setCityCache] = useState<Map<string, Toilet[]>>(new Map());
  const [currentCity, setCurrentCity] = useState(city);
  const loadingRef = useRef<Set<string>>(new Set());
  const userPos_ = useRef<[number, number] | null>(null);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [selected, setSelected] = useState<Toilet | null>(null);
  const [clusterGroup, setClusterGroup] = useState<Toilet[] | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showFavs, setShowFavs] = useState(false);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [gpsError, setGpsError] = useState("");

  const loadCity = useCallback((slug: string) => {
    if (loadingRef.current.has(slug)) return;
    loadingRef.current.add(slug);
    fetch(`/data/cities/${slug}.json`)
      .then((r) => r.json())
      .then((data: Toilet[]) => {
        setCityCache((prev) => new Map(prev).set(slug, data));
      })
      .catch(() => loadingRef.current.delete(slug));
  }, []);

  const toilets = Array.from(cityCache.values()).flat();
  const { t } = useI18n();

  const FILTER_KEY = "ftj_filters";
  const [filters, setFilters] = useState<FilterState>(() => {
    if (typeof window === "undefined") return { familyFriendlyOnly: true, changingTableOnly: false, wheelchairOnly: false, open24hOnly: false };
    try {
      const saved = localStorage.getItem(FILTER_KEY);
      if (saved) return JSON.parse(saved) as FilterState;
    } catch { /* ignore */ }
    return { familyFriendlyOnly: true, changingTableOnly: false, wheelchairOnly: false, open24hOnly: false };
  });

  const setFiltersAndSave = useCallback((next: FilterState) => {
    setFilters(next);
    try { localStorage.setItem(FILTER_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  // 初期都市をロード
  useEffect(() => { loadCity(city); }, [city, loadCity]);

  // マップ表示時に自動でGPS取得
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(p);
        userPos_.current = p;
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
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const name = ((t.nameEn || "") + (t.name || "") + (t.operator || "") + (t.address || "")).toLowerCase();
      if (!name.includes(q)) return false;
    }
    return true;
  });

  // 距離順リスト（現在地ある時のみ）
  const nearbyList = userPos
    ? [...filtered]
        .map((t) => ({ ...t, _dist: calcDistance(userPos[0], userPos[1], t.lat, t.lon) }))
        .sort((a, b) => a._dist - b._dist)
        .slice(0, 30)
    : filtered.slice(0, 30);

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
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white shadow-sm px-4 py-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚽</span>
            <div>
              <span className="font-bold text-sky-700 text-sm">Family Toilet Japan</span>
              <span className="ml-2 text-xs text-gray-400">{CITIES_CONFIG[currentCity as keyof typeof CITIES_CONFIG]?.name ?? ""}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
          {filters.familyFriendlyOnly && (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
              👨‍👩‍👧 Family
            </span>
          )}
          <LanguageSwitcher />
          <button
            onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(""); }}
            className={`px-3 py-1 rounded-full text-sm font-medium ${showSearch || searchQuery ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            🔍
          </button>
          <button
            onClick={() => setShowList(!showList)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${showList ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"}`}
          >
            ≡
          </button>
          <button
            onClick={() => { setFavIds(getFavorites()); setShowFavs(true); }}
            className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-sm font-medium"
          >
            ♥
          </button>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {t("filters")} {(filters.changingTableOnly || filters.wheelchairOnly || filters.open24hOnly) ? "●" : ""}
          </button>
          </div>
        </div>
        {showSearch && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, facility..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 text-sm">✕</button>
            )}
          </div>
        )}
      </div>

      {/* 地図 */}
      <MapContainer
        center={initialCenter ?? DEFAULT_CENTER}
        zoom={13}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, HERE, Garmin, USGS, NGA, EPA, NPS'
          maxZoom={20}
        />
        <AutoCityLoader onNearestCity={(slug) => {
          setCurrentCity(slug);
          loadCity(slug);
        }} onMoved={() => {
          if (isFirstMove.current) { isFirstMove.current = false; return; }
          setShowReSearch(true);
        }} />
        <FlyToLocation position={userPos} />

        {/* 現在地 */}
        {userPos && (
          <Marker position={userPos} icon={locationIcon}>
            <Popup>Your location</Popup>
          </Marker>
        )}

        {/* 正確座標：ビューポート内のみ描画 */}
        <AccurateMarkers toilets={accurate} onSelect={setSelected} />

        {/* 概算座標(geocoded)：クラスタバッジで全件描画（約97クラスタ） */}
        <GeocodedMarkers
          groups={geoGroups}
          onSelect={setSelected}
          onSelectGroup={(g) => { setClusterGroup(g); setSelected(null); }}
        />
      </MapContainer>

      {/* 再検索ボタン */}
      {showReSearch && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none flex justify-center">
          <button
            onClick={() => { loadCity(currentCity); setShowReSearch(false); }}
            className="pointer-events-auto bg-white shadow-lg text-sky-700 font-semibold text-sm px-5 py-2 rounded-full border border-sky-200 hover:bg-sky-50 active:bg-sky-100 transition-colors"
          >
            🔍 {t("searchThisArea")}
          </button>
        </div>
      )}

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
          onChange={setFiltersAndSave}
          onClose={() => setShowFilter(false)}
        />
      )}

      {/* クラスタグループ一覧（概算位置の複数トイレ） */}
      {clusterGroup && !selected && (
        <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl max-h-[60vh] flex flex-col">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <div className="px-5 pb-2 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900 text-base">{clusterGroup.length} toilets nearby</h2>
              <p className="text-xs text-amber-600 mt-0.5">📍 {t("approxLocation")}</p>
            </div>
            <button onClick={() => setClusterGroup(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-2">
            {clusterGroup.map((toilet) => (
              <button
                key={toilet.id}
                onClick={() => { setSelected(toilet); setClusterGroup(null); }}
                className="w-full text-left bg-gray-50 hover:bg-sky-50 rounded-xl px-4 py-3 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {toilet.nameEn || toilet.name ||
                        (toilet.changingTable ? t("unnamedToiletBaby") : t("unnamedToilet"))}
                    </p>
                    {toilet.address && (
                      <p className="text-xs text-gray-500 truncate mt-0.5">{toilet.address}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
                    {toilet.changingTable && <span className="text-base">🍼</span>}
                    {toilet.wheelchair && <span className="text-base">♿</span>}
                    <span className="text-gray-400 text-sm">›</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 距離順リスト */}
      {showList && (
        <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl flex flex-col" style={{ maxHeight: "60vh" }}>
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <div className="px-5 pb-2 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                {userPos ? `📍 ${t("nearestToilets")}` : `🚽 ${t("toiletsList")}`}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">{filtered.length.toLocaleString()} total · showing {nearbyList.length}</p>
            </div>
            <button onClick={() => setShowList(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-2">
            {nearbyList.map((toilet) => {
              const dist = userPos ? calcDistance(userPos[0], userPos[1], toilet.lat, toilet.lon) : null;
              return (
                <button
                  key={toilet.id}
                  onClick={() => { setSelected(toilet); setShowList(false); }}
                  className="w-full text-left bg-gray-50 hover:bg-sky-50 rounded-xl px-4 py-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {toilet.nameEn || toilet.name || (toilet.changingTable ? "Baby-friendly Toilet" : "Public Toilet")}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {dist !== null && (
                          <span className="text-xs text-sky-600 font-medium">{formatDistance(dist)}</span>
                        )}
                        {toilet.address && (
                          <span className="text-xs text-gray-400 truncate">{toilet.address}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
                      {toilet.changingTable && <span className="text-sm">🍼</span>}
                      {toilet.wheelchair && <span className="text-sm">♿</span>}
                      {toilet.fee === false && <span className="text-xs text-green-600 font-medium">Free</span>}
                      <span className="text-gray-400 text-sm">›</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* お気に入り一覧 */}
      {showFavs && (
        <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-2xl shadow-2xl max-h-[60vh] flex flex-col">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>
          <div className="px-5 pb-2 flex items-center justify-between">
            <h2 className="font-bold text-gray-900 text-base">♥ Favorites ({favIds.length})</h2>
            <button onClick={() => setShowFavs(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
          </div>
          <div className="overflow-y-auto flex-1 px-4 pb-4 space-y-2">
            {favIds.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                <div className="text-4xl mb-2">♡</div>
                <p className="text-sm">No favorites yet. Tap ♥ on a toilet to save it.</p>
              </div>
            ) : (
              toilets.filter((t) => favIds.includes(t.id)).map((toilet) => (
                <button
                  key={toilet.id}
                  onClick={() => { setSelected(toilet); setShowFavs(false); }}
                  className="w-full text-left bg-gray-50 hover:bg-sky-50 rounded-xl px-4 py-3 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">
                        {toilet.nameEn || toilet.name || (toilet.changingTable ? "Baby-friendly Toilet" : "Public Toilet")}
                      </p>
                      {toilet.address && (
                        <p className="text-xs text-gray-500 truncate mt-0.5">{toilet.address}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 ml-3 flex-shrink-0">
                      {toilet.changingTable && <span className="text-base">🍼</span>}
                      {toilet.wheelchair && <span className="text-base">♿</span>}
                      <span className="text-gray-400 text-sm">›</span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* 施設詳細 */}
      {selected && (
        <ToiletDetail toilet={selected} userPos={userPos} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
