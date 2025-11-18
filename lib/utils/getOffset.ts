import type { TPoint } from "../types/common";

export const getOffset = (point: number | TPoint): TPoint => {
  if (typeof point !== "number") {
    return point;
  }
  return { x: point, y: point };
};
