import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { AxisH } from "./AxisH";

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

describe("AxisH", () => {
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

  test("renders a fixed, non-interactive axis", () => {
    const { container } = render(<AxisH />);
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("AxisH")).toBe(true);
    expect(svg?.classList.contains("fixed")).toBe(true);
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
  });

  test("honours position and className", () => {
    const { container } = render(
      <AxisH position="absolute" className="canvas-axis" />,
    );
    const svg = container.querySelector("svg");

    expect(svg?.classList.contains("absolute")).toBe(true);
    expect(svg?.classList.contains("canvas-axis")).toBe(true);
  });

  test("starts as a single point and follows the observed width", () => {
    const { container } = render(<AxisH />);
    const line = () => container.querySelector("line");

    expect(line()?.getAttribute("x1")).toBe("0");
    expect(line()?.getAttribute("x2")).toBe("0");
    expect(line()?.getAttribute("y1")).toBe("0");

    act(() => {
      MockedResizeObserver.instances[0].trigger();
      vi.advanceTimersByTime(500);
    });

    expect(line()?.getAttribute("x2")).toBe("300");
    expect(line()?.getAttribute("y1")).toBe("60");
    expect(line()?.getAttribute("y2")).toBe("60");
  });
});
