import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import type { IControlProps } from "./types";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
}

export function Point<FormData extends FieldValues>({
  name,
  label,
  minX,
  minY,
  maxX,
  maxY,
}: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods

  return (
    <div className="control-group Point">
      <label>
        {label}
        <label>
          x
          <input
            type="number"
            min={minX}
            max={maxX}
            {...register(`${name}.x` as Path<FormData>, {
              valueAsNumber: true,
            })}
          />
        </label>
        <label>
          y
          <input
            type="number"
            min={minY}
            max={maxY}
            {...register(`${name}.y` as Path<FormData>, {
              valueAsNumber: true,
            })}
          />
        </label>
      </label>
    </div>
  );
}
