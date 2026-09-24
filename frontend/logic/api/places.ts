import { createApiClient } from "@/logic/api/client";
import type {
  PlacesSearchRequest,
  PlacesSearchResponse,
} from "@/logic/types/places";

export function searchPlaces(
  body: PlacesSearchRequest,
  signal?: AbortSignal,
): Promise<PlacesSearchResponse> {
  return createApiClient().post<PlacesSearchResponse>(
    "/api/places/search",
    body,
    signal,
  );
}
