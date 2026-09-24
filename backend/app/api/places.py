from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException

from app.adapters.google_places.client import GooglePlacesClient
from app.adapters.google_places.errors import (
    GooglePlacesError,
    MissingGooglePlacesApiKeyError,
)
from app.core.secrets import get_google_places_api_key
from app.schemas.place import PlacesSearchRequest, PlacesSearchResponse
from app.services.places import PlacesSearchService

router = APIRouter(tags=["places"])


def get_places_search_service() -> PlacesSearchService:
    api_key = get_google_places_api_key()
    if api_key is None:
        raise HTTPException(
            status_code=503,
            detail="Google Places API key is not configured",
        )
    return PlacesSearchService(GooglePlacesClient(api_key=api_key))


PlacesServiceDep = Annotated[PlacesSearchService, Depends(get_places_search_service)]


@router.post("/places/search", response_model=PlacesSearchResponse)
def search_places(
    body: PlacesSearchRequest,
    service: PlacesServiceDep,
) -> PlacesSearchResponse:
    try:
        return service.search_buenos_aires(body.business_type)
    except MissingGooglePlacesApiKeyError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except GooglePlacesError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
