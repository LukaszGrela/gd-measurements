import type { RefObject } from "react";
import type { TPoint, TSize } from "../types/common";

export interface IProps {
  orientation: "horizontal" | "vertical";
  svgRef: RefObject<SVGSVGElement | null>;

  className?: string;

  /**
   * Offset of labels. Defaults to `{x:0, y:0}`
   */
  offset?: number | TPoint;
  /**
   * Zero label offset. Defaults to `{ x: 10, y: 0 }`
   */
  zero?: number | TPoint;
  /**
   * Size of the label step
   */
  size: TSize;

  /**
   * Should skip `0` label
   */
  skipZero?: boolean;
}
