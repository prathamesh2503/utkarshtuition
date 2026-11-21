import { describe, afterEach, beforeEach, vi, expect, it } from "vitest";

import { fireEvent, screen, render } from "@testing-library/react";
import Achievement from "./Achievement";

describe("Achievemen student filter", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("show only students in the selected standard", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      // mockResolvedValue(value) tells a mock function, when called return a Promise that resolved to value
      json: vi.fn().mockResolvedValue({
        success: true,
        students: [
          {
            id: 1,
            studentName: "Asha Sharma",
            studentStandard: "First",
            studentPassoutYear: 2024,
            studentPercentage: 95,
            imageUrl: "/asha.jpg",
          },
          {
            id: 2,
            studentName: "Rohan Patel",
            studentStandard: "Second",
            studentPassoutYear: 2024,
            studentPercentage: 88,
            imageUrl: "/rohan.jpg",
          },
        ],
      }),
    });

    render(<Achievement />);

    expect(await screen.findByText("Name : Asha Sharma")).toBeInTheDocument();

    expect(screen.getByText("Name : Rohan Patel")).toBeInTheDocument();

    // finds standard dropdown by its accessible role and name

    const standardFilter = screen.getByRole("combobox", {
      name: /filter by standard/i,
    });

    fireEvent.change(standardFilter, { target: { value: "First" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(screen.getByText("Name : Asha Sharma")).toBeInTheDocument();
    expect(screen.queryByText("Name : Rohan Patel")).not.toBeInTheDocument();

    fireEvent.change(standardFilter, { target: { value: "Fifth" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(
      await screen.findByText(
        "No student achievements found for this standard.",
      ),
    ).toBeInTheDocument();
  });
});
