import type { RefObject } from "react";
import type { TPoint, TSize } from "../types/common";
import type { TGrid } from "../grid/types";

export interface IProps {
  orientation: "horizontal" | "vertical";
  grid: TGrid;
  labels: boolean | TUnits;
  svgRef: RefObject<SVGSVGElement | null>;

  className?: string;
}

/**
 * Units size features
 */
export type TUnits = {
  /**
   * Offset of horizontal labels
   */
  hOffset: number | TPoint;
  /**
   * Offset of vertical labels
   */
  vOffset: number | TPoint;
  /**
   * Zero label offset
   */
  zero?: number | TPoint;
  /**
   * Size of the label step
   */
  size?: TSize;
};
