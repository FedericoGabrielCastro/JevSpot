class GooglePlacesError(Exception):
    def __init__(self, message: str, status_code: int | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code


class MissingGooglePlacesApiKeyError(GooglePlacesError):
    def __init__(self) -> None:
        super().__init__("Google Places API key is not configured", status_code=503)
