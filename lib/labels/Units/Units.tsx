import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import throttle from "lodash/throttle";
import type { IProps } from "./types";
import type { TPoint } from "../../types/common";
import { useResizeObserver } from "../../hooks/useResizeObserver";
import { classNames } from "../../utils/classNames";
import { getOffset } from "../../utils/getOffset";
import { Crosshair } from "../../utils/debug/Crosshair";
import { Label } from "../Label";

const ZERO_POINT: TPoint = {
  x: 0,
  y: 0,
};

const defaultLabelConfig: IProps["labelConfig"] = {};
const defaultZeroLabelConfig: IProps["labelZeroConfig"] = {
  anchor: "end",
};

const generateLabels = (
  list: number[] = [],
  orientation: "horizontal" | "vertical",
  offset: number | TPoint = 0,
  size: number,
  skipFirst?: boolean,
  zero?: TPoint,
  debug?: boolean,
  labelConfig?: IProps["labelConfig"],
  labelZeroConfig?: IProps["labelZeroConfig"]
) => {
  const length = list.length;
  const posX = orientation === "horizontal" ? size : 0,
    posY = orientation === "vertical" ? size : 0,
    offsetX = getOffset(offset).x,
    offsetY = getOffset(offset).y;

  const defaultConfig = (
    config: IProps["labelConfig"],
    isZero?: boolean
  ): IProps["labelConfig"] => {
    const orientationConfig: IProps["labelConfig"] = {};
    if (orientation === "vertical") {
      orientationConfig.rotation = -90;
    }
    if (isZero) {
      return Object.assign(orientationConfig, defaultZeroLabelConfig, config);
    }
    return Object.assign(orientationConfig, defaultLabelConfig, config);
  };

  return list.map((_, index) => {
    if (skipFirst && index === 0) return null;
    const x = posX * index;
    const y = posY * index;

    let dx = offsetX + x;
    let dy = offsetY + y;
    if (index === 0 && zero) {
      dx = getOffset(zero).x + x;
      dy = getOffset(zero).y + y;
    }
    const label = (index * size).toString();
    const config = defaultConfig(
      index === 0 ? labelZeroConfig : labelConfig,
      index === 0
    );

    return (
      <Label
        key={`${dx},${dy},${label}`}
        {...config}
        debug={debug}
        translate={{ x: dx, y: dy }}
        className={classNames(
          orientation,
          index === 0 && "first",
          index === length - 1 && "last"
        )}
      >
        {label}
      </Label>
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
  translate = ZERO_POINT,

  size,
  zero,

  skipZero = false,
  debug = false,

  labelConfig,
  labelZeroConfig,
}) => {
  console.log("Units", orientation, offset, svgRef);
  const [length, setLength] = useState(0);

  const resizeCallback = useCallback(
    (width: number, height: number) => {
      console.log("resize", orientation, width, height);
      const newLength = Math.floor(
        (orientation === "horizontal" ? width : height) / size
      );

      setLength(newLength + 1);
    },
    [orientation, size]
  );

  const throttledResize = throttle(resizeCallback, 500);

  useResizeObserver(svgRef, (rect) => {
    throttledResize(rect.width, rect.height);
  });

  useEffect(() => {
    if (offset && size && svgRef.current) {
      throttledResize(svgRef.current.clientWidth, svgRef.current.clientHeight);
    }
  }, [throttledResize, size, svgRef, offset]);

  const list = useMemo(() => {
    return Array.from(Array(length)).map((_, index) => index);
  }, [length]);

  return (
    <g
      className={classNames("Units", className)}
      transform={`translate(${translate.x}, ${translate.y})`}
    >
      <Crosshair show={debug} size={20} />
      {generateLabels(
        list,
        orientation,
        offset,
        size,
        skipZero,
        getOffset(zero ?? (orientation === "vertical" ? DEFAULT_V : DEFAULT_H)),
        debug,
        labelConfig,
        labelZeroConfig
      )}
    </g>
  );
};
