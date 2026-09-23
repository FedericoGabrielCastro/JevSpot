import { expect, test } from "vitest";
import { queryKeys } from "@/logic/queries/keys";

test("builds stable analysis and zone keys", () => {
  expect(queryKeys.analysis.zones("123")).toEqual(["analysis", "123", "zones"]);
  expect(queryKeys.zone.competitors("castelar")).toEqual([
    "zones",
    "castelar",
    "competitors",
  ]);
});
