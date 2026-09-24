import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "../app/page";

vi.mock("@/components/map/location-map", () => ({
  LocationMap: () => <div aria-label="Map" />,
}));

test("renders the product heading and analysis form", () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>,
  );

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Jev Location Intelligence",
    }),
  ).toBeDefined();
  expect(screen.getByLabelText("Business type")).toBeDefined();
  expect(screen.getByRole("button", { name: "Analyze" })).toBeDefined();
  expect(screen.getByLabelText("Map")).toBeDefined();
});
