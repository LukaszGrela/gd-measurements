import { Fragment, useRef, type FC } from "react";
import "./Ruler.scss";
import { classNames } from "../utils/classNames";
import { VerticalLine } from "../utils/svg/VerticalLine";
import { HorizontalLine } from "../utils/svg/HorizontalLine";
import type { IProps } from "./types";
import type { TOrientation, TPoint } from "../types/common";
import { Units } from "../labels/Units";

const getPattern1 = (
  orientation: TOrientation = "vertical",
  opposite = false
) => {
  console.log("getPattern1", orientation, opposite);
  return (
    <pattern
      className="Ruler_pattern"
      id={`ruler-pattern1-${orientation}-${opposite ? "normal" : "opposite"}`}
      patternUnits="userSpaceOnUse"
      width={100}
      height={100}
    >
      {orientation === "horizontal" && (
        <>
          {/* line */}
          <rect
            className="Ruler_pattern_line"
            x={0}
            y={opposite ? 47 : 0}
            width={100}
            height={3}
            stroke={"none"}
          />

          {/* main division */}
          <g className="Ruler_pattern_main">
            <VerticalLine length={50} x={0} y={0} />
            <VerticalLine length={25} x={50} y={opposite ? 25 : 0} />
          </g>
          {/* sudivision */}

          <g className="Ruler_pattern_sub">
            {Array.from(Array(4)).map((_, index) => (
              <Fragment key={index}>
                <VerticalLine
                  length={15}
                  x={(index + 1) * 10}
                  y={opposite ? 35 : 0}
                />
                <VerticalLine
                  length={15}
                  x={(index + 6) * 10}
                  y={opposite ? 35 : 0}
                />
              </Fragment>
            ))}
          </g>
        </>
      )}
      {orientation === "vertical" && (
        <>
          {/* line */}
          <rect
            className="Ruler_pattern_line"
            x={opposite ? 47 : 0}
            y={0}
            width={3}
            height={100}
            stroke={"none"}
          />

          {/* main division */}
          <g className="Ruler_pattern_main">
            <HorizontalLine x={0} y={0} length={50} />
            <HorizontalLine x={opposite ? 25 : 0} y={50} length={25} />
          </g>

          {/* sudivision */}
          <g className="Ruler_pattern_sub">
            {Array.from(Array(4)).map((_, index) => (
              <Fragment key={`${index}`}>
                <HorizontalLine
                  x={opposite ? 35 : 0}
                  y={(index + 1) * 10}
                  length={15}
                />
                <HorizontalLine
                  x={opposite ? 35 : 0}
                  y={(index + 6) * 10}
                  length={15}
                />
              </Fragment>
            ))}
          </g>
        </>
      )}
    </pattern>
  );
};

const DEFAULT_H_ZERO: TPoint = { x: 10, y: 25 };
const DEFAULT_V_ZERO: TPoint = { x: 25, y: 10 };
const DEFAULT_H_OFFSET: TPoint = { x: 2, y: 25 };
const DEFAULT_V_OFFSET: TPoint = { x: 25, y: -2 };

export const Ruler: FC<IProps> = ({
  orientation = "vertical",
  location = "left",
  position = "fixed",
  labels,
}) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const opposite =
    (orientation === "horizontal" && location === "bottom") ||
    (orientation === "vertical" && location === "right");
  return (
    <svg
      ref={ref}
      className={classNames("Ruler", location, position, orientation)}
    >
      <defs>{getPattern1(orientation, ruler, opposite)}</defs>
      <rect
        fill={`url(#ruler-pattern1-${orientation}-${
          opposite ? "normal" : "opposite"
        })`}
        width={"100%"}
        height={"100%"}
      />

      {labels && (
        <Units
          className="Ruler_units"
          orientation={orientation}
          svgRef={ref}
          offset={
            typeof labels === "boolean"
              ? orientation === "vertical"
                ? DEFAULT_V_OFFSET
                : DEFAULT_H_OFFSET
              : labels.offset
          }
          zero={
            typeof labels === "boolean"
              ? orientation === "vertical"
                ? DEFAULT_V_ZERO
                : DEFAULT_H_ZERO
              : labels.zero
          }
          size={
            typeof labels !== "boolean" && labels.size
              ? { width: labels.size, height: labels.size }
              : { width: 100, height: 100 }
          }
          skipZero={typeof labels !== "boolean" ? labels.skipZero : undefined}
        />
      )}
    </svg>
  );
};
