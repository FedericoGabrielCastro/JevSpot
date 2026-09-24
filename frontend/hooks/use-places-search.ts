import { useMutation } from "@tanstack/react-query";
import { searchPlaces } from "@/logic/api/places";
import type { PlacesSearchRequest } from "@/logic/types/places";

export function usePlacesSearch() {
  return useMutation({
    mutationFn: (body: PlacesSearchRequest) => searchPlaces(body),
  });
}
