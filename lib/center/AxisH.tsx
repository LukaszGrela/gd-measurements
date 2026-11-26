import "./AxisH.scss";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { classNames } from "../utils/classNames";
import { throttle } from "../utils/throttle";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import { useResizeObserver } from "../hooks/useResizeObserver";
import type { IProps } from "./types";

export const AxisH: FC<IProps> = ({ position = "fixed", className }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(0);
  const [y, setYPos] = useState(0);

  const throttledResize = useMemo(
    () =>
      throttle((width: number, height: number) => {
        setWidth(width);
        setYPos(height / 2);
      }, 250),
    []
  );

  useEffect(() => () => throttledResize.cancel(), [throttledResize]);

  useResizeObserver(ref, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  return (
    <svg ref={ref} className={classNames("AxisH", position, className)}>
      <HorizontalLine length={width} x={0} y={y} />
    </svg>
  );
};
