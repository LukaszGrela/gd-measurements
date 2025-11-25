import "./AxisH.scss";
import { useRef, useState, type FC } from "react";
import throttle from "lodash/throttle";
import { classNames } from "../utils/classNames";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import { useResizeObserver } from "../hooks/useResizeObserver";
import type { TPosition } from "../types/common";

export const AxisH: FC<{
  position?: TPosition;
}> = ({ position = "fixed" }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(0);
  const [y, setYPos] = useState(0);

  const throttledResize = throttle((width: number, height: number) => {
    setWidth(width);
    setYPos(height / 2);
  }, 250);
  useResizeObserver(ref, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  return (
    <svg ref={ref} className={classNames("AxisH", position)}>
      <HorizontalLine length={width} x={0} y={y} />
    </svg>
  );
};
