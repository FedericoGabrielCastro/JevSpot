"use client";

import { useState } from "react";
import { AnalysisForm } from "@/components/analysis/analysis-form";
import { LocationMap } from "@/components/map/location-map";
import { usePlacesSearch } from "@/hooks/use-places-search";
import { ApiError } from "@/logic/api/client";
import { flattenPlaces, type AnalysisFormValues } from "@/logic/types/places";

const INITIAL_VALUES: AnalysisFormValues = {
  businessType: "bakery",
  budget: "",
  competitionWeight: 0.9,
  costWeight: 1,
};

export function AnalysisWorkspace() {
  const [values, setValues] = useState<AnalysisFormValues>(INITIAL_VALUES);
  const search = usePlacesSearch();
  const places = search.data ? flattenPlaces(search.data) : [];

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h1 className="text-lg font-semibold tracking-tight">
          Jev Location Intelligence
        </h1>
      </header>
      <main className="grid flex-1 grid-cols-1 lg:grid-cols-[20rem_1fr]">
        <aside className="flex flex-col gap-6 border-b border-zinc-200 p-6 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <AnalysisForm
            values={values}
            isPending={search.isPending}
            onChange={setValues}
            onSubmit={() =>
              search.mutate({
                business_type: values.businessType.trim(),
                territory: "buenos_aires",
              })
            }
          />
          <SearchStatus
            isPending={search.isPending}
            error={search.error}
            zoneCount={search.data?.zones.length ?? 0}
            placeCount={places.length}
          />
        </aside>
        <section className="min-h-[24rem] bg-zinc-100 dark:bg-zinc-900">
          <LocationMap places={places} />
        </section>
      </main>
    </div>
  );
}

function SearchStatus({
  isPending,
  error,
  zoneCount,
  placeCount,
}: {
  isPending: boolean;
  error: unknown;
  zoneCount: number;
  placeCount: number;
}) {
  if (isPending) {
    return <p className="text-sm text-zinc-500">Loading places…</p>;
  }

  if (error instanceof ApiError && error.status === 503) {
    return (
      <p className="text-sm text-zinc-500">
        Google Places is not configured on the server. The map stays empty.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        The backend could not load places. No invented results are shown.
      </p>
    );
  }

  if (placeCount === 0) {
    return (
      <p className="text-sm text-zinc-500">
        No places loaded yet. Analyze a business type to query Google Places.
      </p>
    );
  }

  return (
    <p className="text-sm text-zinc-600 dark:text-zinc-400">
      {placeCount} places across {zoneCount} zones from Google Places.
    </p>
  );
}
