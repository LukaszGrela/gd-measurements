import "./Example.scss";
import { useEffect, type ReactNode } from "react";
import { classNames } from "../../lib/utils/classNames";
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";

interface IProps<FormData extends FieldValues> {
  className?: string;
  title: string;
  controls?: ReactNode;

  children: ReactNode;

  defaultValues?: DefaultValues<FormData>;

  onChange?: (data: FormData) => void;
}

export function Example<FormData extends FieldValues>({
  className,
  title,
  controls,
  children,
  defaultValues,
  onChange,
}: IProps<FormData>) {
  const methods = useForm<FormData>({
    defaultValues,
  });

  useEffect(() => {
    if (!onChange) return;

    // make sure to unsubscribe;
    const callback = methods.subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        onChange?.(values);
      },
    });

    return () => callback();

    // You can also just return the subscribe
    // return subscribe();
  }, [methods, onChange]);

  return (
    <div className={classNames("Example", className)}>
      <h2>{title}</h2>
      <h3>Controls</h3>
      <div className="Example_controls">
        <div className="control-group">
          <button onClick={() => methods.reset()}>Reset</button>
        </div>
        <FormProvider {...methods}>
          <form>{controls}</form>
        </FormProvider>
      </div>
      <div className="Example_content">{children}</div>
    </div>
  );
}
