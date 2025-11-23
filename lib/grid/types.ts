import type { TPoint, TPosition, TSize } from "../types/common";

/**
 * Grid size features config.
 */
export type TGrid = TSize & {
  /**
   * Subdivision of the Grid box (sub grid lines). Defaults to `5`.
   */
  subdivision?: number;
};

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

export interface IProps {
  /**
   * Allows to specify one of 2 possible `position`'s: `fixed` or `absolute`. Default is `fixed`.
   * 
- The `absolute` value should be used to put `Grid` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `Grid` is placed at top level of the DOM structure.
   */
  position?: TPosition;
  /**
   * Allows to specify the grid size features. Defaults to `{ width: 50, height: 50 }`
   */
  grid?: TGrid;
  /**
   * Allows to configure the units labels.
   */
  labels?: boolean | TUnits;

  debug?: boolean;
}
