import httpx

from app.adapters.google_places.errors import (
    GooglePlacesError,
    MissingGooglePlacesApiKeyError,
)
from app.adapters.google_places.normalize import normalize_place
from app.schemas.place import PlaceRecord

SEARCH_URL = "https://places.googleapis.com/v1/places:searchText"
FIELD_MASK = ",".join(
    [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.location",
        "places.primaryType",
        "places.rating",
        "places.userRatingCount",
        "places.googleMapsUri",
    ]
)


class GooglePlacesClient:
    def __init__(
        self,
        api_key: str,
        http_client: httpx.Client | None = None,
    ) -> None:
        if not api_key.strip():
            raise MissingGooglePlacesApiKeyError()
        self._api_key = api_key
        self._http = http_client or httpx.Client(timeout=30.0)

    def search_text(
        self,
        text_query: str,
        included_type: str | None = None,
    ) -> list[PlaceRecord]:
        body: dict[str, object] = {
            "textQuery": text_query,
            "languageCode": "es",
            "regionCode": "AR",
            "pageSize": 20,
        }
        if included_type:
            body["includedType"] = included_type

        response = self._http.post(
            SEARCH_URL,
            headers={
                "Content-Type": "application/json",
                "X-Goog-Api-Key": self._api_key,
                "X-Goog-FieldMask": FIELD_MASK,
            },
            json=body,
        )
        if response.status_code >= 400:
            raise GooglePlacesError(
                f"Google Places search failed with status {response.status_code}",
                status_code=response.status_code,
            )

        payload = response.json()
        raw_places = payload.get("places")
        if not isinstance(raw_places, list):
            return []

        places: list[PlaceRecord] = []
        for raw in raw_places:
            if not isinstance(raw, dict):
                continue
            place = normalize_place(raw)
            if place is not None:
                places.append(place)
        return places
