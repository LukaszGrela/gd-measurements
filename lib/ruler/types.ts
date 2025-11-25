import type { TPoint, TPosition } from "../types/common";
import { type IProps as IUnitsProps } from "../labels/Units";

export type TLocation = "top" | "left" | "right" | "bottom";

/**
 * Unit size features
 */
export type TUnit = {
  /**
   * Offset of labels.
   * x - Distance from the tick
   * y - Distance from the rulers edge
   */
  offset?: number | TPoint;
  /**
   * Zero label offset
   * x - Distance from the tick
   * y - Distance from the rulers edge
   */
  zero?: number | TPoint;
  /**
   * Size of the label step
   */
  size?: number;

  /**
   * Configuration for the tick labels
   */
  labelConfig?: IUnitsProps["labelConfig"];
  /**
   * Configuration for the zero tick label
   */
  labelZeroConfig?: IUnitsProps["labelZeroConfig"];
};

export type TRuler = {
  /**
   * Size of the main division. Defaults to `100`.
   */
  size?: number;

  /**
   * Number of subdivisions. Defaults to `10`.
   */
  subdivisions?: number;

  /**
   * Width of the ruler. Defaults to `25`.
   */
  width?: number;

  /**
   * Width of the edge line. Defaults to `3`. Maximum value `TRuler#width`.
   */
  edge?: number;

  /**
   * width of the main tick. Defaults to `TRuler#width`. Maximum value `TRuler#width`.
   */
  mainTickWidth?: number;

  /**
   * width of the subdivision tick. Defaults to `10`. Maximum value `TRuler#width`.
   */
  tickWidth?: number;

  /**
   * When `true` the half size tick is rendered. Defaults to `true`.
   */
  showHalfTick?: boolean;

  /**
   * width of the subdivision tick that is in the middle of `size`. Defaults to `20`. Maximum value `TRuler#width`.
   */
  halfTickWidth?: number;
};

export interface IProps extends TRuler {
  /**
   * Allows to specify one of 2 possible `position`'s: `fixed` or `absolute`. Default is `fixed`.

- The `absolute` value should be used to put `Grid` in some container (**note:** container needs to have `position: relative` applied).
- The `fixed` position should be used when `Grid` is placed at top level of the DOM structure.
   */
  position?: TPosition;
  /**
   * Allows to specify one of 4 possible placements: `top`, `right`, `bottom` and `left`. Default is `top`.
   */
  location?: TLocation;

  /**
   * Allows to configure the units labels.
   */
  labels?: boolean | TUnit;

  /**
   * Should skip `0` label. If `labels` is set.
   */
  skipZero?: boolean;

  debug?: boolean;
}
