import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Label } from "./Label";

describe("Label", () => {
  test("renders its children inside a rotated text element", () => {
    const { container } = render(
      <svg>
        <Label>10</Label>
      </svg>,
    );
    const group = container.querySelector("g.Label");
    const text = container.querySelector("text.value-label");
    const tspan = container.querySelector("tspan");

    expect(group?.getAttribute("transform")).toBe("translate(0, 0)");
    expect(text?.getAttribute("transform")).toBe("rotate(0)");
    expect(tspan?.getAttribute("text-anchor")).toBe("start");
    expect(tspan?.getAttribute("alignment-baseline")).toBe("baseline");
    expect(tspan?.textContent).toBe("10");
  });

  test("applies translate, rotation, anchor, alignment and className", () => {
    const { container } = render(
      <svg>
        <Label
          className="Ruler_label"
          translate={{ x: 4, y: 8 }}
          rotation={-90}
          anchor="middle"
          alignment="middle"
        >
          0
        </Label>
      </svg>,
    );
    const group = container.querySelector("g.Label");
    const text = container.querySelector("text.value-label");
    const tspan = container.querySelector("tspan");

    expect(group?.getAttribute("class")).toBe("Label Ruler_label");
    expect(group?.getAttribute("transform")).toBe("translate(4, 8)");
    expect(text?.getAttribute("transform")).toBe("rotate(-90)");
    expect(tspan?.getAttribute("text-anchor")).toBe("middle");
    expect(tspan?.getAttribute("alignment-baseline")).toBe("middle");
  });

  test("renders the crosshair only in debug mode", () => {
    const { container, rerender } = render(
      <svg>
        <Label>1</Label>
      </svg>,
    );

    expect(container.querySelector("g.Crosshair")).toBeNull();

    rerender(
      <svg>
        <Label debug>1</Label>
      </svg>,
    );

    expect(container.querySelector("g.Crosshair")).not.toBeNull();
  });
});
