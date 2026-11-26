import "./Ruler.scss";
import { useId, useMemo, useRef, type FC } from "react";
import { classNames } from "../utils/classNames";
import { intAtLeast, numberAtLeast } from "../utils/number";
import { VerticalLine } from "../utils/svg/VerticalLine";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import type { IProps, TLocation, TUnit } from "./types";
import type { TOrientation, TPoint } from "../types/common";
import { Units, type IProps as IUnitsProps } from "../labels/Units";
import { getOffset } from "../utils/getOffset";

const getPattern1 = (
  id: string,
  orientation: TOrientation = "vertical",
  size = 100,
  subdivisions = 10,
  edge = 3,
  width = 25,
  tickWidth = 10,
  halfTickWidth = 20,
  showHalfTick = true,
  opposite = false,
  debug = false,
  mainTickWidth?: number,
) => {
  const step = size / subdivisions;

  return (
    <pattern
      className="Ruler_pattern"
      id={id}
      patternUnits="userSpaceOnUse"
      width={orientation === "vertical" ? width : size}
      height={orientation === "horizontal" ? width : size}
    >
      {orientation === "horizontal" && (
        <>
          {debug && (
            <rect
              className="Ruler_pattern_line-debug"
              x={0}
              y={0}
              width={size}
              height={width}
              stroke={"red"}
              fill={"none"}
            />
          )}
          {/* line */}
          <rect
            className="Ruler_pattern_line"
            x={0}
            y={opposite ? width - Math.min(width, edge) : 0}
            width={size}
            height={edge}
            stroke={"none"}
          />

          {/* main division */}
          <g className="Ruler_pattern_main">
            {/* main */}
            <VerticalLine
              length={Math.min(mainTickWidth ?? width, width)}
              x={0}
              y={opposite ? width - Math.min(width, mainTickWidth ?? width) : 0}
              className="Ruler_pattern_main_tick"
            />
            {/* half */}
            {showHalfTick && (
              <VerticalLine
                className="Ruler_pattern_main_halfTick"
                length={halfTickWidth}
                x={size / 2}
                y={opposite ? width - Math.min(width, halfTickWidth) : 0}
              />
            )}
          </g>
          {/* sudivision */}
          <g className="Ruler_pattern_sub">
            {Array.from(Array(subdivisions - 1)).map((_, index) => {
              const x = step * (index + 1);
              if (showHalfTick && size / 2 === x) {
                // we already render half tick
                return null;
              }
              return (
                <VerticalLine
                  key={`vl-${index}-${step}`}
                  length={tickWidth}
                  x={x}
                  y={opposite ? width - Math.min(width, tickWidth) : 0}
                  strokeWidth={1}
                />
              );
            })}
          </g>
        </>
      )}
      {orientation === "vertical" && (
        <>
          {debug && (
            <rect
              className="Ruler_pattern_line-debug"
              x={0}
              y={0}
              width={width}
              height={size}
              stroke={"red"}
              fill={"none"}
            />
          )}
          {/* line */}
          <rect
            className="Ruler_pattern_line"
            x={opposite ? width - Math.min(width, edge) : 0}
            y={0}
            width={edge}
            height={size}
            stroke={"none"}
          />

          {/* main division */}
          <g className="Ruler_pattern_main">
            {/* main */}
            <HorizontalLine
              length={Math.min(mainTickWidth ?? width, width)}
              x={0}
              y={0}
              className="Ruler_pattern_main_tick"
            />
            {showHalfTick && (
              <HorizontalLine
                className="Ruler_pattern_main_halfTick"
                x={opposite ? width - Math.min(width, halfTickWidth) : 0}
                y={size / 2}
                length={halfTickWidth}
              />
            )}
          </g>

          {/* sudivision */}
          <g className="Ruler_pattern_sub">
            {Array.from(Array(subdivisions - 1)).map((_, index) => {
              const y = step * (index + 1);
              if (showHalfTick && size / 2 === y) {
                // we already render half tick
                return null;
              }
              return (
                <HorizontalLine
                  key={`hl-${index}-${step}`}
                  length={tickWidth}
                  x={opposite ? width - Math.min(width, tickWidth) : 0}
                  y={y}
                  strokeWidth={1}
                />
              );
            })}
          </g>
        </>
      )}
    </pattern>
  );
};

const DEFAULT_OFFSET: TPoint = { x: 2, y: 12 };

/**
 * Resolves the label anchor point for the given ruler `location`.
 *
 *                (top)
 *            ┌──┬──┬──┬──┬──┬──┐
 *            │     -x←│→+x     │
 *
 * Horizontal rulers keep the horizontal offset and move the label along the
 * vertical axis; `bottom` flips the sign. Vertical rulers swap the axes, and
 * `right` flips `x`. `offset.y` is negated for the side locations only in the
 * `offset` variant (`negateY`); the `zero` variant keeps it positive.
 */
const getLabelsPoint = (
  labels: boolean | TUnit,
  key: "offset" | "zero",
  location: TLocation,
  widthProp: number,
): TPoint => {
  const width = numberAtLeast(widthProp, 25, 1);
  const offset =
    typeof labels === "boolean"
      ? DEFAULT_OFFSET
      : getOffset(labels[key] ?? DEFAULT_OFFSET);
  const negateY = key === "offset";

  let natural: TPoint;

  if (location === "bottom") {
    natural = { x: offset.x, y: -1 * offset.y };
  } else if (location === "top") {
    natural = { x: offset.x, y: offset.y };
  } else if (location === "left") {
    natural = { x: offset.y, y: negateY ? -1 * offset.x : offset.x };
  } else {
    natural = { x: -1 * offset.y, y: negateY ? -1 * offset.x : offset.x };
  }

  if (location === "right") {
    return { x: width + natural.x, y: natural.y };
  }

  if (location === "bottom") {
    return { x: natural.x, y: width + natural.y };
  }

  return natural;
};

const getOrientation = (location: TLocation): TOrientation => {
  if (location === "bottom" || location === "top") return "horizontal";
  return "vertical";
};

export const Ruler: FC<IProps> = ({
  location = "left",
  position = "fixed",
  labels,
  skipZero,
  // ruler = {},
  debug = false,

  width: widthProp = 25,
  size: sizeProp = 100,

  subdivisions: subdivisionsProp = 10,
  edge: edgeProp = 3,
  tickWidth: tickWidthProp = 10,
  halfTickWidth: halfTickWidthProp = 20,
  showHalfTick = true,
  mainTickWidth: mainTickWidthProp,
  className,
}) => {
  // They are typed as numbers, but plain JavaScript consumers can pass `0`,
  // `-1`, `NaN` or `Infinity`. `subdivisions: 0` divides by zero and
  // `Array(subdivisions - 1)` throws a RangeError for negative values.
  const width = numberAtLeast(widthProp, 25, 1);
  const size = numberAtLeast(sizeProp, 100, 1);
  const subdivisions = intAtLeast(subdivisionsProp, 10, 1);
  const edge = numberAtLeast(edgeProp, 3, 0);
  const tickWidth = numberAtLeast(tickWidthProp, 10, 0);
  const halfTickWidth = numberAtLeast(halfTickWidthProp, 20, 0);
  const mainTickWidth =
    mainTickWidthProp === undefined
      ? undefined
      : numberAtLeast(mainTickWidthProp, width, 0);

  const orientation = getOrientation(location);

  const ref = useRef<SVGSVGElement | null>(null);
  const opposite =
    (orientation === "horizontal" && location === "bottom") ||
    (orientation === "vertical" && location === "right");

  const offset = useMemo(() => {
    if (!labels) return undefined;

    return getLabelsPoint(labels, "offset", location, widthProp);
  }, [labels, location, widthProp]);

  const zero = useMemo(() => {
    if (!labels) return undefined;

    return getLabelsPoint(labels, "zero", location, widthProp);
  }, [labels, location, widthProp]);

  const labelConfig = useMemo((): IUnitsProps["labelConfig"] | undefined => {
    if (labels) {
      if (typeof labels === "boolean") {
        // defaults
        return {
          alignment: !opposite ? "text-before-edge" : "text-after-edge",
          anchor: "start",
          rotation: orientation === "vertical" ? -90 : 0,
        };
      }
      // user configured label
      return labels.labelConfig;
    }
    return undefined;
  }, [labels, opposite, orientation]);

  const labelZeroConfig = useMemo(():
    | IUnitsProps["labelZeroConfig"]
    | undefined => {
    if (labels) {
      if (typeof labels === "boolean") {
        // defaults
        return {
          alignment: !opposite ? "text-before-edge" : "text-after-edge",
          anchor: orientation === "vertical" ? "end" : "start",
          rotation: orientation === "vertical" ? -90 : 0,
        };
      }
      // user configured label
      return labels.labelZeroConfig;
    }
    return undefined;
  }, [labels, opposite, orientation]);

  const id = useId();
  const patternId = `ruler-pattern1-${orientation}-${
    opposite ? "normal" : "opposite"
  }-${id}`;

  return (
    <svg
      ref={ref}
      className={classNames(
        "Ruler",
        location,
        position,
        orientation,
        className,
      )}
      width={orientation === "vertical" ? width : "100%"}
      height={orientation === "horizontal" ? width : "100%"}
      aria-hidden="true"
    >
      <defs>
        {getPattern1(
          patternId,
          orientation,
          size,
          subdivisions,
          edge,
          width,
          tickWidth,
          halfTickWidth,
          showHalfTick,
          opposite,
          debug,
          mainTickWidth,
        )}
      </defs>
      <rect fill={`url(#${patternId})`} width={"100%"} height={"100%"} />

      {labels && (
        <Units
          debug={debug}
          className={classNames("Ruler_units", opposite && "opposite")}
          orientation={orientation}
          svgRef={ref}
          offset={offset}
          zero={zero}
          size={typeof labels !== "boolean" && labels.size ? labels.size : size}
          skipZero={skipZero}
          labelConfig={labelConfig}
          labelZeroConfig={labelZeroConfig}
        />
      )}
    </svg>
  );
};
