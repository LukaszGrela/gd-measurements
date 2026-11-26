import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Crosshair } from "./Crosshair";

describe("Crosshair", () => {
  test("renders nothing when hidden", () => {
    const { container } = render(
      <svg>
        <Crosshair />
      </svg>,
    );

    expect(container.querySelector("g.Crosshair")).toBeNull();
  });

  test("renders two lines with the default size", () => {
    const { container } = render(
      <svg>
        <Crosshair show />
      </svg>,
    );
    const horizontal = container.querySelector("line.Crosshair_horizontal");
    const vertical = container.querySelector("line.Crosshair_vertical");

    expect(horizontal?.getAttribute("x1")).toBe("-10");
    expect(horizontal?.getAttribute("x2")).toBe("10");
    expect(horizontal?.getAttribute("y1")).toBe("0");
    expect(horizontal?.getAttribute("y2")).toBe("0");
    expect(horizontal?.getAttribute("stroke")).toBe("red");

    expect(vertical?.getAttribute("y1")).toBe("-10");
    expect(vertical?.getAttribute("y2")).toBe("10");
    expect(vertical?.getAttribute("x1")).toBe("0");
    expect(vertical?.getAttribute("x2")).toBe("0");
    expect(vertical?.getAttribute("stroke")).toBe("green");
  });

  test("uses the given size for both arms", () => {
    const { container } = render(
      <svg>
        <Crosshair show size={20} />
      </svg>,
    );
    const horizontal = container.querySelector("line.Crosshair_horizontal");
    const vertical = container.querySelector("line.Crosshair_vertical");

    expect(horizontal?.getAttribute("x1")).toBe("-20");
    expect(horizontal?.getAttribute("x2")).toBe("20");
    expect(vertical?.getAttribute("y1")).toBe("-20");
    expect(vertical?.getAttribute("y2")).toBe("20");
  });
});
