import type { ReactNode } from "react";
import type { FieldValues, Path } from "react-hook-form";

export interface IControlProps<FormData extends FieldValues> {
  name: Path<FormData>;
  label?: ReactNode;
}
