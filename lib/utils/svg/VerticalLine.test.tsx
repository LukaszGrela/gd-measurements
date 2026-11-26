import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, test } from "vitest";
import { VerticalLine } from "./VerticalLine";

const renderLine = (ui: ReactElement) => render(<svg>{ui}</svg>);

describe("VerticalLine", () => {
  test("starts at y and ends at y + length", () => {
    const { container } = renderLine(<VerticalLine x={10} y={5} length={30} />);
    const line = container.querySelector("line");

    expect(line?.getAttribute("y1")).toBe("5");
    expect(line?.getAttribute("y2")).toBe("35");
  });

  test("keeps both points at the same x", () => {
    const { container } = renderLine(
      <VerticalLine x={12.5} y={0} length={100} />,
    );
    const line = container.querySelector("line");

    expect(line?.getAttribute("x1")).toBe("12.5");
    expect(line?.getAttribute("x2")).toBe("12.5");
  });

  test("passes the remaining props to the line element", () => {
    const { container } = renderLine(
      <VerticalLine x={0} y={0} length={50} className="tick" stroke="red" />,
    );
    const line = container.querySelector("line");

    expect(line?.getAttribute("class")).toBe("tick");
    expect(line?.getAttribute("stroke")).toBe("red");
  });

  test("renders a length of zero as a single point", () => {
    const { container } = renderLine(<VerticalLine x={7} y={3} length={0} />);
    const line = container.querySelector("line");

    expect(line?.getAttribute("y1")).toBe("3");
    expect(line?.getAttribute("y2")).toBe("3");
  });
});
