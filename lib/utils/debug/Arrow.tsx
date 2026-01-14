import { useRef, type FC } from "react";
import type { TPoint } from "../../types/common";

const ZERO_POINT: TPoint = {
  x: 0,
  y: 0,
};

export const Arrow: FC<{
  show?: boolean;
  start?: TPoint;
  end: TPoint;
  color?: string;
}> = ({ end, show, start = ZERO_POINT, color = "black" }) => {
  const definition = useRef<SVGDefsElement>(null);
  // useEffect(() => {
  //   console.log("definitions SVG", getSvgParent(definition.current));
  // }, []);
  return (
    <>
      <defs ref={definition}>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0 0, 10 2.5, 0 5" fill="context-stroke" />
        </marker>
      </defs>
      {show && (
        <g className="Arrow">
          <line
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={color}
            strokeWidth="1"
            markerEnd="url(#arrow)"
          />
        </g>
      )}
    </>
  );
};
