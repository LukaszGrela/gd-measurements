import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { joinPath } from "./utils";
interface IProps<FormData extends FieldValues> {
  name?: Path<FormData>;
}

export function Anchor<FormData extends FieldValues>({
  name,
}: IProps<FormData>) {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div className="control-group Anchor">
      <label>
        Anchor:
        <select {...register(joinPath<FormData>(name, "anchor"))}>
          {["start", "middle", "end"].map((value, index) => (
            <option key={`${index}-${value}`} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
