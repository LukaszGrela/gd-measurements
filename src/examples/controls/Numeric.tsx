import { useFormContext, type FieldValues } from "react-hook-form";
import type { IControlProps } from "./types";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  min?: number;
  max?: number;
}

export function Numeric<FormData extends FieldValues>({
  label,
  name,
  min,
  max,
}: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div className="control-group Numeric">
      <label>
        {label}
        <input
          type="number"
          min={min}
          max={max}
          {...register(name, { valueAsNumber: true })}
        />
      </label>
    </div>
  );
}
