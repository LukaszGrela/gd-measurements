import { useCallback, useMemo, useState, type FC } from "react";
import throttle from "lodash/throttle";
import type { IProps } from "./types";
import type { TPoint, TSize } from "../types/common";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { classNames } from "../utils/classNames";
import { getOffset } from "../utils/getOffset";

const ZERO_POINT: TPoint = {
  x: 0,
  y: 0,
};

const generateLabels = (
  list: number[] = [],
  orientation: "horizontal" | "vertical",
  offset: number | TPoint = 0,
  size: TSize,
  skipFirst?: boolean,
  zero?: TPoint
) => {
  const length = list.length;
  const posX = orientation === "horizontal" ? size.width : 0,
    posY = orientation === "vertical" ? size.height : 0,
    offsetX = getOffset(offset).x,
    offsetY = getOffset(offset).y;

  return list.map((_, index) => {
    if (skipFirst && index === 0) return null;
    let x = offsetX + posX * index;
    let y = offsetY + posY * index;
    if (index === 0 && zero) {
      x = getOffset(zero).x + posX * index;
      y = getOffset(zero).y + posY * index;
    }
    return (
      <text
        x={x}
        y={y}
        key={index}
        className={classNames(
          "value-label",
          orientation,
          index === 0 && "first",
          index === length - 1 && "last"
        )}
        transform={
          orientation === "vertical" ? `rotate(-90 ${x} ${y})` : undefined
        }
      >
        <tspan>
          {(
            index * (orientation === "horizontal" ? size.width : size.height)
          ).toString()}
        </tspan>
      </text>
    );
  });
};

const DEFAULT_V: TPoint = { x: 0, y: 10 };
const DEFAULT_H: TPoint = { x: 10, y: 0 };

export const Units: FC<IProps> = ({
  orientation,
  svgRef,
  className,

  offset = ZERO_POINT,
  size,
  zero,

  skipZero = false,
}) => {
  const [length, setLength] = useState(0);

  const resizeCallback = useCallback(
    (width: number, height: number) => {
      const newLength = Math.floor(
        (orientation === "horizontal" ? width : height) /
          (orientation === "horizontal" ? size.width : size.height)
      );

      setLength(newLength + 1);
    },
    [orientation, size.height, size.width]
  );

  const throttledResize = throttle(resizeCallback, 500);

  useResizeObserver(svgRef, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  const list = useMemo(() => {
    return Array.from(Array(length)).map((_, index) => index);
  }, [length]);

  return (
    <g className={classNames("Units", className)}>
      {generateLabels(
        list,
        orientation,
        offset,
        size,
        skipZero,
        getOffset(zero ?? (orientation === "vertical" ? DEFAULT_V : DEFAULT_H))
      )}
    </g>
  );
};
