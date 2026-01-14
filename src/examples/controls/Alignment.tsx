import type { SVGAttributes } from "react";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { joinPath } from "./utils";

interface IProps<FormData extends FieldValues> {
  name?: Path<FormData>;
}

export function Alignment<FormData extends FieldValues>({
  name,
}: IProps<FormData>) {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div className="control-group Alignment">
      <label>
        Alignment:
        <select {...register(joinPath<FormData>(name, "alignment"))}>
          {(
            ["text-before-edge", "middle", "text-after-edge"] as Exclude<
              SVGAttributes<SVGTSpanElement>["alignmentBaseline"],
              undefined
            >[]
          ).map((value, index) => (
            <option key={`${index}-${value}`} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
