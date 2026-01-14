import type { TPoint } from "../../types/common";

export function negatePoint(point: TPoint): TPoint {
  return { x: -1 * point.x, y: -1 * point.y };
}
