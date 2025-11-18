import { useCallback, useMemo, useState, type FC } from "react";
import throttle from "lodash/throttle";
import type { IProps } from "./types";
import type { TPoint, TSize } from "../types/common";
import type { TGrid } from "../grid/types";
import { useResizeObserver } from "../hooks/useResizeObserver";
import { classNames } from "../utils/classNames";
import { getOffset } from "../utils/getOffset";

const generateLabels = (
  list: number[] = [],
  orientation: "horizontal" | "vertical",
  offset: number | TPoint = 0,
  grid: TGrid,
  skipFirst?: boolean,
  zero?: TPoint,
  size?: TSize
) => {
  const getSize = (grid: TGrid, size?: TSize) => {
    if (size) return size;
    return grid;
  };

  const length = list.length;
  const posX = orientation === "horizontal" ? getSize(grid, size).width : 0,
    posY = orientation === "vertical" ? getSize(grid, size).height : 0,
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
            index *
            (orientation === "horizontal"
              ? getSize(grid, size).width
              : getSize(grid, size).height)
          ).toString()}
        </tspan>
      </text>
    );
  });
};

export const Units: FC<IProps> = ({
  grid,
  orientation,
  labels,
  svgRef,
  className,
}) => {
  const [length, setLength] = useState(0);

  const getSize = (grid: TGrid, size?: TSize) => {
    if (size) return size;
    return grid;
  };

  const resizeCallback = useCallback(
    (width: number, height: number) => {
      const newLength = Math.floor(
        (orientation === "horizontal" ? width : height) /
          (orientation === "horizontal"
            ? getSize(
                grid,
                typeof labels === "boolean" ? undefined : labels.size
              ).width
            : getSize(
                grid,
                typeof labels === "boolean" ? undefined : labels.size
              ).height)
      );

      setLength(newLength + 1);
    },
    [grid, labels, orientation]
  );

  const throttledResize = throttle(resizeCallback, 500);

  useResizeObserver(svgRef, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  const point = useMemo(() => {
    if (typeof labels !== "boolean") {
      if (orientation === "horizontal") {
        return labels.hOffset;
      } else {
        return labels.vOffset;
      }
    }

    return undefined;
  }, [labels, orientation]);

  const zero = useMemo(() => {
    if (typeof labels !== "boolean" && labels.zero) {
      return getOffset(labels.zero);
    }
    return { x: 10, y: 0 };
  }, [labels]);

  const size = useMemo(() => {
    if (typeof labels !== "boolean" && labels.size) {
      return labels.size;
    }
    return undefined;
  }, [labels]);

  const list = useMemo(() => {
    return Array.from(Array(length)).map((_, index) => index);
  }, [length]);

  return (
    <g className={classNames("Units", className)}>
      {generateLabels(
        list,
        orientation,
        point,
        grid,
        orientation === "vertical",
        zero,
        size
      )}
    </g>
  );
};
