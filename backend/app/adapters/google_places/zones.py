from dataclasses import dataclass


@dataclass(frozen=True)
class BuenosAiresZone:
    name: str
    # Real locality or neighborhood name. Google Places resolves the geography.
    location_query: str


# Official or commonly used administrative names. Do not invent polygons here.
BUENOS_AIRES_ZONES: tuple[BuenosAiresZone, ...] = (
    BuenosAiresZone(
        name="CABA",
        location_query="Ciudad Autónoma de Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Palermo",
        location_query="Palermo, Ciudad Autónoma de Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Caballito",
        location_query="Caballito, Ciudad Autónoma de Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Belgrano",
        location_query="Belgrano, Ciudad Autónoma de Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Morón",
        location_query="Morón, Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Castelar",
        location_query="Castelar, Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Haedo",
        location_query="Haedo, Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="Ramos Mejía",
        location_query="Ramos Mejía, Buenos Aires, Argentina",
    ),
    BuenosAiresZone(
        name="San Justo",
        location_query="San Justo, Buenos Aires, Argentina",
    ),
)
