import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("見出しをレンダリングする", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
