import { describe, expect, test } from "vitest";
import { getSvgParent } from "./getParentSvg";

const SVG_NS = "http://www.w3.org/2000/svg";

const createSvg = () => document.createElementNS(SVG_NS, "svg");

describe("getSvgParent", () => {
  test("returns the root svg of a nested element", () => {
    const svg = createSvg();
    const group = document.createElementNS(SVG_NS, "g");
    const line = document.createElementNS(SVG_NS, "line");

    group.appendChild(line);
    svg.appendChild(group);

    expect(getSvgParent(line)).toBe(svg);
    expect(getSvgParent(group)).toBe(svg);
  });

  test("returns the element itself when it already is an svg", () => {
    const svg = createSvg();

    expect(getSvgParent(svg)).toBe(svg);
  });

  test("returns the closest svg when svgs are nested", () => {
    const outer = createSvg();
    const inner = createSvg();
    const rect = document.createElementNS(SVG_NS, "rect");

    inner.appendChild(rect);
    outer.appendChild(inner);

    expect(getSvgParent(rect)).toBe(inner);
  });

  test("returns null when there is no svg in the parent chain", () => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    div.appendChild(span);

    expect(getSvgParent(span as never)).toBeNull();
  });

  test("returns null for an element detached from the document", () => {
    const group = document.createElementNS(SVG_NS, "g");

    expect(getSvgParent(group)).toBeNull();
  });

  test("returns null for an empty argument", () => {
    expect(getSvgParent(null)).toBeNull();
    expect(getSvgParent(undefined)).toBeNull();
  });
});
