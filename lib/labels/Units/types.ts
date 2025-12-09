import type { RefObject } from "react";
import type { TPoint } from "../../types/common";
import type { IProps as ILabelProps } from "../Label";

export interface IProps {
  orientation: "horizontal" | "vertical";
  /**
   * Container SVG reference
   */
  svgRef: RefObject<SVGSVGElement | null>;
  /**
   * Size of the label step
   */
  size: number;

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
   * Should skip `0` label
   */
  skipZero?: boolean;

  translate?: TPoint;

  debug?: boolean;

  labelConfig?: Pick<ILabelProps, "alignment" | "anchor" | "rotation">;
  labelZeroConfig?: Pick<ILabelProps, "alignment" | "anchor" | "rotation">;
}
