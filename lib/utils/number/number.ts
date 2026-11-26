/**
 * Guards numeric props that are declared as required numbers but can still be
 * given invalid values from plain JavaScript consumers (`0`, `-1`, `NaN`,
 * `Infinity`).
 *
 * Returns `fallback` when `value` is not a finite number and never returns
 * less than `min`, so the math built on top of it stays meaningful
 * (`width / 0` or `Array(-1)` would otherwise break the render).
 */
export const numberAtLeast = (
  value: number | undefined,
  fallback: number,
  min: number,
): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(value, min);
};

/**
 * Same as `numberAtLeast`, but floors the result to an integer.
 *
 * Use it for counts (e.g. `subdivisions`), where `Array(length)` requires a
 * non-negative integer and `0` would mean a division by zero.
 */
export const intAtLeast = (
  value: number | undefined,
  fallback: number,
  min = 1,
): number => {
  return Math.floor(numberAtLeast(value, fallback, min));
};
