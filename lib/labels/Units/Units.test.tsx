import { act, render } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Units } from "./Units";
import type { IProps } from "./types";

const RECT = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 300,
  bottom: 120,
  width: 300,
  height: 120,
};

class MockedResizeObserver implements ResizeObserver {
  static instances: MockedResizeObserver[] = [];

  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
    MockedResizeObserver.instances.push(this);
  }

  observe() {}
  unobserve() {}
  disconnect() {}

  trigger() {
    this.callback([], this);
  }
}

const renderUnits = (props: Partial<IProps> = {}) => {
  const svgRef = createRef<SVGSVGElement>();
  const result = render(
    <svg ref={svgRef}>
      <Units orientation="horizontal" size={100} svgRef={svgRef} {...props} />
    </svg>,
  );

  const units = () => result.container.querySelector("g.Units");
  const labels = () =>
    Array.from(result.container.querySelectorAll("g.Label")) as SVGGElement[];
  const texts = () => labels().map((label) => label.textContent);

  return { ...result, svgRef, units, labels, texts };
};

describe("Units", () => {
  beforeEach(() => {
    MockedResizeObserver.instances.length = 0;
    vi.useFakeTimers();
    vi.stubGlobal("ResizeObserver", MockedResizeObserver);
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue(
      RECT as DOMRect,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  test("renders a group that follows the parent transform", () => {
    const { units } = renderUnits({ className: "canvas-units", translate: { x: 5, y: 7 } });
    const group = units();

    expect(group?.classList.contains("Units")).toBe(true);
    expect(group?.classList.contains("canvas-units")).toBe(true);
    expect(group?.getAttribute("transform")).toBe("translate(5, 7)");
    expect(group?.querySelector("g.Crosshair")).toBeNull();
    expect(group?.querySelector("g.Arrow")).toBeNull();
  });

  test("renders one label per step of the observed width", () => {
    const { texts } = renderUnits();

    expect(texts()).toEqual(["0"]);

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    expect(texts()).toEqual(["0", "100", "200", "300"]);
  });

  test("marks the first and the last label", () => {
    const { labels } = renderUnits();

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    const rendered = labels();

    expect(rendered[0].classList.contains("first")).toBe(true);
    expect(rendered[0].classList.contains("horizontal")).toBe(true);
    expect(rendered[1].classList.contains("first")).toBe(false);
    expect(rendered[rendered.length - 1].classList.contains("last")).toBe(true);
  });

  test("applies the default zero offset to the first label only", () => {
    const { labels } = renderUnits();

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    const rendered = labels();

    expect(rendered[0].getAttribute("transform")).toBe("translate(10, 0)");
    expect(rendered[1].getAttribute("transform")).toBe("translate(100, 0)");
  });

  test("skips the zero label when skipZero is set", () => {
    const { texts } = renderUnits({ skipZero: true });

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    expect(texts()).toEqual(["100", "200", "300"]);
  });

  test("rotates the labels for the vertical orientation", () => {
    const { labels, texts } = renderUnits({ orientation: "vertical" });

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    const rendered = labels();

    expect(texts()).toEqual(["0", "100"]);
    expect(rendered[0].getAttribute("transform")).toBe("translate(0, 10)");
    expect(rendered[0].querySelector("text")?.getAttribute("transform")).toBe(
      "rotate(-90)",
    );
    expect(
      rendered[0].querySelector("tspan")?.getAttribute("text-anchor"),
    ).toBe("end");
    expect(
      rendered[1].querySelector("tspan")?.getAttribute("text-anchor"),
    ).toBe("start");
  });

  test("falls back to a step of 1 for a non-positive size", () => {
    const { labels, texts } = renderUnits({ size: 0 });

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    expect(labels()).toHaveLength(301);
    expect(texts()[texts().length - 1]).toBe("300");
  });

  test("draws debug helpers only when debug is enabled", () => {
    const { container, units } = renderUnits({ debug: true });

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    const rendered = container.querySelectorAll("g.Label");

    expect(units()?.querySelector("g.Crosshair")).not.toBeNull();
    // one arrow for the group itself and one per label
    expect(units()?.querySelectorAll("g.Arrow")).toHaveLength(
      rendered.length + 1,
    );
  });
});
