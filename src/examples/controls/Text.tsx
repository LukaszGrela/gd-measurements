import { useFormContext, type FieldValues, type Path } from "react-hook-form";

interface IProps<FormData extends FieldValues> {
  name: Path<FormData>;
}

export function Text<FormData extends FieldValues>(props: IProps<FormData>) {
  const { register } = useFormContext<FormData>(); // retrieve all hook methods
  return (
    <div className="control-group Text">
      <label>
        <input type="text" {...register(props.name)} />
      </label>
    </div>
  );
}
