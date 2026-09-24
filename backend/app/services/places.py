from typing import Protocol

from app.adapters.google_places.place_types import included_type_for
from app.adapters.google_places.zones import BUENOS_AIRES_ZONES
from app.schemas.place import PlaceRecord, PlacesSearchResponse, ZonePlaces


class PlacesClient(Protocol):
    def search_text(
        self,
        text_query: str,
        included_type: str | None = None,
    ) -> list[PlaceRecord]: ...


class PlacesSearchService:
    def __init__(self, client: PlacesClient) -> None:
        self._client = client

    def search_buenos_aires(self, business_type: str) -> PlacesSearchResponse:
        included_type = included_type_for(business_type)
        zones: list[ZonePlaces] = []

        for zone in BUENOS_AIRES_ZONES:
            text_query = f"{business_type} in {zone.location_query}"
            places = self._client.search_text(
                text_query=text_query,
                included_type=included_type,
            )
            zones.append(
                ZonePlaces(
                    name=zone.name,
                    place_count=len(places),
                    places=places,
                )
            )

        return PlacesSearchResponse(
            source="google_places",
            business_type=business_type,
            territory="buenos_aires",
            zones=zones,
        )
