import "./AxisV.scss";
import { useRef, useState, type FC } from "react";
import throttle from "lodash/throttle";
import { classNames } from "../utils/classNames";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { VerticalLine } from "../utils/svg/VerticalLine";

export const AxisV: FC<{
  position?: "absolute" | "fixed";
}> = ({ position = "fixed" }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setHeight] = useState(0);
  const [x, setXPos] = useState(0);

  const throttledResize = throttle((width: number, height: number) => {
    setHeight(height);
    setXPos(width / 2);
  }, 250);
  useResizeObserver(ref, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  return (
    <svg ref={ref} className={classNames("AxisV", position)}>
      <VerticalLine length={width} x={x} y={0} />
    </svg>
  );
};
