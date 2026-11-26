import type { TPoint } from "../types/common";

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

/**
 * Normalizes an offset prop to a `TPoint`.
 *
 * Components are typed, but plain JavaScript consumers can pass anything, so
 * `{}`, `{ x: NaN }`, `null` or a string would otherwise reach SVG attributes
 * as `NaN` and make the labels disappear. Every non-finite or missing
 * coordinate falls back to `0`, and a non-finite scalar (like the numeric
 * shorthand used for both axes) falls back to `{ x: 0, y: 0 }`.
 *
 * Returns a new object, so the input is never mutated or shared.
 */
export const getOffset = (point: number | TPoint): TPoint => {
  if (isFiniteNumber(point)) {
    return { x: point, y: point };
  }

  if (typeof point !== "object" || point === null) {
    return { x: 0, y: 0 };
  }

  const { x, y } = point;

  return {
    x: isFiniteNumber(x) ? x : 0,
    y: isFiniteNumber(y) ? y : 0,
  };
};
