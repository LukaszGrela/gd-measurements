import "./Grid.scss";
import { useId, useRef, type FC, type ReactNode } from "react";
import { classNames } from "../utils/classNames";
import { intAtLeast, numberAtLeast } from "../utils/number";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import { VerticalLine } from "../utils/svg/VerticalLine";
import type { IProps } from "./types";
import { Units } from "../labels/Units";
import type { TPoint } from "../types/common";

const getSubdivision = (
  subdivision: number,
  width: number,
  height: number,
) => {
  const stepX = width / subdivision;
  const stepY = height / subdivision;

  const verticals = (() => {
    const list: ReactNode[] = [];
    for (let i = 1; i < subdivision; i++) {
      list.push(
        <VerticalLine
          key={`vl-${i}-${stepX * 1}`}
          length={height}
          x={stepX * i}
          y={0}
          strokeWidth={1}
        />,
      );
    }

    return list;
  })();

  const horizontals = (() => {
    const list: ReactNode[] = [];
    for (let i = 1; i < subdivision; i++) {
      list.push(
        <HorizontalLine
          key={`hl-${i}-${stepY * 1}`}
          length={width}
          x={0}
          y={stepY * i}
          strokeWidth={1}
        />,
      );
    }

    return list;
  })();

  return (
    <g className="Grid_pattern_sub">
      {verticals}
      {horizontals}
    </g>
  );
};

const getPattern1 = (
  id: string,
  subdivision: number,
  width: number,
  height: number,
) => {
  return (
    <pattern
      className="Grid_pattern"
      id={id}
      patternUnits="userSpaceOnUse"
      width={width}
      height={height}
    >
      {/* main division */}
      <g className="Grid_pattern_main">
        <line x1={0} y1={0} x2={0} y2={height} strokeWidth={2} />
        <line x1={0} y1={0} x2={width} y2={0} strokeWidth={2} />
      </g>
      {getSubdivision(subdivision, width, height)}
    </pattern>
  );
};

const DEFAULT_ZERO: TPoint = { x: 12, y: 0 };
const DEFAULT_H_OFFSET: TPoint = { x: 2, y: 0 };
const DEFAULT_V_OFFSET: TPoint = { x: 0, y: -2 };

export const Grid: FC<IProps> = ({
  position = "fixed",
  grid = { width: 50, height: 50 },
  labels,
  debug,
  className,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const patternId = `grid-pattern1-${useId()}`;

  // `width`, `height` and `subdivision` are numbers, but plain JavaScript
  // consumers can still pass `0`, `-1`, `NaN` or `Infinity`.
  const width = numberAtLeast(grid.width, 50, 1);
  const height = numberAtLeast(grid.height, 50, 1);
  const subdivision = intAtLeast(grid.subdivision, 5, 1);

  return (
    <svg
      ref={ref}
      className={classNames("Grid", position, className)}
      aria-hidden="true"
    >
      <defs>{getPattern1(patternId, subdivision, width, height)}</defs>
      <rect fill={`url(#${patternId})`} width={"100%"} height={"100%"} />
      {labels && (
        <g>
          <Units
            debug={debug}
            className="Grid_units"
            orientation="horizontal"
            svgRef={ref}
            offset={
              typeof labels === "boolean" ? DEFAULT_H_OFFSET : labels.hOffset
            }
            zero={typeof labels === "boolean" ? DEFAULT_ZERO : labels.zero}
            size={
              typeof labels !== "boolean" && labels.size
                ? numberAtLeast(labels.size.width, width, 1)
                : width
            }
            labelConfig={
              typeof labels !== "boolean" && labels.hLabelConfig
                ? labels.hLabelConfig
                : undefined
            }
            labelZeroConfig={
              typeof labels !== "boolean" && labels.labelZeroConfig
                ? labels.labelZeroConfig
                : undefined
            }
          />

          <Units
            debug={debug}
            className="Grid_units"
            orientation="vertical"
            svgRef={ref}
            offset={
              typeof labels === "boolean" ? DEFAULT_V_OFFSET : labels.vOffset
            }
            size={
              typeof labels !== "boolean" && labels.size
                ? numberAtLeast(labels.size.height, height, 1)
                : height
            }
            skipZero
            labelConfig={
              typeof labels !== "boolean" && labels.vLabelConfig
                ? labels.vLabelConfig
                : undefined
            }
          />
        </g>
      )}
    </svg>
  );
};
