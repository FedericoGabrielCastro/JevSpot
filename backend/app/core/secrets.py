import os

GOOGLE_PLACES_API_KEY_NAME = "GOOGLE_PLACES_API_KEY"


def get_google_places_api_key() -> str | None:
    key = os.environ.get(GOOGLE_PLACES_API_KEY_NAME, "").strip()
    return key or None
