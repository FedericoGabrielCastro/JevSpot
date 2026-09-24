from app.schemas.place import PlaceRecord

SOURCE = "google_places"


def normalize_place(raw: dict) -> PlaceRecord | None:
    """Keep only fields present in the Google response. Do not invent values."""
    external_id = raw.get("id")
    display_name = raw.get("displayName") or {}
    name = display_name.get("text") if isinstance(display_name, dict) else None
    location = raw.get("location") or {}
    latitude = location.get("latitude") if isinstance(location, dict) else None
    longitude = location.get("longitude") if isinstance(location, dict) else None

    if not isinstance(external_id, str) or not external_id:
        return None
    if not isinstance(name, str) or not name:
        return None
    if not isinstance(latitude, (int, float)) or not isinstance(
        longitude, (int, float)
    ):
        return None

    address = raw.get("formattedAddress")
    category = raw.get("primaryType")
    rating = raw.get("rating")
    review_count = raw.get("userRatingCount")
    source_url = raw.get("googleMapsUri")

    return PlaceRecord(
        external_id=external_id,
        name=name,
        latitude=float(latitude),
        longitude=float(longitude),
        address=address if isinstance(address, str) else None,
        category=category if isinstance(category, str) else None,
        rating=float(rating) if isinstance(rating, (int, float)) else None,
        review_count=int(review_count) if isinstance(review_count, int) else None,
        source=SOURCE,
        source_url=source_url if isinstance(source_url, str) else None,
    )
