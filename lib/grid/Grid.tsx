import "./Grid.scss";
import { useRef, type FC, type ReactNode } from "react";
import { classNames } from "../utils/classNames";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import { VerticalLine } from "../utils/svg/VerticalLine";
import type { IProps, TGrid } from "./types";
import { Units } from "../labels/Units";

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
      {/* <VerticalLine length={grid.height} x={10} y={0} strokeWidth={1} />
      <VerticalLine length={grid.height} x={20} y={0} strokeWidth={1} />
      <VerticalLine length={grid.height} x={30} y={0} strokeWidth={1} />
      <VerticalLine length={grid.height} x={40} y={0} strokeWidth={1} /> */}
      {/* <line x1={10} y1={0} x2={10} y2={50} strokeWidth={1} />
      <line x1={20} y1={0} x2={20} y2={50} strokeWidth={1} />
      <line x1={30} y1={0} x2={30} y2={50} strokeWidth={1} />
      <line x1={40} y1={0} x2={40} y2={50} strokeWidth={1} /> */}
      {horizontals}
      {/* <HorizontalLine length={grid.width} x={0} y={10} strokeWidth={1} />
      <HorizontalLine length={grid.width} x={0} y={20} strokeWidth={1} />
      <HorizontalLine length={grid.width} x={0} y={30} strokeWidth={1} />
      <HorizontalLine length={grid.width} x={0} y={40} strokeWidth={1} /> */}
      {/* <line x1={0} y1={10} x2={50} y2={10} strokeWidth={1} />
      <line x1={0} y1={20} x2={50} y2={20} strokeWidth={1} />
      <line x1={0} y1={30} x2={50} y2={30} strokeWidth={1} />
      <line x1={0} y1={40} x2={50} y2={40} strokeWidth={1} /> */}
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

export const Grid: FC<IProps> = ({
  position = "fixed",
  grid = { width: 50, height: 50 },
  labels,
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
            className="Grid_units"
            grid={grid}
            labels={labels}
            orientation="horizontal"
            svgRef={ref}
          />

          <Units
            className="Grid_units"
            grid={grid}
            labels={labels}
            orientation="vertical"
            svgRef={ref}
          />
        </g>
      )}
    </svg>
  );
};
