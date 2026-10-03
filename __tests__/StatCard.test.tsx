import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatCard } from "@/components/StatCard";

describe("StatCard", () => {
  it("ラベルと数値を表示する", () => {
    render(<StatCard label="総コミット数" value={1234} />);
    expect(screen.getByText("総コミット数")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
  });

  it("単位を指定すると数値の隣に表示する", () => {
    render(<StatCard label="最長連続日数" value={42} unit="日" />);
    expect(screen.getByText("日")).toBeInTheDocument();
  });
});
