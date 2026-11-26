import "./AxisV.scss";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { classNames } from "../utils/classNames";
import { throttle } from "../utils/throttle";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { VerticalLine } from "../utils/svg/VerticalLine";
import type { IProps } from "./types";

export const AxisV: FC<IProps> = ({ position = "fixed", className }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [width, setHeight] = useState(0);
  const [x, setXPos] = useState(0);

  const throttledResize = useMemo(
    () =>
      throttle((width: number, height: number) => {
        setHeight(height);
        setXPos(width / 2);
      }, 250),
    []
  );

  useEffect(() => () => throttledResize.cancel(), [throttledResize]);

  useResizeObserver(ref, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  return (
    <svg
      ref={ref}
      className={classNames("AxisV", position, className)}
      aria-hidden="true"
    >
      <VerticalLine length={width} x={x} y={0} />
    </svg>
  );
};
