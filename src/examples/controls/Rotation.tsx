import type { FC } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  min?: number;
  max?: number;
  step?: number;
}

export const Rotation: FC<IProps> = ({ min = -180, max = 180, step = 45 }) => {
  const { register, watch } = useFormContext(); // retrieve all hook methods

  const rotation = watch("rotation");
  return (
    <div className="control-group Rotation">
      <label>
        Rotation: {rotation}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          {...register("rotation")}
        />
      </label>
    </div>
  );
};
