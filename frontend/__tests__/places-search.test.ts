import { describe, expect, test, vi } from "vitest";
import { searchPlaces } from "@/logic/api/places";
import { flattenPlaces } from "@/logic/types/places";

describe("places search logic", () => {
  test("posts a relative Places search request", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            source: "google_places",
            business_type: "bakery",
            territory: "buenos_aires",
            zones: [],
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
    );
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    try {
      await searchPlaces({
        business_type: "bakery",
        territory: "buenos_aires",
      });
    } finally {
      globalThis.fetch = originalFetch;
    }

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/places/search",
      expect.objectContaining({ method: "POST" }),
    );
  });

  test("flattens zone places without inventing records", () => {
    expect(
      flattenPlaces({
        source: "google_places",
        business_type: "bakery",
        territory: "buenos_aires",
        zones: [
          { name: "Castelar", place_count: 0, places: [] },
          {
            name: "Palermo",
            place_count: 1,
            places: [
              {
                external_id: "places/1",
                name: "Example",
                latitude: -34.58,
                longitude: -58.42,
                address: null,
                category: null,
                rating: null,
                review_count: null,
                source: "google_places",
                source_url: null,
              },
            ],
          },
        ],
      }),
    ).toHaveLength(1);
  });
});
