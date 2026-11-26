import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Arrow } from "./Arrow";

describe("Arrow", () => {
  test("always renders the marker definition", () => {
    const { container } = render(
      <svg>
        <Arrow end={{ x: 0, y: 0 }} />
      </svg>,
    );
    const marker = container.querySelector("marker");

    expect(marker).not.toBeNull();
    expect(marker?.getAttribute("markerWidth")).toBe("10");
    expect(marker?.getAttribute("markerHeight")).toBe("10");
    expect(marker?.getAttribute("refX")).toBe("10");
    expect(marker?.getAttribute("refY")).toBe("2.5");
    expect(marker?.getAttribute("orient")).toBe("auto");
    expect(container.querySelector("polygon")?.getAttribute("fill")).toBe(
      "context-stroke",
    );
  });

  test("renders nothing but the definition when hidden", () => {
    const { container } = render(
      <svg>
        <Arrow end={{ x: 10, y: 10 }} />
      </svg>,
    );

    expect(container.querySelector("g.Arrow")).toBeNull();
  });

  test("draws a line from the default start point to the end point", () => {
    const { container } = render(
      <svg>
        <Arrow show end={{ x: 10, y: 20 }} />
      </svg>,
    );
    const line = container.querySelector("g.Arrow line");

    expect(line?.getAttribute("x1")).toBe("0");
    expect(line?.getAttribute("y1")).toBe("0");
    expect(line?.getAttribute("x2")).toBe("10");
    expect(line?.getAttribute("y2")).toBe("20");
    expect(line?.getAttribute("stroke")).toBe("black");
    expect(line?.getAttribute("stroke-width")).toBe("1");
  });

  test("links the line to its own marker and honours start/color", () => {
    const { container } = render(
      <svg>
        <Arrow show start={{ x: 2, y: 4 }} end={{ x: 6, y: 8 }} color="blue" />
      </svg>,
    );
    const marker = container.querySelector("marker");
    const line = container.querySelector("g.Arrow line");

    expect(line?.getAttribute("x1")).toBe("2");
    expect(line?.getAttribute("y1")).toBe("4");
    expect(line?.getAttribute("stroke")).toBe("blue");
    expect(line?.getAttribute("marker-end")).toBe(`url(#${marker?.id})`);
  });
});
