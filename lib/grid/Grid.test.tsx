import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Grid } from "./Grid";

describe("Grid", () => {
  test("renders a fixed, non-interactive grid", () => {
    const { container } = render(<Grid />);
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("Grid")).toBe(true);
    expect(svg?.classList.contains("fixed")).toBe(true);
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  test("honours position and className", () => {
    const { container } = render(
      <Grid position="absolute" className="board" />,
    );
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("absolute")).toBe(true);
    expect(svg?.classList.contains("board")).toBe(true);
  });

  test("fills the whole area with the generated pattern", () => {
    const { container } = render(<Grid />);
    const pattern = container.querySelector("pattern");
    const rect = container.querySelector("svg > rect");

    expect(pattern?.getAttribute("patternUnits")).toBe("userSpaceOnUse");
    expect(pattern?.getAttribute("width")).toBe("50");
    expect(pattern?.getAttribute("height")).toBe("50");
    expect(rect?.getAttribute("fill")).toBe(`url(#${pattern?.id})`);
    expect(rect?.getAttribute("width")).toBe("100%");
    expect(rect?.getAttribute("height")).toBe("100%");
  });

  test("draws the two main division lines", () => {
    const { container } = render(<Grid />);
    const lines = container.querySelectorAll("g.Grid_pattern_main line");

    expect(lines).toHaveLength(2);
    expect(lines[0].getAttribute("y2")).toBe("50");
    expect(lines[1].getAttribute("x2")).toBe("50");
    expect(lines[0].getAttribute("strokeWidth")).toBe("2");
    expect(lines[1].getAttribute("strokeWidth")).toBe("2");
  });

  test("draws subdivision lines for the default pattern", () => {
    const { container } = render(<Grid />);
    const lines = container.querySelectorAll("g.Grid_pattern_sub line");

    // 5 divisions -> 4 vertical + 4 horizontal lines
    expect(lines).toHaveLength(8);
    expect(lines[0].getAttribute("x1")).toBe("10");
    expect(lines[0].getAttribute("x2")).toBe("10");
    expect(lines[0].getAttribute("y2")).toBe("50");
    expect(lines[4].getAttribute("y1")).toBe("10");
    expect(lines[4].getAttribute("x2")).toBe("50");
  });

  test("uses the custom grid size and subdivision", () => {
    const { container } = render(
      <Grid grid={{ width: 100, height: 40, subdivision: 4 }} />,
    );
    const pattern = container.querySelector("pattern");
    const lines = container.querySelectorAll("g.Grid_pattern_sub line");

    expect(pattern?.getAttribute("width")).toBe("100");
    expect(pattern?.getAttribute("height")).toBe("40");
    // 4 divisions -> 3 vertical + 3 horizontal lines
    expect(lines).toHaveLength(6);
    expect(lines[0].getAttribute("x1")).toBe("25");
    expect(lines[3].getAttribute("y1")).toBe("10");
  });

  test("falls back to safe values for invalid numeric props", () => {
    const { container } = render(
      <Grid grid={{ width: 0, height: -1, subdivision: 0 }} />,
    );
    const pattern = container.querySelector("pattern");
    const lines = container.querySelectorAll("g.Grid_pattern_sub line");

    // finite but too small values are clamped to the minimum (1), not replaced
    // by the fallback
    expect(pattern?.getAttribute("width")).toBe("1");
    expect(pattern?.getAttribute("height")).toBe("1");
    expect(lines).toHaveLength(0);
  });

  test("falls back to safe values for NaN and Infinity", () => {
    const { container } = render(
      <Grid
        grid={{
          width: Number.NaN,
          height: Number.POSITIVE_INFINITY,
          subdivision: Number.NaN,
        }}
      />,
    );
    const pattern = container.querySelector("pattern");

    expect(pattern?.getAttribute("width")).toBe("50");
    expect(pattern?.getAttribute("height")).toBe("50");
  });

  test("renders both label groups only when labels are enabled", () => {
    const { container, rerender } = render(<Grid />);

    expect(container.querySelectorAll("g.Units")).toHaveLength(0);

    rerender(<Grid labels />);

    const units = container.querySelectorAll("g.Units");

    expect(units).toHaveLength(2);
    expect(units[0].classList.contains("Grid_units")).toBe(true);
    expect(units[1].classList.contains("Grid_units")).toBe(true);
  });

  test("renders debug helpers with labels in debug mode", () => {
    const { container, rerender } = render(<Grid labels />);

    expect(container.querySelector("g.Crosshair")).toBeNull();

    rerender(<Grid labels debug />);

    expect(container.querySelector("g.Crosshair")).not.toBeNull();
    expect(container.querySelector("g.Arrow")).not.toBeNull();
  });
});
