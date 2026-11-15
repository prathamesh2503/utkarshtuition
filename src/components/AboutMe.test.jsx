import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { render, screen } from "@testing-library/react";
import AboutMe from "./AboutMe";
describe("AboutMe", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows teacher data when the API succeeds", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        success: true,
        teacher: {
          name: "Ms. Example",
          description: "Experienced math teacher.",
        },
      }),
    });

    render(<AboutMe />);

    expect(await screen.findByText("Ms. Example")).toBeInTheDocument();
  });

  it("shows the unavailable message when the API reports failure", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValue({ success: false }),
    });

    render(<AboutMe />);

    expect(
      await screen.findByText("Teacher data is not available."),
    ).toBeInTheDocument();
  });
});
