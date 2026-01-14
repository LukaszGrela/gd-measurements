import "./AxisExample.scss";
import { useCallback, useState } from "react";
import { Example } from "./Example";
import { Debug } from "./controls/Debug";
import { AxisH, AxisV } from "../../lib";
import { RadioOptions } from "./controls/RadioOptions";
import type { TPosition } from "../../lib/types/common";

type TAxisControlsData = {
  debug: boolean;
  position: TPosition;
};
const defaultValues: TAxisControlsData = {
  debug: false,
  position: "absolute",
};

export const AxisExample = () => {
  const [controlsData, setControlsData] =
    useState<TAxisControlsData>(defaultValues);
  const onControlsDataChanged = useCallback((data: TAxisControlsData) => {
    setControlsData(data);
  }, []);
  return (
    <>
      <Example<TAxisControlsData>
        onChange={onControlsDataChanged}
        defaultValues={defaultValues}
        className="AxisExample"
        title="Axis example"
        controls={
          <>
            <Debug />

            <RadioOptions<TAxisControlsData>
              label="Position"
              name="position"
              options={[{ value: "absolute" }, { value: "fixed" }]}
            />
          </>
        }
      >
        <AxisH {...controlsData} />
        <AxisV {...controlsData} />
      </Example>
    </>
  );
};
