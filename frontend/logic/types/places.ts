export type PlaceRecord = {
  external_id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string | null;
  category: string | null;
  rating: number | null;
  review_count: number | null;
  source: "google_places";
  source_url: string | null;
};

export type ZonePlaces = {
  name: string;
  place_count: number;
  places: PlaceRecord[];
};

export type PlacesSearchRequest = {
  business_type: string;
  territory: "buenos_aires";
};

export type PlacesSearchResponse = {
  source: "google_places";
  business_type: string;
  territory: "buenos_aires";
  zones: ZonePlaces[];
};

export type AnalysisFormValues = {
  businessType: string;
  budget: string;
  competitionWeight: number;
  costWeight: number;
};

export function flattenPlaces(response: PlacesSearchResponse): PlaceRecord[] {
  return response.zones.flatMap((zone) => zone.places);
}
