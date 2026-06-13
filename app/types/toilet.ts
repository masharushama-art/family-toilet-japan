export interface Toilet {
  id: string;
  lat: number;
  lon: number;
  name?: string;
  operator?: string;
  changingTable: boolean;
  wheelchair: boolean;
  openingHours?: string;
  fee: boolean;
  city: string;
  source: "osm";
}

export interface FilterState {
  familyFriendlyOnly: boolean;
  changingTableOnly: boolean;
  wheelchairOnly: boolean;
  open24hOnly: boolean;
}
