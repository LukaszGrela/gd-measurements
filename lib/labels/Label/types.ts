import type { SVGAttributes } from "react";
import type { TPoint } from "../../types/common";

export interface IProps {
  alignment?: SVGAttributes<SVGTSpanElement>["alignmentBaseline"];
  anchor?: "start" | "middle" | "end";
  translate?: TPoint;
  children: SVGAttributes<SVGTSpanElement>["children"];
  rotation?: number;
  debug?: boolean;
  className?: string;
}
