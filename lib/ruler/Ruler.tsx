import "./Ruler.scss";
import { useId, useMemo, useRef, type FC } from "react";
import { classNames } from "../utils/classNames";
import { VerticalLine } from "../utils/svg/VerticalLine";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import type { IProps, TLocation } from "./types";
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
  mainTickWidth?: number
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

  width = 25,
  size = 100,

  subdivisions = 10,
  edge = 3,
  tickWidth = 10,
  halfTickWidth = 20,
  showHalfTick = true,
  mainTickWidth,
}) => {
  const orientation = getOrientation(location);

  const ref = useRef<SVGSVGElement | null>(null);
  const opposite =
    (orientation === "horizontal" && location === "bottom") ||
    (orientation === "vertical" && location === "right");

  const offset = useMemo(() => {
    if (!labels) return undefined;

    const natural: TPoint = { x: 0, y: 0 };

    // defaults
    let offset = DEFAULT_OFFSET;

    if (typeof labels !== "boolean") {
      offset = getOffset(labels.offset ?? DEFAULT_OFFSET);
    }

    /**
     * Horizontal (bottom)
     *            │     -x←│→+x     │
     *            │     -y↓│↑+y     │
     *            └──┴──┴──┴──┴──┴──┘
     * offset.x - natural
     * offset.y - -1 * natural
     */
    if (location === "bottom") {
      natural.x = offset.x;
      natural.y = -1 * offset.y;
    }
    /**            (top)
     *            ┌──┬──┬──┬──┬──┬──┐
     *            │     -x←│→+x     │
     *            │     +y↓│↑-y     │
     * offset.x - natural
     * offset.y - natural
     */
    if (location === "top") {
      natural.x = offset.x;
      natural.y = offset.y;
    }
    /**
     * Vertical (left)
     *          ┌──────
     *          │
     *          ├─
     *          │
     *          ├─
     *          │ +x↑,+y→
     *          ├──────
     *          │ -x↓,-y←
     *          ├─
     *          │
     *          ├─
     *          └──────
     * offset.x - natural.y
     * offset.y - -1 * natural.x
     */
    if (location === "left") {
      natural.x = offset.y;
      natural.y = -1 * offset.x;
    }
    /**
     *          (right)
     *           ──────┐
     *                 │
     *                ─┤
     *                 │
     *                ─┤
     *         +x↑,-y→ │
     *           ──────┤
     *         -x↓,+y← │
     *                ─┤
     *                 │
     *                ─┤
     *           ──────┘
     * offset.x - -1*natural.y
     * offset.y - -1*natural.x
     */
    if (location === "right") {
      natural.x = -1 * offset.y;
      natural.y = -1 * offset.x;
    }

    const adjustOffset = (value: TPoint): TPoint => {
      if (location === "right") {
        return {
          x: width + value.x,
          y: value.y,
        };
      }
      if (location === "bottom") {
        return {
          x: value.x,
          y: width + value.y,
        };
      }

      return value;
    };

    const result: TPoint = adjustOffset(natural);

    return result;
  }, [labels, location, width]);

  const zero = useMemo(() => {
    if (!labels) return undefined;

    const natural: TPoint = { x: 0, y: 0 };

    // defaults for boolean label
    let offset = DEFAULT_OFFSET;

    if (typeof labels !== "boolean") {
      offset = getOffset(labels.zero ?? DEFAULT_OFFSET);
    }

    /**
     * Horizontal (bottom)
     *            │     -x←│→+x     │
     *            │     -y↓│↑+y     │
     *            └──┴──┴──┴──┴──┴──┘
     * offset.x - natural
     * offset.y - -1 * natural
     */
    if (location === "bottom") {
      natural.x = offset.x;
      natural.y = -1 * offset.y;
    }
    /**            (top)
     *            ┌──┬──┬──┬──┬──┬──┐
     *            │     -x←│→+x     │
     *            │     +y↓│↑-y     │
     * offset.x - natural
     * offset.y - natural
     */
    if (location === "top") {
      natural.x = offset.x;
      natural.y = offset.y;
    }
    /**
     * Vertical (left)
     *          ┌──────
     *          │
     *          ├─
     *          │
     *          ├─
     *          │ +x↑,+y→
     *          ├──────
     *          │ -x↓,-y←
     *          ├─
     *          │
     *          ├─
     *          └──────
     * offset.x - natural.y
     * offset.y - -1 * natural.x
     */
    if (location === "left") {
      natural.x = offset.y;
      natural.y = offset.x;
    }
    /**
     *          (right)
     *           ──────┐
     *                 │
     *                ─┤
     *                 │
     *                ─┤
     *         +x↑,-y→ │
     *           ──────┤
     *         -x↓,+y← │
     *                ─┤
     *                 │
     *                ─┤
     *           ──────┘
     * offset.x - -1*natural.y
     * offset.y - natural.x
     */
    if (location === "right") {
      natural.x = -1 * offset.y;
      natural.y = offset.x;
    }

    const adjustOffset = (value: TPoint): TPoint => {
      if (location === "right") {
        return {
          x: width + value.x,
          y: value.y,
        };
      }
      if (location === "bottom") {
        return {
          x: value.x,
          y: width + value.y,
        };
      }

      return value;
    };

    const result: TPoint = adjustOffset(natural);

    return result;
  }, [labels, location, width]);

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
      className={classNames("Ruler", location, position, orientation)}
      width={orientation === "vertical" ? width : "100%"}
      height={orientation === "horizontal" ? width : "100%"}
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
          mainTickWidth
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
