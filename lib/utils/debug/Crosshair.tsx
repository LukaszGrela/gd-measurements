import type { FC } from "react";

export const Crosshair: FC<{ show?: boolean; size?: number }> = ({
  show,
  size = 10,
}) => {
  return (
    show && (
      <g className="Crosshair">
        <line
          className="Crosshair_horizontal"
          x1={-size}
          y1={0}
          x2={size}
          y2={0}
          stroke="red"
          strokeWidth={1}
        />
        <line
          className="Crosshair_vertical"
          x1={0}
          y1={-size}
          x2={0}
          y2={size}
          stroke="green"
          strokeWidth={1}
        />
      </g>
    )
  );
};
