import type { FC } from "react";
import { Crosshair } from "../../utils/debug/Crosshair";
import { classNames } from "../../utils/classNames";
import type { IProps } from "./types";

export const Label: FC<IProps> = ({
  children,
  className,
  alignment = "baseline",
  translate = { x: 0, y: 0 },
  anchor = "start",
  rotation = 0,
  debug = false,
}) => {
  return (
    <g
      className={classNames("Label", className)}
      transform={`translate(${translate.x}, ${translate.y})`}
    >
      <Crosshair show={debug} />
      <text className="value-label" transform={`rotate(${rotation})`}>
        <tspan alignmentBaseline={alignment} textAnchor={anchor}>
          {children}
        </tspan>
      </text>
    </g>
  );
};
