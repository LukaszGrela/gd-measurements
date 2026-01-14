import { useFormContext, type FieldValues } from "react-hook-form";
import type { IControlProps } from "./types";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  marker?: unknown;
}

export function Checkbox<FormData extends FieldValues>({
  name,
  label,
}: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div className="control-group Checkbox">
      <label>
        <input type="checkbox" {...register(name)} />
        {label}
      </label>
    </div>
  );
}
