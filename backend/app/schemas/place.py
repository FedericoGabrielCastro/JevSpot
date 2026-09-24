from typing import Literal

from pydantic import BaseModel, Field


class PlaceRecord(BaseModel):
    external_id: str
    name: str
    latitude: float
    longitude: float
    address: str | None = None
    category: str | None = None
    rating: float | None = None
    review_count: int | None = None
    source: Literal["google_places"]
    source_url: str | None = None


class ZonePlaces(BaseModel):
    name: str
    place_count: int
    places: list[PlaceRecord]


class PlacesSearchRequest(BaseModel):
    business_type: str = Field(min_length=1, max_length=80)
    territory: Literal["buenos_aires"] = "buenos_aires"


class PlacesSearchResponse(BaseModel):
    source: Literal["google_places"]
    business_type: str
    territory: Literal["buenos_aires"]
    zones: list[ZonePlaces]
