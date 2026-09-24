from app.adapters.google_places.normalize import normalize_place


def test_normalize_place_keeps_only_present_fields() -> None:
    place = normalize_place(
        {
            "id": "places/abc",
            "displayName": {"text": "Panadería Norte"},
            "formattedAddress": "Castelar, Buenos Aires",
            "location": {"latitude": -34.651, "longitude": -58.640},
            "primaryType": "bakery",
            "googleMapsUri": "https://maps.google.com/?cid=1",
        }
    )

    assert place is not None
    assert place.external_id == "places/abc"
    assert place.name == "Panadería Norte"
    assert place.rating is None
    assert place.review_count is None
    assert place.source == "google_places"


def test_normalize_place_skips_incomplete_records() -> None:
    assert normalize_place({"displayName": {"text": "No id"}}) is None
