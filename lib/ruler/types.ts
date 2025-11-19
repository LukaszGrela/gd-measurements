import type { TOrientation, TPoint, TPosition } from "../types/common";

export type TLocation = "top" | "left" | "right" | "bottom";

/**
 * Unit size features
 */
export type TUnit = {
  /**
   * Offset of labels
   */
  offset: number | TPoint;
  /**
   * Zero label offset
   */
  zero?: number | TPoint;
  /**
   * Size of the label step
   */
  size?: number;

  /**
   * Should skip `0` label
   */
  skipZero?: boolean;
};

export interface IProps {
  /**
   * Allows to specify one of 2 possible values: `vertical` and `horizontal`. Default is `vertical`.
   */
  orientation?: TOrientation;
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
}
