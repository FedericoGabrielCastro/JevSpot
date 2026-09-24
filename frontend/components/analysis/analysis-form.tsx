"use client";

import type { FormEvent } from "react";
import type { AnalysisFormValues } from "@/logic/types/places";

type AnalysisFormProps = {
  values: AnalysisFormValues;
  isPending: boolean;
  onChange: (values: AnalysisFormValues) => void;
  onSubmit: () => void;
};

export function AnalysisForm({
  values,
  isPending,
  onChange,
  onSubmit,
}: AnalysisFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Business type</span>
        <input
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          name="businessType"
          value={values.businessType}
          onChange={(event) =>
            onChange({ ...values, businessType: event.target.value })
          }
          placeholder="Bakery"
          required
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Territory</span>
        <input
          className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          value="CABA + Buenos Aires Province"
          readOnly
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">Budget</span>
        <input
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          name="budget"
          inputMode="numeric"
          value={values.budget}
          onChange={(event) =>
            onChange({ ...values, budget: event.target.value })
          }
          placeholder="1200000"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">
          Competition {Math.round(values.competitionWeight * 100)}%
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(values.competitionWeight * 100)}
          onChange={(event) =>
            onChange({
              ...values,
              competitionWeight: Number(event.target.value) / 100,
            })
          }
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium">
          Cost {Math.round(values.costWeight * 100)}%
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(values.costWeight * 100)}
          onChange={(event) =>
            onChange({
              ...values,
              costWeight: Number(event.target.value) / 100,
            })
          }
        />
      </label>

      <button
        className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950"
        type="submit"
        disabled={isPending || values.businessType.trim() === ""}
      >
        {isPending ? "Analyzing…" : "Analyze"}
      </button>
    </form>
  );
}
