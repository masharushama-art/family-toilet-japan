export interface Toilet {
  id: string;
  lat: number;
  lon: number;
  name?: string;
  nameEn?: string;
  operator?: string;
  changingTable?: boolean;
  wheelchair?: boolean;
  openingHours?: string;
  fee?: boolean;
  image?: string;
  city: string;
  ward?: string;
  source: "osm" | "opendata";
}

export interface FilterState {
  familyFriendlyOnly: boolean;
  changingTableOnly: boolean;
  wheelchairOnly: boolean;
  open24hOnly: boolean;
}
