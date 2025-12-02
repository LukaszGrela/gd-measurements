import type { FC } from "react";
import { useFormContext } from "react-hook-form";

export const Anchor: FC = () => {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div className="control-group Anchor">
      <label>
        Anchor:
        <select {...register("anchor")}>
          {["start", "middle", "end"].map((value, index) => (
            <option key={`${index}-${value}`} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
