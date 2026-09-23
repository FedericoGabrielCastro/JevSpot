import { describe, expect, test, vi } from "vitest";
import { ApiError, createApiClient } from "@/logic/api/client";

describe("createApiClient", () => {
  test("GET uses a relative path and parses JSON", async () => {
    const fetchMock = vi.fn(
      async () =>
        new Response(JSON.stringify({ analysis_id: "123" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
    );

    const client = createApiClient({
      fetch: fetchMock as unknown as typeof fetch,
    });

    await expect(
      client.get<{ analysis_id: string }>("/api/analysis/123"),
    ).resolves.toEqual({
      analysis_id: "123",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/analysis/123",
      expect.objectContaining({ method: "GET" }),
    );
  });

  test("throws ApiError when the response is not ok", async () => {
    const client = createApiClient({
      fetch: (async () =>
        new Response("nope", { status: 404 })) as unknown as typeof fetch,
    });

    await expect(client.get("/api/zones/missing")).rejects.toBeInstanceOf(
      ApiError,
    );
  });
});
