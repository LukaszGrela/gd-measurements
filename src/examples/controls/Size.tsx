import { type FieldValues } from "react-hook-form";
import type { IControlProps } from "./types";
import { Numeric } from "./Numeric";
import { joinPath } from "./utils";

interface IProps<FormData extends FieldValues> extends IControlProps<FormData> {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export function Size<FormData extends FieldValues>({
  name,
  label,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
}: IProps<FormData>) {
  return (
    <div className="control-group Size">
      <label>
        {label}

        <Numeric<FormData>
          name={joinPath<FormData>(name, "width")}
          label={`width`}
          max={maxWidth}
          min={minWidth}
        />
        <Numeric<FormData>
          name={joinPath<FormData>(name, "height")}
          label={`height`}
          max={maxHeight}
          min={minHeight}
        />
      </label>
    </div>
  );
}
