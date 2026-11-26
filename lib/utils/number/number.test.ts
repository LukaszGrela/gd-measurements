import { describe, expect, test } from "vitest";
import { intAtLeast, numberAtLeast } from "./number.ts";

describe("numberAtLeast", () => {
  test("keeps an already valid value", () => {
    expect(numberAtLeast(25, 50, 1)).toBe(25);
  });

  test("falls back to the default when the value is missing or not finite", () => {
    expect(numberAtLeast(undefined, 50, 1)).toBe(50);
    expect(numberAtLeast(NaN, 50, 1)).toBe(50);
    expect(numberAtLeast(Infinity, 50, 1)).toBe(50);
    expect(numberAtLeast(-Infinity, 50, 1)).toBe(50);
  });

  test("clamps to the minimum", () => {
    expect(numberAtLeast(0, 50, 1)).toBe(1);
    expect(numberAtLeast(-1, 50, 1)).toBe(1);
    expect(numberAtLeast(-1, 3, 0)).toBe(0);
  });
});

describe("intAtLeast", () => {
  test("keeps an already valid integer", () => {
    expect(intAtLeast(10, 10)).toBe(10);
  });

  test("floors fractions", () => {
    expect(intAtLeast(2.7, 10)).toBe(2);
  });

  test("never returns less than the minimum", () => {
    expect(intAtLeast(0, 10)).toBe(1);
    expect(intAtLeast(-1, 10)).toBe(1);
    expect(intAtLeast(0.5, 10)).toBe(1);
  });

  test("falls back to the default when the value is missing or not finite", () => {
    expect(intAtLeast(undefined, 10)).toBe(10);
    expect(intAtLeast(NaN, 5)).toBe(5);
    expect(intAtLeast(Infinity, 10)).toBe(10);
  });
});
