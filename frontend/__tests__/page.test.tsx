import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "../app/page";

test("renders the product heading", () => {
  render(<Page />);

  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "Jev Location Intelligence",
    }),
  ).toBeDefined();
});
