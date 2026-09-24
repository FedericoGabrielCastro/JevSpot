import httpx

from app.adapters.google_places.client import SEARCH_URL, GooglePlacesClient


def test_search_text_posts_to_official_places_api() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert str(request.url) == SEARCH_URL
        assert request.headers["X-Goog-Api-Key"] == "test-key"
        return httpx.Response(
            200,
            json={
                "places": [
                    {
                        "id": "places/1",
                        "displayName": {"text": "Café Real"},
                        "location": {"latitude": -34.60, "longitude": -58.38},
                    }
                ]
            },
        )

    client = GooglePlacesClient(
        api_key="test-key",
        http_client=httpx.Client(transport=httpx.MockTransport(handler)),
    )

    places = client.search_text("cafe in Ciudad Autónoma de Buenos Aires, Argentina")

    assert len(places) == 1
    assert places[0].name == "Café Real"
    assert places[0].source == "google_places"
