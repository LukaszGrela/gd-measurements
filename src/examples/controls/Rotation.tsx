import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { joinPath } from "./utils";

interface IProps<FormData extends FieldValues> {
  name?: Path<FormData>;
  min?: number;
  max?: number;
  step?: number;
}

export function Rotation<FormData extends FieldValues>({
  min = -180,
  max = 180,
  step = 45,
  name,
}: IProps<FormData>) {
  const { register, watch } = useFormContext(); // retrieve all hook methods

  const rotation = watch(joinPath<FormData>(name, "rotation"));
  return (
    <div className="control-group Rotation">
      <label>
        Rotation:
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          {...register(joinPath<FormData>(name, "rotation"))}
        />
        <span aria-hidden>{rotation}</span>
      </label>
    </div>
  );
}
