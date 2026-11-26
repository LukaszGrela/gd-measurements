import { describe, expect, test } from "vitest";
import { getOffset } from "./getOffset.ts";

describe("getOffset", () => {
  test("expands a numeric offset to both axes", () => {
    expect(getOffset(2)).toEqual({ x: 2, y: 2 });
    expect(getOffset(0)).toEqual({ x: 0, y: 0 });
    expect(getOffset(-4.5)).toEqual({ x: -4.5, y: -4.5 });
  });

  test("keeps a valid point untouched", () => {
    expect(getOffset({ x: 2, y: 12 })).toEqual({ x: 2, y: 12 });
    expect(getOffset({ x: -1, y: 0 })).toEqual({ x: -1, y: 0 });
  });

  test("returns a new object instead of the passed reference", () => {
    const point = { x: 3, y: 4 };
    const offset = getOffset(point);

    expect(offset).not.toBe(point);
    expect(offset).toEqual(point);
  });

  test("falls back to zero for a non-finite scalar", () => {
    expect(getOffset(NaN)).toEqual({ x: 0, y: 0 });
    expect(getOffset(Infinity)).toEqual({ x: 0, y: 0 });
    expect(getOffset(-Infinity)).toEqual({ x: 0, y: 0 });
  });

  test("falls back per axis for missing or non-finite coordinates", () => {
    expect(getOffset({ x: NaN, y: 12 })).toEqual({ x: 0, y: 12 });
    expect(getOffset({ x: 5, y: Infinity })).toEqual({ x: 5, y: 0 });
    expect(getOffset({} as never)).toEqual({ x: 0, y: 0 });
    expect(getOffset({ x: undefined, y: undefined } as never)).toEqual({
      x: 0,
      y: 0,
    });
  });

  test("falls back to zero for values a JS consumer could pass", () => {
    expect(getOffset(null as never)).toEqual({ x: 0, y: 0 });
    expect(getOffset(undefined as never)).toEqual({ x: 0, y: 0 });
    expect(getOffset("2" as never)).toEqual({ x: 0, y: 0 });
    expect(getOffset([] as never)).toEqual({ x: 0, y: 0 });
    expect(getOffset([3, 4] as never)).toEqual({ x: 0, y: 0 });
  });
});
