import { useFormContext, type FieldValues } from "react-hook-form";
import type { IControlProps } from "./types";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  marker?: unknown;
}

export function Text<FormData extends FieldValues>(props: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div className="control-group Text">
      <label>
        {props.label}
        <input type="text" {...register(props.name)} />
      </label>
    </div>
  );
}
