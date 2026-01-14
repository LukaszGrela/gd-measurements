import type { FieldValues, Path } from "react-hook-form";
import { Numeric } from "./Numeric";
import { Point } from "./Point";
import { LabelPropsControls } from "./LabelPropsControls";

export function UnitPropsControls<FormData extends FieldValues>({
  name,
}: {
  name: Path<FormData>;
}) {
  return (
    <>
      {/* TUnit */}
      <Point name={`${name}.offset`} label="Offset of labels" />
      <Point name={`${name}.zero`} label="Offset of zero label" />
      <Numeric name={`${name}.size`} label={"Size of the label step"} />
      <div className="flex-row">
        <LabelPropsControls label="labelConfig" name={`${name}.labelConfig`} />
        <LabelPropsControls
          label="labelZeroConfig"
          name={`${name}.labelZeroConfig`}
        />
      </div>
    </>
  );
}
