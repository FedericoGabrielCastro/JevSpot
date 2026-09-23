export const queryKeys = {
  analysis: {
    all: ["analysis"] as const,
    detail: (analysisId: string) => ["analysis", analysisId] as const,
    zones: (analysisId: string) =>
      ["analysis", analysisId, "zones"] as const,
  },
  zone: {
    detail: (zoneId: string) => ["zones", zoneId] as const,
    competitors: (zoneId: string) =>
      ["zones", zoneId, "competitors"] as const,
    rentals: (zoneId: string) => ["zones", zoneId, "rentals"] as const,
  },
};
