import type { FC } from "react";
import { useFormContext } from "react-hook-form";

export const Debug: FC = () => {
  const { register } = useFormContext(); // retrieve all hook methods
  // return <input {...register("test")} />
  return (
    <div className="control-group">
      <label>
        <input type="checkbox" {...register("debug")} />
        Debug
      </label>
    </div>
  );
};
