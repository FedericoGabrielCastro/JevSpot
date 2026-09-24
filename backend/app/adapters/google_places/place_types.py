# Google Places Table A types. Unknown business types stay in the text query only.
INCLUDED_TYPES: dict[str, str] = {
    "bakery": "bakery",
    "cafe": "cafe",
    "coffee shop": "cafe",
    "gym": "gym",
    "pharmacy": "pharmacy",
    "hair salon": "hair_care",
    "veterinary clinic": "veterinary_care",
}


def included_type_for(business_type: str) -> str | None:
    return INCLUDED_TYPES.get(business_type.strip().lower())
