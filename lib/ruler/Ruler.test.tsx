import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Ruler } from "./Ruler";

describe("Ruler", () => {
  test("renders a fixed vertical ruler on the left by default", () => {
    const { container } = render(<Ruler />);
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("Ruler")).toBe(true);
    expect(svg?.classList.contains("left")).toBe(true);
    expect(svg?.classList.contains("fixed")).toBe(true);
    expect(svg?.classList.contains("vertical")).toBe(true);
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(svg?.getAttribute("width")).toBe("25");
    expect(svg?.getAttribute("height")).toBe("100%");
  });

  test("fills the whole area with the generated pattern", () => {
    const { container } = render(<Ruler />);
    const pattern = container.querySelector("pattern");
    const rect = container.querySelector("svg > rect");

    expect(pattern?.getAttribute("patternUnits")).toBe("userSpaceOnUse");
    expect(pattern?.getAttribute("width")).toBe("25");
    expect(pattern?.getAttribute("height")).toBe("100");
    expect(rect?.getAttribute("fill")).toBe(`url(#${pattern?.id})`);
  });

  test("switches to a horizontal ruler for the top location", () => {
    const { container } = render(<Ruler location="top" />);
    const svg = container.querySelector("svg");
    const pattern = container.querySelector("pattern");

    expect(svg?.classList.contains("horizontal")).toBe(true);
    expect(svg?.getAttribute("width")).toBe("100%");
    expect(svg?.getAttribute("height")).toBe("25");
    expect(pattern?.getAttribute("width")).toBe("100");
    expect(pattern?.getAttribute("height")).toBe("25");
  });

  test("honours position and className", () => {
    const { container } = render(
      <Ruler position="absolute" className="board-ruler" />,
    );
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("absolute")).toBe(true);
    expect(svg?.classList.contains("board-ruler")).toBe(true);
  });

  test("renders units only when labels are enabled", () => {
    const { container, rerender } = render(<Ruler />);

    expect(container.querySelector("g.Units")).toBeNull();

    rerender(<Ruler labels />);

    const units = container.querySelector("g.Units");

    expect(units?.classList.contains("Ruler_units")).toBe(true);
  });

  test("renders debug helpers in debug mode", () => {
    const { container } = render(<Ruler debug />);

    expect(
      container.querySelector("rect.Ruler_pattern_line-debug"),
    ).not.toBeNull();
  });

  test("falls back to safe values for invalid numeric props", () => {
    const { container } = render(
      <Ruler size={0} width={0} subdivisions={0} edge={-5} tickWidth={-1} />,
    );
    const pattern = container.querySelector("pattern");

    // finite but too small values are clamped to the minimum (1), not replaced
    // by the fallback
    expect(pattern?.getAttribute("width")).toBe("1");
    expect(pattern?.getAttribute("height")).toBe("1");
  });
});
