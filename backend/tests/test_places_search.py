from fastapi.testclient import TestClient

from app.api.places import get_places_search_service
from app.main import create_app
from app.schemas.place import PlaceRecord, PlacesSearchResponse, ZonePlaces
from app.services.places import PlacesSearchService


class FakePlacesClient:
    def search_text(
        self,
        text_query: str,
        included_type: str | None = None,
    ) -> list[PlaceRecord]:
        if "Castelar" in text_query:
            return [
                PlaceRecord(
                    external_id="places/castelar-1",
                    name="Panadería de prueba",
                    latitude=-34.651,
                    longitude=-58.640,
                    address="Castelar, Buenos Aires",
                    category="bakery",
                    rating=None,
                    review_count=None,
                    source="google_places",
                    source_url=None,
                )
            ]
        return []


def test_places_search_requires_api_key() -> None:
    client = TestClient(create_app())

    response = client.post(
        "/api/places/search",
        json={"business_type": "bakery", "territory": "buenos_aires"},
    )

    assert response.status_code == 503
    assert response.json()["detail"] == "Google Places API key is not configured"


def test_places_search_returns_adapter_results() -> None:
    app = create_app()
    app.dependency_overrides[get_places_search_service] = lambda: PlacesSearchService(
        FakePlacesClient()
    )
    client = TestClient(app)

    response = client.post(
        "/api/places/search",
        json={"business_type": "bakery", "territory": "buenos_aires"},
    )

    assert response.status_code == 200
    payload = PlacesSearchResponse.model_validate(response.json())
    assert payload.source == "google_places"
    castelar = next(zone for zone in payload.zones if zone.name == "Castelar")
    assert castelar.place_count == 1
    assert castelar.places[0].name == "Panadería de prueba"
    palermo = next(zone for zone in payload.zones if zone.name == "Palermo")
    assert palermo == ZonePlaces(name="Palermo", place_count=0, places=[])
