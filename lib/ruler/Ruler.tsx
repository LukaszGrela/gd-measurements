import { Fragment, type FC } from "react";
import "./Ruler.scss";
import { classNames } from "../utils/classNames";
import { VerticalLine } from "../utils/svg/VerticalLine";
import { HorizontalLine } from "../utils/svg/HorizontalLine";

const getPattern1 = (
  orientation: "vertical" | "horizontal" = "vertical",
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

export const Ruler: FC<{
  orientation?: "vertical" | "horizontal";
  position?: "absolute" | "fixed";
  location?: "top" | "left" | "right" | "bottom";
}> = ({ orientation = "vertical", location = "left", position = "fixed" }) => {
  const opposite =
    (orientation === "horizontal" && location === "bottom") ||
    (orientation === "vertical" && location === "right");
  return (
    <svg className={classNames("Ruler", location, position, orientation)}>
      <defs>{getPattern1(orientation, opposite)}</defs>
      <rect
        fill={`url(#ruler-pattern1-${orientation}-${
          opposite ? "normal" : "opposite"
        })`}
        width={"100%"}
        height={"100%"}
      />
    </svg>
  );
};
