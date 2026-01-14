import type { FieldValues, Path } from "react-hook-form";
import { Alignment } from "./Alignment";
import { Anchor } from "./Anchor";
import { Rotation } from "./Rotation";

export function LabelPropsControls<FormData extends FieldValues>({
  name,
  label,
}: {
  name: Path<FormData>;
  label: string;
}) {
  return (
    <div className="LabelPropsControls">
      <h5>{label}</h5>
      {/* IUnitsProps["labelConfig"], IUnitsProps["labelZeroConfig"] = Pick<ILabelProps, "alignment" | "anchor" | "rotation">*/}
      <Alignment name={`${name}`} />
      <Anchor name={`${name}`} />
      <Rotation name={`${name}`} />
    </div>
  );
}
