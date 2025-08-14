import type { FC, SVGLineElementAttributes } from "react";

export const HorizontalLine: FC<
  Omit<SVGLineElementAttributes<SVGLineElement>, "x1" | "x2" | "y1" | "y2"> & {
    length: number;
    x: number;
    y: number;
  }
> = ({ x, y, length, ...props }) => {
  const x1 = x;
  const x2 = x + length;
  const y1 = y;
  const y2 = y;
  return <line {...props} x1={x1} y1={y1} x2={x2} y2={y2} />;
};
