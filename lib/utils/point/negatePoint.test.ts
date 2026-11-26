import { describe, expect, test } from "vitest";
import { negatePoint } from "./negatePoint";

describe("negatePoint", () => {
  test("negates both axes", () => {
    expect(negatePoint({ x: 3, y: -4 })).toEqual({ x: -3, y: 4 });
  });

  test("negates fractional values", () => {
    expect(negatePoint({ x: 0.5, y: 2.25 })).toEqual({ x: -0.5, y: -2.25 });
  });

  test("returns a new object and does not mutate the source", () => {
    const point = { x: 10, y: 20 };
    const result = negatePoint(point);

    expect(result).not.toBe(point);
    expect(point).toEqual({ x: 10, y: 20 });
    expect(result).toEqual({ x: -10, y: -20 });
  });

  test("keeps the sign of a negated zero", () => {
    const result = negatePoint({ x: 0, y: 0 });

    expect(Object.is(result.x, -0)).toBe(true);
    expect(Object.is(result.y, -0)).toBe(true);
  });
});
