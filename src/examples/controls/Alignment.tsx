import type { FC, SVGAttributes } from "react";
import { useFormContext } from "react-hook-form";

export const Alignment: FC = () => {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div className="control-group Alignment">
      <label>
        Alignment:
        <select {...register("alignment")}>
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
};
