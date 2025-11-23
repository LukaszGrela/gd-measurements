import "./Grid.scss";
import { useRef, type FC, type ReactNode } from "react";
import { classNames } from "../utils/classNames";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import { VerticalLine } from "../utils/svg/VerticalLine";
import type { IProps, TGrid } from "./types";
import { Units } from "../labels/Units";
import type { TPoint } from "../types/common";

const getPatternId = (grid: TGrid) => {
  return `grid-pattern-${grid.width}x${grid.height}`;
};

const getSubdivision = (grid: TGrid) => {
  const subdivision = grid.subdivision ?? 5;

  const stepX = grid.width / subdivision;
  const stepY = grid.height / subdivision;

  const verticals = (() => {
    const list: ReactNode[] = [];
    for (let i = 1; i < subdivision; i++) {
      list.push(
        <VerticalLine
          key={`vl-${i}-${stepX * 1}`}
          length={grid.height}
          x={stepX * i}
          y={0}
          strokeWidth={1}
        />
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
          length={grid.width}
          x={0}
          y={stepY * i}
          strokeWidth={1}
        />
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
  id = `grid-pattern1`,
  grid = {
    width: 50,
    height: 50,
  }
) => {
  console.log("Grid pattern", grid);
  return (
    <pattern
      className="Grid_pattern"
      id={id}
      patternUnits="userSpaceOnUse"
      width={grid.width}
      height={grid.height}
    >
      {/* main division */}
      <g className="Grid_pattern_main">
        <line x1={0} y1={0} x2={0} y2={grid.height} strokeWidth={2} />
        <line x1={0} y1={0} x2={grid.width} y2={0} strokeWidth={2} />
      </g>
      {getSubdivision(grid)}
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
}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const patternId = getPatternId(grid);

  return (
    <svg ref={ref} className={classNames("Grid", position)}>
      <defs>{getPattern1(patternId, grid)}</defs>
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
                ? labels.size.width
                : grid.width
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
                ? labels.size.height
                : grid.height
            }
            skipZero
          />
        </g>
      )}
    </svg>
  );
};
