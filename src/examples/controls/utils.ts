import type { FieldValues, Path } from "react-hook-form";

export function joinPath<FormData extends FieldValues>(
  base: Path<FormData> | undefined,
  path: string
): Path<FormData> {
  if (!base) return path as Path<FormData>;
  
  return `${base}.${path}` as Path<FormData>;
}
