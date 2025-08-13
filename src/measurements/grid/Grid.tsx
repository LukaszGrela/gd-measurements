import "./Grid.scss";
import type { FC } from "react";
import { classNames } from "../utils/classNames";

const getPattern1 = () => {
  return (
    <pattern
      className="Grid_pattern"
      id={`grid-pattern1`}
      patternUnits="userSpaceOnUse"
      width={50}
      height={50}
    >
      {/* main division */}
      <g className="Grid_pattern_main">
        <line x1={0} y1={0} x2={0} y2={50} strokeWidth={2} />
        <line x1={0} y1={0} x2={50} y2={0} strokeWidth={2} />
      </g>

      {/* sudivision */}
      <g className="Grid_pattern_sub">
        <line x1={10} y1={0} x2={10} y2={50} strokeWidth={1} />
        <line x1={20} y1={0} x2={20} y2={50} strokeWidth={1} />
        <line x1={30} y1={0} x2={30} y2={50} strokeWidth={1} />
        <line x1={40} y1={0} x2={40} y2={50} strokeWidth={1} />

        <line x1={0} y1={10} x2={50} y2={10} strokeWidth={1} />
        <line x1={0} y1={20} x2={50} y2={20} strokeWidth={1} />
        <line x1={0} y1={30} x2={50} y2={30} strokeWidth={1} />
        <line x1={0} y1={40} x2={50} y2={40} strokeWidth={1} />
      </g>
    </pattern>
  );
};

export const Grid: FC<{
  position?: "absolute" | "fixed";
}> = ({ position = "fixed" }) => {
  return (
    <svg className={classNames("Grid", position)}>
      <defs>{getPattern1()}</defs>
      <rect fill={`url(#grid-pattern1)`} width={"100%"} height={"100%"} />
    </svg>
  );
};
