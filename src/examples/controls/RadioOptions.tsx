import { useFormContext, type FieldValues } from "react-hook-form";
import type { IControlProps } from "./types";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  options: { label?: string; value: number | string }[];
}

export function RadioOptions<FormData extends FieldValues>({
  name,
  label,
  options,
}: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div className="control-group RadioOptions">
      <label>{label}</label>
      <div>
        {options.map(({ value, label }, index) => (
          <label key={`${index}-${value}`}>
            <input type="radio" value={value} {...register(name)} />
            {label ?? value}
          </label>
        ))}
      </div>
    </div>
  );
}
